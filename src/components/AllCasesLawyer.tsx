'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { getCases } from "../../server/CasesServer/cases";
import { updateCaseStatus } from "../../server/CasesServer/update_case_status";

interface Case {
  id: number;
  practitioner_name: string;
  date: string;
  case: string;
  status: string
}

export default function AllCasesLawyer() {
  const [cases, setCases] = useState<Case[]>([])
//   const [status, setStatus] = useState("")

  async function readCases(value: string) {
    const response = await getCases(value)
    
    setCases(response.data.data)
  }

  async function updateCase(caseId: number, event: string) {
    const response = await updateCaseStatus(caseId, {status: event})
    readCases("")
  }

  useEffect(() => {
    readCases("")
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            جميع القضايا
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <form className="filter">
            <input className="btn btn-square" type="reset" onChange={(e) => readCases(e.target.value)} value="x" />
            <input className="btn" type="radio" onChange={(e) => readCases(e.target.value)} value="" name="status" aria-label="الكل"/>
            <input className="btn" type="radio" onChange={(e) => readCases(e.target.value)} value="تم حلها" name="status" aria-label="القضايا المغلقة"/>
            <input className="btn" type="radio" onChange={(e) => readCases(e.target.value)} value="معلقة" name="status" aria-label="القضايا المعلقة"/>
            <input className="btn" type="radio" onChange={(e) => readCases(e.target.value)} value="جاري العمل" name="status" aria-label="القضايا الحالية"/>
          </form>
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
                اسم الممارس الصحي
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
            {cases.map((item) => (
              <TableRow key={item.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {item.practitioner_name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {item.date}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {item.case}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <select defaultValue={item.status} className="select" name="status" onChange={(e) => updateCase(item.id, e.target.value)}>
                        <option disabled={true}>{item.status}</option>
                        <option value="جاري العمل">جاري العمل</option>
                        <option value="تم حلها">تم حلها</option>
                        <option value="معلقة">معلقة</option>
                    </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
