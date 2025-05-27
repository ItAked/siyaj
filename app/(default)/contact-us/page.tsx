import Map from "@/components/MapComponent/index";
import { Mail, Phone } from "lucide-react";

export const metadata = {
  title: "تواصل معنا",
  description: "Page description",
};

export default function ContactUs(){
    return(
        <>
            <section className="my-40 text-right mx-80 max-sm:mx-8" id="contactUs">
                <div className="mb-10 grid gap-y-4 place-items-center">
                    <h1 className="text-4xl font-bold">تواصل معنا</h1>
                    <p>نسعد باستقبال الآراء و الاقتراحات ونستمع لشكواكم باهتمام.
وسنحاول الرد عليكم في أقرب وقت</p>
                </div>

                <div className="flex items-center gap-x-4 max-sm:grid max-sm:gap-y-8">
                    <div className="w-full">
                        <form>
                            <div className="space-y-4">
                                <div>
                                    <label
                                    className="mb-1 block text-sm font-medium text-gray-700"
                                    htmlFor="name"
                                    >
                                        الإسم الثلاثي
                                    </label>
                                    <input
                                    id="name"
                                    className="form-input w-full py-2"
                                    type="text"
                                    placeholder="لجين صلاح"
                                    required
                                    />
                                </div>
                                <div>
                                    <label
                                    className="mb-1 block text-sm font-medium text-gray-700"
                                    htmlFor="email"
                                    >
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                    id="email"
                                    className="form-input w-full py-2"
                                    type="email"
                                    placeholder="lujain@akedco.com"
                                    required
                                    />
                                </div>
                                <div>
                                    <label
                                    className="mb-1 block text-sm font-medium text-gray-700"
                                    htmlFor="message"
                                    >
                                        الرسالة
                                    </label>
                                    <textarea id="message"
                                    className="form-input w-full py-2"
                                    autoComplete="on"
                                    placeholder="الرسالة"
                                    required></textarea>
                                </div>
                            </div>
                            <div className="mt-6 space-y-3">
                                <button className="btn w-full bg-linear-to-t from-yellow-600 to-yellow-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]">
                                    تواصل معنا
                                </button>
                            </div>
                        </form>
                    </div>

                    <Map />

                    <div className="flex items-center my-4 gap-x-32 md:hidden lg:hidden xl:hidden" dir="ltr">
                        <div className="flex items-center gap-x-2">
                            <Mail className="h-5 w-5 text-yellow-500 flex-shrink-0 mb-1" />
                            <span className="text-gray-900">lujain@akedco.com</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Phone className="h-5 w-5 text-yellow-500 flex-shrink-0 mb-1" />
                            <span className="text-gray-900">lujain@akedco.com</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center my-4 gap-x-32 max-sm:hidden" dir="ltr">
                    <div className="flex items-center gap-x-2">
                        <Mail className="h-5 w-5 text-yellow-500 flex-shrink-0 mb-1" />
                        <span className="text-gray-900">lujain@akedco.com</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Phone className="h-5 w-5 text-yellow-500 flex-shrink-0 mb-1" />
                        <span className="text-gray-900">lujain@akedco.com</span>
                    </div>
                </div>
            </section>
        </>
    )
}