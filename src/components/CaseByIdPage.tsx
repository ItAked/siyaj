'use client'

import { useEffect, useState } from "react";
import { readCaseById } from "../../services/cases";
import CaseTitleCard from "./cards/CaseTitleCard";
import CaseDescriptionCard from "./cards/CaseDescriptionCard";
import CaseAttachmentsCard from "./cards/CaseAttachmentsCard";
import CaseLawyerDataCard from "./cards/CaseLawyerDataCard";

type CaseData = {
    id?: number;
    case?: Cases;
    file_name?: string;
    file_path?: string;
    lawyer?: Lawyer;
}
type Cases = {
    id?: number;
    case_number?: number;
    created_at?: string;
    description?: string;
    stages?: string;
    status?: string;
    title?: string;
}
type Lawyer = {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
}

const CaseById = ({ id }) => {
    const[caseData, setCaseData] = useState<CaseData>({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getCaseData() {
            try {
                setLoading(true)
                const response = await readCaseById(id)                
                setCaseData(response.data)  
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
        <CaseTitleCard titleData={caseData.case} />
        <CaseDescriptionCard descriptionData={caseData.case} />
        <CaseAttachmentsCard attachmentsData={caseData} />
        <CaseLawyerDataCard lawyerData={caseData.lawyer} />
    </>
  );
}
export default CaseById