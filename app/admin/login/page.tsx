"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string | null;
  subcategory?: string | null;
  brand?: string | null;
  description?: string | null;
  stock: number;
  is_available?: boolean;
};

type SubcategoryMap = Record<string, string>;

type CategoryConfig = {
  title: string;
  subcategories: SubcategoryMap;
};

const categories: Record<string, CategoryConfig> = {
  beauty: {
    title: "آرایشی و بهداشتی",
    subcategories: {
      sunscreen: "ضد آفتاب",
      anti_spot: "ضد لک",
      hydrating: "آبرسان",
      moisturizer: "مرطوب کننده",
      face_wash: "شوینده صورت",
      exfoliator: "لایه بردار",
      skin_repair: "ترمیم کننده پوست",
      shampoo: "شامپو",
      anti_hair_loss: "ضد ریزش مو",
      conditioner: "نرم کننده",
      hair_mask: "ماسک مو",
      hair_serum: "سرم مو",
      hair_strengthener: "تقویت کننده مو",
      body_hygiene: "بهداشت بدن",
      deodorant: "دئودورانت",
      antiperspirant: "ضد تعریق",
      body_wash: "شوینده بدن",
      hand_nail_care: "محصولات دست و ناخن",
      toothpaste: "خمیر دندان",
      toothbrush: "مسواک",
      mouthwash: "دهان شویه",
      dental_floss: "نخ دندان",
      teeth_whitening: "سفید کننده دندان",
      face_makeup: "آرایش صورت",
      eye_makeup: "آرایش چشم",
      lip_makeup: "آرایش لب",
      makeup_remover: "پاک کننده آرایش",
    },
  },

  supplements: {
    title: "مکمل غذایی و کمک درمانی",
    subcategories: {
      vitamin_d: "ویتامین D",
      vitamin_c: "ویتامین C",
      vitamin_e: "ویتامین E",
      multivitamin: "مولتی ویتامین",
      vitamin_b: "ویتامین های گروه B",
      iron: "آهن",
      zinc: "زینک",
      magnesium: "منیزیم",
      calcium: "کلسیم",
      selenium: "سلنیوم",
      immune_support: "تقویت سیستم ایمنی",
      heart_health: "سلامت قلب",
      digestive_health: "سلامت گوارش",
      bone_joint: "استخوان و مفاصل",
      memory_support: "تقویت حافظه",
      omega3: "امگا 3",
      probiotic: "پروبیوتیک",
      coq10: "کوآنزیم Q10",
      energy_supplement: "مکمل انرژی",
      senior_supplement: "مکمل سالمندان",
    },
  },

  sport: {
    title: "مکمل ورزشی",
    subcategories: {
      whey: "پروتئین وی",
      isolate: "پروتئین ایزوله",
      casein: "پروتئین کازئین",
      gainer: "گینر",
      creatine: "کراتین",
      bcaa: "BCAA",
      amino: "آمینو اسید",
      glutamine: "گلوتامین",
      carnitine: "ال کارنیتین",
      preworkout: "پری ورک اوت",
      sport_energy: "مکمل انرژی",
      recovery: "ریکاوری",
      electrolyte: "الکترولیت",
    },
  },

  mother: {
    title: "مادر و کودک",
    subcategories: {
      pregnancy: "مکمل بارداری",
      breastfeeding: "مکمل شیردهی",
      pregnancy_care: "مراقبت دوران بارداری",
      mother_products: "محصولات مادر",
      child_vitamin: "ویتامین کودک",
      child_syrup: "شربت مکمل",
      baby_hygiene: "بهداشت کودک",
      child_skin_hair: "پوست و موی کودک",
      diaper: "پوشک",
      feeding_bottle: "شیشه شیر",
      pacifier: "پستانک",
      newborn_hygiene: "محصولات بهداشتی نوزاد",
    },
  },

  medical: {
    title: "تجهیزات پزشکی",
    subcategories: {
      blood_pressure: "فشارسنج",
      glucose: "دستگاه تست قند",
      thermometer: "تب سنج",
      oximeter: "پالس اکسیمتر",
      mask: "ماسک",
      gloves: "دستکش",
      scale: "ترازو",
      humidifier: "دستگاه بخور",
      knee_support: "زانوبند",
      wrist_support: "مچ بند",
      medical_belt: "کمربند طبی",
      cervical_collar: "گردنبند طبی",
    },
  },

  pharmacy: {
    title: "داروخانه مرکزی",
    subcategories: {
      vitamins_supplements: "ویتامین و مکمل",
      general_health: "سلامت عمومی",
      hygiene: "محصولات بهداشتی",
      personal_care: "محصولات مراقبتی",
    },
  },

  magazine: {
    title: "مجله داروخانه",
    subcategories: {
      skin_hair_articles: "پوست و مو",
      nutrition_articles: "تغذیه",
      supplement_articles: "مکمل ها",
      sport_articles: "ورزش",
      mother_child_articles: "مادر و کودک",
      general_health_articles: "سلامت عمومی",
    },
  },
};

