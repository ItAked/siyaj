'use client'

import { useEffect, useState } from "react";
import { readCaseById } from "../../services/cases";
import CaseTitleCard from "./cards/CaseTitleCard";
import CaseDescriptionCard from "./cards/CaseDescriptionCard";
import CaseAttachmentsCard from "./cards/CaseAttachmentsCard";
import CasePractitionerDataCard from "./cards/CasePractitionerDataCard";

interface Attachments {
    id?: number;
    file_name: string;
    file_path: string;
}
type Cases = {
    case?: string;
    date?: string;
    id?: number;
    practitioner_email?: string;
    practitioner_name?: string;
    practitioner_phone?: string;
    status?: string;
    stages?: string;
    case_number?: number;
    description?: string;
    practitioner_medical?: string;
}

const CaseById = ({ id }) => {
    const[caseData, setCaseData] = useState<Cases>({})
    const[caseAttachments, setCaseAttachments] = useState<Attachments[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        async function getCaseData() {
            try {
                setLoading(true)
                const response = await readCaseById(id)
                setCaseData(response.cases)
                setCaseAttachments(response.attachments)
            } catch (error) {
                setErrorMsg(error?.response?.data?.message);
            } finally {
                setLoading(false)
            }  
        }
        getCaseData()
    }, [id])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errorMsg !== '') {
        return <div className="text-error text-center my-auto">هذه القضية غير مسندة لك</div>;
    }

    return (
    <>
        <CaseTitleCard titleData={caseData} />
        <CaseDescriptionCard descriptionData={caseData} />
        <CaseAttachmentsCard attachmentsData={caseAttachments} />
        <CasePractitionerDataCard practitionerData={caseData} />
    </>
  );
}
export default CaseById