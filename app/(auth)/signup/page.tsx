export const metadata = {
  title: "إنشاء حساب",
  description: "Page description",
};

export default function SignUp() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">إنشاء حساب</h1>
      </div>

      {/* Form */}
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
              htmlFor="phone"
            >
              رقم الجوال
            </label>
            <input
              id="phone"
              className="form-input w-full py-2"
              type="number"
              placeholder="0555512345"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="license"
            >
              رقم الترخيص المهني
            </label>
            <input
              id="license"
              className="form-input w-full py-2"
              type="number"
              placeholder="رقم الترخيص المهني"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="medical"
            >
              التخصص الطبي
            </label>
            <input
              id="medical"
              className="form-input w-full py-2"
              type="text"
              placeholder="التخصص الطبي"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="employer"
            >
              اسم جهة العمل
            </label>
            <input
              id="employer"
              className="form-input w-full py-2"
              type="text"
              placeholder="شركة أكيد"
              required
            />
          </div>
          <div className="grid gap-y-5 items-center lg:flex lg:justify-between md:flex md:">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                كلمة المرور
              </label>
              <input
                id="password"
                className="form-input w-full py-2"
                type="password"
                autoComplete="on"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="confirm-password"
              >
                تأكيد كلمة المرور
              </label>
              <input
                id="confirm-password"
                className="form-input w-full py-2"
                type="password"
                autoComplete="on"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="license-file"
            >
              رفع صورة الترخيص المهني
            </label>
            <input
              id="license-file"
              className="form-input w-full py-2"
              type="file"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              id="license-file"
              className="py-2"
              type="checkbox"
              required
            />
            <label
              className="mb-1 text-sm font-medium text-gray-700"
              htmlFor="license-file"
            >
              الموافقة على الشروط والأحكام
            </label>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <button className="btn w-full bg-linear-to-t from-yellow-600 to-yellow-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]">
            إنشاء حساب
          </button>
        </div>
      </form>
    </>
  );
}
