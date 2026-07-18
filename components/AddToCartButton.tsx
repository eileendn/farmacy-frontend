"use client";

import { useCart } from "@/app/context/CartContext";

type Props = {
  id: number;
  name: string;
  price: number;
};

export default function AddToCartButton({
  id,
  name,
  price,
}: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
  console.log({
    id,
    name,
    price,
  });

  addToCart({
    id,
    name,
    price,
  });
}}
      className="mt-6 rounded bg-green-600 px-6 py-3 text-white"
    >
      افزودن به سبد خرید
    </button>
  );
}