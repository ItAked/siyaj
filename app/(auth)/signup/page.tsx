'use client'

import DialogComponent from "@/components/ui/dialog";
import InputComponent from "@/components/ui/input";
import { post } from "@/server/AuthServer/register";
import { Building2, Copyright, Lock, Mail, Paperclip, Phone, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    license: "",
    medical: "",
    employer: "",
    password: "",
    password_confirmation: "",
    license_file: ""
  })

  function handleUserChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    try {
      if (event.target.type === 'file') {
            const fileInput = (event.target as HTMLInputElement) || ''
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: fileInput.files?.[0] }
            })
        } else {
            setUser((prevUser) => {
                return { ...prevUser, [event.target.name]: event.target.value }
            })
        }
    } catch (error) {
      alert(error)
      
    }
  }

  async function handleOnSubmit(event: FormEvent) {
    try {
      event.preventDefault()
      

      let formData = new FormData()
      formData.append('name', user.name)
      formData.append('email', user.email)
      formData.append('phone', user.phone)
      formData.append('license', user.license)
      formData.append('medical', user.medical)
      formData.append('employer', user.employer)
      formData.append('password', user.password)
      formData.append('password_confirmation', user.password_confirmation)
      formData.append('license_file', user.license_file)
      
      await post(formData)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-center">إنشاء حساب</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleOnSubmit}>
        <div className="space-y-4">
          <div>
            <InputComponent label="الإسم الثلاثي" name="name" type="text" placeholder="لجين صلاح" changeHandler={handleUserChange} value={user.name} icon={<User className='text-gray-600 w-4 h-4 mb-1.5' />} />
          </div>
          <div>
            <InputComponent label="البريد الإلكتروني" name="email" type="email" placeholder="lujain@akedco.com" changeHandler={handleUserChange} value={user.email}
             icon={<Mail className='text-gray-600 w-4 h-4 mb-1.5' />} />
          </div>
          <div>
            <InputComponent label="رقم الجوال" name="phone" type="number" placeholder="555512345" changeHandler={handleUserChange} value={user.phone}
            icon={<Phone className='text-gray-600 w-4 h-4 mb-1.5' />} />
          </div>
          <div>
            <InputComponent label="رقم الترخيص المهني" name="license" type="text" placeholder="رقم الترخيص المهني" changeHandler={handleUserChange} value={user.license}
            icon={<Copyright className='text-gray-600 w-4 h-4 mb-1.5' />} />
          </div>
          <div>
            <InputComponent label="التخصص الطبي" name="medical" type="text" placeholder="التخصص الطبي" changeHandler={handleUserChange} value={user.medical}
            icon={<Stethoscope className='text-gray-600 w-4 h-4 mb-1.5' /> } />
          </div>
          <div>
            <InputComponent label="اسم جهة العمل" name="employer" type="text" placeholder="شركة أكيد" changeHandler={handleUserChange} value={user.employer}
            icon={<Building2 className='text-gray-600 w-4 h-4 mb-1.5' />} />
          </div>
          <div className="grid gap-y-5 items-center lg:flex lg:gap-x-4 md:flex md:gap-x-4">
            <div className="w-full">
              <InputComponent label="كلمة المرور" name="password" type="password" placeholder="••••••••" changeHandler={handleUserChange} value={user.password}
              icon={<Lock className='text-gray-600 w-4 h-4 mb-1.5' />} />
            </div>
            <div className="w-full">
              <InputComponent label="تأكيد كلمة المرور" name="password_confirmation" type="password" placeholder="••••••••" changeHandler={handleUserChange}
              value={user.password_confirmation} icon={<Lock className='text-gray-600 w-4 h-4 mb-1.5' />} />
            </div>
          </div>
          <div>
            <InputComponent label="رفع صورة الترخيص المهني" name="license_file" type="file" placeholder="" changeHandler={handleUserChange}
            icon={<Paperclip className='text-gray-600 w-4 h-4 mb-1.5' />} value={undefined} />
          </div>
          <div className="flex items-center justify-between">
            <DialogComponent />
          </div>
        </div>
        <div className="mt-6 space-y-4 grid place-items-center">
          <button className="btn w-full bg-linear-to-t from-yellow-600 to-yellow-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]">
            إنشاء حساب
          </button>
          <Link href="/signin" className="text-sm text-gray-700 underline hover:no-underline">هل لديك حساب؟ 
          <span className="text-gray-800"> لتسجيل الدخول</span></Link>
        </div>
      </form>
    </>
  );
}

