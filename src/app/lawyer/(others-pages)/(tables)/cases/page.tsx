import AllCasesLawyer from "../../../../../components/AllCasesLawyer";
import ComponentCard from "../../../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "القضايا",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template"
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="القضايا" />
      <div className="space-y-6">
        <ComponentCard>
          <AllCasesLawyer />
        </ComponentCard>
      </div>
    </div>
  );
}
