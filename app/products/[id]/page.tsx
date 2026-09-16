import AddToCartButton from "@/components/AddToCartButton";

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
  is_available: boolean;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product | null = null;
  let loadError = false;

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/products/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return (
        <main className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h1 className="text-2xl font-bold">
            محصول پیدا نشد
          </h1>
        </main>
      );
    }

    if (!response.ok) {
      throw new Error("Failed to load product");
    }

    product = await response.json();
  } catch (error) {
    console.error(
      "Product detail fetch error:",
      error
    );

    loadError = true;
  }

  if (loadError || !product) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">
          خطا در دریافت اطلاعات محصول
        </h1>

        <p className="mt-3 text-gray-500">
          مطمئن شو FastAPI روی پورت 8000 در حال اجراست.
        </p>
      </main>
    );
  }

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : product.image?.startsWith("/uploads/")
    ? `http://127.0.0.1:8000${product.image}`
    : product.image || "/hero.jpg";

  const stock = product.stock ?? 0;
  const isAvailable = stock > 0;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

        <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-4">
          <img
            src={imageUrl}
            alt={product.name}
            className="max-h-[520px] w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">

          {product.brand && (
            <p className="mb-2 text-sm font-semibold text-gray-500">
              برند {product.brand}
            </p>
          )}

          <h1 className="text-3xl font-bold leading-relaxed">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-bold text-[#3B5440]">
            {product.price.toLocaleString()} تومان
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span
              className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                isAvailable
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {isAvailable ? "موجود" : "ناموجود"}
            </span>

            {isAvailable && (
              <span className="text-sm text-gray-500">
                {stock} عدد در انبار
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {product.category && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                {product.category}
              </span>
            )}

            {product.subcategory && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-[#3B5440]">
                {product.subcategory}
              </span>
            )}
          </div>

          <div className="mt-7 border-t pt-6">
            <h2 className="mb-3 text-lg font-bold">
              توضیحات محصول
            </h2>

            <p className="whitespace-pre-line leading-8 text-gray-600">
              {product.description ||
                "برای این محصول هنوز توضیحاتی ثبت نشده است."}
            </p>
          </div>

          <div className="mt-8">
            {isAvailable ? (
              <AddToCartButton
                id={product.id}
                name={product.name}
                price={product.price}
              />
            ) : (
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-xl bg-gray-300 px-6 py-3 font-semibold text-gray-600"
              >
                ناموجود
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
