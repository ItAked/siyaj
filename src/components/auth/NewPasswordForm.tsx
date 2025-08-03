'use client'

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "../../../services/auth";
import Alert from "../ui/alert/Alert";


export default function NewPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    'password': '',
    'password_confirmation': ''
  })
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
    formData.append('password', user.password)
    formData.append('password_confirmation', user.password_confirmation)
    try {
        const response = await verifyOtp(formData)
        setMsg(response.message)
        setIsError(false)
        router.push('/signin')
    } catch (error) {
        setMsg(error.response.data.message)
        setIsError(true)
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
            {msg && (
                <div className="mb-8">
                    <Alert variant={isError ? "error" : "success"} title={isError ? "حدث خطأ!" : ""} message={msg} />
                </div>
            )}
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-medium text-gray-800 text-title-md dark:text-white/90 sm:text-title-md text-right">
              تعيين كلمة المرور الجديدة
            </h1>
            <p className="text-gray-500 font-normal text-sm">يرجى إنشاء كلمة مرور جديدة تحتوي على أحرف وأرقام ورموز</p>
          </div>
          <div>
            <form onSubmit={handleOnSubmit}>
              <div className="space-y-6 text-right">
                <div>
                  <Label className="text-2xl font-normal">كلمة المرور الجديدة <span className="text-error-500">*</span></Label>
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
                <div>
                  <Label className="text-2xl font-normal">تأكيد كلمة المرور <span className="text-error-500">*</span></Label>
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
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm">حفظ التغييرات</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
