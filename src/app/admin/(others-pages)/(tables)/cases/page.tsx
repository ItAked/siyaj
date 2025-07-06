import AllCases from "../../../../../components/AllCases";
import ComponentCard from "../../../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "القضايا",
  description: "صفحة القضايا"
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="القضايا" />
      <div className="space-y-6">
        <ComponentCard>
          <AllCases />
        </ComponentCard>
      </div>
    </div>
  );
}
