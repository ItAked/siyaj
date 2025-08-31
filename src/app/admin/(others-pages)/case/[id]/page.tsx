import { Metadata } from "next";
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import CaseById from "../../../../../components/CaseById";

export const metadata: Metadata = {
  title: "الممارس الصحي",
  description: "صفحة الممارس الصحي"
};

export default async function Page({ params }) {
    const { id } = await params

    return (
        <>
            <PageBreadcrumb pageTitle="تفاصيل الدعوى" />
            <CaseById id={id} />
        </>
    )
    
}