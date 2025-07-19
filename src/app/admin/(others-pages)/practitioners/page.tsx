'use client'

import React, { useEffect, useState } from "react";
import { getPractitioners } from "../../../../../server/PractitionersServer/practitioners";
import Pagination from "../../../../components/tables/Pagination";
import { DownloadIcon } from "../../../../icons";

interface Practitioner {
    id: number,
    name: string,
    email: string,
    medical: string,
    employer: string,
    license_file: string
}
type Meta = {
  current_page?: number;
  last_page?: number;
}

export default function Practitioners() {
  const [practitioners, setPractitioner] = useState<Practitioner[]>([])
  const [pagination, setPagination] = useState<Meta>({})
  const [isLoading, setIsLoading] = useState(false)

  async function readPractitioner(search?: string, page: number = 1) {
    try {
        setIsLoading(true)
        const response = await getPractitioners(search, page)
        
        setPractitioner(response.data.data)
        setPagination(response.data.meta)
    } catch (error) {
        console.error("Failed to fetch lawyers:", error.response.data.message);
    } finally {
        setIsLoading(false)
    }
  }

  useEffect(() => {
    readPractitioner("", 1)
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">الممارسين الصحيين</h3>
            </div>
        </div>
        <label className="input my-4">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input name="search" onChange={(e) => readPractitioner(e.target.value)} type="search" className="w-full" placeholder="ابحث بإسم الممارس الصحي" />
        </label>
        
        { isLoading ? (
            (<p className="text-center py-4">جار التحميل...</p>)) : practitioners.map((practitioner, index) => (
                <div key={index} className="card card-border bg-base-100 w-full">
                    <div className="card-body font-normal">
                        <h2 className="card-title text-2xl">{practitioner.name}</h2>
                        <p className="text-xl">{practitioner.email}</p>
                        <p className="text-sm">{`${practitioner.medical} - ${practitioner.employer}`}</p>
                        <div className="card-actions justify-end">
                            <a className="btn bg-brand-500 text-white" href={practitioner.license_file} download={true}><DownloadIcon /> تحميل الترخيص المهني</a>
                        </div>
                    </div>
                </div>
            ))
        }
        <Pagination currentPage={pagination.current_page || 1} totalPages={pagination.last_page || 1} onPageChange={(page: number): void => {readPractitioner("", page);}} />
    </div>
  );
}
