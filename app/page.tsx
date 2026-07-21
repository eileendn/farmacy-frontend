"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};
export default function Home() {
const [products, setProducts] = useState<Product[]>([]);
const [search, setSearch] = useState("");

useEffect(() => {
  fetch("http://127.0.0.1:8000/products")
    .then((res) => res.json())
    .then((data) => {
      console.log("API PRODUCTS:", data);
      setProducts(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);



const filteredProducts = products.filter(
  (product: any) =>
    product.name.includes(search)
);
  return (
    <div>
      <section className="bg-green-50">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-10 py-20 md:grid-cols-2">

    <div>
  <h1 className="text-5xl font-bold leading-tight">
    خرید آنلاین مکمل و
    محصولات سلامت
  </h1>

  <p className="mt-6 text-lg text-gray-600">
    انواع ویتامین‌ها، مکمل‌های ورزشی،
    محصولات پوست و مو و بهداشت فردی
    با ارسال سریع.
  </p>

  <div className="mt-8 flex gap-4">
    <button className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700">
      مشاهده محصولات
    </button>

    <button className="rounded-lg border px-6 py-3">
      درباره ما
    </button>
  </div>
</div>

<div>
  <HeroSlider />
</div>

  </div>
</section>


<section className="px-10 py-8">
  <h2 className="mb-6 text-3xl font-bold">
    دسته‌بندی محصولات
  </h2>

  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    <div className="cursor-pointer rounded-xl border p-6 text-center transition hover:bg-green-50 hover:shadow-lg">
      💊
      <p className="mt-2">ویتامین‌ها</p>
    </div>

    <div className="cursor-pointer rounded-xl border p-6 text-center transition hover:bg-green-50 hover:shadow-lg">
      🏋️
      <p className="mt-2">مکمل ورزشی</p>
    </div>

    <div className="cursor-pointer rounded-xl border p-6 text-center transition hover:bg-green-50 hover:shadow-lg">
      ✨
      <p className="mt-2">پوست و مو</p>
    </div>

    <div className="cursor-pointer rounded-xl border p-6 text-center transition hover:bg-green-50 hover:shadow-lg">
      🧴
      <p className="mt-2">بهداشت فردی</p>
    </div>
  </div>
</section>
      <section className="p-10">
        <div className="mb-8 flex items-center justify-between">
  <h2 className="text-3xl font-bold">
    محصولات پرفروش
  </h2>

  <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
    مشاهده همه
  </button>
</div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}