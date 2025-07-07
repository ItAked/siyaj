'use client'

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { readSubscriptions } from '../../../server/SubscriptionsServer/read_subscriptions';

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

  async function getCategories() {
    const response = await readSubscriptions()
    setCategories(response.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 my-32" id='packages'>
      <h2 className="text-6xl font-light text-center mb-2 max-sm:text-4xl" data-aos="zoom-y-out">اختر التصنيف المناسب لك</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14" data-aos="zoom-in">
        {categories.map((category) => (
          <div key={category.id} className='rounded-2xl overflow-hidden border border-gray-200 relative flex flex-col h-full'> 
            <div className='px-6 pt-8 pb-6'>
              <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold">{`${category.price} ريال`}</span>
                <span className="text-gray-600 ml-2">
                  / شهريًا
                </span>
              </div>
            </div>
            
            <div className="p-6 bg-white flex-grow">
              {category.assigned_features.length != 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">درجات الممارس الصحي</h4>
                  <ul className="space-y-3">
                    {category.assigned_features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="p-6 bg-white border-t border-gray-100">
              <button className='w-full py-3 px-4 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-800'>اختر الباقة</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;