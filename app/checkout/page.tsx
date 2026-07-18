"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { clearCart } = useCart();

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name) {
      alert("نام را وارد کنید");
      return;
    }

    if (!phone) {
      alert("شماره موبایل را وارد کنید");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      alert("شماره موبایل معتبر نیست");
      return;
    }

    if (!address) {
      alert("آدرس را وارد کنید");
      return;
    }

    clearCart();

    alert("سفارش با موفقیت ثبت شد");
  };

  return (
    <div className="mx-auto max-w-2xl p-10">
      <h1 className="mb-8 text-3xl font-bold">
        اطلاعات سفارش
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <input
          type="tel"
          placeholder="شماره موبایل"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <textarea
          placeholder="آدرس"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="h-32 w-full rounded border p-3"
        />

        <button
          type="submit"
          className="rounded bg-green-600 px-6 py-3 text-white"
        >
          ثبت سفارش
        </button>
      </form>
    </div>
  );
}