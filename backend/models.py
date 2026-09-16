from sqlalchemy import Column, Integer, String, Text
from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    image = Column(String)

    category = Column(String, nullable=True, index=True)
    subcategory = Column(String, nullable=True, index=True)

    brand = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    stock = Column(Integer, nullable=False, default=0)