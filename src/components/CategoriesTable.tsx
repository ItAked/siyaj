'use client'

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import Pagination from "./tables/Pagination";
import Badge from "./ui/badge/Badge";
import { getPayments } from "../../server/PaymentServer";

type Meta = {
  current_page?: number;
  total_pages?: number;
}

interface Payments {
    id: string;
    description: string;
    status: string;
}

export default function CategoriesTable() {
    const [pagination, setPagination] = useState<Meta>({})
    const [payments, setPayments] = useState<Payments[]>([])

    async function readInvoice(page: number) {
        const response = await getPayments(page)

        setPayments(response.payments)
        setPagination(response.meta)
    }

    useEffect(() => {
        readInvoice(1)
    }, [])

    return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 my-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="text-base font-medium text-gray-800 dark:text-white/90">الاشتراكات السابقة</h3>
            </div>

            <div className="flex items-center gap-3">
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" name="search" className="w-full" placeholder="إبحث بنوع التصنيف" />
                </label>
                {/* <details className="dropdown">
                    <summary className="btn bg-transparent border-none hover:shadow-none shadow-none"><HorizontaLDots /></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 p-2 shadow-sm left-6">
                        <li><label className="label"><input type="radio" defaultChecked className="radio" />الكل</label></li>
                        <li><label className="label"><input type="radio" className="radio" />نشط</label></li>
                        <li><label className="label"><input type="radio" className="radio" />منتهي</label></li>
                    </ul>
                </details> */}
            </div>
        </div>
        <div className="max-w-full overflow-x-auto">
            <Table>
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                    <TableRow>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            نوع التصنيف
                        </TableCell>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            الحالة
                        </TableCell>
                    </TableRow>
                </TableHeader>
                
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {payments.map((category) => (
                        <TableRow key={category.id} className="">
                            <TableCell className="py-3">
                                <div className="flex categorys-center gap-3">
                                    <div>
                                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{category.description}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                <Badge size="sm" color={category.status === "paid" ? "success" : "error"}>{category.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination currentPage={pagination.current_page || 1} totalPages={pagination.total_pages || 1} onPageChange={(page: number): void => {readInvoice(page);}} />
        </div>
    </div>
  );
}
