'use client'

import { useEffect } from "react";
import AOS from 'aos'
import "aos/dist/aos.css";
import { ThemeProvider } from "../context/ThemeContext";
import { SidebarProvider } from "../context/SidebarContext";

export default function LayoutClient({ children }) {
  useEffect(() => {
      AOS.init({
        once: true,
        disable: "phone",
        duration: 700,
        easing: "ease-out-cubic",
      });
    });

//   return <>{children}</>;
  return (
    <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
    );
}