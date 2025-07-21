import Calendar from "../../../../components/calendar/Calendar";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "جدولة الدعوات",
  description: "صفحة جدولة الدعوات"
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="جدولة الدعوات" />
      <Calendar />
    </div>
  );
}
