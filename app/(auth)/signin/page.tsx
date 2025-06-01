'use client'

import InputComponent from "@/components/ui/input";
import { post } from "@/server/AuthServer/login";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";

export default function SignIn() {
    const [user, setUser] = useState({
      email: "",
      password: ""
    })
  
    function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
      try {
        setUser((prevUser) => {          
          return { ...prevUser, [event.target.name]: event.target.value}
        })
      } catch (error) {
        console.log(error);
      }
    }

    async function handleUserSubmit(event:FormEvent) {
      try {
        event.preventDefault()
  
        let formData = new FormData()
        formData.append('email', user.email)
        formData.append('password', user.password)
  
        let response = await post(formData)
        alert(response)
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">تسجيل الدخول</h1>
        </div>
        {/* Form */}
        <form onSubmit={handleUserSubmit}>
          <div className="space-y-4">
            <div>
              <InputComponent label="البريد الإلكتروني" name="email" type="email" placeholder="lujain@akedco.com" changeHandler={handleUserChange} value={user.email}
              icon={<Mail className='text-gray-600 w-4 h-4 mb-1.5' />} />
            </div>
            <div>
              <InputComponent label="كلمة المرور" name="password" type="password" placeholder="••••••••" changeHandler={handleUserChange} value={user.password}
              icon={<Lock className='text-gray-600 w-4 h-4 mb-1.5' />} />
            </div>
          </div>
          <div className="mt-6">
            <button className="btn w-full bg-linear-to-t from-yellow-600 to-yellow-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]">
              تسجيل الدخول
            </button>
          </div>
        </form>
        {/* Bottom link */}
        <div className="mt-6 text-center grid">
          <Link
            className="text-sm text-gray-700 underline hover:no-underline"
            href="/reset-password"
          >
            هل نسيت كلمة المرور؟
          </Link>
          <Link
            className="text-sm text-gray-700 underline hover:no-underline"
            href="/signup"
          >
            ليس لديك حساب؟ لإنشاء حساب
          </Link>
        </div>
      </>
  );
}
