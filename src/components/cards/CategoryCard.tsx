'use client'

import { useEffect, useState } from "react";
import { readLastSubscribe } from "../../../services/subscriptions";

type LastCategory = {
    name?: string;
    expire_at?: string;
}

const CategoryCard = () => {
    const [lastCategory, setLastCategoy] = useState<LastCategory>({})
    
    async function showLastCategory() {
        const response = await readLastSubscribe()
        setLastCategoy(response.data)   
    }

    useEffect(() => {
        showLastCategory()
    }, [])

    return(
        <>
            <div className="card lg:card-side bg-base-100 shadow-sm dark:bg-gray-900/[0.12] dark:border-2">
            {lastCategory ? (
                <div className="card-body dark:text-white">
                    <h2 className="card-title text-2xl font-medium">التصنيف الحالي</h2>
                    <p className="text-2xl font-base">{lastCategory.name}</p>
                    <p className="text-gray-500">{`تاريخ بداية الإشتراك: ${lastCategory.expire_at}`}</p>
                    <p className="text-error">ملاحظة: ينتهي الإشتراك بعد سنة من تاريخ بداية الإشتراك</p>
                    <div className="card-actions justify-end">
                        <button className="btn bg-error text-white dark:shadow-none dark:border-none">إلغاء الاشتراك</button>
                    </div>
                </div>
            ) : (
                <div className="card-body dark:text-white">
                    <h2 className="card-title text-2xl font-medium">لا يوجد اشتراكات</h2>
                </div>
            )}
            </div>
        </>
    )
}

export default CategoryCard