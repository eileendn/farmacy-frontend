"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import {
  Truck,
  CalendarCheck,
  Pill,
  Dumbbell,
  Venus,
  Sun,
  Droplets,
  BookOpen,
} from "lucide-react";

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
<section className="bg-muted">
  <HeroSlider />
</section>

<section className="bg-white px-6 py-10">
  <div className="mx-auto max-w-7xl">

    <h2 className="mb-8 text-right text-3xl font-bold">
      دسته‌بندی محصولات
    </h2>

    <div
      dir="rtl"
      className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-8"
    >

      {/* دارواکسپرس */}
      <div className="group flex cursor-pointer flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F7B818] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <Truck className="h-12 w-12 text-white" strokeWidth={1.7} />
        </div>
        <p className="text-center font-semibold text-[#444]">
          دارواکسپرس
        </p>
      </div>

      {/* پرداخت اقساطی */}
      <div className="group flex cursor-pointer flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#466BB2] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <CalendarCheck className="h-12 w-12 text-white" strokeWidth={1.7} />
        </div>
        <p className="text-center font-semibold text-[#444]">
          پرداخت اقساطی
        </p>
      </div>

      {/* مکمل رژیمی غذایی */}
      <div className="group flex cursor-pointer flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F45124] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <Pill className="h-12 w-12 text-white" strokeWidth={1.7} />
        </div>
        <p className="text-center font-semibold text-[#444]">
          مکمل رژیمی غذایی
        </p>
      </div>

      {/* مکمل بدنسازی */}
      <div className="group flex cursor-pointer flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#27A9E0] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <Dumbbell className="h-12 w-12 text-white" strokeWidth={1.7} />
        </div>
        <p className="text-center font-semibold text-[#444]">
          مکمل بدنسازی
        </p>
      </div>

      {/* محصولات بانوان */}
      <div className="group flex cursor-pointer flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E51058] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <Venus className="h-12 w-12 text-white" strokeWidth={1.7} />
        </div>
        <p className="text-center font-semibold text-[#444]">
          محصولات بانوان
        </p>
      </div>

      {/* ضد آفتاب */}
      <div className="group flex cursor-pointer flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F68B1F] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <Sun className="h-12 w-12 text-white" strokeWidth={1.7} />
        </div>
        <p className="text-center font-semibold text-[#444]">
          ضد آفتاب
        </p>
      </div>

      {/* ضد لک */}
      <div className="group flex cursor-pointer flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EC91BB] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <Droplets className="h-12 w-12 text-white" strokeWidth={1.7} />
        </div>
        <p className="text-center font-semibold text-[#444]">
          ضد لک
        </p>
      </div>

      {/* مجله داروخانه */}
      <div className="group flex cursor-pointer flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#98278F] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <BookOpen className="h-12 w-12 text-white" strokeWidth={1.7} />
        </div>
        <p className="text-center font-semibold text-[#444]">
          مجله داروخانه
        </p>
      </div>

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
