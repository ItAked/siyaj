export const metadata = {
  title: "الصفحة الرئيسية",
  description: "Page description",
};

import Hero from "@/components/hero-home";
import OurServices from "@/components/features-planet";
import Subscriptions from "@/components/large-testimonial";
import OurGoals from "@/components/our-goals";
import ContactUs from "./contact-us/page";
import About from "@/components/about";
import Vision from "@/components/vision";

export default function Home() {
  return (
    <>
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
