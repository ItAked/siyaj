/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import Badge from "./ui/badge/Badge";
import { readPractitionerId } from "../../services/practitioners";

interface Cases {
    case: string;
    date: string;
    status: string;
}
interface Categories {
    name: string;
    expire_at: string;
    payemnt_file: string;
}

type Practitioner = {
    id?: number;
    email?: string;
    employer?: string;
    license_file?: string;
    medical?: string;
    name?: string;
    phone? :string;
    license? :string;
}

const Practitioner = ({ id }) => {
    const [practitioner, setPractitioner] = useState<Practitioner>({})
    const [cases, setCases] = useState<Cases[]>([])
    const [categories, setCategories] = useState<Categories[]>([])

    async function getPractitionerId(){
        const response = await readPractitionerId(id);
        setPractitioner(response.data)
        setCases(response.data.cases)        
        setCategories(response.data.category)
    }

    useEffect(() => {
        getPractitionerId()
    }, [])
    return (
        <>
            <div className="card card-border bg-base-100 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-normal">{practitioner.name}</h2>
                    <p className="text-sm font-normal text-gray-500">{practitioner.email}</p>
                    <div className="badge bg-blue-300 text-sky-950 border-sky-950">{categories.length > 0 ? categories[categories.length - 1].name : 'لا توجد اشتراكات'}</div>
                </div>
            </div>

            <div className="card card-border bg-base-100 w-full my-9 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-medium">البيانات الشخصية</h2>
                    <div className="grid grid-cols-2 w-fit gap-x-32 gap-y-4 my-7">
                        <p>الإسم الثلاثي</p>
                        <p>{practitioner.name}</p>
                        <p>البريد الإلكتروني</p>
                        <p>{practitioner.email}</p>
                        <p>رقم الجوال</p>
                        <p>{practitioner.phone}</p>
                    </div>
                </div>
            </div>

            <div className="card card-border bg-base-100 w-full my-9 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-medium">معلومات الممارس المهنية</h2>
                    <div className="grid grid-cols-2 w-fit gap-x-32 gap-y-4 my-7">
                        <p>رقم الترخيص المهني</p>
                        <p>{practitioner.license}</p>
                        <p>التخصص الطبي</p>
                        <p>{practitioner.medical}</p>
                        <p>اسم جهة العمل</p>
                        <p>{practitioner.employer}</p>
                        <Link href={practitioner.license_file ?? ''} className="link link-info" download={true}>تحميل الترخيص المهني</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto card card-border bg-base-100 w-full dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-medium">القضايا الخاصة بالممارس الصحي</h2>

                    <Table>
                        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                            <TableRow>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">#</TableCell>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">القضية</TableCell>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">التاريخ</TableCell>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">الحالة</TableCell>
                            </TableRow>
                        </TableHeader>
                        

                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            { cases.map((c, index) => (
                                <TableRow key={index}>
                                    <TableCell className="py-3">{index + 1}</TableCell>
                                    <TableCell className="py-3">{c.case}</TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{c.date}</TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Badge color="primary">{c.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto card card-border bg-base-100 w-full my-7 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-medium">الإيصالات الخاصة بالممارس الصحي</h2>

                    <Table>
                        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                            <TableRow>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">#</TableCell>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">الإيصال</TableCell>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">التاريخ</TableCell>
                                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">التصنيف</TableCell>
                            </TableRow>
                        </TableHeader>
                        

                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            { categories.map((c, index) => (
                                <TableRow key={index}>
                                    <TableCell className="py-3">{index + 1}</TableCell>
                                    <TableCell className="py-3">{c.payemnt_file != null && (<Link href={c.name} download={true}
                                    className="link text-sky-400">لتحميل الإيصال</Link>)}</TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{c.expire_at}</TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{c.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Practitioner