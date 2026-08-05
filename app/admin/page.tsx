"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  total_price: number;
  status: string;
};

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    router.push("/admin/login");
    return;
  }

  fetch("http://127.0.0.1:8000/products")
    .then((res) => res.json())
    .then((data) => {
      setItems(data || []);
    });

  fetch("http://127.0.0.1:8000/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("ORDERS:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    });
}, [router]);
  const addProduct = async () => {
  if (!name || !price) return;

  const token = localStorage.getItem("access_token");

  let imageUrl = "/hero.jpg";

  if (selectedFile) {
    const formData = new FormData();

    formData.append("file", selectedFile);

    const uploadResponse = await fetch(
      "http://127.0.0.1:8000/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const uploadData = await uploadResponse.json();

    imageUrl = uploadData.image_url;
  }

  await fetch(
    "http://127.0.0.1:8000/products",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        image: imageUrl,
      }),
    }
  );

  const updatedProducts = await fetch(
    "http://127.0.0.1:8000/products",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const productsData = await updatedProducts.json();

  setItems(productsData);

  setName("");
  setPrice("");
  setSelectedFile(null);
};
  const deleteProduct = async (id: number) => {
  const token = localStorage.getItem("access_token");

  await fetch(
    `http://127.0.0.1:8000/products/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setItems((prev) =>
    prev.filter(
      (product) => product.id !== id
    )
  );
};

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
  };

  const saveEdit = async () => {
  if (!editingId) return;

  const token = localStorage.getItem("access_token");

  await fetch(
    `http://127.0.0.1:8000/products/${editingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: editName,
        price: Number(editPrice),
      }),
    }
  );
    const updatedProducts = await fetch(
      "http://127.0.0.1:8000/products"
    );

    const productsData =
      await updatedProducts.json();

    setItems(productsData);

    setEditingId(null);
  };
const updateOrderStatus = async (
  orderId: number,
  status: string
) => {
  const token = localStorage.getItem("access_token");

  await fetch(
    `http://127.0.0.1:8000/orders/${orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  setOrders((prev) =>
    prev.map((order) =>
      order.id === orderId
        ? { ...order, status }
        : order
    )
  );
};
  const logout = () => {
  localStorage.removeItem("access_token");

  router.push("/admin/login");
};
  return (
    <div className="p-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          پنل مدیریت
        </h1>

        <button
          onClick={logout}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          خروج
        </button>
      </div>

      <div className="mb-8 space-y-3">
        <input
          type="text"
          placeholder="نام محصول"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <input
          type="number"
          placeholder="قیمت"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <input
          type="file"
          onChange={(e) =>
            setSelectedFile(
              e.target.files?.[0] || null
            )
          }
          className="w-full rounded border p-3"
        />

        <button
          onClick={addProduct}
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          افزودن محصول
        </button>
      </div>

      {editingId && (
        <div className="mb-8 rounded border p-4">
          <h2 className="mb-4 text-xl font-bold">
            ویرایش محصول
          </h2>

          <input
            type="text"
            value={editName}
            onChange={(e) =>
              setEditName(e.target.value)
            }
            className="mb-3 w-full rounded border p-3"
          />

          <input
            type="number"
            value={editPrice}
            onChange={(e) =>
              setEditPrice(e.target.value)
            }
            className="mb-3 w-full rounded border p-3"
          />

          <div className="flex gap-3">
            <button
              onClick={saveEdit}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              ذخیره
            </button>

            <button
              onClick={() =>
                setEditingId(null)
              }
              className="rounded bg-gray-500 px-4 py-2 text-white"
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <h2 className="font-bold">
                {product.name}
              </h2>

              <p className="text-green-600">
                {product.price.toLocaleString()} تومان
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                حذف
              </button>

              <button
                onClick={() =>
                  startEdit(product)
                }
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                ویرایش
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
  <h2 className="mb-4 text-2xl font-bold">
    سفارش‌ها
  </h2>

  <div className="space-y-4">
    {orders.map((order) => (
      <div
        key={order.id}
        className="rounded border p-4"
      >
        <p>
          <strong>نام:</strong>{" "}
          {order.customer_name}
        </p>

        <p>
          <strong>موبایل:</strong>{" "}
          {order.phone}
        </p>

        <p>
          <strong>آدرس:</strong>{" "}
          {order.address}
        </p>

        <p>
          <strong>مبلغ:</strong>{" "}
          {order.total_price.toLocaleString()}
          {" "}تومان
        </p>
        <p className="mt-2">
  <strong>وضعیت:</strong>
</p>

<select
  value={order.status}
  onChange={(e) =>
    updateOrderStatus(
      order.id,
      e.target.value
    )
  }
  className="mt-2 rounded border p-2"
>
  <option value="pending">
    در انتظار
  </option>

  <option value="preparing">
    در حال آماده‌سازی
  </option>

  <option value="sent">
    ارسال شد
  </option>

  <option value="delivered">
    تحویل شد
  </option>
</select>
        <p>
         <strong>وضعیت:</strong>{" "}
         {order.status}
        </p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}