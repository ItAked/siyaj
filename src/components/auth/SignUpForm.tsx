'use client'

// import DialogComponent from "../../components/ui/dialog";
// import InputComponent from "../../components/ui/input";
import { signup } from "../../../server/AuthServer/signup";
import { EyeClosed, EyeIcon } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    license: "",
    medical: "",
    employer: "",
    password: "",
    password_confirmation: "",
    license_file: ""
  })
  const [showPassword, setShowPassword] = useState(false);

  function handleUserChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    try {
      if (event.target.type === 'file') {
            const fileInput = event.target as HTMLInputElement;
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: fileInput.files?.[0] }
            })
        } else {
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: event.target.value }
            })
        }
    } catch (error) {
      alert(error)
      
    }
  }

  async function handleOnSubmit(event: FormEvent) {
    try {
      event.preventDefault()
      

      const formData = new FormData()
      formData.append('name', user.name)
      formData.append('email', user.email)
      formData.append('phone', user.phone)
      formData.append('license', user.license)
      formData.append('medical', user.medical)
      formData.append('employer', user.employer)
      formData.append('password', user.password)
      formData.append('password_confirmation', user.password_confirmation)
      formData.append('license_file', user.license_file)
      
      const response = await signup(formData)
      alert(response)
    } catch (error) {
      console.log(error);
      
    }
  }
return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full py-40">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-yellow-600 text-title-sm dark:text-white/90 sm:text-title-md text-right">
              تسجيل الدخول
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
              أدخل البريد الإلكتروني والرقم السري للدخول إلى حسابك
            </p>
          </div>
          <div>
            <form onSubmit={handleOnSubmit}>
              <div className="space-y-6 text-right">
                <div>
                  <Label>
                    الإسم الثلاثي <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="الإسم الثلاثي" name="name" defaultValue={user.name} type="text" onChange={handleUserChange} />
                </div>
                <div>
                  <Label>
                    البريد الإلكتروني <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" name="email" defaultValue={user.email} type="email"onChange={handleUserChange} />
                </div>
                <div>
                  <Label>
                    رقم الجوال <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="555527557" name="phone" defaultValue={user.phone} type="number" onChange={handleUserChange} />
                </div>
                <div>
                  <Label>
                    رقم الترخيص المهني <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="رقم الترخيص المهني" name="license" defaultValue={user.license} type="text" onChange={handleUserChange} />
                </div>
                <div>
                  <Label>
                    التخصص الطبي <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="التخصص الطبي" name="medical" defaultValue={user.medical} type="text" onChange={handleUserChange} />
                </div>
                <div>
                  <Label>
                    إسم جهة العمل <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="إسم جهة العمل" name="employer" defaultValue={user.employer} type="text" onChange={handleUserChange} />
                </div>
                <div>
                  <Label>
                    كلمة المرور <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={handleUserChange}
                      name="password"
                      defaultValue={user.password}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-white dark:fill-gray-400" />
                      ) : (
                        <EyeClosed className="fill-white dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>
                    تأكيد كلمة المرور <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={handleUserChange}
                      name="password_confirmation"
                      defaultValue={user.password_confirmation}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-white dark:fill-gray-400" />
                      ) : (
                        <EyeClosed className="fill-white dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>
                    رفع صورة الترخيص المهني <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input name="license_file" defaultValue={undefined} type="file" onChange={handleUserChange} />
                </div>
                <div className="flex items-center justify-between" dir="rtl">
                  <Link
                    href="/signin-practitioner"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    هل لديك حساب؟
                  </Link>
                </div>
                <div className="pb-40">
                  <Button className="w-full bg-yellow-600" size="sm">
                     إنشاء الحساب
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}