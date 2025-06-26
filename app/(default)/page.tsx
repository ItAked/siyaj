export const metadata = {
  title: "الصفحة الرئيسية",
  description: "Page description",
};

import Hero from "@/components/hero-home";
import OurServices from "@/components/our-services";
import Subscriptions from "@/components/subscriptions";
import OurGoals from "@/components/our-goals";
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
      {/* <ContactUs /> */}
    </>
  );
}
