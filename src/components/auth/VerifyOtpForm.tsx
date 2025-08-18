'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import Alert from "../ui/alert/Alert"
import Label from "../form/Label"
import Input from "../form/input/InputField"
import Button from "../ui/button/Button"
import { useRouter } from "next/navigation"
import { verifyOtp } from "../../../services/auth"

const VerifyOtpForm = () => {
  const [user, setUser] = useState({'otp': ''})
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  
  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUser((prevUser) => {
        return { ...prevUser, [event.target.name]: event.target.value}
      })
    } catch (error) {
      setIsError(error)
    }
  }
  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('otp', user.otp)
    try {
      await verifyOtp(formData)
      setIsError(false)
      router.push('/auth/new-password')
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
              <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md ">أدخل رمز التحقق</h1>
              <p className="font-normal text-sm text-gray-500 mt-6">يرجى إدخال رمز التحقق المكون من ٦ أرقام المرسل إلى بريدك الإلكتروني</p>
            </div>
            <form onSubmit={handleOnSubmit} className="max-sm:w-full max-sm:mt-4">
              <div className="space-y-6 text-right">
                <div>
                  <Label>رمز التحقق <span className="text-error-500">*</span></Label>
                  <Input name="otp" defaultValue={user.otp} type="number" onChange={handleUserChange} />
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
export default VerifyOtpForm