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
        router.push('/auth/verify-otp')
    } catch (error) {
        setIsError(true)
        setMsg(error.response.data.message)
    }
  }

  return (
    <>
      <div className="flex flex-col flex-1 lg:w-1/2 w-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              { msg != '' && (<Alert variant={isError ? "error" : "success"} title={isError ? "حدث خطأ !" : ""} message={msg} /> )}
              <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md ">إعادة تعيين كلمة المرور</h1>
            </div>
            <form onSubmit={handleOnSubmit} className="max-sm:w-full max-sm:mt-4">
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
          </div>
        </div>
      </div>
    </>
  );
}
