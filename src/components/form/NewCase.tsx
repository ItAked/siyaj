"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "./Label";
import Input from "./input/InputField";
import Alert from "../ui/alert/Alert";
import { createCase } from "../../../services/cases";
import { useRouter } from "next/navigation";

export default function NewCase() {
  const [newCase, setNewCase] = useState({
    'description': '',
    'title': '',
    'status': '',
    'stages': '',
    'case_number': '',
    'attachments': [] as File[] // Changed to array for multiple files
  })
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (event.target.type === 'file') {
      const fileInput = event.target as HTMLInputElement
      if (fileInput.files) {
        const filesArray = Array.from(fileInput.files)
        console.log(filesArray);
        
        setNewCase((prevCase) => {
          return { ...prevCase, attachments: filesArray }
        })
      }
    } else {
      setNewCase((prevCase) => {
        return { ...prevCase, [event.target.name]: event.target.value}
      })
    }
  }

  const handleSave = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const form = new FormData()
      form.append('description', newCase.description)
      form.append('title', newCase.title)
      form.append('status', newCase.status)
      form.append('stages', newCase.stages)
      form.append('case_number', newCase.case_number)      
      newCase.attachments.forEach((file) => {
        form.append('attachments[]', file)
      })
      const response = await createCase(form)
      setIsError(false)
      setMsg(response.message)
      router.push('/practitioner/cases')
    } catch (error) {
      setIsError(true)
      setMsg(error.response?.data?.message || 'حدث خطأ أثناء إنشاء الدعوى')
    }
  };
  
  return (
    <ComponentCard>
        <form onSubmit={handleSave}>
          { msg != '' && (
            isError ? (<div className="mb-4">
            <Alert variant={"error"} title={"حدث خطأ!"} message={msg} />
          </div>) : (<div className="mb-4">
            <Alert variant={"success"} title={""} message={msg} />
          </div>)
          )}
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">إنشاء دعوى جديدة</h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>عنوان الدعوى</Label>
              <Input type="text" placeholder="عنوان الدعوى" required defaultValue={newCase.title} name="title" onChange={handleInputChange} />
            </div>

            <div className="col-span-1">
              <Label>رقم الدعوى</Label>
              <Input type="integer" placeholder="إدخال رقم الدعوى المكون من ١٠ أرقام" name="case_number" defaultValue={newCase.case_number}
              onChange={handleInputChange} />
            </div>

            <div className="col-span-1">
              <Label>محتوى الدعوى</Label>
              <textarea className="textarea w-full dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800" name="description"
              onChange={handleInputChange} required placeholder="محتوى الدعوى"></textarea>
            </div>

            <div className="col-span-1">
                <fieldset className="fieldset">
                    <Label>حالة الدعوى</Label>
                    <select defaultValue={newCase.status} name="status" className="select w-full dark:border-gray-700 dark:bg-gray-900 dark:text-white/90
                    dark:focus:border-brand-800" required onChange={handleInputChange}>
                        <option value={0}>اختر حالة الدعوى</option>
                        <option value="منظورة لدى الدائرة القضائية">منظورة لدى الدائرة القضائية</option>
                        <option value="منظورة لمنصة تراضي">منظورة لمنصة تراضي</option>
                        <option value="منظورة للشؤون الصحية">منظورة للشؤون الصحية</option>
                    </select>
                </fieldset>
            </div>

            <div className="col-span-1">
                <fieldset className="fieldset">
                    <Label>مرحلة الدعوى</Label>
                    <select defaultValue={newCase.stages} name="stages" className="select w-full dark:border-gray-700 dark:bg-gray-900 dark:text-white/90
                    dark:focus:border-brand-800" required onChange={handleInputChange}>
                        <option value={0}>اختر مرحلة الدعوى</option>
                        <option value="شؤون صحية">شؤون صحية</option>
                        <option value="أحيلت لمنصة تراضي">أحيلت لمنصة تراضي</option>
                        <option value="أحيلت لدائرة القضايا">أحيلت لدائرة القضايا</option>
                    </select>
                </fieldset>
            </div>

            <div className="col-span-1">
                <Label>ملفات الدعوى (يمكن اختيار أكثر من ملف)</Label>
                <input 
                  required 
                  name="attachments" 
                  onChange={handleInputChange} 
                  type="file" 
                  multiple // Add multiple attribute
                  className="file-input dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800" 
                />
                {newCase.attachments.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    تم اختيار {newCase.attachments.length} ملف(ات)
                  </p>
                )}
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <button type="submit" className="btn btn-sm bg-gray-900 text-white dark:shadow-none dark:bg-white dark:text-gray-950 dark:border">إضافة دعوى</button>
          </div>
        </form>
    </ComponentCard>
  );
}