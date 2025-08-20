'use client'

import { useEffect, useState } from "react";
import { readCaseById } from "../../services/cases";
import CaseTitleCard from "./cards/CaseTitleCard";
import CaseDescriptionCard from "./cards/CaseDescriptionCard";
import CaseAttachmentsCard from "./cards/CaseAttachmentsCard";
import CaseLawyerDataCard from "./cards/CaseLawyerDataCard";

type CaseData = {
    id?: number;
    attachments?: string;
    case_number?: number;
    created_at?: string;
    description?: string;
    lawyer_email?: string;
    lawyer_name?: string;
    lawyer_phone?: string;
    stages?: string;
    status?: string;
    title?: string;
}

const CaseById = (props: {id: number;}) => {
    const[caseData, setCaseData] = useState<CaseData>({})

    async function getCaseData() {
        const response = await readCaseById(props.id)
        setCaseData(response.data)        
    }

    useEffect(() => {
        getCaseData()
    }, [])

    return (
    <>
        <CaseTitleCard titleData={caseData} />
        <CaseDescriptionCard descriptionData={caseData} />
        <CaseAttachmentsCard attachmentsData={caseData} />
        <CaseLawyerDataCard lawyerData={caseData} />
    </>
  );
}
export default CaseById