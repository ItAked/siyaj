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
      <div className="flex flex-col flex-1 lg:w-1/2 w-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              { msg != '' && (<Alert variant={isError ? "error" : "success"} title={isError ? "حدث خطأ !" : ""} message={msg} /> )}
              <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md ">تعيين كلمة المرور الجديدة</h1>
              <p className="font-normal text-sm text-gray-500 mt-6">يرجى إنشاء كلمة مرور جديدة تحتوي على أحرف وأرقام ورموز</p>
            </div>
            <form onSubmit={handleOnSubmit} className="max-sm:w-full max-sm:mt-4">
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
          </div>
        </div>
      </div>
    </>
  );
}
export default NewPasswordForm