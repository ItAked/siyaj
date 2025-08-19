import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import ServicesCard from "../../../../components/cards/ServicesCard";

export const metadata: Metadata = {
  title: "الخدمات",
  description: "صفحة الخدمات"
};

export default function ServicesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="الخدمات" />
      <ServicesCard />
    </div>
  );
}