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
    const response = await login(formData)    
    if (response.role === undefined) {
      setErrorMsg(response)
    }
    if(response.role === 'practitioner') {
      setErrorMsg('')
      router.push('/practitioner')
    } else {
      setErrorMsg('الحساب لا يخص الممارسين الصحيين')
    }
    } catch (error) {
      setErrorMsg(error);
    }
  }

  return (
    <section className="flex items-center justify-evenly py-36">
      <div>
        { errorMsg != '' && (<Alert variant={"error"} title={"حدث خطأ !"} message={errorMsg.toString()} /> )}
        <h1 className="font-medium text-4xl my-10">تسجيل الدخول</h1>
          <form onSubmit={handleOnSubmit}>
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
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2">
                    {showPassword ? (<EyeIcon />) : (<EyeClosedIcon />)}
                  </span>
                </div>
              </div>
              <Link href="/reset-password" className="text-brand-500 text-sm">هل نسيت كلمة المرور؟</Link>
              <Button className="w-full bg-brand-500 mt-11" size="sm">تسجيل الدخول</Button>
              <div className="flex items-center gap-x-0.5 justify-center text-sm">
                <p className="text-gray-500">لا تملك حسابًا؟</p>
                <Link href="/practitioner/auth/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">أنشئ حسابًا جديدًا</Link>
              </div>
            </div>
          </form>
      </div>
      <img src="/images/logo/Logo.png" alt="logo" className="max-sm:hidden" />
    </section>
  );
}
