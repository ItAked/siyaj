'use client'

import InputComponent from "@/components/ui/input";
import Link from "next/link";
import { useState, ChangeEvent } from "react";

export default function SignIn() {
    const [user, setUser] = useState({
      email: "",
      password: ""
    })
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
          <h1 className="text-4xl font-bold">تسجيل الدخول</h1>
        </div>
        {/* Form */}
        <form>
          <div className="space-y-4">
            <div>
              <InputComponent label="البريد الإلكتروني" name="email" type="email" placeholder="lujain@akedco.com" changeHandler={handleUserChange} value={user.email} />
            </div>
            <div>
              <InputComponent label="كلمة المرور" name="password" type="password" placeholder="••••••••" changeHandler={handleUserChange} value={user.password} />
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
