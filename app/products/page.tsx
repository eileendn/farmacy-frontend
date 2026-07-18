"use client";

import { useState } from "react";

import Image from "next/image";
import { products } from "@/app/data/products";
import AddToCartButton from "@/components/AddToCartButton";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return <h1>محصول پیدا نشد</h1>;
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-10">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl text-green-600">
            {product.price.toLocaleString()} تومان
          </p>

          <p className="mt-6">
            توضیحات محصول در این قسمت قرار می‌گیرد.
          </p>
          <AddToCartButton
            id={product.id}
            name={product.name}
            price={product.price}
          />
        </div>
      </div>
    </div>
  );
}