"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = () => {
    if (
      username === "admin" &&
      password === "123456"
    ) {
      localStorage.setItem(
        "admin_logged_in",
        "true"
      );

      router.push("/admin");
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="mx-auto max-w-md p-10">
      <h1 className="mb-8 text-3xl font-bold">
        ورود ادمین
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <button
          onClick={login}
          className="w-full rounded bg-green-600 py-3 text-white"
        >
          ورود
        </button>
      </div>
    </div>
  );
}