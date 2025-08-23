'use client'

import { useEffect, useState } from "react";
import { readCaseById } from "../../services/cases";
import CaseTitleCard from "./cards/CaseTitleCard";
import CaseDescriptionCard from "./cards/CaseDescriptionCard";
import CaseAttachmentsCard from "./cards/CaseAttachmentsCard";
import CaseLawyerDataCard from "./cards/CaseLawyerDataCard";

interface Attachments {
    file_name: string;
    file_path: string;
}
type Cases = {
    case?: string;
    date?: string;
    id?: number;
    lawyer_email?: string;
    lawyer_name?: string;
    lawyer_phone?: string;
    status?: string;
    stages?: string;
    case_number?: number;
    description?: string;
}

const EditPage = ({ id }) => {
    const[caseData, setCaseData] = useState<Cases>({})
    const[caseAttachments, setCaseAttachments] = useState<Attachments[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getCaseData() {
            try {
                setLoading(true)
                const response = await readCaseById(id)
                setCaseData(response.cases)
                setCaseAttachments(response.attachments)
            } catch (error) {
                console.log(error?.response?.data?.message);
            } finally {
                setLoading(false)
            }  
        }
        getCaseData()
    }, [id])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
    <>
        <CaseTitleCard titleData={caseData} />
        <CaseDescriptionCard descriptionData={caseData} />
        <CaseAttachmentsCard attachmentsData={caseAttachments} />
        <CaseLawyerDataCard lawyerData={caseData} />
    </>
  );
}
export default EditPage