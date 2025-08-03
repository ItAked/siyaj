'use client'

import React, { useEffect } from "react";
import { CasesStatus } from "../../components/CasesStatus";
import AllCases from "../../components/AllCases";
import { getToken } from "../../../utils/auth";
import { useRouter } from "next/navigation";


export default function AdminPanel() {
  const router = useRouter();
  useEffect(() => {
    if (!getToken()) {
      router.push('/signin');
    }
  }, []);
  
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <CasesStatus />
      </div>

      <div className="col-span-12">
        <AllCases />
      </div>
    </div>
  );
}
