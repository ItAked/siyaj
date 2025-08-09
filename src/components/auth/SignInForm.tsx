/* eslint-disable @next/next/no-img-element */
'use client'

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "../ui/alert/Alert";
import { login } from "../../../services/auth";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

export default function SignInForm() {
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
      const response = await login(formData)
      if (response.role === undefined) {
        setErrorMsg(response.message)
      }
      if(response.role === 'lawyer') {
        setErrorMsg('')
        router.push('/lawyer')
      } else {
        setErrorMsg('الحساب لا يخص المحامين')
        return;
      }
    } catch (error) {
      setErrorMsg(error);
    }
  }

  return (
    <>
      <section className="py-96 px-36 max-sm:py-64">
        { errorMsg != '' && (<Alert variant={"error"} title={"حدث خطأ !"} message={errorMsg} /> )}
        <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">تسجيل الدخول</h1>
        <div className="flex items-center gap-x-80">
          <form onSubmit={handleOnSubmit} className="w-1/2 max-sm:w-full">
            <div className="space-y-6 text-right">
              <div>
                <Label>البريد الإلكتروني <span className="text-error-500">*</span></Label>
                <Input placeholder="info@gmail.com" name="email" defaultValue={user.email} type="email"onChange={handleUserChange} />
              </div>
              <div>
                <Label>كلمة المرور <span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleUserChange} name="password"
                  defaultValue={user.password} />
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                    {showPassword ? ( <EyeIcon className="fill-gray-500 dark:fill-gray-400" /> ) : ( <EyeClosedIcon className="fill-gray-500 dark:fill-gray-400" /> )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between" dir="rtl">
                <Link href="/reset-password" className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">نسيت كلمة المرور؟</Link>
              </div>
              <div>
                <Button className="w-full" size="sm">تسجيل الدخول</Button>
              </div>
            </div>
          </form>
          <img src="/images/logo/logo-blue.png" alt="logo" className="w-80 max-sm:hidden h-80" loading="lazy" />
        </div>
      </section>
    </>
  );
}