'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import { get } from "../../../../../../server/LawyersServer/lawyers";
import { createLawyer } from "../../../../../../server/LawyersServer/create_lawyer";
// import { post } from "../../../../../../server/CasesServer/assign_cases";

interface Lawyers {
  id: number;
  assigned_cases: AssignedCases[];
  unassigned_cases: UnAssignedCases[];
  phone: string
  name: string
}

interface AssignedCases {
    id: number
    title: string
}

interface UnAssignedCases {
    id: number
    title: string
}

export default function Lawyers() {
    const { closeModal } = useModal();
    const [lawyerName, setLawyerName] = useState("")
    const [lawyerEmail, setLawyerEmail] = useState("")
    const [lawyerPassword, setLawyerPassword] = useState("")
    const [lawyers, setLawyers] = useState<Lawyers[]>([])
    // const [selectedCases, setSelectedCases] = useState<number[]>([])

    function resetModalFeild(){
      setLawyerName("")
      setLawyerEmail("")
      setLawyerPassword("")
    }

    async function getLawyers(value: string) {
      const response = await get(value)

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

    // async function handleCheckCases(event: ChangeEvent<HTMLInputElement>, lawyerId: number) {
    //     const value = event.target.value
    //     const isChecked = event.target.checked

    //     if (isChecked) {
    //         setSelectedCases([...selectedCases, Number(value)])
    //     } else {
    //         setSelectedCases(selectedCases.filter((c) => c !== Number(value)))
    //     }
    //     // const response = await post(lawyerId, selectedCases)

    //     // console.log(response.data);
        
    // }

  useEffect(() => {
    getLawyers("")
  }, [])

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">قائمة المحامين</h3>
                </div>

                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
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

                <div className="flex items-center gap-3">
                    <select onChange={(e) => getLawyers(e.target.value)} defaultValue="اختر المحامي" className="select">
                        <option disabled={true}>اختر المحامي</option>
                        <option value="">الكل</option>
                        { lawyers.map((lawyer) => (
                        <option value={lawyer.name} key={lawyer.id}>{lawyer.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">اسم المحامي</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">رقم الهاتف</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">القضايا المسندة له</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">القضايا الغير مسندة له</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {lawyers.map((lawyer) => (
                            <TableRow key={lawyer.id} className="">
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{lawyer.name}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{lawyer.phone}</TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    { lawyer.assigned_cases.length != 0 && (
                                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box border p-4">
                                            <div className="grid grid-cols-4 gap-4">
                                                {lawyer.assigned_cases.map((caseItem: AssignedCases) => (
                                                    <label className="label" key={caseItem.id}>
                                                        <input
                                                            type="checkbox"
                                                            value={caseItem.id}
                                                            className="checkbox"
                                                            defaultChecked
                                                            // onChange={(e) => handleCheckCases(e, lawyer.id)}
                                                        />
                                                        {caseItem.title}
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>
                                    )}
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    { lawyer.unassigned_cases.length != 0 && (
                                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box border p-4">
                                            <div className="grid grid-cols-4 gap-4">
                                                {lawyer.unassigned_cases.map((caseItem: UnAssignedCases) => (
                                                    <label className="label" key={caseItem.id}>
                                                        <input
                                                            type="checkbox"
                                                            value={caseItem.id}
                                                            className="checkbox"
                                                            // onChange={(e) => handleCheckCases(e, lawyer.id)}
                                                        />
                                                        {caseItem.title}
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
