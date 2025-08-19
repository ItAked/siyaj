import { Metadata } from "next";
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import EditCasePage from "../../../../../components/EditCasePage";
import { Pencil } from "lucide-react";

export const metadata: Metadata = {
  title: "الممارس الصحي",
  description: "صفحة الممارس الصحي"
};

export default function Page({ params }) {
    const { id } = params

    return (
        <>
            <div className="flex items-center justify-between">
                <PageBreadcrumb pageTitle="تفاصيل الدعوى" />
                <a href={`/practitioner/edit-case/${id}`} className="link no-underline"><Pencil size={16} /></a>
            </div>
            <EditCasePage id={id} />
        </>
    )
    
}