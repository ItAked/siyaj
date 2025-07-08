import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CalendarPractitioner from "../../../../components/calendar/CalendarPractitioner";

export const metadata: Metadata = {
  title: "جدولة القضايا",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template"
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="جدولة القضايا" />
      <CalendarPractitioner />
    </div>
  );
}
