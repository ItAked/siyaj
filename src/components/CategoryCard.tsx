'use client'

import { useEffect, useState } from "react";
import { readLastSubscribe } from "../../server/SubscriptionsServer/read_last_subscribe"

type LastCategory = {
    name?: string;
    expire_at?: string;
}

const CategoryCard = () => {
    const [lastCategory, setLastCategoy] = useState<LastCategory>({})
    async function showLastCategory() {
        const response = await readLastSubscribe()
        console.log(response.data);
        
        
        setLastCategoy(response.data)   
    }

    useEffect(() => {
        showLastCategory()
    }, [])

    return(
        <>
            <div className="card lg:card-side bg-base-100 shadow-sm dark:bg-gray-900/[0.12] dark:border-2">
                <div className="card-body dark:text-white">
                    <h2 className="card-title text-2xl font-medium">التصنيف الحالي</h2>
                    <p className="text-2xl font-base">{lastCategory.name}</p>
                    <p className="text-gray-500">{`تاريخ بداية الإشتراك: ${lastCategory.expire_at}`}</p>
                    <p className="text-error">ملاحظة: ينتهي الإشتراك بعد سنة من تاريخ بداية الإشتراك</p>
                    {lastCategory.expire_at == null && (
                        <div className="card-actions justify-end">
                            <button className="btn bg-sky-950 text-white dark:bg-brand-400 dark:shadow-none dark:border-none">تجديد الاشتراك</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CategoryCard