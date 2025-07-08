'use client'

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { post } from "../../../server/AuthServer/login";
import { useRouter } from "next/navigation";
import Alert from "../ui/alert/Alert";


export default function SignInPractitionerForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    'email': '',
    'password': ''
  })
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')

  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: event.target.value}
      })
    } catch (error) {
      alert(error)
    }
  }

  async function handleOnSubmit(event: FormEvent) {
    try {
      event.preventDefault()

    const formData = new FormData()
    formData.append('email', user.email)
    formData.append('password', user.password)

    const response = await post(formData)

    if (response.message.role === undefined) {
      setErrorMsg(response.message.message)
    }
    if(response.message.role === 'practitioner') {
      setErrorMsg('')
      router.push('/practitioner')
    } else {
      setErrorMsg('الحساب لا يخص الممارسين الصحيين')
    }

    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full mx-auto">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto mt-60">
        <div>
          <div className="mb-5 sm:mb-8 grid gap-y-4">
            { errorMsg != '' && (<Alert variant={"error"} title={"حدث خطأ !"} message={errorMsg} /> )}
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md text-right">
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
                    البريد الإلكتروني <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" name="email" defaultValue={user.email} type="email"onChange={handleUserChange} />
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
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between" dir="rtl">
                  <Link
                    href="/practitioner/auth/signup"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    ليس لديك حساب؟
                  </Link>
                </div>
                <div>
                  <Button className="w-full bg-yellow-600" size="sm">
                    تسجيل الدخول
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
