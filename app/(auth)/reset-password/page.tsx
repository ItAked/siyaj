'use client'

import InputComponent from "@/components/ui/input";
import { Mail } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function ResetPassword() {
  const [user, setUser] = useState({ email: "" })
  const [errorMsg, setErrorMsg] = useState(false)
      
  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
        try {
          setUser((prevUser) => {
            console.log({ ...prevUser, [event.target.name]: event.target.value});
            
            return { ...prevUser, [event.target.name]: event.target.value}
          })
        } catch (error) {
          console.log(error);
          
        }
      }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">نسيان كلمة المرور</h1>
      </div>

      {/* Form */}
      <form>
        <div className="space-y-4">
          <div>
            <InputComponent label="البريد الإلكتروني" name="email" type="email" placeholder="lujain@akedco.com" changeHandler={handleUserChange} value={user.email}
              icon={<Mail className='text-gray-600 w-4 h-4 mb-1.5' />} />
          </div>
        </div>
        <div className="mt-6">
          <button className="btn w-full bg-linear-to-t from-yellow-600 to-yellow-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]">
            إعادة إنشاء كلمة المرور
          </button>
        </div>
      </form>
    </>
  );
}
