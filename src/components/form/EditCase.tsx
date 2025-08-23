"use client";

import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "./Label";
import Input from "./input/InputField";
import Alert from "../ui/alert/Alert";
import { deletAttachment, readCaseById, updateCaseById } from "../../../services/cases";
import { File, X } from "lucide-react";

type CaseData = {
    id?: number;
    case?: string;
    description?: string;
    status?: string;
    stages?: string;
    case_number?: number;
    attachments?: Attachments[];
}

interface Attachments {
    id: number;
    file_name: string;
    file_path: string;
    created_at: string;
}

export default function EditCase(props: {id: number;}) {
    const [editCase, setEditCase] = useState<CaseData>({})
    const [existingAttachments, setExistingAttachments] = useState<Attachments[]>([])
    const [newAttachments, setNewAttachments] = useState<File[]>([])
    const [msg, setMsg] = useState('')
    const [isError, setIsError] = useState(false)

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        if (event.target.type === 'file') {
            const fileInput = event.target as HTMLInputElement
            if (fileInput.files) {
                const filesArray = Array.from(fileInput.files);
                setNewAttachments(prev => [...prev, ...filesArray]);
            }
        } else {
            setEditCase((prevCase) => {
                return { ...prevCase, [event.target.name]: event.target.value}
            })
        }
    }

    const removeNewAttachment = (index: number) => {
        setNewAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingAttachment = async (attachmentId: number) => {
        try {
            await deletAttachment(attachmentId)
            setExistingAttachments(prev => prev.filter(att => att.id !== attachmentId));
            setMsg('تم حذف الملف بنجاح');
        } catch (error) {
            setIsError(true);
            setMsg(error.response.data.message);
        }
    };

    async function getCaseById() {
        try {
            const response = await readCaseById(props.id)
            setEditCase(response.cases)
            setExistingAttachments(response.attachments || [])
        } catch (error) {
            setIsError(true)
            setMsg(error.response?.data?.message || 'فشل في تحميل البيانات')
        }
    }

    const handleSave = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const form = new FormData()
            form.append('description', editCase.description || '')
            form.append('case', editCase.case || '')
            form.append('status', editCase.status || '')
            form.append('stages', editCase.stages || '')
            form.append('case_number', editCase.case_number?.toString() || '')            
            newAttachments.forEach((file) => {
                form.append('attachments[]', file)
            })
            const response = await updateCaseById(form, props.id);
            setIsError(false)
            setMsg(response.message)
            getCaseById();
            setNewAttachments([]);
            
        } catch (error) {
            setIsError(true)
            setMsg(error.response?.data?.message || 'فشل في التعديل')
        }
    };

    useEffect(() => {
        getCaseById()
    }, [])

    return (
        <ComponentCard>
            <form onSubmit={handleSave}>
                {msg && (
                    <div className="mb-4">
                        <Alert 
                            variant={isError ? "error" : "success"} 
                            title={isError ? "حدث خطأ!" : ""} 
                            message={msg} 
                        />
                    </div>
                )}
                
                <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">تعديل الدعوى</h4>
                
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    {/* Existing fields */}
                    <div className="col-span-1">
                        <Label>عنوان الدعوى</Label>
                        <Input 
                            type="text" 
                            defaultValue={editCase.case || ''} 
                            name="case" 
                            onChange={handleInputChange} 
                        />
                    </div>
                    
                    <div className="col-span-1">
                        <Label>رقم الدعوى</Label>
                        <Input 
                            type="number" 
                            name="case_number" 
                            defaultValue={editCase.case_number || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    
                    <div className="col-span-2">
                        <Label>محتوى الدعوى</Label>
                        <textarea 
                            className="textarea w-full dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800" 
                            name="description" 
                            value={editCase.description || ''} 
                            onChange={handleInputChange}
                            rows={4}
                        />
                    </div>
                    
                    <div className="col-span-1">
                        <fieldset className="fieldset">
                            <Label>حالة الدعوى</Label>
                            <select 
                                value={editCase.status || ''} 
                                name="status" 
                                className="select w-full dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800" 
                                onChange={handleInputChange}
                            >
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
                            <select 
                                value={editCase.stages || ''}  
                                name="stages" 
                                className="select w-full dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800" 
                                onChange={handleInputChange}
                            >
                                <option value="">اختر مرحلة الدعوى</option>
                                <option value="شؤون صحية">شؤون صحية</option>
                                <option value="أحيلت لمنصة تراضي">أحيلت لمنصة تراضي</option>
                                <option value="أحيلت لدائرة القضايا">أحيلت لدائرة القضايا</option>
                            </select>
                        </fieldset>
                    </div>

                    {/* Existing Attachments */}
                    {existingAttachments.length > 0 && (
                        <div className="col-span-2">
                            <Label>الملفات الحالية</Label>
                            <div className="space-y-2">
                                {existingAttachments.map((attachment, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <File size={20} />
                                            <span className="text-sm">{attachment.file_name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeExistingAttachment(attachment.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New Attachments */}
                    <div className="col-span-2">
                        <Label>إضافة ملفات جديدة</Label>
                        <Input 
                            type="file" 
                            name="attachments" 
                            onChange={handleInputChange}
                            multiple
                        />
                        
                        {newAttachments.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {newAttachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <File size={20} />
                                            <span className="text-sm">{file.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeNewAttachment(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end w-full gap-3 mt-6">
                    <button 
                        type="submit" 
                        className="btn btn-sm bg-gray-900 text-white dark:shadow-none dark:bg-white dark:text-gray-950 dark:border"
                    >
                        تعديل دعوى
                    </button>
                </div>
            </form>
        </ComponentCard>
    );
}