"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { CheckCircle2 } from "lucide-react";

type Props = {
  id: number;
  name: string;
  price: number;
};

export default function AddToCartButton({ id, name, price }: Props) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    addToCart({ id, name, price });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="mt-6 w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        افزودن به سبد خرید
      </button>

      {showToast && (
        <div className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4" />
          {name} به سبد خرید اضافه شد
        </div>
      )}
    </>
  );
}