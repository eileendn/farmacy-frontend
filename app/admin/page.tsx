"use client";
import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<Product[]>([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);


  const addProduct = async () => {
    if (!name || !price) return;

    const res = await fetch(
      "http://127.0.0.1:8000/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          image: "/hero.jpg",
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    alert("محصول اضافه شد");
    const updatedProducts = await fetch(
    "http://127.0.0.1:8000/products"
    );

const productsData = await updatedProducts.json();

setItems(productsData);
    setName("");
    setPrice("");
  };

  const deleteProduct = async (id: number) => {
  await fetch(
    `http://127.0.0.1:8000/products/${id}`,
    {
      method: "DELETE",
    }
  );

  setItems((prev) =>
    prev.filter((product) => product.id !== id)
  );
};

const editProduct = async (id: number) => {
  await fetch(
    `http://127.0.0.1:8000/products/${id}`,
    {
      method: "PUT",
    }
  );

  alert("محصول ویرایش شد");
};
console.log(items);
  return (
    <div className="p-10">
      <h1 className="mb-8 text-3xl font-bold">
        پنل مدیریت
      </h1>

      <div className="mb-8 space-y-3">
        <input
          type="text"
          placeholder="نام محصول"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border p-3"
        />

        <input
          type="number"
          placeholder="قیمت"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded border p-3"
        />

        <button
          onClick={addProduct}
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          افزودن محصول
        </button>
      </div>

      <div className="space-y-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <h2 className="font-bold">
                {product.name}
              </h2>

              <p className="text-green-600">
                {product.price.toLocaleString()} تومان
              </p>
            </div>

            <button
              onClick={() => deleteProduct(product.id)}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              حذف
            
            </button>
            <button
  onClick={() => editProduct(product.id)}
  className="rounded bg-blue-500 px-4 py-2 text-white"
>
  ویرایش
</button>
          </div>
          
        ))}
      </div>
    </div>
  );
}