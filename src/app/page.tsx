'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "../../utils/auth";

export default function Home() {
    const router = useRouter();
    
    useEffect(() => {
        if (!getToken()) {
            router.push('/signin');
        } else {
            router.push('/admin');
        }
    }, [router]);

    return null;
}