'use client'

import { useRouter, useSearchParams } from "next/navigation";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { EyeClosed, EyeIcon } from "lucide-react";
import Alert from "../ui/alert/Alert";
import { signup } from "../../../services/auth";

export default function SignUpGoogle(){
    const params = useSearchParams()
    const userEmail = params.get('email')
    const userName = params.get('name');
    // const googleId = params.get('google_id');
    const [user, setUser] = useState({
        phone: "",
        license: "",
        medical: "",
        employer: "",
        password: "",
        password_confirmation: "",
        license_file: "" as File | string,
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();

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
    async function handleOnSubmit(event: FormEvent) {
        try {
          event.preventDefault();
          const formData = new FormData();      
          formData.append('name', userName ?? "");
          formData.append('email', userEmail ?? "");
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
    <div className="flex flex-col flex-1 lg:w-1/2 w-full py-40 mx-auto">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-sky-600 text-title-sm dark:text-white/90 sm:text-title-md text-right">إنشاء الحساب للممارسين الصحيين</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-right">الرجاء إدخال البيانات المطلوبة</p>
          </div>
          <div>
            <form onSubmit={handleOnSubmit}>
              <div className="space-y-6 text-right">
                <div>
                  <Label>الإسم الثلاثي <span className="text-error-500">*</span></Label>
                  <Input required={true} placeholder="الإسم الثلاثي" name="name" defaultValue={userName ?? ""} type="text" onChange={handleUserChange} />
                </div>
                <div>
                  <Label>البريد الإلكتروني <span className="text-error-500">*</span></Label>
                  <Input required={true} placeholder="info@gmail.com" name="email" defaultValue={userEmail ?? ""} type="email" onChange={handleUserChange} />
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
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2">
                      {showPassword ? (
                        <EyeIcon className="fill-white dark:fill-gray-400" />
                      ) : (
                        <EyeClosed className="fill-white dark:fill-gray-400" />
                      )}
                    </span>
                    <Input type={showPassword ? "text" : "password"} placeholder="أدخل كلمة المرور" onChange={handleUserChange} name="password"
                    defaultValue={user.password} required={true} />
                  </div>
                </div>
                <div>
                  <Label> تأكيد كلمة المرور <span className="text-error-500">*</span></Label>
                  <div className="relative">
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2">
                      {showPassword ? (
                        <EyeIcon className="fill-white dark:fill-gray-400" />
                      ) : (
                        <EyeClosed className="fill-white dark:fill-gray-400" />
                      )}
                    </span>
                    <Input type={showPassword ? "text" : "password"} placeholder="أدخل كلمة المرور" onChange={handleUserChange} name="password_confirmation"
                    defaultValue={user.password_confirmation} required={true} />
                  </div>
                </div>
                <div>
                  <Label> رفع صورة الترخيص المهني <span className="text-error-500">*</span></Label>
                  <Input name="license_file" type="file" onChange={handleUserChange} required={true} />
                </div>
                {errorMsg && (
                  <Alert variant={"error"} title='حدث خطأ!' message={errorMsg} />
                )}
                <div>
                  <Button className="w-full bg-sky-600" size="sm">إنشاء الحساب</Button>
                </div>
                <Link href="/practitioner/auth/signin" className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">هل لديك حساب؟</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}