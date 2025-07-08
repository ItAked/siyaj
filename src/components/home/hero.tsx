import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative" id="aboutAs">
      <div className="pb-12 pt-32 md:pb-20 md:pt-40 relative">
        <Image className="object-cover mx-auto rounded-[10px]" width={1252} height={550} src="/images/background-dot.png" alt="" loading="lazy" />
        <div className="pb-12 text-center md:pb-16 absolute inset-0 top-96">
          <h1 className="text-5xl font-light text-gray-900 md:text-6xl max-sm:text-3xl" data-aos="zoom-y-out" data-aos-delay={150}>
            حلول قانونية متخصصة للممارسين الصحيين
          </h1>
            <div className="mx-auto max-w-3xl mt-3">
              <p className="mb-8 text-2xl text-gray-800 max-sm:text-[20px]" data-aos="zoom-y-out" data-aos-delay={300}>
                منصة رقمية متخصصة تقدم
                للممارسين الصحيين حلولًا قانونية متكاملة، من الاستشارة إلى المتابعة، لتمنحك الأمان القانوني الكامل أثناء ممارسة عملك.
              </p>
              <div className="flex items-center gap-x-4 justify-center">
                <Link className="py-2.5 px-10 btn text-white bg-gray-900 shadow-none"
                href="/lawyer/auth/signin">الدخول كمحامي</Link>
                <Link className="py-2.5 px-10 btn text-white bg-yellow-600 shadow-none"
                href="/practitioner/auth/signup">الدخول كممارس صحي</Link>
              </div>
            </div>
        </div>
      </div>

    </section>
  );
}
