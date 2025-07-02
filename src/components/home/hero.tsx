import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative" id="aboutAs">
      <div className="absolute inset-0 -z-10">
        <Image className="object-cover blur-sm" height={1550} width={1500} src="/images/background-hero.png" alt="" loading="lazy" />
      </div>
      <div className="pb-12 pt-32 md:pb-20 md:pt-40 relative">
        <Image className="object-cover mx-auto rounded-[10px]" width={1252} height={550} src="/images/background-hero-2.png" alt="" loading="lazy" />
        <div className="pb-12 text-center md:pb-16 absolute inset-0 top-96">
          <h1 className="text-5xl font-light text-white md:text-6xl max-sm:text-3xl" data-aos="zoom-y-out" data-aos-delay={150}>
            حلول قانونية متخصصة للممارسين الصحيين
          </h1>
            <div className="mx-auto max-w-3xl mt-3">
              <p className="mb-8 text-2xl text-white max-sm:text-[20px]" data-aos="zoom-y-out" data-aos-delay={300}>
                منصة رقمية متخصصة تقدم
                للممارسين الصحيين حلولًا قانونية متكاملة، من الاستشارة إلى المتابعة، لتمنحك الأمان القانوني الكامل أثناء ممارسة عملك.
              </p>
              <Link className="py-2.5 px-10 btn text-white bg-yellow-600 hover:bg-gray-900 shadow-none"
              href="/signup">سجّل الآن</Link>
            </div>
        </div>
      </div>

    </section>
  );
}
