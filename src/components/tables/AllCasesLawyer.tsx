'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { getCases, updateCaseStatus } from "../../../services/cases";
import { Ellipsis } from "lucide-react";

interface Case {
  id: number;
  practitioner_name: string;
  date: string;
  case: string;
  status: string
}

type Meta = {
  current_page?: number;
  last_page?: number;
}

export default function AllCasesLawyer() {
  const [cases, setCases] = useState<Case[]>([])
  const [pagination, setPagination] = useState<Meta>({})

  async function readCases(value: string, search?: string, page: number = 1) {
    const response = await getCases(value, search, page)
    setCases(response.data)
    setPagination(response.meta);
  }
  async function updateCase(caseId: number, event: string) {
    await updateCaseStatus(caseId, {status: event})
    readCases("", "", 1)
  }

  useEffect(() => {
    readCases("", "", 1)
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">جميع الدعاوى</h3>
        </div>
        <div className="flex items-center gap-3">
          <label className="input dark:bg-gray-800 dark:text-gray-200">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" name="search" onChange={(e) => readCases("", e.target.value)} className="w-full" placeholder="إبحث باسم الممارس الصحي" />
          </label>
          <details className="dropdown">
            <summary className="btn bg-transparent border-none hover:shadow-none shadow-none"><Ellipsis className="dark:text-white" /></summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 p-2 shadow-sm left-6 dark:bg-gray-900 dark:text-white">
              <li><label className="label"><input type="radio" defaultChecked className="radio" onChange={(e) => readCases(e.target.value)} value=""
              name="status" />الكل</label></li>
              <li><label className="label"><input type="radio" className="radio" onChange={(e) => readCases(e.target.value)} value="منظورة للشؤون الصحية"
              name="status" />منظورة للشؤون الصحية</label></li>
              <li><label className="label"><input type="radio" className="radio" onChange={(e) => readCases(e.target.value)} value="منظورة لدى الدائرة القضائية"
              name="status" />منظورة لمنصة تراضي</label></li>
              <li><label className="label"><input type="radio" className="radio" onChange={(e) => readCases(e.target.value)} value="منظورة لمنصة تراضي"
              name="status" />منظورة لدى الدائرة القضائية</label></li>
            </ul>
          </details>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">الدعوى</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">اسم الممارس الصحي</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">التاريخ</TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">الحالة</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {cases.map((item) => (
              <TableRow key={item.id} className="">
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400"><a className="link"
                href={`/lawyer/case/${item.id}`}>{item.case}</a></TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{item.practitioner_name}</TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{item.date}</TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <select defaultValue={item.status} className="select dark:bg-gray-800" name="status" onChange={(e) => updateCase(item.id, e.target.value)}>
                        <option disabled={true}>{item.status}</option>
                        <option value="منظورة لدى الدائرة القضائية">منظورة لدى الدائرة القضائية</option>
                        <option value="منظورة لمنصة تراضي">منظورة لمنصة تراضي</option>
                        <option value="منظورة للشؤون الصحية">منظورة للشؤون الصحية</option>
                    </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination currentPage={pagination.current_page || 1} totalPages={pagination.last_page || 1} onPageChange={(page: number): void => {readCases("", "", page);}} />
      </div>
    </div>
  );
}
