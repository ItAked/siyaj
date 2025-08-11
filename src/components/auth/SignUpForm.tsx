/* eslint-disable @next/next/no-img-element */
'use client'

import { EyeClosed, EyeIcon } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";
import { loginGoogleAuth, signup } from "../../../services/auth";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    license: "",
    medical: "",
    employer: "",
    password: "",
    password_confirmation: "",
    license_file: "" as File | string,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function handleUserChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    try {
      if (event.target.type === 'file') {
        const fileInput = event.target as HTMLInputElement;
        setUser(prevUser => ({
          ...prevUser,
          [event.target.name]: fileInput.files?.[0] || ""
        }));
      } else {
        setUser(prevUser => ({
          ...prevUser,
          [event.target.name]: event.target.value
        }));
      }
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : String(error));
    }
  }
  async function handleGoogleSignIn() {
    try {
      await loginGoogleAuth();
      setErrorMsg('');
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : String(error));
    }
  }
  async function handleOnSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      const formData = new FormData();      
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('phone', user.phone);
      formData.append('license', user.license);
      formData.append('medical', user.medical);
      formData.append('employer', user.employer);
      formData.append('password', user.password);
      formData.append('password_confirmation', user.password_confirmation);
      if (user.license_file instanceof File) {
        formData.append('license_file', user.license_file);
      }
      await signup(formData)
      setErrorMsg('')
      router.push('/practitioner/auth/signin');
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  }

  return (
    <section className="flex items-center justify-evenly py-36">
      <div>
        {errorMsg && (<Alert variant={"error"} title='حدث خطأ!' message={errorMsg} />)}
        <h1 className="font-medium text-4xl my-10">إنشاء حساب</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="space-y-6 text-right">
            <div>
              <Label>الإسم الثلاثي <span className="text-error-500">*</span></Label>
              <Input required={true} placeholder="الإسم الثلاثي" name="name" defaultValue={user.name} type="text" onChange={handleUserChange} />
            </div>
            <div>
              <Label>البريد الإلكتروني <span className="text-error-500">*</span></Label>
              <Input required={true} placeholder="info@gmail.com" name="email" defaultValue={user.email} type="email" onChange={handleUserChange} />
            </div>
            <div>
              <Label>رقم الجوال <span className="text-error-500">*</span></Label>
              <Input required={true} placeholder="555527557" name="phone" defaultValue={user.phone} type="tel" onChange={handleUserChange} />
            </div>
            <div>
              <Label>رقم الترخيص المهني <span className="text-error-500">*</span></Label>
              <Input required={true} placeholder="رقم الترخيص المهني" name="license" defaultValue={user.license} type="text" onChange={handleUserChange} />
            </div>
            <div>
              <Label>التخصص الطبي <span className="text-error-500">*</span></Label>
              <Input required={true} placeholder="التخصص الطبي" name="medical" defaultValue={user.medical} type="text" onChange={handleUserChange} />
            </div>
            <div>
              <Label>إسم جهة العمل <span className="text-error-500">*</span></Label>
              <Input required={true} placeholder="إسم جهة العمل" name="employer" defaultValue={user.employer} type="text" onChange={handleUserChange} />
            </div>
            <div>
              <Label>كلمة المرور <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleUserChange} name="password"
                defaultValue={user.password} required={true} />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2">
                  {showPassword ? (<EyeIcon className="fill-white dark:fill-gray-400" />) : (<EyeClosed className="fill-white dark:fill-gray-400" />)}
               </span>
              </div>
            </div>
            <div>
              <Label> تأكيد كلمة المرور <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleUserChange} name="password_confirmation"
                defaultValue={user.password_confirmation} required={true} />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2">
                  {showPassword ? (<EyeIcon className="fill-white dark:fill-gray-400" />) : (<EyeClosed className="fill-white dark:fill-gray-400" />)}
                </span>
              </div>
            </div>
            <div>
              <Label> رفع صورة الترخيص المهني <span className="text-error-500">*</span></Label>
              <Input name="license_file" type="file" onChange={handleUserChange} required={true} />
            </div>
            <div>
              <Button className="w-full bg-brand-500" size="sm">إنشاء الحساب</Button>
              <div className="my-4 py-3.5">
                <p className="text-gray-500 text-sm text-center mb-4">او التسجيل بإستخدام</p>
                <button className="w-full btn btn-sm bg-white shadow-md text-gray-500 font-medium border-none text-center"
                onClick={handleGoogleSignIn}>Sign Up with Google <img src="/images/icons/Google_Logo.png" alt="google" className="w-6" /></button>
              </div>
            </div>
            <div className="flex items-center gap-x-0.5 justify-center text-sm">
              <p className="text-gray-500">لديك حساب؟</p>
              <Link href="/practitioner/auth/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">سجّل الدخول</Link>
            </div>
          </div>
        </form>
      </div>
      <img src="/images/logo/Logo.png" alt="logo" className="max-sm:hidden" />
    </section>
  );
}