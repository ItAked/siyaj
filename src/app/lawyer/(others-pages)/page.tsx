import type { Metadata } from "next";
import React from "react";
import { CasesStatus } from "../../../components/cards/CasesStatus";
import NewCasesTable from "../../../components/tables/NewCasesTable";

export const metadata: Metadata = {
  title: "الصفحة الرئيسية",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function LawyerPanel() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <CasesStatus />
      </div>
      <div className="col-span-12">
        <NewCasesTable />
      </div>
    </div>
  );
}
