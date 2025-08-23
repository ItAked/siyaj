import Badge from "../ui/badge/Badge"

const CaseTitleCard = ({ titleData }) => {
    return(
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-x-4">
                        <p className="text-xl font-normal text-gray-800 dark:text-white/90">{titleData?.title}</p>
                        <Badge color="warning">{titleData?.status}</Badge>
                        <Badge color="warning">{titleData?.stages}</Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <p className="mb-2 text-xl leading-normal text-black dark:text-gray-400">#{titleData?.case_number}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm leading-normal text-gray-500
                            dark:text-gray-400">{titleData?.created_at.substring(0, titleData?.created_at.indexOf('T'))}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CaseTitleCard