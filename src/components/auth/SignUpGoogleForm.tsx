'use client'

import { useRouter, useSearchParams } from "next/navigation";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { ChangeEvent, FormEvent, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Alert from "../ui/alert/Alert";
import { signup } from "../../../services/auth";

export default function SignUpGoogle(){
    const params = useSearchParams()
    const userEmail = params.get('email')
    const userName = params.get('name');
    const [step1Data, setStep1Data] = useState({
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
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
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
    async function handleOnSubmit(event: FormEvent) {
      try {
        event.preventDefault();
        const formData = new FormData();      
        formData.append('name', userName ?? '');
        formData.append('email', userEmail ?? '');
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
        router.push('/auth/signin');
      } catch (error) {
        setErrorMsg(error instanceof Error ? error.message : String(error));
      }
    }
    function nextStep(event: FormEvent) {
      event.preventDefault();
      if (!step1Data.password || !step1Data.password_confirmation || !step1Data.phone) {
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
                    <input type="text" value={userName ?? ''} name="name" className="input w-full" readOnly />
                  </div>
                  <div>
                    <Label>البريد الإلكتروني <span className="text-error-500">*</span></Label>
                    <input type="text" value={userEmail ?? ''} name="email" className="input w-full" readOnly />
                  </div>
                  <div>
                    <Label>رقم الجوال <span className="text-error-500">*</span></Label>
                    <Input placeholder="555527557" name="phone" defaultValue={step1Data.phone} type="tel" onChange={handleStep1Change} />
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