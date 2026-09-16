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
      <div className="w-full max-w-xs rounded-3xl border border-border/50 bg-card p-4 shadow-md shadow-black/5 cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Image
          src={imageUrl}
          alt="محصول"
          width={300}
          height={200}
          className="mb-4 h-40 w-full rounded-2xl object-cover"
        />

        <h3 className="text-base font-extrabold tracking-tight">
          {name}
        </h3>

        <p className="mt-2 text-sm text-secondary-foreground font-medium">
          {price.toLocaleString()} تومان
        </p>

        <button className="mt-4 w-full rounded-full bg-primary py-2 text-primary-foreground text-sm font-semibold transition hover:bg-primary/90">
          خرید
        </button>
      </div>
    </Link>
  );
}