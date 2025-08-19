/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "./Label";
import Input from "./input/InputField";
import Alert from "../ui/alert/Alert";
import { readCaseById, updateCaseById } from "../../../services/cases";
import { File } from "lucide-react";

type CaseData = {
    id?: number;
    attachments?: string;
    case_number?: number;
    created_at?: string;
    description?: string;
    lawyer_email?: string;
    lawyer_name?: string;
    lawyer_phone?: string;
    stages?: string;
    status?: string;
    title?: string;
}

export default function EditCase(props: {id: number;}) {
    const [editCase, setEditCase] = useState<CaseData>({})
    const [msg, setMsg] = useState('')
    const [isError, setIsError] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const getFileNameFromPath = (path?: string): string => {
        if (!path) return 'No file attached';
        const lastIndex = path.lastIndexOf('/');
        if (lastIndex === -1) return path;
            return path.substring(lastIndex + 1);
    };
    const filePath = getFileNameFromPath(editCase.attachments)
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        if (event.target.type === 'file') {
            const fileInput = event.target as HTMLInputElement
            setFile(fileInput.files?.[0] || null)
        } else {
            setEditCase((prevCase) => {
                return { ...prevCase, [event.target.name]: event.target.value}
            })
        }
    }
    async function getCaseById() {
        try {
            const response = await readCaseById(props.id)
            setEditCase(response.data)
        } catch (error) {
            setIsError(true)
            setMsg(error.response.data.message)
        }
    }
    const handleSave = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const form = new FormData()
            form.append('description', editCase.description || '')
            form.append('title', editCase.title || '')
            form.append('status', editCase.status || '')
            form.append('stages', editCase.stages || '')
            form.append('case_number', editCase.case_number?.toString() || '')
            if (file) {
                form.append('attachment', file)
            }
            const response = await updateCaseById(form, props.id);
            setIsError(false)
            setMsg(response.message)
        } catch (error) {
            setIsError(true)
            setMsg(error.response?.data?.message)
        }
    };

    useEffect(() => {
        getCaseById()
    }, [])
    
    return (
        <ComponentCard>
            <form onSubmit={handleSave}>
                { msg != '' && (isError ? (<div className="mb-4"><Alert variant={"error"} title={"حدث خطأ!"} message={msg} /></div>) : (<div className="mb-4">
                    <Alert variant={"success"} title={""} message={msg} /></div>)
                )}
                <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">تعديل الدعوى</h4>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    <div className="col-span-1">
                        <Label>عنوان الدعوى</Label>
                        <Input type="text" defaultValue={editCase.title || ''} name="title" onChange={handleInputChange} />
                    </div>
                    <div className="col-span-1">
                        <Label>رقم الدعوى</Label>
                        <Input type="number" name="case_number" defaultValue={editCase.case_number || ''} onChange={handleInputChange} />
                    </div>
                    <div className="col-span-1">
                        <Label>محتوى الدعوى</Label>
                        <textarea className="textarea w-full" name="description" value={editCase.description || ''} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="col-span-1">
                        <fieldset className="fieldset">
                            <Label>حالة الدعوى</Label>
                            <select value={editCase.status || ''} name="status" className="select w-full" onChange={handleInputChange}>
                                <option value="">اختر حالة الدعوى</option>
                                <option value="منظورة لدى الدائرة القضائية">منظورة لدى الدائرة القضائية</option>
                                <option value="منظورة لمنصة تراضي">منظورة لمنصة تراضي</option>
                                <option value="منظورة للشؤون الصحية">منظورة للشؤون الصحية</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="col-span-1">
                        <fieldset className="fieldset">
                            <Label>مرحلة الدعوى</Label>
                            <select value={editCase.stages || ''}  name="stages" className="select w-full" onChange={handleInputChange}>
                                <option value="">اختر مرحلة الدعوى</option>
                                <option value="شؤون صحية">شؤون صحية</option>
                                <option value="أحيلت لمنصة تراضي">أحيلت لمنصة تراضي</option>
                                <option value="أحيلت لدائرة الدعوات">أحيلت لدائرة الدعوات</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="col-span-1">
                        <Label>ملفات الدعوى الحالية</Label>
                        <div className="bg-gray-100 border rounded-md border-gray-500 flex items-center px-7 py-4 gap-x-10">
                            <File color="#EF5350" />
                            <a href={editCase.attachments} className="link" target="_blank" rel="noopener noreferrer">{filePath || 'No file attached'}</a>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <Label>تغيير ملف الدعوى (اختياري)</Label>
                        <Input type="file" name="attachment" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="flex items-center justify-end w-full gap-3 mt-6">
                    <button type="submit" className="btn btn-sm bg-gray-900 text-white dark:shadow-none dark:bg-white dark:text-gray-950
                    dark:border">تعديل دعوى</button>
                </div>
            </form>
        </ComponentCard>
    );
}