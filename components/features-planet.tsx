import services from "@/public/data/services";

export default function OurServices() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900 my-60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
              خدماتنا
            </h2>
          </div>
          {/* Grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:relative *:p-6 *:before:absolute *:before:bg-gray-800 *:before:[block-size:100vh] *:before:[inline-size:1px] *:before:[inset-block-start:0] *:before:[inset-inline-start:-1px] *:after:absolute *:after:bg-gray-800 *:after:[block-size:1px] *:after:[inline-size:100vw] *:after:[inset-block-start:-1px] *:after:[inset-inline-start:0] md:*:p-10">
            { services.map((service, index) => (
                <article key={index}>
                  <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                    <span>{service.title}</span>
                  </h3>
                  <p className="text-[15px] text-gray-400">
                    {service.description}
                  </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
