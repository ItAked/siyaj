'use client'

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Alert from "../ui/alert/Alert";
import { loginGoogleAuth, signup } from "../../../services/auth";

export default function SignUp() {
  const router = useRouter();
  const [step1Data, setStep1Data] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [step2Data, setStep2Data] = useState({
    license: "",
    medical: "",
    employer: "",
    license_file: "" as File | string,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [step, setStep] = useState(1);

  function handleStep1Change(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    try {
      setStep1Data(prev => ({...prev, [event.target.name]: event.target.value}));
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : String(error));
    }
  }
  function handleStep2Change(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    try {
      if (event.target.type === 'file') {
        const fileInput = event.target as HTMLInputElement;
        setStep2Data(prev => ({...prev, [event.target.name]: fileInput.files?.[0] || ""}));
      } else {
        setStep2Data(prev => ({...prev, [event.target.name]: event.target.value}));
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
      setErrorMsg(error.response.data.message)
    }
  }

  async function handleOnSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      const formData = new FormData();      
      formData.append('name', step1Data.name);
      formData.append('email', step1Data.email);
      formData.append('phone', step1Data.phone);
      formData.append('password', step1Data.password);
      formData.append('password_confirmation', step1Data.password_confirmation);
      formData.append('license', step2Data.license);
      formData.append('medical', step2Data.medical);
      formData.append('employer', step2Data.employer);
      if (step2Data.license_file instanceof File) {
        formData.append('license_file', step2Data.license_file);
      }
      await signup(formData);
      setErrorMsg('');
      router.push('/practitioner');
    } catch (error) {
      setErrorMsg(error.response.data.message)
    }
  }

  function nextStep(event: FormEvent) {
    event.preventDefault();
    if (!step1Data.name || !step1Data.email || !step1Data.password || !step1Data.password_confirmation || !step1Data.phone) {
      setErrorMsg('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }
    if (step1Data.password !== step1Data.password_confirmation) {
      setErrorMsg('كلمة المرور وتأكيدها غير متطابقين');
      return;
    }
    if (step1Data.phone.length < 9) {
      setErrorMsg('رقم الهاتف يجب أن يكون على الأقل 9 أرقام');
      return;
    }
    if (!step1Data.phone.startsWith('5')) {
      setErrorMsg('رقم الهاتف يجب أن يبدأ بالرقم 5');
      return;
    }
    if (step1Data.password.length < 8) {
      setErrorMsg('كلمة المرور يجب أن تكون على الأقل ٨ أحرف مكونة من حرف كبير، أحرف صغيرة، أرقام، علامة');
      return;
    }
    setStep(2);
    setErrorMsg('');
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-medium text-gray-800 text-title-md dark:text-white/90 sm:text-title-md text-right">إنشاء حساب</h1>
            {errorMsg != '' && (<Alert variant={"error"} title={"حدث خطأ !"} message={errorMsg} />)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className="bg-brand-500 h-2.5 rounded-full" 
              style={{ width: `${step === 1 ? '50%' : '100%'}` }}
            ></div>
          </div>
          <div>
            {step === 1 ? (
              <form onSubmit={nextStep}>
                <div className="space-y-6 text-right">
                  <div>
                    <Label>الإسم الثلاثي <span className="text-error-500">*</span></Label>
                    <Input placeholder="الإسم الثلاثي" name="name" defaultValue={step1Data.name} type="text" onChange={handleStep1Change} />
                  </div>
                  <div>
                    <Label>البريد الإلكتروني <span className="text-error-500">*</span></Label>
                    <Input placeholder="info@gmail.com" name="email" defaultValue={step1Data.email} type="email" onChange={handleStep1Change} />
                  </div>
                  <div>
                    <Label>رقم الجوال <span className="text-error-500">*</span></Label>
                    <Input placeholder="53**********" name="phone" defaultValue={step1Data.phone} type="tel" onChange={handleStep1Change} />
                  </div>
                  <div>
                    <Label>كلمة المرور <span className="text-error-500">*</span></Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleStep1Change} name="password"
                      defaultValue={step1Data.password} />
                      <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2">
                        {showPassword ? (<EyeIcon className="fill-white dark:fill-gray-400" />) : (<EyeClosedIcon className="fill-white dark:fill-gray-400" />)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label> تأكيد كلمة المرور <span className="text-error-500">*</span></Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleStep1Change} name="password_confirmation"
                      defaultValue={step1Data.password_confirmation} />
                      <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2">
                        {showPassword ? (<EyeIcon className="fill-white dark:fill-gray-400" />) : (<EyeClosedIcon className="fill-white dark:fill-gray-400" />)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="w-full bg-blue-300 btn text-white border-none">التالي</button>
                    <div className="my-4 py-3.5">
                      <p className="text-gray-500 text-sm text-center mb-4">او التسجيل بإستخدام</p>
                      <button className="w-full btn btn-sm bg-white shadow-md text-gray-500 font-medium border-none text-center border-[#e5e5e5]"
                      onClick={handleGoogleSignIn}>
                        Sign Up with Google
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0"
                        fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-0.5 justify-center text-sm">
                    <p className="text-gray-500">لديك حساب؟</p>
                    <Link href="/auth/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">سجّل الدخول</Link>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOnSubmit}>
                <div className="space-y-6 text-right">
                  <div>
                    <Label>رقم الترخيص المهني <span className="text-error-500">*</span></Label>
                    <input className="input w-full" required placeholder="رقم الترخيص المهني" name="license" value={step2Data.license} type="text"
                    onChange={handleStep2Change} />
                  </div>
                  <div>
                    <Label>التخصص الطبي <span className="text-error-500">*</span></Label>
                    <input className="input w-full" required placeholder="التخصص الطبي" name="medical" value={step2Data.medical} type="text" onChange={handleStep2Change} />
                  </div>
                  <div>
                    <Label>إسم جهة العمل <span className="text-error-500">*</span></Label>
                    <input className="input w-full" required placeholder="إسم جهة العمل" name="employer" value={step2Data.employer} type="text"
                    onChange={handleStep2Change} />
                  </div>
                  <div>
                    <Label> رفع صورة الترخيص المهني <span className="text-error-500">*</span></Label>
                    <input className="file-input w-full" required name="license_file" type="file" onChange={handleStep2Change} />
                  </div>
                </div>
                <div className="join join-vertical lg:join-horizontal mt-4">
                  <button className="w-full bg-blue-300 btn text-white border-none join-item" onClick={() => setStep(1)}>السابق</button>
                  <button type="submit" className="w-full bg-brand-500 btn text-white border-none join-item">تسجيل الدخول</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}