/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function NotFound() {
  return (
    <div className="mx-auto text-center">
      <img src="/images/error/404-vector.png" alt="404" className="w-[43%] float-left" />
      <div className="grid pt-96">
        <h1 className="text-9xl font-extrabold bg-gradient-to-r from-blue-300 to-sky-950 inline-block text-transparent bg-clip-text">404</h1>
        <h1 className="text-4xl font-medium">الصفحة غير موجودة</h1>
        <p className="text-2xl text-gray-400 font-light text-balance">عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة الرجاء العودة إلى الصفحة الرئيسية</p>
      </div>
    </div>
  );
}
