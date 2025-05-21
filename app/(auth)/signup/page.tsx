export const metadata = {
  title: "Sign Up - Simple",
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
              type="text"
              placeholder="0555512345"
              required
            />
          </div>
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
