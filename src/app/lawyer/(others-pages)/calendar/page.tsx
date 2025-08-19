import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CalnedarLawyer from "../../../../components/calendar/CalendarLawyer";

export const metadata: Metadata = {
  title: "جدولة الدعاوى",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template"
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="جدولة الدعاوى" />
      <CalnedarLawyer />
    </div>
  );
}
