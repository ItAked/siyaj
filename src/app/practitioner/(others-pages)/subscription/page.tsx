import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CategoryCard from "../../../../components/CategoryCard";
import CategoriesTable from "../../../../components/CategoriesTable";

export const metadata: Metadata = {
  title: "الإشتراكات",
  description: "صفحة الإشتراكات"
};
export default function Subscription() {
  return (
    <div>
      <PageBreadcrumb pageTitle="الإشتراكات" />
      <CategoryCard />
      <CategoriesTable />
    </div>
  );
}