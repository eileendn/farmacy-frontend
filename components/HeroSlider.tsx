"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: "ltr",
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative w-full" dir="ltr">
      <div
        ref={emblaRef}
        className="w-full overflow-hidden shadow-xl"
      >
        <div className="flex touch-pan-y">
          
          <div className="min-w-0 flex-[0_0_100%]">
            <img
              src="/hero1.jpg"
              alt="slide 1"
              className="block h-[220px] w-full object-cover sm:h-[280px] md:h-[340px] lg:h-[360px]"
            />
          </div>

          <div className="min-w-0 flex-[0_0_100%]">
            <img
              src="/hero2.jpg"
              alt="slide 2"
              className="block h-[220px] w-full object-cover sm:h-[280px] md:h-[340px] lg:h-[360px]"
            />
          </div>

          <div className="min-w-0 flex-[0_0_100%]">
            <img
              src="/hero3.jpg"
              alt="slide 3"
              className="block h-[220px] w-full object-cover sm:h-[280px] md:h-[340px] lg:h-[360px]"
            />
          </div>

        </div>
      </div>

      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="اسلاید قبلی"
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-lg transition hover:bg-accent"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="اسلاید بعدی"
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-lg transition hover:bg-accent"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    </div>
  );
}