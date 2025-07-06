'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "../../server/AuthServer/check_token";

export default function Home() {
    const router = useRouter();
    const [authState, setAuthState] = useState<{
        loading: boolean;
        message: string;
        role: 'admin' | 'lawyer' | null;
    }>({
        loading: true,
        message: '',
        role: null
    });

    async function checkToken() {
        try {
            const response = await getToken();
            setAuthState({
                loading: false,
                message: response.message,
                role: response.role
            });
        } catch (error) {
            setAuthState({
                loading: false,
                message: error.response?.data?.message || "Authentication failed",
                role: null
            });
            localStorage.removeItem('token');
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if (authState.loading) return;
        
        if (authState.message === 'Token is valid') {
            console.log(localStorage.getItem('token'));
            // Redirect based on role
            switch(authState.role) {
                case 'admin':
                    router.push('/admin');
                    break;
                case 'lawyer':
                    router.push('/lawyer');
                    break;
                default:
                    router.push('/unauthorized');
            }
        } else {
            router.push('/signin');
        }
    }, [authState, router]);

    if (authState.loading) {
        return <div>Loading...</div>; // Add a proper loading component
    }

    return null;
}