export default function AdminPage() {
  const router = useRouter();

  const [items, setItems] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("0");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSubcategory, setEditSubcategory] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStock, setEditStock] = useState("0");

  const loadProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/products");

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();
      setItems(data || []);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");

    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }

    loadProducts();
  }, [router]);

  const addProduct = async () => {
    if (!name || !price || !category || !subcategory) {
      alert("نام، قیمت، دسته بندی و زیردسته را وارد کنید");
      return;
    }

    if (Number(stock) < 0) {
      alert("موجودی نمی تواند منفی باشد");
      return;
    }

    try {
      let imageUrl = "/hero.jpg";

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await fetch(
          "http://127.0.0.1:8000/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.image_url;
      }

      const response = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          image: imageUrl,
          category,
          subcategory,
          brand: brand || null,
          description: description || null,
          stock: Number(stock) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Product creation failed");
      }

      await loadProducts();

      setName("");
      setPrice("");
      setCategory("");
      setSubcategory("");
      setBrand("");
      setDescription("");
      setStock("0");
      setSelectedFile(null);

      alert("محصول با موفقیت اضافه شد");
    } catch (error) {
      console.error(error);
      alert("خطا در افزودن محصول");
    }
  };

  const deleteProduct = async (id: number) => {
    const confirmed = confirm("آیا از حذف این محصول مطمئن هستید؟");

    if (!confirmed) return;

    const response = await fetch(`http://127.0.0.1:8000/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("خطا در حذف محصول");
      return;
    }

    setItems((prev) => prev.filter((product) => product.id !== id));
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
    setEditCategory(product.category || "");
    setEditSubcategory(product.subcategory || "");
    setEditBrand(product.brand || "");
    setEditDescription(product.description || "");
    setEditStock((product.stock ?? 0).toString());
  };

  const saveEdit = async () => {
    if (!editingId) return;

    if (!editName || !editPrice || !editCategory || !editSubcategory) {
      alert("نام، قیمت، دسته بندی و زیردسته را وارد کنید");
      return;
    }

    if (Number(editStock) < 0) {
      alert("موجودی نمی تواند منفی باشد");
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/products/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          price: Number(editPrice),
          category: editCategory,
          subcategory: editSubcategory,
          brand: editBrand || null,
          description: editDescription || null,
          stock: Number(editStock) || 0,
        }),
      }
    );

    if (!response.ok) {
      alert("خطا در ویرایش محصول");
      return;
    }

    await loadProducts();
    setEditingId(null);

    alert("محصول ویرایش شد");
  };

  const logout = () => {
    localStorage.removeItem("admin_logged_in");
    router.push("/admin/login");
  };

  const getCategoryTitle = (categoryValue?: string | null) => {
    if (!categoryValue) return "بدون دسته بندی";
    return categories[categoryValue]?.title || categoryValue;
  };

  const getSubcategoryTitle = (
    categoryValue?: string | null,
    subcategoryValue?: string | null
  ) => {
    if (!categoryValue || !subcategoryValue) {
      return "بدون زیردسته";
    }

    return (
      categories[categoryValue]?.subcategories[subcategoryValue] ||
      subcategoryValue
    );
  };

  const categoryEntries = Object.entries(categories);

  const subcategoryEntries = category
    ? Object.entries(categories[category]?.subcategories || {})
    : [];

  const editSubcategoryEntries = editCategory
    ? Object.entries(categories[editCategory]?.subcategories || {})
    : [];

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold">پنل مدیریت</h1>

        <button
          onClick={logout}
          className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
        >
          خروج
        </button>
      </div>

      <div className="mb-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">افزودن محصول جدید</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="نام محصول"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#3B5440]"
          />

          <input
            type="number"
            placeholder="قیمت"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#3B5440]"
          />

          <input
            type="text"
            placeholder="برند"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#3B5440]"
          />

          <input
            type="number"
            min="0"
            placeholder="موجودی"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#3B5440]"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
            className="w-full rounded-xl border bg-white p-3 outline-none focus:border-[#3B5440]"
          >
            <option value="">انتخاب دسته بندی</option>

            {categoryEntries.map(([key, value]) => (
              <option key={key} value={key}>
                {value.title}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            disabled={!category}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full rounded-xl border bg-white p-3 outline-none disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-[#3B5440]"
          >
            <option value="">انتخاب زیردسته</option>

            {subcategoryEntries.map(([key, title]) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="توضیحات محصول"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="mt-4 w-full resize-y rounded-xl border p-3 outline-none focus:border-[#3B5440]"
        />

        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="mt-4 text-sm">
          وضعیت:{" "}
          <span
            className={
              Number(stock) > 0
                ? "font-bold text-green-600"
                : "font-bold text-red-500"
            }
          >
            {Number(stock) > 0 ? "موجود" : "ناموجود"}
          </span>
        </div>

        <button
          onClick={addProduct}
          className="mt-5 rounded-xl bg-[#3B5440] px-6 py-3 font-semibold text-white transition hover:bg-[#304536]"
        >
          افزودن محصول
        </button>
      </div>

      {editingId !== null && (
        <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-5 text-xl font-bold">ویرایش محصول</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="نام محصول"
              className="rounded-xl border bg-white p-3"
            />

            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              placeholder="قیمت"
              className="rounded-xl border bg-white p-3"
            />

            <input
              type="text"
              value={editBrand}
              onChange={(e) => setEditBrand(e.target.value)}
              placeholder="برند"
              className="rounded-xl border bg-white p-3"
            />

            <input
              type="number"
              min="0"
              value={editStock}
              onChange={(e) => setEditStock(e.target.value)}
              placeholder="موجودی"
              className="rounded-xl border bg-white p-3"
            />

            <select
              value={editCategory}
              onChange={(e) => {
                setEditCategory(e.target.value);
                setEditSubcategory("");
              }}
              className="rounded-xl border bg-white p-3"
            >
              <option value="">انتخاب دسته بندی</option>

              {categoryEntries.map(([key, value]) => (
                <option key={key} value={key}>
                  {value.title}
                </option>
              ))}
            </select>

            <select
              value={editSubcategory}
              disabled={!editCategory}
              onChange={(e) => setEditSubcategory(e.target.value)}
              className="rounded-xl border bg-white p-3 disabled:bg-gray-100"
            >
              <option value="">انتخاب زیردسته</option>

              {editSubcategoryEntries.map(([key, title]) => (
                <option key={key} value={key}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="توضیحات محصول"
            rows={5}
            className="mt-4 w-full resize-y rounded-xl border bg-white p-3"
          />

          <div className="mt-4 text-sm">
            وضعیت:{" "}
            <span
              className={
                Number(editStock) > 0
                  ? "font-bold text-green-600"
                  : "font-bold text-red-500"
              }
            >
              {Number(editStock) > 0 ? "موجود" : "ناموجود"}
            </span>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={saveEdit}
              className="rounded-lg bg-[#3B5440] px-5 py-2 text-white"
            >
              ذخیره تغییرات
            </button>

            <button
              onClick={() => setEditingId(null)}
              className="rounded-lg bg-gray-500 px-5 py-2 text-white"
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-5 text-2xl font-bold">محصولات</h2>

        <div className="space-y-4">
          {items.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between gap-5 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center"
            >
              <div>
                <h2 className="text-lg font-bold">{product.name}</h2>

                <p className="mt-1 font-semibold text-[#3B5440]">
                  {product.price.toLocaleString()} تومان
                </p>

                {product.brand && (
                  <p className="mt-1 text-sm text-gray-600">
                    برند: {product.brand}
                  </p>
                )}

                <p className="mt-1 text-sm text-gray-600">
                  موجودی: {product.stock ?? 0}
                </p>

                <p
                  className={`mt-1 text-sm font-bold ${
                    (product.stock ?? 0) > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {(product.stock ?? 0) > 0 ? "موجود" : "ناموجود"}
                </p>

                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {getCategoryTitle(product.category)}
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-[#3B5440]">
                    {getSubcategoryTitle(
                      product.category,
                      product.subcategory
                    )}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(product)}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  ویرایش
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
