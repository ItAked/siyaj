'use client'

import React, { useEffect, useState } from "react";
import Pagination from "../../../../components/tables/Pagination";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../components/ui/table";
import Link from "next/link";
import { getPractitioners, updateSubscribe } from "../../../../../services/practitioners";
import { readSubscriptions } from "../../../../../services/subscriptions";

interface Categories {
    id: number;
    name: string;
    price: number;
}
interface Practitioner {
    id: number;
    name: string;
    email: string;
    medical: string;
    employer: string;
    license_file: string;
    category: Categories[];
}

type Meta = {
    current_page?: number;
    last_page?: number;
}

export default function Practitioners() {
    const [practitioners, setPractitioner] = useState<Practitioner[]>([])
    const [pagination, setPagination] = useState<Meta>({})
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<Categories[]>([])
    const [selectedUser, setSelectedUser] = useState(0)
    
    async function readPractitioner(search?: string, page: number = 1) {
        try {
            setIsLoading(true)
            const response = await getPractitioners(search, page)
            setPractitioner(response.data.data)
            setPagination(response.data.meta)
        } catch (error) {
            console.error("Failed to fetch lawyers:", error.response.data.message);
        } finally {
            setIsLoading(false)
        }
    }
    async function getSubscriptions() {
        try {
            setIsLoading(true)
            const response = await readSubscriptions()            
            setCategories(response.data)
        } catch (error) {
            console.error("Failed to fetch lawyers:", error.response.data.message);
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        readPractitioner("", 1)
        getSubscriptions()
    }, [])
    
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">الممارسين الصحيين</h3>
                </div>
            </div>
            <label className="input my-4">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input name="search" onChange={(e) => readPractitioner(e.target.value)} type="search" className="w-full" placeholder="ابحث بإسم الممارس الصحي" />
            </label>
            
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">إسم الممارس</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">البريد الإلكتروني</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">التخصص</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">جهة العمل</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">نوع الاشتراك</TableCell>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {isLoading ? (
                            <TableRow>
                                <TableCell className="text-center py-4">جار التحميل...</TableCell>
                            </TableRow>
                            ) : practitioners.map((practitioner, index) => (
                                <TableRow key={index}>
                                    <TableCell className="py-3">
                                        <Link href={`/admin/practitioners/${practitioner.id}`} className="btn btn-link">{practitioner.name}</Link>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{practitioner.email}</TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{practitioner.medical}</TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{practitioner.employer}</TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <button onClick={() => { setSelectedUser(practitioner.id);
                                            const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                                            if (modal) modal.showModal();
                                        }} type="button" className="link flex w-full justify-center rounded-lg px-4
                                            py-2.5 text-base font-medium text-sky-950 sm:w-auto">{practitioner.category.length > 0
                                                ? practitioner.category[practitioner.category.length - 1].name : 'لا توجد اشتراكات'}</button>
                                        </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Pagination currentPage={pagination.current_page || 1} totalPages={pagination.last_page || 1}
                onPageChange={(page: number): void => {readPractitioner("", page)}} />
                
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box place-items-center">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">إدارة الإشتراكات</h3>
                        <select defaultValue="إدارة الاشتراكات" className="select mr-16 mt-8" onChange={(event) => {
                            updateSubscribe(selectedUser, Number(event.target.value));
                            readPractitioner()
                        }}>
                            <option disabled={true}>إدارة الإشتراكات</option>
                            { categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </dialog>
            </div>
        </div>
    );
}
