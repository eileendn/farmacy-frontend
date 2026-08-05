from fastapi import FastAPI
from database import engine
from models import Base
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException
from database import Base
from database import engine, SessionLocal
from models import Base, Product, Order
from fastapi import UploadFile, File
import shutil
from fastapi.staticfiles import StaticFiles
from models import Admin
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from security import SECRET_KEY, ALGORITHM
from security import (
    hash_password,
    verify_password,
    create_access_token,
)

class ProductCreate(BaseModel):
    name: str
    price: int
    image: str
class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    address: str
    total_price: int
class LoginRequest(BaseModel):
    username: str
    password: str

class ProductUpdate(BaseModel):
    name: str
    price: int
class OrderStatusUpdate(BaseModel):
    status: str


app = FastAPI()
security = HTTPBearer()
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
def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        return payload

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )
Base.metadata.create_all(bind=engine)
db = SessionLocal()
admin = (
    db.query(Admin)
    .filter(Admin.username == "admin")
    .first()
)
if not admin:
    admin = Admin(
        username="admin",
        password=hash_password("123456"),
    )

    db.add(admin)
    db.commit()
db.close()


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
def create_product(
    product_data: ProductCreate,
    user=Depends(verify_token),
):
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
    product_data: ProductUpdate,
    user=Depends(verify_token),
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
@app.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    user=Depends(verify_token),
):
    db = SessionLocal()

    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    db.delete(product)
    db.commit()
    db.close()

    return {
        "message": "deleted"
    }
@app.post("/upload")
def upload_image(
    user=Depends(verify_token),
    file: UploadFile = File(...),
):
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "image_url": f"/uploads/{file.filename}"
    }
@app.post("/orders")
def create_order(order_data: OrderCreate):
    db = SessionLocal()

    order = Order(
    customer_name=order_data.customer_name,
    phone=order_data.phone,
    address=order_data.address,
    total_price=order_data.total_price,
    status="pending",
)

    db.add(order)
    db.commit()
    db.refresh(order)

    db.close()

    return {
        "message": "order created",
        "id": order.id,
    }


@app.get("/orders")
def get_orders(
    user=Depends(verify_token),
):
    db = SessionLocal()

    orders = db.query(Order).all()

    result = []

    for order in orders:
        result.append({
    "id": order.id,
    "customer_name": order.customer_name,
    "phone": order.phone,
    "address": order.address,
    "total_price": order.total_price,
    "status": order.status,
})
    

    db.close()

    return result
@app.post("/login")
def login(data: LoginRequest):
    db = SessionLocal()

    admin = (
        db.query(Admin)
        .filter(Admin.username == data.username)
        .first()
    )

    if not admin:
        db.close()
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    if not verify_password(
        data.password,
        admin.password,
    ):
        db.close()
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    token = create_access_token(
        {
            "sub": admin.username
        }
    )

    db.close()

    return {
        "access_token": token,
        "token_type": "bearer",
    }

@app.put("/orders/{order_id}")
def update_order_status(
    order_id: int,
    data: OrderStatusUpdate,
    user=Depends(verify_token),
):
    db = SessionLocal()

    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    order.status = data.status

    db.commit()

    db.refresh(order)

    db.close()

    return {
        "message": "updated"
    }
