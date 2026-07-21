"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative w-full">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">

          <div className="relative min-w-full">
            <img
              src="/hero.jpg"
              alt=""
              className="h-[600px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30">
              <div className="mx-auto flex h-full max-w-7xl items-center px-10">
                <div className="max-w-xl text-white">
                  <h1 className="text-6xl font-bold">
                    خرید آنلاین مکمل و محصولات سلامت
                  </h1>

                  <p className="mt-6 text-xl">
                    انواع ویتامین‌ها و مکمل‌های ورزشی
                  </p>

                  <button className="mt-8 rounded-xl bg-green-600 px-8 py-4">
                    مشاهده محصولات
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* اسلاید دوم */}
          <div className="min-w-full">
            <img
              src="/omega3.jpg"
              alt=""
              className="h-[600px] w-full object-cover"
            />
          </div>

          {/* اسلاید سوم */}
          <div className="min-w-full">
            <img
              src="/zinc.jpg"
              alt=""
              className="h-[600px] w-full object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
}