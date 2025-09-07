'use client'

import { FormEvent, useEffect, useState } from "react";
import { assignSubscription, readLastSubscribe } from "../../../services/subscriptions";
import { paymentDetails } from "../../../public/data/payment_details";

type LastCategory = {
    name?: string;
    expire_at?: string;
}

const CategoryCard = () => {
    const [lastCategory, setLastCategoy] = useState<LastCategory>({})
    const [paymentFile, setPaymentFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [submitSuccess, setSubmitSuccess] = useState(false)
    
    async function showLastCategory() {
        const response = await readLastSubscribe()
        console.log(response.data);
        
        setLastCategoy(response.data)   
    }
    async function handleSubmitPayment(event: FormEvent) {
        event.preventDefault()
        setIsSubmitting(true)
        setSubmitError('')
        setSubmitSuccess(false)
        if (!paymentFile) {
          setSubmitError('الرجاء إرفاق الإيصال')
          setIsSubmitting(false)
          return
        }
        try {
            const formData = new FormData()
            formData.append('name', lastCategory.name ?? '')
            formData.append('payment_file', paymentFile)      
            await assignSubscription(formData)
            const dialog = document.getElementById('my_modal_4') as HTMLDialogElement | null;
            if (dialog) dialog.close()
        } catch (error) {
            console.error('Subscription error:', error)
            setSubmitError(error.response?.data?.message || 'حدث خطأ أثناء الإرسال')
        } finally {
            setIsSubmitting(false)
        }
    }
    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            setPaymentFile(event.target.files[0])
        }
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
                    <p className="text-2xl font-base">{lastCategory.name ?? ''}</p>
                    <p className="text-gray-500">{lastCategory.expire_at !== null ? `تاريخ بداية الإشتراك: ${lastCategory.expire_at}` : ''}</p>
                    <p className="text-error">ملاحظة: ينتهي الإشتراك بعد سنة من تاريخ بداية الإشتراك</p>
                    { lastCategory.expire_at === null && (
                        <div className="card-actions justify-end">
                            <button className="btn bg-brand-500 text-white dark:shadow-none dark:border-none" onClick={() => {
                                const dialog = document.getElementById('my_modal_4') as HTMLDialogElement | null;
                                if (dialog) dialog.showModal();
                            }}>تجديد الاشتراك</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="card-body dark:text-white">
                    <h2 className="card-title text-2xl font-medium">لا يوجد اشتراكات</h2>
                </div>
            )}
            </div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 w-[630px]">
                    <form onSubmit={handleSubmitPayment}>
                        <h3 className="font-bold text-lg text-center">معلومات الدفع</h3>
                        {paymentDetails.map((detail) => (
                            <div className="grid mt-7 mx-16" key={detail.id}>
                                <label className='text-start'>{detail.label}</label>
                                <label className="input">
                                    <input type="text" readOnly value={detail.placeholder} />
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                        </g>
                                    </svg>
                                </label>
                            </div>
                        ))}
                        <div className="grid mt-7 w-full mx-16">
                            <label className='text-start'>التصنيف المختار</label>
                            <label className="input">
                                <input type="text" readOnly value={lastCategory.name ?? ''} />
                            </label>
                        </div>
                        <fieldset className="fieldset mt-7 mx-16">
                            <label className="text-start text-base">رفع الإيصال</label>
                            <input type="file" className="file-input" onChange={handleFileChange} required />
                        </fieldset>
                        {submitError && (<div className="text-red-500 text-center mt-4">{submitError}</div>)}
                        {submitSuccess && (<div className="text-green-500 text-center mt-4">تم تفعيل التصنيف بنجاح!</div>)}
                        <div className='flex items-center mt-11 gap-x-4 justify-center'>
                            <button type="submit" className='btn bg-sky-950 w-52 text-white font-normal' disabled={isSubmitting}>
                                {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
                            </button>
                            <button type='button' className="btn bg-transparent border border-black w-52 text-black font-normal" onClick={() => {
                                const dialog = document.getElementById('my_modal_4') as HTMLDialogElement | null;
                                showLastCategory()
                                if (dialog) dialog.close();
                            }}>إلغاء</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default CategoryCard