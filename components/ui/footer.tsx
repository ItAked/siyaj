import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-gray-900 grid grid-cols-3 place-items-center py-16 max-sm:grid-cols-2 max-sm:gap-y-10">
      <img src="/images/logo-white.png" alt="logo" className="w-40" />

      <div className="space-y-2">
        <ul className="flex gap-1 text-white">
          <li>
            <Link className="flex items-center justify-center transition" href="#0" aria-label="Twitter">
              <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875
                11.232h1.36l-8.778-11.232Z"></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link className="flex items-center my-1.5 justify-center transition" href="#0" aria-label="Whatsapp">
              <svg height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier"
              strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier"><g><path d="M0,58l4.988-14.963C2.457,38.78,1,33.812,1,28.5C1,12.76,13.76,0,29.5,0S58,12.76,58,28.5 S45.24,57,29.5,57c-4.789,
              0-9.299-1.187-13.26-3.273L0,58z"></path><path style={{fill: "#FFFFFF"}} d="M47.683,37.985c-1.316-2.487-6.169-5.331-6.169-5.331c-1.098-0.626-2.423-0.696-3.049,
              0.42 c0,0-1.577,1.891-1.978,2.163c-1.832,1.241-3.529,1.193-5.242-0.52l-3.981-3.981l-3.981-3.981c-1.713-1.713-1.761-3.41-0.52-5.242 c0.272-0.401,2.163-1.978,
              2.163-1.978c1.116-0.627,1.046-1.951,0.42-3.049c0,0-2.844-4.853-5.331-6.169 c-1.058-0.56-2.357-0.364-3.203,0.482l-1.758,1.758c-5.577,5.577-2.831,11.873,
              2.746,17.45l5.097,5.097l5.097,5.097 c5.577,5.577,11.873,8.323,17.45,2.746l1.758-1.758C48.048,40.341,48.243,39.042,47.683,37.985z"></path> </g> </g></svg>
            </Link>
          </li>
          <li>
            <Link className="flex items-center justify-center transition" href="#0" aria-label="Github">
              <Mail className="w-[22px] h-[22px] my-1 mx-1.5" />
            </Link>
          </li>
        </ul>
      </div>

      <Link href='#aboutAs' className="text-white text-[20px]">العودة للأعلى</Link>
    </footer>
  );
}
