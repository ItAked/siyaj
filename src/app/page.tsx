'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { get } from "../../server/AuthServer/check_token";

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function checkToken() {
    try {
      const response = await get();
    
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (message === 'Token is valid') {
      router.push('/admin');
    }

    if (message === "Unauthenticated.") {
      router.push('/signin');
    }
  }, [message, router]);

  return null;
}