export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 p-10 md:grid-cols-3">
        <div>
          <h2 className="mb-4 text-xl font-bold">
            داروخانه آنلاین
          </h2>

          <p className="text-gray-300">
            خرید آنلاین مکمل‌ها، ویتامین‌ها و
            محصولات بهداشتی با ارسال سریع.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">
            لینک‌های مفید
          </h2>

          <ul className="space-y-2 text-gray-300">
            <li>خانه</li>
            <li>محصولات</li>
            <li>درباره ما</li>
            <li>تماس با ما</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">
            تماس با ما
          </h2>

          <ul className="space-y-2 text-gray-300">
            <li>📞 09902151693</li>
            <li>📧 info@pharmacy.com</li>
            <li>📍Miyaneh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-400">
        © 2026 Pharmacy Store
      </div>
    </footer>
  );
}