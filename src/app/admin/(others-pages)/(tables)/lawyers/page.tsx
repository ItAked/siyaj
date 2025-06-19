'use client'

import Select from "@/components/form/Select";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import { get } from "../../../../../../server/LawyersServer/lawyers";
import { createLawyer } from "../../../../../../server/LawyersServer/create_lawyer";

interface Lawyers {
  id: number;
  email: string;
  employer: string
  name: string
  phone: string
  created_at: string
}

const options = [
    { value: "القضية الأولى", label: "القضية الأولى" },
    { value: "القضية الثانية", label: "القضية الثانية" },
    { value: "القضية الثالثة", label: "القضية الثالثة" },
  ];

  const status = [
                              { value: "Delivered", label: "تم التسليم" },
                              { value: "Pending", label: "قيد الانتظار" },
                              { value: "Active", label: "نشط" },
                              { value: "Cancel", label: "ملغي" }
                            ]

export default function Lawyers() {
    const { isOpen, openModal, closeModal } = useModal();
    const [lawyerName, setLawyerName] = useState("")
    const [lawyerEmail, setLawyerEmail] = useState("")
    const [lawyerPassword, setLawyerPassword] = useState("")
    const [lawyers, setLawyers] = useState<Lawyers[]>([])

    function resetModalFeild(){
      setLawyerName("")
      setLawyerEmail("")
      setLawyerPassword("")
    }

    async function getLawyers() {
      const response = await get()

      setLawyers(response.data.data)
      
    }

    async function handleAddLawyer() {
      const formData = new FormData()
      formData.append('email', lawyerEmail)
      formData.append('name', lawyerName)
      formData.append('password', lawyerPassword)
      const response = await createLawyer(formData)
      console.log(response.data);
      

      closeModal()
      resetModalFeild()
    }

    const handleSelectChange = (value: string) => {
        console.log("Selected value:", value);
    };

  useEffect(() => {
    getLawyers()
  }, [])

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        قائمة المحامين
                    </h3>
                </div>

                <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
                    <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                        <div>
                            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">إضافة محامي</h5>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">إسم المحامي</label>
                                    <input name="laywer_name" type="text" value={lawyerName} onChange={(e) => setLawyerName(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                    shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                    dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">البريد الإلكتروني</label>
                                    <input name="laywer_email" type="email" value={lawyerEmail} onChange={(e) => setLawyerEmail(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                    shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                    dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">كلمة المرور</label>
                                    <input name="laywer_password" type="password" value={lawyerPassword} onChange={(e) => setLawyerPassword(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                    shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                    dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                            <button
                            onClick={handleAddLawyer}
                            type="button"
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto"
                            >
                            إضافة محامي
                            </button>
                        </div>
                    </div>
                </Modal>

                <div className="flex items-center gap-3">
                    <button
                            onClick={openModal}
                            type="button"
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto"
                            >
                            إضافة محامي
                            </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700
                    shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]
                    dark:hover:text-gray-200">
                        <svg className="stroke-current fill-white dark:fill-gray-800" width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.29004 5.90393H17.7067" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.7075 14.0961H2.29085" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172
                            7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" fill="" stroke="" strokeWidth="1.5" />
                            <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883
                            15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" fill="" stroke="" strokeWidth="1.5" />
                        </svg>
                    تصنيف حسب
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700
                    shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]
                    dark:hover:text-gray-200">
                        الكل
                    </button>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <Table>
                {/* Table Header */}
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                    <TableRow>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        اسم المحامي
                    </TableCell>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        التاريخ
                    </TableCell>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        القضية
                    </TableCell>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        الحالة
                    </TableCell>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}

                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {lawyers.map((lawyer) => (
                    <TableRow key={lawyer.id} className="">
                        <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                  {lawyer.name}
                              </p>
                            </div>
                        </div>
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {lawyer.created_at}
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <Select className="max-w-xs" options={options} onChange={handleSelectChange} />
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <Select
                            options={status}
                            onChange={handleSelectChange}
                          />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </div>
    );
}
