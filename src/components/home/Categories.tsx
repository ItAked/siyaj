'use client'

import React, { FormEvent, useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { assignSubscription, readSubscriptions } from '../../../services/subscriptions';
import { SaudiRiyal } from 'lucide-react';
import { paymentDetails } from '../../../public/data/payment_details';

interface Faetures {
  id: number;
  title: string;
}
interface Categories {
  id: number;
  name: string;
  type: string;
  price: number;
  assigned_features: Faetures[];
}

const Categories = () => {
  const [categories, setCategories] = useState<Categories[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(null)
  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  async function getCategories() {
    const response = await readSubscriptions()
    setCategories(response.data)
  }
  async function handleSubmitPayment(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)
    if (!selectedCategory || !paymentFile) {
      setSubmitError('الرجاء إرفاق الإيصال')
      setIsSubmitting(false)
      return
    }
    try {
      const formData = new FormData()
      formData.append('name', selectedCategory.name)
      formData.append('payment_file', paymentFile)      
      await assignSubscription(formData)
      const dialog = document.getElementById('my_modal_7') as HTMLDialogElement | null;
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
    getCategories()
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 my-32 dark:text-white" id='packages'>
      <h2 className="text-6xl font-light text-center mb-2 max-sm:text-4xl" data-aos="zoom-y-out">إختر التصنيف</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14" data-aos="zoom-in">
        {categories.map((category) => (
          <div key={category.id} className='rounded-2xl overflow-hidden border border-sky-950 relative flex flex-col h-full'> 
            <div className='px-6 pt-8 pb-6'>
              <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold flex items-center">{`${category.price}`} <SaudiRiyal /></span>
                <span className="text-gray-600 ml-2">/ سنويًا</span>
              </div>
              <p className='text-xl text-gray-500 font-normal'>وصف للتصنيفوصف للتصنيفوصف للتصنيفوصف للتصنيفوصف للتصنيفوصف</p>
            </div>
            <div className="p-6 bg-white mx-auto dark:bg-black">
              { getToken() ? (
                <button className="btn btn-wide bg-sky-950 border-none text-white dark:shadow-none" onClick={()=> {
                  const dialog = document.getElementById('my_modal_7') as HTMLDialogElement | null;
                  setSelectedCategory(category); 
                  if (dialog) dialog.showModal();
                }}>إختيار التصنيف</button>
              ) : <button className="btn btn-wide bg-sky-950 border-none text-white dark:shadow-none" onClick={()=> {
                const dialog = document.getElementById('my_modal_3')as HTMLDialogElement | null; 
                if (dialog) dialog.showModal();
              }}>إختيار التصنيف</button>}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box grid place-items-center dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-medium text-3xl">يجب عليك تسجيل الدخول أولًا</h3>
                  <a href={'/auth/signin'} className="my-8 link">لتسجيل الدخول</a>
                </div>
              </dialog>
              <dialog id="my_modal_7" className="modal">
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
                        <input type="text" readOnly name='name' value={selectedCategory ? selectedCategory.name : ''} />
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
                        const dialog = document.getElementById('my_modal_7') as HTMLDialogElement | null;
                        if (dialog) dialog.close();
                      }}>إلغاء</button>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;