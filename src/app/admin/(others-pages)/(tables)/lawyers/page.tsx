'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../../components/ui/table";
import { useModal } from "../../../../../hooks/useModal";
import { ChangeEvent, useEffect, useState } from "react";
import { get } from "../../../../../../server/LawyersServer/lawyers";
import { createLawyer } from "../../../../../../server/LawyersServer/create_lawyer";
import { post } from "../../../../../../server/CasesServer/assign_cases";
import Pagination from "../../../../../components/tables/Pagination";

interface CaseItem {
    id: number;
    title: string;
    is_checked?: boolean;
}
interface Lawyer {
    id: number;
    assigned_cases: CaseItem[];
    unassigned_cases: CaseItem[];
    phone: string;
    name: string;
}
type Meta = {
  current_page?: number;
  last_page?: number;
}

export default function Lawyers() {
    const { closeModal } = useModal();
    const [lawyerName, setLawyerName] = useState("");
    const [lawyerEmail, setLawyerEmail] = useState("");
    const [lawyerPassword, setLawyerPassword] = useState("");
    const [lawyers, setLawyers] = useState<Lawyer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<Meta>({})

    function resetModalField() {
        setLawyerName("");
        setLawyerEmail("");
        setLawyerPassword("");
    }

    async function getLawyers(search?: string, page: number = 1) {
        setIsLoading(true);
        try {
            const response = await get(search, page);
            setLawyers(response.data.data);
            setPagination(response.data.meta)
        } catch (error) {
            console.error("Failed to fetch lawyers:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleAddLawyer() {
        const formData = new FormData();
        formData.append('email', lawyerEmail);
        formData.append('name', lawyerName);
        formData.append('password', lawyerPassword);
        
        try {
            await createLawyer(formData);
            closeModal();
            resetModalField();
            getLawyers("", 1);
        } catch (error) {
            console.error("Failed to add lawyer:", error);
        }
    }

    async function handleCheckCases(event: ChangeEvent<HTMLInputElement>, lawyerId: number) {
        const caseId = Number(event.target.value);
        const isChecked = event.target.checked;

        try {
            await post(lawyerId, { 
                cases: [caseId], 
                is_checked: isChecked 
            });

            setLawyers(prev => prev.map(lawyer => {
                if (lawyer.id !== lawyerId) return lawyer;

                if (isChecked) {
                    const caseItem = lawyer.unassigned_cases.find(c => c.id === caseId);
                    if (caseItem) {
                        return {
                            ...lawyer,
                            unassigned_cases: lawyer.unassigned_cases.filter(c => c.id !== caseId),
                            assigned_cases: [...lawyer.assigned_cases, { ...caseItem, is_checked: true }]
                        };
                    }
                } else {
                    // Move from assigned to unassigned
                    const caseItem = lawyer.assigned_cases.find(c => c.id === caseId);
                    if (caseItem) {
                        return {
                            ...lawyer,
                            assigned_cases: lawyer.assigned_cases.filter(c => c.id !== caseId),
                            unassigned_cases: [...lawyer.unassigned_cases, { ...caseItem, is_checked: false }]
                        };
                    }
                }
                return lawyer;
            }));
        } catch (error) {
            console.error('Failed to update case status:', error);
            getLawyers("", 1);
        }
    }

    useEffect(() => {
        getLawyers("", 1);
    }, []);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid gap-y-18">
                    <h3 className="text-2xl font-medium text-gray-800 dark:text-white/90">المحامين</h3>
                </div>

                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box dark:bg-gray-900">
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
                            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end modal-action">
                                <button onClick={handleAddLawyer} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto">إضافة محامي</button>
                                <form method="dialog">
                                    <button className="btn">إغلاق</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <div className="flex items-center gap-x-4">
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name="search" onChange={(e) => getLawyers(e.target.value)} type="search" className="w-full" placeholder="ابحث بإسم المحامي" />
                    </label>

                    <button onClick={() => {
                        const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
                        if (modal) modal.showModal();
                        }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                        py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto">إضافة محامي</button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">اسم المحامي</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {isLoading ? (
                            <TableRow>
                                <TableCell className="text-center py-4">جار التحميل...</TableCell>
                            </TableRow>
                        ) : lawyers.map((lawyer) => (
                            <TableRow key={lawyer.id}>
                                <TableCell className="py-3">
                                    <div className="grid gap-y-4 gap-3">
                                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{lawyer.name}</p>
                                        <p className="font-medium text-gray-400 text-theme-sm dark:text-white/90">{lawyer.phone}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <div className="grid grid-cols-1 gap-2">
                                        <details className="dropdown">
                                            <summary className="btn m-1 text-base font-normal bg-yellow-600 border-none text-white
                                            rounded-lg">القضايا المسندة له</summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 p-2 shadow-sm">
                                                {lawyer.assigned_cases.map((caseItem) => (
                                                    <i key={caseItem.id} className="my-2">
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            value={caseItem.id}
                                                            checked={true}
                                                            onChange={(e) => handleCheckCases(e, lawyer.id)}
                                                            className="checkbox"
                                                        />
                                                        <span>{caseItem.title}</span>
                                                    </label>
                                                    </i>
                                                ))}
                                            </ul>
                                        </details>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <div className="grid grid-cols-1 gap-2">
                                        <details className="dropdown">
                                            <summary className="btn m-1 text-base font-normal bg-yellow-600 border-none text-white
                                            rounded-lg">القضايا غير المسندة له</summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 p-2 shadow-sm">
                                                {lawyer.unassigned_cases.map((caseItem) => (
                                                    <i key={caseItem.id} className="my-2">
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            value={caseItem.id}
                                                            checked={false}
                                                            onChange={(e) => handleCheckCases(e, lawyer.id)}
                                                            className="checkbox"
                                                        />
                                                        <span>{caseItem.title}</span>
                                                    </label>
                                                    </i>
                                                ))}
                                            </ul>
                                        </details>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination currentPage={pagination.current_page || 1} totalPages={pagination.last_page || 1} onPageChange={(page: number): void => {getLawyers("", page);}} />
            </div>
        </div>
    );
}