"use client";
import {BoxIconLine, DownloadIcon, LockIcon } from "../icons";
import { useEffect, useState } from "react";
import { get } from "../../server/CasesServer/cases_status";

export const CasesStatus = () => {
  const [casesStatus, setCasesStatus] = useState([])

  async function getCasesStatus() {
    const response = await get()

    setCasesStatus(Object.values(response.data))
  }

  useEffect(() => {
    getCasesStatus()
  }, [])

  return (
    <div className="grid grid-cols-1 mx-auto gap-4 sm:grid-cols-3 md:gap-6 my-16">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-600 rounded-full dark:bg-gray-800">
          <DownloadIcon className="text-white" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              منظورة لمنصة تراضي
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {casesStatus[2]}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-600 rounded-full dark:bg-gray-800">
          <BoxIconLine className="text-white" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              منظورة لدى الدائرة القضائية
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {casesStatus[1]}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-600 rounded-full dark:bg-gray-800">
          <LockIcon className="text-white" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              منظورة للشؤون الصحية
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {casesStatus[0]}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
