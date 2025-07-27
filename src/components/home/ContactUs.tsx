'use client'

import { Mail, Phone } from "lucide-react";
import Map from "./MapComponent/index";
import { ChangeEvent, FormEvent, useState } from "react";
import { contactUs } from "../../../services/contact_us";
import Alert from "../ui/alert/Alert";

export default function ContactUs(){
    const [isError, setIsError] = useState(false)
    const [msg, setMsg] = useState('')
    const [contactData, setContactData] = useState({
        'name': '',
        'email': '',
        'message': ''
    })

    function handleContactChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setContactData((prevUser) => {
            return { ...prevUser, [event.target.name]: event.target.value}
      })
    }

    async function handleSubmit(event: FormEvent) {
        try {
            event.preventDefault()

            const form = new FormData()
            form.append('name', contactData.name)
            form.append('email', contactData.email)
            form.append('message', contactData.message)

            const response = await contactUs(form)
            setIsError(false)
            setMsg(response)
            
        } catch (error) {
            setIsError(true)
            setMsg(error.response.data.message);
        }
    }
    return(
        <>
            <section className="flex items-center justify-center gap-x-9 px-14 py-28 max-sm:flex-col-reverse max-sm:gap-y-9" data-aos="fade-up" dir="rtl">
                <form className="w-md h-[560px] shadow py-14 px-11 rounded-lg" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">الإسم الثلاثي</label>
                            <input id="name" name="name" value={contactData.name} onChange={handleContactChange} className="input form-input w-full py-2" type="text"
                            placeholder="لجين صلاح" required />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">البريد الإلكتروني</label>
                            <input id="email" name="email" value={contactData.email} onChange={handleContactChange} className="input form-input w-full py-2" type="email"
                            placeholder="lujain@akedco.com" required />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="message">الرسالة</label>
                            <textarea id="message" name="message" value={contactData.message} onChange={handleContactChange} className="input form-input w-full py-2"
                            autoComplete="on" placeholder="الرسالة" required></textarea>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <button className="btn w-full bg-linear-to-t bg-blue-300 text-white border-none">
                            إرسال
                        </button>
                        { msg != '' && (
                            isError ? (
                        <Alert variant={"error"} title={"حدث خطأ!"} message={msg} />
                        ) : (<Alert variant={"success"} title="" message={msg} />)
                        )}
                    </div>
                </form>

                <div className="grid gap-y-12 mb-auto">
                    <article className="grid gap-y-4 place-items-start text-balance">
                        <h1 className="text-6xl font-light">تواصل معنا</h1>
                        <p className="text-2xl font-normal">نسعد باستقبال الآراء والاقتراحات ونستمع لشكواكم بإهتمام, وسنحاول الرد عليكم في أقرب وقت</p>
                    </article>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <Phone className="text-white p-1 mb-1 rounded-full bg-sky-950" />
                            <span>0555643324</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Mail className="text-white p-1 mb-1 rounded-full bg-sky-950" />
                            <span className="text-gray-900">lujain@akedco.com</span>
                        </div>
                    </div>
                    <Map />
                </div>
            </section>
        </>
    )
}