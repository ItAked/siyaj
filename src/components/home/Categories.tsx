'use client'

import React, { useEffect, useRef, useState } from 'react';
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

const Categories = () => {
  const [categories, setCategories] = useState<Categories[]>([])
  const modalRef = useRef<HTMLDialogElement>(null);

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
                <span className="text-gray-600 ml-2">
                  / سنويًا
                </span>
              </div>
            </div>
            <div className="p-6 bg-white mx-auto">
              { getToken() ? (
                <a href={`https://dev.siyaj.sa/payment/${category.price}/${category.name}`} className='btn btn-wide bg-blue-300 border-none text-white'>إختيار</a>
              ) : <button className="btn border-sky-950 text-sky-950" onClick={() => modalRef.current?.showModal()}>إختيار</button>}
              <dialog id="my_modal_3" className="modal" ref={modalRef}>
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg text-center">للإختيار يجب عليك تسجيل الدخول أولًا</h3>
                  <a href='/practitioner/auth/signin' className="py-4 link">تسجيل الدخول</a>
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