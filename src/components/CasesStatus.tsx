"use client";

import { readCasesStatus } from "../../services/cases";
import { useEffect, useState } from "react";
import { Box, Download, Lock } from 'lucide-react'

type CasesStatus = {
  health_affairs?: string;
  judicial_department?: string;
  tradi_platform?: string;
}

export const CasesStatus = () => {
  const [casesStatus, setCasesStatus] = useState<CasesStatus>({})

  async function getCasesStatus() {
    const response = await readCasesStatus()
    setCasesStatus(response)
  }

  useEffect(() => {
    getCasesStatus()
  }, [])

  return (
    <div className="grid grid-cols-1 mx-auto gap-4 sm:grid-cols-3 md:gap-6 my-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-300 rounded-full dark:bg-gray-800">
          <Download className="text-white" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">منظورة لمنصة تراضي</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{casesStatus.tradi_platform}</h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-300 rounded-full dark:bg-gray-800">
          <Box className="text-white" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">منظورة لدى الدائرة القضائية</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{casesStatus.judicial_department}</h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-300 rounded-full dark:bg-gray-800">
          <Lock className="text-white" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">منظورة للشؤون الصحية</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{casesStatus.health_affairs}</h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
