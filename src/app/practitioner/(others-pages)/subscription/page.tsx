import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CategoriesTable from "../../../../components/tables/CategoriesTable";
import CategoryCard from "../../../../components/cards/CategoryCard";

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