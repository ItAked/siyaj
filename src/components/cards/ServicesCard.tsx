'use client'

import { Clock, SaudiRiyal, SquarePercent } from "lucide-react"
import { useState } from "react"

const ServicesCard = () => {
    const[selected, ] = useState(false)

    return(
        <>
            <section className="grid gap-y-9">
                <div className={`card lg:card-side bg-base-100 shadow-sm dark:bg-gray-900/[0.12] dark:border-2
                    ${selected ? 'border-3 border-blue-950' : 'border-r-3 border-r-blue-950'}`}>
                    <div className="card-body dark:text-white">
                        <h2 className="card-title text-2xl font-medium">استشارة جلدية</h2>
                        <p className="text-gray-500">معلومات الجلسة
                            معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة
                            معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة
                            معلومات الجلسة معلومات الجلسة معلومات الجلسة معلومات الجلسة</p>
                        <div className="card-actions justify-between items-center">
                            <p className="flex items-center gap-x-0.5 text-base"><Clock className="text-gray-500 w-3.5 mb-1.5" />
                            <span className="text-gray-500 text-base">المدة: </span>٦٠ دقيقة</p>
                            <p className="flex items-center gap-x-0.5 text-base"><SquarePercent className="text-gray-500 w-3.5 mb-1.5" />
                            <span className="text-gray-500 text-base">السعر: </span>٥٠٠ <SaudiRiyal className="w-4" /></p>
                        </div>
                    </div>
                </div>
            </section>
            <button className="btn btn-wide mx-[30rem] my-7 bg-sky-950 text-white text-base font-medium">الدفع</button>
        </>
    )
}

export default ServicesCard