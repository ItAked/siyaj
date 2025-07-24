import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb"
import { Metadata } from "next";
import Practitioner from "../../../../../components/Practitioner";

export const metadata: Metadata = {
  title: "الممارس الصحي",
  description: "صفحة الممارس الصحي"
};

export default function Page({ params }) {
    const { id } = params

    return (
        <>
            <PageBreadcrumb pageTitle="الممارسين الصحيين / بيانات الممارس الصحي" />
            <Practitioner id={id} />
        </>
    )
    
}