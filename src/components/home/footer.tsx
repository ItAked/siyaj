/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-sky-950 grid grid-cols-2 place-items-center py-16 max-sm:grid-cols-2 max-sm:gap-y-10">
      <img src="/images/logo-white.png" alt="logo" className="w-40 h-40" loading="lazy" />
      <div className="space-y-2">
        <p className="text-sm font-normal text-white">تابعنا على وسائل التواصل الإجتماعي</p>
        <ul className="flex gap-1 text-white justify-center">
          <li>
            <Link className="flex items-center justify-center transition" href="#0" aria-label="Twitter">
              <img src="/images/icons/twitter_icon.png" alt="twitter" className="w-6 h-6" loading="lazy" />
            </Link>
          </li>
          <li>
            <Link className="flex items-center justify-center transition" href="#0" aria-label="Whatsapp">
              <img src="/images/icons/whatsapp_icon.png" alt="whatsapp" className="w-6 h-6" loading="lazy" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}