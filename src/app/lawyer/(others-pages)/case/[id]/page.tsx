import { Metadata } from "next";
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import CaseById from "../../../../../components/CaseByIdPage";

export const metadata: Metadata = {
  title: "الممارس الصحي",
  description: "صفحة الممارس الصحي"
};

export default function Page({ params }) {
    const { id } = params

    return (
        <>
            <PageBreadcrumb pageTitle="تفاصيل الدعوى" />
            <CaseById id={id} />
        </>
    )
    
}