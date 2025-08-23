"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { readSetting, updateSetting } from "../../../services/setting";
import Alert from "../ui/alert/Alert";

type MetaSetting = {
  email?: string;
  name?: string;
  medical? :string;
  phone?:  string;
}

export default function UserInfoCard() {
  const [metaSetting, setMetaSetting] = useState<MetaSetting>({})
  const [profileName, setProfileName] = useState(metaSetting.name || "");
  const [profileEmail, setProfileEmail] = useState(metaSetting.email || "");
  const [profilePhone, setProfilePhone] = useState(metaSetting.phone || "");
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  async function getProfileData(){
    try {
      const response = await readSetting()
      setMetaSetting(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    getProfileData()
  }, [])  
  useEffect(() => {
    setProfileName(metaSetting.name || "");
    setProfileEmail(metaSetting.email || "");
    setProfilePhone(metaSetting.phone || "");
  }, [metaSetting.name, metaSetting.email, metaSetting.phone]);

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    try {
      await updateSetting({
        name: profileName,
        email: profileEmail,
        phone: profilePhone,
        license: undefined,
        medical: undefined,
        employer: undefined
      });
      setIsSuccess(true)
      setSuccessMsg('تم تحديث المعلومات بنجاح');
      setErrorMsg('');
      setTimeout(() => {
        const dialog = document.getElementById('my_modal_5') as HTMLDialogElement | null;
        getProfileData()
        if (dialog) dialog.close();
      }, 1500);
    } catch (error) {
      setIsSuccess(false)
      setErrorMsg(error.response?.data?.message || 'حدث خطأ أثناء التحديث');
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">المعلومات الشخصية</h4>
          <div className="grid gap-4 2xl:gap-x-32 max-sm:mt-4">
            <div className="flex items-center gap-x-32">
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">الإسم الثلاثي</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{metaSetting.name}</p>
            </div>
            <div className="flex items-center gap-x-28">
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">البريد الإلكتروني</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{metaSetting.email}</p>
            </div>
            <div className="flex items-center gap-x-32">
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">رقم الجوال</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{metaSetting.phone}</p>
            </div>
          </div>
        </div>
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box dark:bg-gray-900">
            <div className="px-2">
              <h4 className="mb-2 text-xl text-gray-800 dark:text-white/90">تعديل البيانات الشخصية</h4>
            </div>
            <form className="flex flex-col" onSubmit={handleSave}>
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2">
                <div className="mt-7">
                  <div className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    {errorMsg && (<Alert variant="error" title="حدث خطأ!" message={errorMsg} />)}
                    {isSuccess && (<Alert variant="success" title="تم التحديث بنجاح" message={successMsg} />)}
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>الإسم الثلاثي</Label>
                      <Input onChange={(e) => setProfileName(e.target.value)} type="text" defaultValue={profileName} required />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Label>البريد الإلكتروني</Label>
                      <Input type="email" onChange={(e) => setProfileEmail(e.target.value)} defaultValue={profileEmail} required />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Label>رقم الجوال</Label>
                      <Input type="tel" onChange={(e) => setProfilePhone(e.target.value)} defaultValue={profilePhone} required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-start">
                <button type="submit" className="btn bg-brand-500 shadow-none border-none rounded-lg text-white w-36">تعديل</button>
                <button className="btn bg-transparent shadow-none rounded-lg text-brand-500 border-brand-500 dark:border-white dark:text-white w-36"
                onClick={() => {const dialog = document.getElementById('my_modal_5') as HTMLDialogElement | null; if (dialog) dialog.close();}}>إلغاء</button>
              </div>
            </form>
          </div>
        </dialog>
        <button 
          onClick={() => {
            setIsSuccess(false);
            setErrorMsg('');
            const dialog = document.getElementById('my_modal_5') as HTMLDialogElement | null; 
            if (dialog) dialog.showModal();
          }} 
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700
          shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]
          dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
          <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158
            3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814
            8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982
            14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359
            11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597
            5.55281Z" fill="" />
          </svg>
          تعديل
        </button>
      </div>
    </div>
  );
}