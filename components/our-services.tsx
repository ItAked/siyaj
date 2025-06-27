import services from "@/public/data/services";

export default function OurServices() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 my-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-6xl text-gray-900">خدماتنا</h2>
          </div>
          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-aos="zoom-in">
            { services.map((service, index) => (
                <article key={index} className="text-balance text-gray-900 shadow-md rounded-md py-8 px-10">
                  <h3 className="mb-2 flex items-center space-x-2 font-medium text-2xl">{service.title}</h3>
                  <p className="text-[20px]">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
