const CasePractitionerDataCard = ({ practitionerData }) => {
    return(
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-x-4">
                        <p className="text-2xl font-medium text-gray-800 dark:text-white/90">معلومات الممارس الصحي</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-x-0 mb-2 text-sm leading-normal text-black dark:text-gray-400 max-sm:grid-cols-1">
                            <p>اسم الممارس الصحي</p>
                            <p>{practitionerData?.name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-0 mb-2 text-sm leading-normal text-black dark:text-gray-400 max-sm:grid-cols-1">
                            <p>المهنة</p>
                            <p>{practitionerData?.medical}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-0 mb-2 text-sm leading-normal text-black dark:text-gray-400 max-sm:grid-cols-1">
                            <p>الهاتف</p>
                            <p>{practitionerData?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CasePractitionerDataCard