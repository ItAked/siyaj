export default function HeroHome() {
  return (
    <section className="relative" id="aboutAs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-6 border-y text-5xl font-bold md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              منصة رقمية متكاملة <br className="max-lg:hidden" />
              تسهل على الممارسين الصحيين الوصول إلى الدعم القانوني المناسب في أي وقت ومن أي مكان.
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                إن هذه المنصة ليست مجرد منصة قانونية، بل هي مبادرة تهدف إلى خلق بيئة عمل صحية وآمنة تدعم الممارسين في تقديم أفضل الخدمات للمرضى، مع ضمان حقوقهم القانونية بشكل متكامل وميسر.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
