"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { items } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex flex-col gap-4 border-b px-4 py-4 md:flex-row md:items-center md:justify-between">
      <Link href="/">
        <h1 className="text-2xl font-bold text-green-600 cursor-pointer">
           داروخانه آنلاین
        </h1>
      </Link>

      <input
        type="text"
        placeholder="جستجوی دارو و مکمل..."
        className="w-full rounded-lg border px-4 py-2 md:w-96"/>

      <div className="flex w-full justify-center gap-3 md:w-auto">
        <button className="rounded-lg border px-4 py-2">
          ورود
        </button>

        <Link href="/cart">
          <button className="rounded-lg bg-green-600 px-4 py-2 text-white">
            سبد خرید ({mounted ? items.length : 0})
          </button>
        </Link>
      </div>
    </nav>
  );
}