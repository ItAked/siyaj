'use client'

import React, { useEffect, useState } from "react";
import Pagination from "../../../../components/tables/Pagination";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../components/ui/table";
import Link from "next/link";
import { getPractitioners } from "../../../../../services/practitioners";

interface Categories {
    name: string;
    price: number;
    status: string;
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

  useEffect(() => {
    readPractitioner("", 1)
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
                                { practitioner.category.length > 0 ? (
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{practitioner.category[0].price}</TableCell>
                                ) : <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">لا توجد اشتراكات</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination currentPage={pagination.current_page || 1} totalPages={pagination.last_page || 1}
                onPageChange={(page: number): void => {readPractitioner("", page)}} />
        </div>
    </div>
  );
}
