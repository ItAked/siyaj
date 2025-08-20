/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-sky-950 text-neutral-content p-10 dark:bg-gray-950 justify-between">
        <div className="grid gap-y-10">
          <img src="/images/logo/logo-name.png" alt="logo" className="w-56" loading="lazy" />
          <div className="flex items-center justify-center gap-x-3.5">
            <a className="link" href="#"><img src="/images/Store=Google Play, Type=Light, Language=Dutch@3x.png" className="w-24" alt="" /></a>
            <a className="link" href="#"><img src="/images/Store=App Store, Type=Light, Language=English@3x.png" className="w-24" alt="" /></a>
          </div>
        </div>
        <img src="/images/logo/vaadin_scale.png" className="w-32" alt="" />
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
      <p className="text-center bg-[#0B233B] py-3 text-white dark:bg-gray-950 text-sm">جميع الحقوق محفوظة</p>
    </>
  );
}