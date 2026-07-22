import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const imageUrl = image.startsWith("/uploads")
  ? `http://127.0.0.1:8000${image}`
  : image;
  return (
    <Link href={`/products/${id}`}>
      <div className="w-full max-w-xs rounded-lg border p-4 shadow-sm cursor-pointer transition duration-300 hover:scale-105 hover:shadow-xl">
        <Image
        src={imageUrl}
        alt="محصول"
        width={300}
        height={200}
        className="mb-4 h-40 w-full rounded-xl object-cover"
        />

        <h3 className="text-lg font-semibold">
          {name}
        </h3>

        <p className="mt-2 text-green-600">
          {price.toLocaleString()} تومان
        </p>

        <button className="mt-4 w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700">
          خرید
        </button>
      </div>
    </Link>
  );
}