'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table";
import Badge from "./ui/badge/Badge";
import React, { useEffect, useState } from "react";
import { getCases } from "../../server/CasesServer/cases";

interface Case {
  id: number;
  practitioner_name: string;
  date: string;
  case: string;
  status: string
}

export default function NewCasesTable() {
    const [cases, setCases] = useState<Case[]>([])

  async function readCases(value: string) {
    const response = await getCases(value)
    
    setCases(response.data.data)
  }

  useEffect(() => {
    readCases("")
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            طلبات القضايا الجديدة
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
                  <Badge
                    size="sm"
                    color={
                      item.status === "تم حلها"
                        ? "success"
                        : item.status === "جاري العمل"
                        ? "warning"
                        : "error"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
