'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { get } from "../../server/AuthServer/check_token";
import Hero from "../components/home/hero";
import Header from "../components/home/header";
import About from "../components/home/About";
import Vision from "../components/home/Vision";
import OurGoals from "../components/home/Goals";
import OurServices from "../components/home/our-services";
import Subscriptions from "../components/home/Subscriptions";
import ContactUs from "../components/home/ContactUs";

export default function Home() {
    const router = useRouter();
    const [authState, setAuthState] = useState<{
        loading: boolean;
        message: string;
        role: 'admin' | 'lawyer' | 'practitioner' | null;
    }>({
        loading: true,
        message: '',
        role: null
    });

    async function checkToken() {
        try {
            const response = await get();
            
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

        if (authState.message === "Unauthenticated.") {
            router.push('/');
        }
        
        if (authState.message === 'Token is valid') {
            switch(authState.role) {
                case 'admin':
                    router.push('/admin');
                    break;
                case 'lawyer':
                    router.push('/lawyer');
                    break;
                case 'practitioner':
                    router.push('/practitioner');
                    break;
                default:
                    router.push('/unauthorized');
            }
        } else {
            router.push('/');
        }
    }, [authState, router]);

    if (authState.loading) {
        return <span className="loading loading-spinner text-warning"></span>;
    }

    return(
        <>
            <Header />
            <Hero />
            <About />
            <Vision />
            <OurGoals />
            <OurServices />
            <Subscriptions />
            <ContactUs />
        </>
    );
}