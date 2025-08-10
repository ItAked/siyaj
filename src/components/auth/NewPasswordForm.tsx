/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { verifyOtp } from "../../../services/auth";
import Alert from "../ui/alert/Alert";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const NewPasswordForm = () => {
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
      setMsg(error)
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
      router.push('/')
    } catch (error) {
      setMsg(error.response.data.message)
      setIsError(true)
    }
  }
  
  return (
    <>
      <section className="py-96 px-36 max-sm:py-64">
        { msg != '' && (<Alert variant={isError ? "error" : "success"} title={isError ? "حدث خطأ !" : ""} message={msg} /> )}
        <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md ">تعيين كلمة المرور الجديدة</h1>
        <p className="font-normal text-sm text-gray-500 mt-6">يرجى إنشاء كلمة مرور جديدة تحتوي على أحرف وأرقام ورموز</p>
        <div className="flex items-center gap-x-80">
          <form onSubmit={handleOnSubmit} className="w-1/2 max-sm:w-full max-sm:mt-4">
            <div className="space-y-6 text-right">
              <div>
                <Label>كلمة المرور الجديدة <span className="text-error-500">*</span></Label>
                <Input name="password" defaultValue={user.password} type="password" onChange={handleUserChange} />
              </div>
              <div>
                <Label>تأكيد كلمة المرور <span className="text-error-500">*</span></Label>
                <Input name="password_confirmation" defaultValue={user.password_confirmation} type="password" onChange={handleUserChange} />
              </div>
              <div>
                <Button className="w-full" size="sm">حفظ التغييرات</Button>
              </div>
            </div>
          </form>
          <img src="/images/logo/logo-blue.png" alt="logo" className="w-80 max-sm:hidden h-80" loading="lazy" />
        </div>
      </section>
    </>
  );
}
export default NewPasswordForm