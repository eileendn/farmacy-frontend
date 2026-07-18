"use client";

import { useState } from "react";
import { products } from "@/app/data/products";

export default function AdminPage() {
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [items, setItems] = useState(products);

const addProduct = () => {
  if (!name || !price) return;

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
    image: "/products/vitaminD.jpg",
  };

  setItems((prev) => [...prev, newProduct]);

  setName("");
  setPrice("");
};
const deleteProduct = (id: number) => {
  setItems((prev) =>
    prev.filter((product) => product.id !== id)
  );
};
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
          </div>
        ))}
      </div>
    </div>
  );
}