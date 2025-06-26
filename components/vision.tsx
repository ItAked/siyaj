const Vision = () => {
    return (
        <>
            <section className="flex py-20 px-12 gap-x-28 max-sm:flex-col-reverse lg:flex max-sm:px-3">
                <article className="my-auto text-balance">
                    <h1 className="text-6xl max-sm:text-4xl" data-aos="zoom-y-out" data-aos-delay={150}>رؤيتنا</h1>
                    <p className="text-2xl my-3 max-sm:text-[20px]" data-aos="zoom-y-out" data-aos-delay={150}>أن نكون المرجع القانوني الأول للممارسين الصحيين في المملكة
                        العربية السعودية، وأن نساهم في بناء بيئة عمل آمنة تحترم خصوصية العمل الطبي وتحمي حقوق الممارسين.</p>
                </article>
                <img src="/images/vision-img.png" className="w-[638px]" alt="vision-img" loading="lazy" data-aos="zoom-y-out" data-aos-delay={150} />
            </section>
        </>
    )
}

export default Vision