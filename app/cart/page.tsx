"use client";
"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";


export default function CartPage() {
  const { items, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  console.log("CART ITEMS:", JSON.stringify(items, null, 2));
  if (!mounted) {
  return null;
}
  const totalPrice = items.reduce(
  (sum, item) => sum + item.price,
  0
);

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">
        سبد خرید
      </h1>
<Link href="/checkout">
  <button className="mt-6 rounded bg-green-600 px-6 py-3 text-white">
    ادامه فرایند خرید
  </button>
</Link>
      {items.length === 0 ? (
        <p>سبد خرید خالی است.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded border p-4"
            >
              <div>
                <p>{item.name}</p>
                 <p className="text-green-600">
                 {item.price ? item.price.toLocaleString() : "قیمت ندارد"}
               </p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="rounded bg-red-500 px-3 py-1 text-white"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
  <div className="mt-8 rounded-lg border p-4">
    <h2 className="text-xl font-bold">
      جمع کل:
    </h2>
      <button className="mt-6 rounded bg-green-600 px-6 py-3 text-white">
         ادامه فرایند خرید
      </button>
    <p className="mt-2 text-2xl text-green-600">
      {totalPrice.toLocaleString()} تومان
    </p>
  </div>
)}
    </div>
  );
}