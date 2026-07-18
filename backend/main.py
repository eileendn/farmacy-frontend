from fastapi import FastAPI
from database import engine
from models import Base
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String
from database import Base
from database import engine, SessionLocal
from models import Base, Product
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Integer)
    image = Column(String)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)



@app.get("/")
def home():
    return {"message": "FastAPI is running"}

@app.get("/products")
def get_products():
    db = SessionLocal()

    products = db.query(Product).all()

    result = []

    for product in products:
        result.append({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "image": product.image,
        })

    db.close()

    return result
@app.post("/products")
def create_product():
    db = SessionLocal()

    product = Product(
        name="محصول تستی",
        price=100000,
        image="/hero.jpg"
    )

    db.add(product)
    db.commit()

    db.close()

    return {"message": "created"}