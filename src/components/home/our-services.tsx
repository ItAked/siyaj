import { Scroll } from "lucide-react";
import services from "../../../public/data/services";

export default function OurServices() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 my-28" id="services">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl pb-16 text-right md:pb-20">
            <h2 className="text-6xl text-gray-900">خدماتنا</h2>
          </div>
          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-aos="zoom-in">
            { services.map((service, index) => (
                <article key={index} className="text-balance text-gray-900 text-right shadow-md rounded-md py-8 px-10">
                  <Scroll className="bg-sky-950 text-white p-1 rounded-full mb-6" />
                  <h3 className="mb-2 font-medium text-2xl">{service.title}</h3>
                  <p className="text-[20px]">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
