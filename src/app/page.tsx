'use client'

import Hero from "../components/home/hero";
import Header from "../components/home/header";
import About from "../components/home/About";
import Vision from "../components/home/Vision";
import OurGoals from "../components/home/Goals";
import OurServices from "../components/home/our-services";
import Subscriptions from "../components/home/Categories";
import ContactUs from "../components/home/ContactUs";
import Footer from "../components/home/footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRole, getToken } from "../utils/auth";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        if (getToken() && getRole() === 'lawyer') {
            router.push('/lawyer')
        }
        if (getToken() && getRole() === 'practitioner') {
            router.push('/practitioner')
        }
    }, [router])
    
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
            <Footer />
        </>
    );
}