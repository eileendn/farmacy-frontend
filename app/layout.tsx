import { CartProvider } from "./context/CartContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const vazirmatn = localFont({
  src: "../node_modules/vazirmatn/fonts/variable/Vazirmatn[wght].ttf",
  variable: "--font-vazirmatn",
  weight: "100 900", // چون فونت متغیره، یه بازه از وزن‌ها رو پشتیبانی می‌کنه
  display: "swap",
});

export const metadata: Metadata = {
  title: "داروخانه آنلاین",
  description: "فروشگاه اینترنتی دارو و محصولات سلامت",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}