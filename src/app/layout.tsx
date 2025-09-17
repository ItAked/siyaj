import { Tajawal } from 'next/font/google';
import './globals.css';
import "aos/dist/aos.css";
import LayoutClient from './layoutClient';

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic"]
});

export const metadata= {
  verification: {
    google: '0DeZXERvyTDatTdF4GZPcP8Xtn5rVxNBeaBvvXPCHpE'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tajawal.className} bg-white dark:bg-gray-900`} dir='rtl'>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
