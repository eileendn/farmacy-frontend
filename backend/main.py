from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from database import engine, SessionLocal
from models import Base, Product

class ProductCreate(BaseModel):
    name: str
    price: int
    image: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

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


@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    db = SessionLocal()

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if product:
        db.delete(product)
        db.commit()

    db.close()

    return {"message": "deleted"}
   

@app.post("/products")
def create_product(product_data: ProductCreate):
    db = SessionLocal()

    product = Product(
        name=product_data.name,
        price=product_data.price,
        image=product_data.image,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    db.close()

    return {
        "message": "created",
        "id": product.id,
    }
@app.put("/products/{product_id}")
def update_product(product_id: int):
    db = SessionLocal()

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        db.close()
        raise HTTPException(status_code=404)

    product.name = "محصول ویرایش شده"
    product.price = 999999

    db.commit()
    db.close()

    return {"message": "updated"}