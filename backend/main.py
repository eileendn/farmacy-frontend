from fastapi import FastAPI
from database import engine
from models import Base
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException
from database import Base
from database import engine, SessionLocal
from models import Base, Product
from fastapi import UploadFile, File
import shutil
from fastapi.staticfiles import StaticFiles
class ProductCreate(BaseModel):
    name: str
    price: int
    image: str


class ProductUpdate(BaseModel):
    name: str
    price: int

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
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
def update_product(
    product_id: int,
    product_data: ProductUpdate
):
    db = SessionLocal()

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        db.close()
        raise HTTPException(status_code=404)

    product.name = product_data.name
    product.price = product_data.price

    db.commit()

    db.refresh(product)

    db.close()

    return {
        "message": "updated",
        "id": product.id,
    }
@app.post("/upload")
def upload_image(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "image_url": f"/uploads/{file.filename}"
    }