import AllCasesLawyer from "../../../../../components/tables/AllCasesLawyer";
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدعاوى",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template"
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="الدعاوى" />
      <AllCasesLawyer />
    </div>
  );
}
