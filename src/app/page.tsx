'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      router.push('/signin');
    } else {
      router.push('/admin');
    }
  });

  return null; // or a loading spinner
}