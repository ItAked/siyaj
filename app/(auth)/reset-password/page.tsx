export const metadata = {
  title: "Reset Password - Simple",
  description: "Page description",
};

export default function ResetPassword() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">نسيان كلمة المرور</h1>
      </div>

      {/* Form */}
      <form>
        <div className="space-y-4">
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
        </div>
        <div className="mt-6">
          <button className="btn w-full bg-linear-to-t from-yellow-600 to-yellow-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]">
            إعادة إنشاء كلمة المرور
          </button>
        </div>
      </form>
    </>
  );
}
