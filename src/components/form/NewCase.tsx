"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "./Label";
import Input from "./input/InputField";
import Alert from "../ui/alert/Alert";
import { createCase } from "../../../services/cases";

export default function NewCase() {
  const [newCase, setNewCase] = useState({
    'description': '',
    'title': '',
    'status': '',
    'stages': '',
    'case_number': '',
    'attachment': ''
  })
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (event.target.type === 'file') {
      const fileInput = event.target as HTMLInputElement
      setNewCase((prevCase) => {
        return { ...prevCase, [event.target.name]: fileInput.files?.[0]}
      })
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
      form.append('attachment', newCase.attachment)
      const response = await createCase(form)
      setIsError(false)
      setMsg(response.message)
    } catch (error) {
      setIsError(true)
      setMsg(error.response.data.message)
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
              <textarea className="textarea w-full" name="description" onChange={handleInputChange} required placeholder="محتوى الدعوى"></textarea>
            </div>

            <div className="col-span-1">
                <fieldset className="fieldset">
                    <Label>حالة الدعوى</Label>
                    <select defaultValue={newCase.status} name="status" className="select w-full" required onChange={handleInputChange}>
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
                    <select defaultValue={newCase.stages} name="stages" className="select w-full" required onChange={handleInputChange}>
                        <option value={0}>اختر مرحلةالدعوى</option>
                        <option value="شؤون صحية">شؤون صحية</option>
                        <option value="أحيلت لمنصة تراضي">أحيلت لمنصة تراضي</option>
                        <option value="أحيلت لدائرة الدعاوى">أحيلت لدائرة الدعاوى</option>
                    </select>
                </fieldset>
            </div>

            <div className="col-span-1">
                <Label>ملفات الدعوى</Label>
                <input required defaultValue={undefined} name="attachment" onChange={handleInputChange} type="file" className="file-input" />
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <button type="submit" className="btn btn-sm bg-gray-900 text-white dark:shadow-none dark:bg-white dark:text-gray-950 dark:border">إضافة دعوى</button>
          </div>
        </form>
    </ComponentCard>
  );
}
