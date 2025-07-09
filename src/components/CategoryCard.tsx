const CategoryCard = () => {
    return(
        <>
            <div className="card lg:card-side bg-base-100 shadow-sm dark:bg-gray-900/[0.12] dark:border-2">
                <div className="card-body dark:text-white">
                    <h2 className="card-title text-2xl font-medium">التصنيف الحالي</h2>
                    <p className="text-2xl font-base">تصنيف الاستشاري</p>
                    <div className="card-actions justify-end">
                        <button className="btn bg-sky-950 text-white dark:bg-brand-400 dark:shadow-none dark:border-none">تجديد الاشتراك</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryCard