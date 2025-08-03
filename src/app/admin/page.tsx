'use client'

import React from "react";
import { CasesStatus } from "../../components/CasesStatus";
import AllCases from "../../components/AllCases";


export default function AdminPanel() {
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
