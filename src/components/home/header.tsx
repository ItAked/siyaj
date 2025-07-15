'use client'

import Link from "next/link";
import Logo from "../../../public/images/Logo.png";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#aboutUs", label: "نبذة عنا" },
    { href: "#services", label: "خدماتنا" },
    { href: "#packages", label: "الإشتراكات" },
    { href: "#contactUs", label: "تواصل معنا" },
  ];

  return (
    <header className="fixed z-30 w-full bg-white">
      <div className="w-full">
        <div className="relative flex items-center justify-between gap-3 py-8 px-4 md:px-14">
          <div className="flex flex-1 items-center">
            <Image alt="logo" loading="lazy" width={175} height={55} src={Logo} />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center text-2xl justify-center gap-x-10" dir="rtl">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          {/* Hamburger Icon */}
          <button className="md:hidden flex items-center text-3xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            {menuOpen ? 'X' : '='}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out
        ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
          <ul className="flex flex-col items-center gap-6 py-6 text-xl" dir="rtl">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
