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
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl shadow-xl"
      >
        <div className="flex">
          <div className="min-w-full">
            <img
              src="/hero.jpg"
              alt="slide1"
              className="h-[400px] w-full object-cover"
            />
          </div>

          <div className="min-w-full">
            <img
              src="/omega3.jpg"
              alt="slide2"
              className="h-[400px] w-full object-cover"
            />
          </div>

          <div className="min-w-full">
            <img
              src="/zinc.jpg"
              alt="slide3"
              className="h-[400px] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100"
      >
        ◀
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100"
      >
        ▶
      </button>
    </div>
  );
}