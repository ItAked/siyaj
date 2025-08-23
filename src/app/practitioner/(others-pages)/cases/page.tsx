import { Metadata } from "next";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import AllCasesPractitioner from "../../../../components/tables/AllCasesPractitioner";

export const metadata: Metadata = {
  title: "الدعاوى",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template"
};

export default function BasicTables() {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageBreadcrumb pageTitle="الدعاوى" />
        <a href='/practitioner/create-case' className="btn shadow-none dark:bg-white/90 font-medium text-base dark:text-gray-900
        dark:focus:border-brand-800 bg-brand-500 border-none text-white">دعوى جديدة</a>
      </div>
      <div className="space-y-6">
        <AllCasesPractitioner />
      </div>
    </>
  );
}
