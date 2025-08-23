const CaseLawyerDataCard = ({ lawyerData }) => {
    return(
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-x-4">
                        <p className="text-2xl font-medium text-gray-800 dark:text-white/90">معلومات المحامي</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-x-0 mb-2 text-xl leading-normal text-black dark:text-gray-400 max-sm:grid-cols-1">
                            <p>اسم المحامي</p>
                            <p>{lawyerData?.lawyer_name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-0 mb-2 text-xl leading-normal text-black dark:text-gray-400 max-sm:grid-cols-1">
                            <p>البريد الالكتروني</p>
                            <p>{lawyerData?.lawyer_email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-0 mb-2 text-xl leading-normal text-black dark:text-gray-400 max-sm:grid-cols-1">
                            <p>الهاتف</p>
                            <p>{lawyerData?.lawyer_phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CaseLawyerDataCard