const CaseDescriptionCard = ({ descriptionData }) => {
    return(
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 my-3">
                <div className="flex flex-col gap-6 dark:text-white/90">
                    <div className="flex items-center gap-x-4">
                        <p className="text-2xl text-gray-800 dark:text-white/90">وقائع الدعوى</p>
                    </div>
                    <p className="text-sm">{descriptionData?.description}</p>
                </div>
            </div>
        </>
    )
}
export default CaseDescriptionCard