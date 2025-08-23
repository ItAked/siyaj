import { Download } from "lucide-react"

const CaseAttachmentsCard = ({ attachmentsData }) => {
    return(
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 my-3 dark:text-white/90">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-x-4">
                        <p className="text-2xl text-gray-800 dark:text-white/90">مستندات الدعوى</p>
                    </div>
                    <a href={attachmentsData.file_path} className="text-sm flex items-center font-normal gap-x-1.5"><Download size={14} />
                    {attachmentsData.file_name === null ? 'لا توجد مستندات لهذه لدعوى' : attachmentsData.file_name}</a>
                </div>
            </div>
        </>
    )
}
export default CaseAttachmentsCard