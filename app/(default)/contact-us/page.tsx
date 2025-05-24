export const metadata = {
  title: "تواصل معنا",
  description: "Page description",
};

export default function ContactUs(){
    return(
        <>
            <section className="mx-12 my-40 text-right
            xl:mx-[30rem]
            lg:mx-[30rem]
            md:mx-80">
                <div className="mb-10 grid gap-y-4 place-items-center">
                    <h1 className="text-4xl font-bold">تواصل معنا</h1>
                    <p>نسعد باستقبال الآراء و الاقتراحات ونستمع لشكواكم باهتمام.
وسنحاول الرد عليكم في أقرب وقت</p>
                </div>

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
            </section>
        </>
    )
}