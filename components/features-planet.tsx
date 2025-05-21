export default function FeaturesPlanet() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
              أهدافنا
            </h2>
          </div>
          {/* Grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:relative *:p-6 *:before:absolute *:before:bg-gray-800 *:before:[block-size:100vh] *:before:[inline-size:1px] *:before:[inset-block-start:0] *:before:[inset-inline-start:-1px] *:after:absolute *:after:bg-gray-800 *:after:[block-size:1px] *:after:[inline-size:100vw] *:after:[inset-block-start:-1px] *:after:[inset-inline-start:0] md:*:p-10">
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>تقديم دعم قانوني متخصص</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                توفير استشارات قانونية متخصصة تلبي احتياجات الممارسين الصحيين في القضايا المرتبطة بالعمل الطبي، مثل الأخطاء الطبية.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>حماية حقوق الممارسين الصحيين</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                ضمان تمثيل قانوني عالي الجودة للممارسين في حال تعرضهم لدعاوى قضائية.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>توفير منصة تقنية شاملة</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                تصميم منصة سهلة الاستخدام تتيح للممارسين تسجيل قضاياهم ومتابعتها بشكل مباشر.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>تعزيز الكفاءة وتقليل الوقت المستغرق في الإجراءات القانونية</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                أتمتة العمليات القانونية، مثل تسجيل القضايا، تخصيص المحامين، وجدولة المواعيد، لتقليل الوقت المستغرق في المعاملات الورقية التقليدية.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>الامتثال للأنظمة والقوانين المحلية</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                ضمان توافق المنصة مع الأنظمة والقوانين السعودية، بما في ذلك نظام حماية البيانات الشخصية (PDPL).
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>إتاحة حلول قانونية ميسورة التكلفة</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                تقديم خطط اشتراك بأسعار معقولة تناسب مختلف الفئات من الممارسين الصحيين.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
