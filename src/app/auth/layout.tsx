/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ThemeProvider } from "../../context/ThemeContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full lg:grid items-center hidden bg-gray-50">
            <div className="relative items-center justify-center  flex z-1">
              <div className="flex flex-col items-center max-w-xs">
                <img src="/images/logo/logo-blue-light-blue.png" alt="logo" className="max-sm:hidden" />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}