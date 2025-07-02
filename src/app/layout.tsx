'use client'

import { Tajawal } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '../context/SidebarContext';
import { ThemeProvider } from '../context/ThemeContext';
import AOS from 'aos'
import "aos/dist/aos.css";
import { useEffect } from 'react';

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });
  
  return (
    <html lang="en">
      <body className={`${tajawal.className} bg-white dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
