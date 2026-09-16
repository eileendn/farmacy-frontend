"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { clearCart } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="mx-auto max-w-xl p-6 md:p-10">
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
        اطلاعات سفارش
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-border/50 bg-card p-6 shadow-sm"
      >
        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-border bg-background p-3 outline-none transition focus:border-primary"
        />

        <input
          type="tel"
          placeholder="شماره موبایل"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-2xl border border-border bg-background p-3 outline-none transition focus:border-primary"
        />

        <textarea
          placeholder="آدرس"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="h-32 w-full rounded-2xl border border-border bg-background p-3 outline-none transition focus:border-primary"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          ثبت سفارش
        </button>
      </form>
    </div>
  );
}