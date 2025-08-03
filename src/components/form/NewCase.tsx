"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "./Label";
import Input from "./input/InputField";
import Alert from "../ui/alert/Alert";
import { createCase } from "../../../services/cases";
import { readAllLawyers } from "../../../services/lawyers";

interface Lawyers {
  id: number;
  name: string;
}

export default function NewCase() {
  const [newCase, setNewCase] = useState({
    'lawyer': '',
    'description': '',
    'title': '',
    'status': '',
    'stages': '',
    'case_number': '',
    'attachment': ''
  })
  const [lawyers, setLawyers] = useState<Lawyers[]>([])
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

  async function getAllLawyers(){
    const response = await readAllLawyers()
    setLawyers(response.data);
  }

  const handleSave = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const form = new FormData()
      form.append('lawyer', newCase.lawyer)
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

  useEffect(() => {
    getAllLawyers()
  }, [])

  return (
    <ComponentCard>
        <form>
          { msg != '' && (
            isError ? (<div className="mb-4">
            <Alert variant={"error"} title={"حدث خطأ!"} message={msg} />
          </div>) : (<div className="mb-4">
            <Alert variant={"success"} title={""} message={msg} />
          </div>)
          )}
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">إنشاء قضية جديدة</h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>عنوان الدعوة</Label>
              <Input type="text" placeholder="عنوان الدعوة" required defaultValue={newCase.title} name="title" onChange={handleInputChange} />
            </div>

            <div className="col-span-1">
              <Label>رقم الدعوة</Label>
              <Input type="integer" placeholder="إدخال رقم الدعوة المكون من ١٠ أرقام" name="case_number" required defaultValue={newCase.case_number}
              onChange={handleInputChange} />
            </div>

            <div className="col-span-1">
              <Label>محتوى الدعوة</Label>
              <textarea className="textarea w-full" name="description" onChange={handleInputChange} required placeholder="محتوى الدعوة"></textarea>
            </div>

            <div className="col-span-1">
                <fieldset className="fieldset">
                    <Label>المحامي</Label>
                    <select defaultValue={newCase.lawyer} name="lawyer" className="select w-full" onChange={handleInputChange} required>
                        <option disabled={true}>اختر المحامي</option>
                        { lawyers.map((lawyer, index) => (
                          <option key={index} value={lawyer.id}>{lawyer.name}</option>
                        ))}
                    </select>
                </fieldset>
            </div>

            <div className="col-span-1">
                <fieldset className="fieldset">
                    <Label>حالة الدعوة</Label>
                    <select defaultValue={newCase.status} name="status" className="select w-full" required onChange={handleInputChange}>
                        <option disabled={true}>اختر حالة الدعوة</option>
                        <option value="منظورة لدى الدائرة القضائية">منظورة لدى الدائرة القضائية</option>
                        <option value="منظورة لمنصة تراضي">منظورة لمنصة تراضي</option>
                        <option value="منظورة للشؤون الصحية">منظورة للشؤون الصحية</option>
                    </select>
                </fieldset>
            </div>

            <div className="col-span-1">
                <fieldset className="fieldset">
                    <Label>مرحلة الدعوة</Label>
                    <select defaultValue={newCase.stages} name="stages" className="select w-full" required onChange={handleInputChange}>
                        <option disabled={true}>اختر مرحلة الدعوة</option>
                        <option value="شؤون صحية">شؤون صحية</option>
                        <option value="أحيلت لمنصة تراضي">أحيلت لمنصة تراضي</option>
                        <option value="أحيلت لدائرة الدعوات">أحيلت لدائرة الدعوات</option>
                    </select>
                </fieldset>
            </div>

            <div className="col-span-1">
                <Label>ملفات الدعوة</Label>
                <input required defaultValue={undefined} name="attachment" onChange={handleInputChange} type="file" className="file-input" />
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            {/* <Button size="sm" onClick={handleSave}>
              Save Changes
            </Button> */}
            <button type="submit" className="btn btn-sm bg-gray-900 text-white dark:shadow-none dark:bg-white dark:text-gray-950 dark:border"
            onClick={handleSave}>إضافة قضية</button>
          </div>
        </form>
    </ComponentCard>
  );
}
