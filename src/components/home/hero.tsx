/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 flex flex-col-reverse items-center justify-center gap-8 md:py-20 md:flex-col-reverse md:gap-12 lg:flex-row lg:items-center
    lg:justify-between lg:gap-16 lg:py-24 xl:max-w-7xl" id="aboutUs">
      <article className="text-right text-balance text-sky-950 grid w-fit gap-y-4">
        <h1 className="font-light text-5xl" data-aos="zoom-y-out" data-aos-delay={150}>حلول قانونية متخصصة للممارسين الصحيين</h1>
        <p className="text-xl" data-aos="zoom-y-out" data-aos-delay={300}>منصة رقمية متخصصة تقدم للممارسين الصحيين حلولًا قانونية متكاملة، من الاستشارة إلى المتابعة، لتمنحك الأمان القانوني الكامل أثناء ممارسة عملك.</p>

        <div className="flex items-center gap-x-3">
          <Link className="btn bg-sky-950 text-white border-none font-medium text-base" href="/practitioner/auth/signin">الدخول كممارس صحي</Link>
          <Link className="btn text-sky-950 border-sky-950 bg-white font-medium text-base" href="/lawyer/auth/signin">الدخول كمحامي</Link>
        </div>
      </article>

      <img src="/images/vaadin_scale.png" alt="" loading="lazy" className="mt-16 w-[519px] h-[521px]" />
    </section>
  );
}
