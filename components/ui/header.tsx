import Link from "next/link";
import Logo from "@/public/images/Logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed z-30 w-full">
      <div className="w-full">
        <div className="relative flex items-center justify-between gap-3 bg-white py-8 px-14">
          <div className="flex flex-1 items-center">
            <Image alt="logo" width={175} height={55} src={Logo} />
          </div>

          <ul className="flex items-center text-2xl justify-center gap-x-10" dir="rtl">
            <li>
              <Link href="/">الرئيسية</Link>
            </li>
            <li>
              <Link href="#aboutAs">نبذة عنا</Link>
            </li>
            <li>
              <Link href="#packages">الأسعار</Link>
            </li>
            <li>
              <Link href="#contactUs">تواصل معنا</Link>
            </li>
          </ul>

          <ul className="flex flex-1 items-center justify-end gap-3 text-[16px] text-center">
            <li><Link href="/signin" className="btn-sm shadow-none border border-gray-800 bg-white text-gray-800 hover:bg-gray-50">تسجيل الدخول</Link></li>
            <li><Link href="/signup" className="btn-sm shadow-none bg-gray-800 text-gray-200 hover:bg-gray-900">إنشاء حساب</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
