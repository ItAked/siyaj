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
      setErrorMsg(error.response.data.message);
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            { errorMsg != '' && (<Alert variant={"error"} title={"حدث خطأ !"} message={errorMsg} /> )}
            <h1 className="mb-2 font-medium text-gray-800 text-title-md dark:text-white/90 sm:text-title-md text-right">تسجيل الدخول</h1>
          </div>
          <div>
            <form onSubmit={handleOnSubmit}>
              <div className="space-y-6 text-right">
                <div>
                  <Label className="text-2xl font-normal">البريد الإلكتروني <span className="text-error-500">*</span></Label>
                  <Input placeholder="info@gmail.com" name="email" defaultValue={user.email} type="email"onChange={handleUserChange} />
                </div>
                <div>
                  <Label className="text-2xl font-normal">كلمة المرور <span className="text-error-500">*</span></Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleUserChange} name="password"
                    defaultValue={user.password} />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2">
                      {showPassword ? (<EyeIcon/>) : (<EyeClosedIcon/>)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link href="/reset-password" className="text-sm font-normal text-brand-500 hover:text-brand-600 dark:text-brand-400">هل نسيت كلمة المرور؟</Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">تسجيل الدخول</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}