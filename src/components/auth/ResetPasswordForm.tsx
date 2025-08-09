/* eslint-disable @next/next/no-img-element */
'use client'

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { sendOtp } from "../../../services/auth";
import Alert from "../ui/alert/Alert";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const [user, setUser] = useState({'email': ''})
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

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
    event.preventDefault()
    const formData = new FormData()
    formData.append('email', user.email)
    try {
        const response = await sendOtp(formData)
        setIsError(false)
        setMsg(response.message)
        router.push('/verify-otp')
    } catch (error) {
        setIsError(true)
        setMsg(error.response.data.message)
    }
  }

  return (
    <>
      <section className="py-96 px-36 max-sm:py-64">
        { msg != '' && (<Alert variant={isError ? "error" : "success"} title={isError ? "حدث خطأ !" : ""} message={msg} /> )}
        <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md ">إعادة تعيين كلمة المرور</h1>
        <p className="font-normal text-sm text-gray-500 mt-6">يرجى إدخال البريد الإلكتروني لإعادة تعيين كلمة المرور</p>
        <div className="flex items-center gap-x-80">
          <form onSubmit={handleOnSubmit} className="w-1/2 max-sm:w-full max-sm:mt-4">
            <div className="space-y-6 text-right">
              <div>
                <Label>البريد الإلكتروني <span className="text-error-500">*</span></Label>
                <Input placeholder="info@gmail.com" name="email" defaultValue={user.email} type="email"onChange={handleUserChange} />
              </div>
              <div>
                <Button className="w-full" size="sm">تأكيد</Button>
              </div>
            </div>
          </form>
          <img src="/images/logo/logo-blue.png" alt="logo" className="w-80 max-sm:hidden h-80" loading="lazy" />
        </div>
      </section>
    </>
  );
}
