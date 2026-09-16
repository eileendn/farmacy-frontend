"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";
import { Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mx-auto max-w-3xl p-6 md:p-10">
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
        سبد خرید
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-muted py-16 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">سبد خرید شما خالی است.</p>
          <Link href="/products">
            <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
              مشاهده محصولات
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-3xl border border-border/50 bg-card p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-secondary-foreground font-medium">
                    {item.price ? item.price.toLocaleString() : "قیمت ندارد"} تومان
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  aria-label="حذف از سبد خرید"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive transition hover:bg-destructive/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-muted p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-muted-foreground">جمع کل</h2>
              <p className="text-xl font-extrabold text-secondary-foreground">
                {totalPrice.toLocaleString()} تومان
              </p>
            </div>

            <Link href="/checkout">
              <button className="mt-5 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
                ادامه فرایند خرید
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}