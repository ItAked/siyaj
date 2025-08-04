'use client'

import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { readSubscriptions } from '../../../services/subscriptions';

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

const paymentDetails = [
  {
    id: 1,
    label: 'إسم الحساب',
    placeholder: "شركة محمد مسفر المسفر للمحاماة والاستشارات القانونية"
  },
  {
    id: 2,
    label: 'الآيبان',
    placeholder: 'SA8720000002581440519940'
  },
  {
    id: 3,
    label: 'رقم الحساب',
    placeholder: '2581440519940'
  },
  {
    id: 4,
    label: 'إسم البنك',
    placeholder: 'بنك الرياض'
  }
]

const Categories = () => {
  const [categories, setCategories] = useState<Categories[]>([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  async function getCategories() {
    const response = await readSubscriptions()
    setCategories(response.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 my-32" id='packages'>
      <h2 className="text-6xl font-light text-center mb-2 max-sm:text-4xl" data-aos="zoom-y-out">إختر التصنيف</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14" data-aos="zoom-in">
        {categories.map((category) => (
          <div key={category.id} className='rounded-2xl overflow-hidden border border-sky-950 relative flex flex-col h-full'> 
            <div className='px-6 pt-8 pb-6'>
              <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold">{`${category.price} ريال`}</span>
                <span className="text-gray-600 ml-2">/ سنويًا</span>
              </div>
            </div>
            <div className="p-6 bg-white mx-auto">
              { getToken() ? (
                <button className="btn" onClick={()=> {const dialog = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                  setSelectedCategory(category); if (dialog) dialog.showModal();}}>إختيار التصنيف</button>
              ) : <button className="btn btn-wide bg-sky-950 border-none text-white" onClick={()=> {
                const dialog = document.getElementById('my_modal_4')as HTMLDialogElement | null; if (dialog) dialog.showModal();}}>
                إختيار التصنيف</button>}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box grid place-items-center">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-medium text-3xl">يجب عليك تسجيل الدخول أولًا</h3>
                  <a href={'/practitioner/auth/signin'} className="my-8 link">لتسجيل الدخول</a>
                </div>
              </dialog>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg text-center">معلومات الدفع</h3>
                  <div className="grid mt-7 w-full mx-16">
                    <label className='text-start'>التصنيف المختار</label>
                    <label className="input">
                      <input type="text" className="grow" readOnly value={selectedCategory ? selectedCategory.name : ''} />
                    </label>
                  </div>
                  { paymentDetails.map((detail) => (
                    <div className="grid mt-7 w-full mx-16" key={detail.id}>
                      <label className='text-start'>{detail.label}</label>
                      <label className="input">
                        <input type="text" className="grow" readOnly value={detail.placeholder} />
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                          </g>
                        </svg>
                      </label>
                    </div>
                  ))}
                  <fieldset className="fieldset mt-7 mx-16">
                    <label className="text-start text-base">رفع الإيصال</label>
                    <input type="file" className="file-input" />
                  </fieldset>
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