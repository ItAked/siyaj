'use client'

import { ChangeEvent, useEffect, useState } from "react";
import { get } from "../../../../../server/LawyersServer/lawyers";
import { createLawyer } from "../../../../../server/LawyersServer/create_lawyer";
import { assignCases } from "../../../../../server/CasesServer/assign_cases";
import Pagination from "../../../../components/tables/Pagination";
import Alert from "../../../../components/ui/alert/Alert";
import { ArrowDownIcon } from "../../../../icons";

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
    email: string;
}
type Meta = {
  current_page?: number;
  last_page?: number;
}

export default function Lawyers() {
    const [lawyerName, setLawyerName] = useState("");
    const [lawyerEmail, setLawyerEmail] = useState("");
    const [lawyerPassword, setLawyerPassword] = useState("");
    const [lawyers, setLawyers] = useState<Lawyer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<Meta>({})
    const [errorMsg, setErrorMsg] = useState('')
    const [isError, setIsError] = useState(false)

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
            const response = await createLawyer(formData);
            
            setIsError(false)
            setErrorMsg(response.message)
            resetModalField();
            getLawyers("", 1);
        } catch (error) {
            setIsError(true)
            setErrorMsg(error.response.data.message)
        }
    }

    async function handleCheckCases(event: ChangeEvent<HTMLInputElement>, lawyerId: number) {
        const caseId = Number(event.target.value);
        const isChecked = event.target.checked;

        try {
            await assignCases(lawyerId, { 
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
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box dark:bg-gray-900">
                    <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                        <div>
                            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">إضافة محامي</h5>
                        </div>
                        {errorMsg != '' ? (
                            isError ? (<Alert variant={"error"} title="حدث خطأ!" message={errorMsg} />) :
                            (<Alert variant={"success"} title="العملية ناجحة" message={errorMsg} />)
                        ) : null}
                        <div className="mt-8">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">إسم المحامي <span
                                className="text-error">*</span></label>
                                <input name="laywer_name" type="text" value={lawyerName} onChange={(e) => setLawyerName(e.target.value)} className="dark:bg-dark-900 h-11
                                w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs
                                placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700
                                dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" required />
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">البريد الإلكتروني <span
                                    className="text-error">*</span></label>
                                    <input name="laywer_email" type="email" value={lawyerEmail} onChange={(e) => setLawyerEmail(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                    shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                    dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    required />
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">كلمة المرور <span
                                    className="text-error">*</span></label>
                                    <input name="laywer_password" type="password" value={lawyerPassword} onChange={(e) => setLawyerPassword(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                    shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                    dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    required />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end modal-action">
                                <button onClick={handleAddLawyer} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                py-2.5 text-sm font-medium text-white hover:bg-brand-500 sm:w-auto">إضافة محامي</button>
                                <form method="dialog">
                                    <button className="btn" onClick={() => setErrorMsg('')}>إغلاق</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

            <div className="flex items-center justify-between max-sm:grid max-sm:gap-y-4">
                <input name="search" onChange={(e) => getLawyers(e.target.value)} type="search" className="input w-1/2 max-sm:w-full" placeholder="ابحث بإسم المحامي" />
                <button onClick={() => {const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
                    if (modal) modal.showModal();}} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                    py-2.5 text-sm font-medium text-white hover:bg-brand-500 sm:w-auto">إضافة محامي</button>
            </div>
            {isLoading ? (<p className="text-center py-4">جار التحميل...</p>) : lawyers.map((lawyer, index) => (
                        <div key={index} className="card bg-base-100 w-full shadow-sm my-11">
                            <div className="card-body">
                                <h2 className="card-title">{lawyer.name}</h2>
                                <p className="text-[20px]">{lawyer.email}</p>
                                <p className="text-sm">{lawyer.phone}</p>
                                <div className="card-actions justify-end">
                                    <div className="grid grid-cols-1 gap-2">
                                        <details className="dropdown">
                                            <summary className="btn m-1 text-base font-normal bg-blue-300 border-none
                                            text-white rounded-lg">إسناد قضايا</summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 p-2 shadow-sm">
                                                {lawyer.unassigned_cases.map((caseItem) => (
                                                    <i key={caseItem.id} className="my-2">
                                                        <label className="flex items-center gap-2">
                                                            <input type="checkbox" value={caseItem.id} checked={false} onChange={(e) => handleCheckCases(e, lawyer.id)}
                                                            className="checkbox" />
                                                            <span>{caseItem.title}</span>
                                                        </label>
                                                    </i>
                                                ))}
                                            </ul>
                                        </details>
                                    </div>
                                </div>
                                <div className="collapse border">
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title flex items-center justify-between">
                                        <p>الدعوات المسندة</p>
                                        <ArrowDownIcon />
                                    </div>
                                    <div className="collapse-content">
                                        <ul className="menu dropdown-content grid grid-cols-6 gap-x-16 rounded-box z-1 p-2">
                                            {lawyer.assigned_cases.map((caseItem) => (
                                                <i key={caseItem.id} className="my-2">
                                                    <label className="flex items-center gap-2">
                                                        <input type="checkbox" value={caseItem.id} checked={true} onChange={(e) => handleCheckCases(e, lawyer.id)}
                                                        className="checkbox" />
                                                        <span>{caseItem.title}</span>
                                                    </label>
                                                </i>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            <Pagination currentPage={pagination.current_page || 1} totalPages={pagination.last_page || 1} onPageChange={(page: number): void => {getLawyers("", page)}} />
        </>
    );
}