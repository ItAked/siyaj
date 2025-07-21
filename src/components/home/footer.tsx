import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-sky-950 grid grid-cols-2 place-items-center py-16 max-sm:grid-cols-2 max-sm:gap-y-10">
      <Image src="/images/logo-white.png" alt="logo" width={160} height={160} loading="lazy" />

      <div className="space-y-2">
        <p className="text-sm font-normal text-white">تابعنا على وسائل التواصل الإجتماعي</p>
        <ul className="flex gap-1 text-white justify-center">
          <li>
            <Link className="flex items-center justify-center transition" href="#0" aria-label="Twitter">
              <Image src="/images/icons/twitter_icon.png" width={24} height={24} alt="twitter" />
            </Link>
          </li>
          <li>
            <Link className="flex items-center justify-center transition" href="#0" aria-label="Whatsapp">
              <Image src="/images/icons/whatsapp_icon.png" width={24} height={24} alt="whatsapp" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}