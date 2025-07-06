import Calendar from "../../../../components/calendar/Calendar";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "جدولة القضايا",
  description: "صفحة جدولة القضايا"
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="جدولة القضايا" />
      <Calendar />
    </div>
  );
}
