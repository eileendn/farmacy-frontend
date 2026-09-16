"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string | null;
  subcategory?: string | null;
};

function ProductsContent() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (category) {
          params.set("category", category);
        }

        if (subcategory) {
          params.set("subcategory", subcategory);
        }

        const query = params.toString();

        const url = query
          ? `http://127.0.0.1:8000/products?${query}`
          : "http://127.0.0.1:8000/products";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("خطا در دریافت محصولات");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, subcategory]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        در حال بارگذاری محصولات...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          محصولات
        </h1>

        <span className="text-sm text-gray-500">
          {products.length} محصول
        </span>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border bg-white p-12 text-center text-gray-500">
          محصولی در این دسته بندی پیدا نشد.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      )}

    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          در حال بارگذاری محصولات...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}