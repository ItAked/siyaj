import { CasesStatus } from "@/components/CasesStatus";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NewCasesTable from "@/components/NewCasesTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "القضايا",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="القضايا" />
      <div className="space-y-6">
        <ComponentCard>
          <NewCasesTable />
        </ComponentCard>
      </div>
    </div>
  );
}
