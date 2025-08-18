"use client";

import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { updateSetting } from "../../../services/setting";

export default function UserHealthCard(props: { loading: boolean; error: string; employer: string | undefined; license: string | undefined;
    license_file: string | undefined; medical: string | undefined; }) {
  const [profileEmployer, setProfileEmployer] = useState("")
  const [profileLicense, setProfileLicense] = useState("")
  const [profileMedical, setProfileMedical] = useState("")
  
  async function handleSave (){
    await updateSetting({
      name: profileEmployer !== "" ? profileEmployer : props.employer,
      email: profileLicense !== "" ? profileLicense : props.license,
      phone: profileMedical !== "" ? profileMedical : props.medical
    })
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">معلومات الممارس المهنية</h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">رقم الترخيص المهني</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{ props.license }</p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">التخصص الطبي</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{ props.medical }</p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">اسم جهة العمل</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{ props.employer }</p>
            </div>
            <div>
              <a href={ props.license_file } className="text-sm font-medium text-gray-800 dark:text-white/90 link">تحميل الترخيص المهني</a>
            </div>
          </div>
        </div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box dark:bg-gray-900">
            <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form>
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">تعديل معلومات الممارس المهنية</h4>
            </div>
            <form className="flex flex-col">
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                <div className="mt-7">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>رقم الترخيص المهني</Label>
                      <Input onChange={(e) => setProfileLicense(e.target.value)} type="text" defaultValue={props.license} />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Label>التخصص الطبي</Label>
                      <Input type="text" onChange={(e) => setProfileMedical(e.target.value)} defaultValue={props.medical} />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Label>إسم جهة العمل</Label>
                      <Input type="text" onChange={(e) => setProfileEmployer(e.target.value)} defaultValue={props.employer} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" onClick={handleSave}>تعديل</Button>
              </div>
            </form>
          </div>
        </dialog>
        <button onClick={() => {
          const dialog = document.getElementById('my_modal_2') as HTMLDialogElement | null;
          if (dialog) dialog.showModal();
        }} className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700
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
