export const metadata = {
  title: "الصفحة الرئيسية",
  description: "Page description",
};

import Hero from "@/components/hero-home";
import FeaturesPlanet from "@/components/features-planet";
import LargeTestimonial from "@/components/large-testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesPlanet />
      <LargeTestimonial />
    </>
  );
}
