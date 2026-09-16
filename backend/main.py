from pathlib import Path
from typing import Optional

import shutil

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from database import Base, SessionLocal, engine
from models import Product


BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


class ProductCreate(BaseModel):
    name: str
    price: int
    image: str
    category: str | None = None

    category: Optional[str] = None
    subcategory: Optional[str] = None

    brand: Optional[str] = None
    description: Optional[str] = None
    stock: int = Field(default=0, ge=0)


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    image: Optional[str] = None

    category: Optional[str] = None
    subcategory: Optional[str] = None

    brand: Optional[str] = None
    description: Optional[str] = None
    stock: Optional[int] = Field(default=None, ge=0)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/uploads",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploads",
)

Base.metadata.create_all(bind=engine)


def product_to_dict(product: Product):
    stock = product.stock or 0

    return {
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "image": product.image,
        "category": product.category,
        "subcategory": product.subcategory,
        "brand": product.brand,
        "description": product.description,
        "stock": stock,
        "is_available": stock > 0,
    }


@app.get("/")
def home():
    return {"message": "FastAPI is running"}


@app.get("/products")
def get_products(
    category: Optional[str] = None,
    subcategory: Optional[str] = None,
):
    db = SessionLocal()

    try:
        query = db.query(Product)

        if category:
            query = query.filter(Product.category == category)

        if subcategory:
            query = query.filter(Product.subcategory == subcategory)

        products = query.all()

        return [product_to_dict(product) for product in products]

    finally:
        db.close()


@app.get("/products/{product_id}")
def get_product(product_id: int):
    db = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        return product_to_dict(product)

    finally:
        db.close()


@app.post("/products")
def create_product(product_data: ProductCreate):
    db = SessionLocal()

    try:
        product = Product(
            name=product_data.name,
            price=product_data.price,
            image=product_data.image,
            category=product_data.category,
            subcategory=product_data.subcategory,
            brand=product_data.brand,
            description=product_data.description,
            stock=product_data.stock,
        )

        db.add(product)
        db.commit()
        db.refresh(product)

        return {
            "message": "created",
            "id": product.id,
        }

    finally:
        db.close()


@app.put("/products/{product_id}")
def update_product(
    product_id: int,
    product_data: ProductUpdate,
):
    db = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        update_data = product_data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(product, field, value)

        db.commit()
        db.refresh(product)

        return {
            "message": "updated",
            "id": product.id,
        }

    finally:
        db.close()


@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    db = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        db.delete(product)
        db.commit()

        return {"message": "deleted"}

    finally:
        db.close()


@app.post("/upload")
def upload_image(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "image_url": f"/uploads/{file.filename}"
    }
