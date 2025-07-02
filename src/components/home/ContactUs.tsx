import { Mail, Phone } from "lucide-react";
import Map from "./MapComponent/index";

export default function ContactUs(){
    return(
        <>
            <section className="flex items-center justify-center gap-x-9 px-14 py-28 max-sm:flex-col-reverse max-sm:gap-y-9" data-aos="fade-up" dir="rtl">
                <form className="w-md h-[560px] shadow py-14 px-11 rounded-lg">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">الإسم الثلاثي</label>
                            <input id="name" className="form-input w-full py-2" type="text" placeholder="لجين صلاح" required />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">البريد الإلكتروني</label>
                            <input id="email" className="form-input w-full py-2" type="email" placeholder="lujain@akedco.com" required />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="message">الرسالة</label>
                            <textarea id="message" className="form-input w-full py-2" autoComplete="on" placeholder="الرسالة" required></textarea>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <button className="btn w-full bg-linear-to-t from-yellow-600 to-yellow-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm
                        hover:bg-[length:100%_150%]">
                            إرسال
                        </button>
                    </div>
                </form>

                <div className="grid gap-y-12 mb-auto">
                    <article className="grid gap-y-4 place-items-start text-balance">
                        <h1 className="text-6xl font-light">تواصل معنا</h1>
                        <p className="text-2xl font-normal">نسعد باستقبال الآراء والاقتراحات ونستمع لشكواكم بإهتمام, وسنحاول الرد عليكم في أقرب وقت</p>
                    </article>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <Phone className="h-5 w-5 text-gray-900 flex-shrink-0 mb-1" />
                            <span>0555643324</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Mail className="h-5 w-5 text-gray-900 flex-shrink-0 mb-1" />
                            <span className="text-gray-900">lujain@akedco.com</span>
                        </div>
                    </div>
                    <Map />
                </div>
            </section>
        </>
    )
}