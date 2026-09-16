"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
} from "lucide-react";

type MenuItem = {
  title: string;
  subcategory: string;
};

type MenuColumn = {
  title: string;
  items: MenuItem[];
};

type Menu = {
  id: string;
  title: string;
  columns: MenuColumn[];
};

const menus: Menu[] = [
  {
    id: "beauty",
    title: "آرایشی و بهداشتی",
    columns: [
      {
        title: "مراقبت پوست",
        items: [
          { title: "ضد آفتاب", subcategory: "sunscreen" },
          { title: "ضد لک", subcategory: "anti_spot" },
          { title: "آبرسان", subcategory: "hydrating" },
          { title: "مرطوب کننده", subcategory: "moisturizer" },
          { title: "شوینده صورت", subcategory: "face_wash" },
          { title: "لایه بردار", subcategory: "exfoliator" },
          { title: "ترمیم کننده پوست", subcategory: "skin_repair" },
        ],
      },
      {
        title: "مراقبت مو",
        items: [
          { title: "شامپو", subcategory: "shampoo" },
          { title: "ضد ریزش مو", subcategory: "anti_hair_loss" },
          { title: "نرم کننده", subcategory: "conditioner" },
          { title: "ماسک مو", subcategory: "hair_mask" },
          { title: "سرم مو", subcategory: "hair_serum" },
          { title: "تقویت کننده مو", subcategory: "hair_strengthener" },
        ],
      },
      {
        title: "بهداشت و سلامت",
        items: [
          { title: "بهداشت بدن", subcategory: "body_hygiene" },
          { title: "دئودورانت", subcategory: "deodorant" },
          { title: "ضد تعریق", subcategory: "antiperspirant" },
          { title: "شوینده بدن", subcategory: "body_wash" },
          { title: "محصولات دست و ناخن", subcategory: "hand_nail_care" },
        ],
      },
      {
        title: "بهداشت دهان و دندان",
        items: [
          { title: "خمیر دندان", subcategory: "toothpaste" },
          { title: "مسواک", subcategory: "toothbrush" },
          { title: "دهان شویه", subcategory: "mouthwash" },
          { title: "نخ دندان", subcategory: "dental_floss" },
          { title: "سفید کننده دندان", subcategory: "teeth_whitening" },
        ],
      },
      {
        title: "آرایشی",
        items: [
          { title: "آرایش صورت", subcategory: "face_makeup" },
          { title: "آرایش چشم", subcategory: "eye_makeup" },
          { title: "آرایش لب", subcategory: "lip_makeup" },
          { title: "پاک کننده آرایش", subcategory: "makeup_remover" },
        ],
      },
    ],
  },

  {
    id: "supplements",
    title: "مکمل غذایی و کمک درمانی",
    columns: [
      {
        title: "ویتامین ها",
        items: [
          { title: "ویتامین D", subcategory: "vitamin_d" },
          { title: "ویتامین C", subcategory: "vitamin_c" },
          { title: "ویتامین E", subcategory: "vitamin_e" },
          { title: "مولتی ویتامین", subcategory: "multivitamin" },
          { title: "ویتامین های گروه B", subcategory: "vitamin_b" },
        ],
      },
      {
        title: "مواد معدنی",
        items: [
          { title: "آهن", subcategory: "iron" },
          { title: "زینک", subcategory: "zinc" },
          { title: "منیزیم", subcategory: "magnesium" },
          { title: "کلسیم", subcategory: "calcium" },
          { title: "سلنیوم", subcategory: "selenium" },
        ],
      },
      {
        title: "کمک درمانی",
        items: [
          { title: "تقویت سیستم ایمنی", subcategory: "immune_support" },
          { title: "سلامت قلب", subcategory: "heart_health" },
          { title: "سلامت گوارش", subcategory: "digestive_health" },
          { title: "استخوان و مفاصل", subcategory: "bone_joint" },
          { title: "تقویت حافظه", subcategory: "memory_support" },
        ],
      },
      {
        title: "مکمل های عمومی",
        items: [
          { title: "امگا 3", subcategory: "omega3" },
          { title: "پروبیوتیک", subcategory: "probiotic" },
          { title: "کوآنزیم Q10", subcategory: "coq10" },
          { title: "مکمل انرژی", subcategory: "energy_supplement" },
          { title: "مکمل سالمندان", subcategory: "senior_supplement" },
        ],
      },
    ],
  },

  {
    id: "sport",
    title: "مکمل ورزشی",
    columns: [
      {
        title: "پروتئین",
        items: [
          { title: "پروتئین وی", subcategory: "whey" },
          { title: "پروتئین ایزوله", subcategory: "isolate" },
          { title: "پروتئین کازئین", subcategory: "casein" },
          { title: "گینر", subcategory: "gainer" },
        ],
      },
      {
        title: "افزایش عملکرد",
        items: [
          { title: "کراتین", subcategory: "creatine" },
          { title: "BCAA", subcategory: "bcaa" },
          { title: "آمینو اسید", subcategory: "amino" },
          { title: "گلوتامین", subcategory: "glutamine" },
          { title: "ال کارنیتین", subcategory: "carnitine" },
        ],
      },
      {
        title: "انرژی و ریکاوری",
        items: [
          { title: "پری ورک اوت", subcategory: "preworkout" },
          { title: "مکمل انرژی", subcategory: "sport_energy" },
          { title: "ریکاوری", subcategory: "recovery" },
          { title: "الکترولیت", subcategory: "electrolyte" },
        ],
      },
    ],
  },

  {
    id: "mother",
    title: "مادر و کودک",
    columns: [
      {
        title: "مادر",
        items: [
          { title: "مکمل بارداری", subcategory: "pregnancy" },
          { title: "مکمل شیردهی", subcategory: "breastfeeding" },
          { title: "مراقبت دوران بارداری", subcategory: "pregnancy_care" },
          { title: "محصولات مادر", subcategory: "mother_products" },
        ],
      },
      {
        title: "کودک",
        items: [
          { title: "ویتامین کودک", subcategory: "child_vitamin" },
          { title: "شربت مکمل", subcategory: "child_syrup" },
          { title: "بهداشت کودک", subcategory: "baby_hygiene" },
          { title: "پوست و موی کودک", subcategory: "child_skin_hair" },
        ],
      },
      {
        title: "نوزاد",
        items: [
          { title: "پوشک", subcategory: "diaper" },
          { title: "شیشه شیر", subcategory: "feeding_bottle" },
          { title: "پستانک", subcategory: "pacifier" },
          { title: "محصولات بهداشتی نوزاد", subcategory: "newborn_hygiene" },
        ],
      },
    ],
  },

  {
    id: "medical",
    title: "تجهیزات پزشکی",
    columns: [
      {
        title: "تجهیزات سنجش",
        items: [
          { title: "فشارسنج", subcategory: "blood_pressure" },
          { title: "دستگاه تست قند", subcategory: "glucose" },
          { title: "تب سنج", subcategory: "thermometer" },
          { title: "پالس اکسیمتر", subcategory: "oximeter" },
        ],
      },
      {
        title: "تجهیزات عمومی",
        items: [
          { title: "ماسک", subcategory: "mask" },
          { title: "دستکش", subcategory: "gloves" },
          { title: "ترازو", subcategory: "scale" },
          { title: "دستگاه بخور", subcategory: "humidifier" },
        ],
      },
      {
        title: "ارتوپدی",
        items: [
          { title: "زانوبند", subcategory: "knee_support" },
          { title: "مچ بند", subcategory: "wrist_support" },
          { title: "کمربند طبی", subcategory: "medical_belt" },
          { title: "گردنبند طبی", subcategory: "cervical_collar" },
        ],
      },
    ],
  },

  {
    id: "pharmacy",
    title: "داروخانه مرکزی",
    columns: [
      {
        title: "محصولات داروخانه",
        items: [
          { title: "ویتامین و مکمل", subcategory: "vitamins_supplements" },
          { title: "سلامت عمومی", subcategory: "general_health" },
          { title: "محصولات بهداشتی", subcategory: "hygiene" },
          { title: "محصولات مراقبتی", subcategory: "personal_care" },
        ],
      },
    ],
  },

  {
    id: "magazine",
    title: "مجله داروخانه",
    columns: [
      {
        title: "مطالب سلامت",
        items: [
          { title: "پوست و مو", subcategory: "skin_hair_articles" },
          { title: "تغذیه", subcategory: "nutrition_articles" },
          { title: "مکمل ها", subcategory: "supplement_articles" },
          { title: "ورزش", subcategory: "sport_articles" },
          { title: "مادر و کودک", subcategory: "mother_child_articles" },
          { title: "سلامت عمومی", subcategory: "general_health_articles" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const { items } = useCart();

  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedMenu = menus.find((menu) => menu.id === activeMenu);

  return (
    <header
      className="relative z-50 bg-white"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <Link
            href="/"
            className="shrink-0 cursor-pointer text-xl font-extrabold text-[#3B5440]"
          >
            داروخانه آنلاین
          </Link>

          <div className="relative hidden flex-1 md:block">
            <input
              type="text"
              placeholder="عبارت مورد نظر را جستجو کنید..."
              className="h-11 w-full rounded-full border bg-gray-50 px-5 pl-12 outline-none transition focus:border-[#3B5440]"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex items-center gap-2">
            <button className="flex h-11 items-center gap-2 rounded-full border px-4 text-sm transition hover:bg-gray-50">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">ورود / ثبت نام</span>
            </button>

            <Link
              href="/cart"
              className="flex h-11 items-center gap-2 rounded-full bg-[#3B5440] px-4 text-sm text-white transition hover:bg-[#304536]"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">سبد خرید</span>
              <span>({mounted ? items.length : 0})</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4">
          {menus.map((menu) => (
            <Link
              key={menu.id}
              href={`/products?category=${menu.id}`}
              onMouseEnter={() => setActiveMenu(menu.id)}
              onClick={() => setActiveMenu(null)}
              className={`flex shrink-0 items-center gap-1 border-b-2 px-4 py-4 text-sm font-semibold transition ${
                activeMenu === menu.id
                  ? "border-[#3B5440] text-[#3B5440]"
                  : "border-transparent text-gray-700 hover:text-[#3B5440]"
              }`}
            >
              {menu.title}
              <ChevronDown className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </nav>

      {selectedMenu && (
        <div
          className="absolute right-0 top-full hidden w-full border-b bg-white shadow-xl md:block"
          onMouseEnter={() => setActiveMenu(selectedMenu.id)}
        >
          <div className="mx-auto max-w-7xl px-8 py-7">
            <div
              className="grid gap-x-10 gap-y-8"
              style={{
                gridTemplateColumns: `repeat(${Math.min(
                  selectedMenu.columns.length,
                  5
                )}, minmax(0, 1fr))`,
              }}
            >
              {selectedMenu.columns.map((column) => (
                <div key={column.title}>
                  <Link
                    href={`/products?category=${selectedMenu.id}`}
                    onClick={() => setActiveMenu(null)}
                    className="mb-4 flex items-center gap-2 border-r-4 border-[#3B5440] pr-2 font-bold text-[#3B5440]"
                  >
                    {column.title}
                    <span>‹</span>
                  </Link>

                  <div className="flex flex-col gap-3">
                    {column.items.map((item) => (
                      <Link
                        key={item.subcategory}
                        href={`/products?category=${selectedMenu.id}&subcategory=${item.subcategory}`}
                        onClick={() => setActiveMenu(null)}
                        className="text-sm text-gray-600 transition hover:translate-x-[-2px] hover:text-[#3B5440]"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}