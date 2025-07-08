import Hero from "../components/home/hero";
import Header from "../components/home/header";
import About from "../components/home/About";
import Vision from "../components/home/Vision";
import OurGoals from "../components/home/Goals";
import OurServices from "../components/home/our-services";
import Subscriptions from "../components/home/Categories";
import ContactUs from "../components/home/ContactUs";
import { Metadata } from "next";
import Footer from "../components/home/footer";

export const metadata: Metadata = {
  title: "الصفحة الرئيسية",
  description: "الصفحة الرئيسية"
};

export default function Home() {
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