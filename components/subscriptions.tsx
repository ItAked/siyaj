'use client'

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import subscriptions from '@/public/data/subscriptions';

const Subscriptions = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const handleBillingPeriodChange = (period: React.SetStateAction<string>) => {
    setBillingPeriod(period);
  };

  const getPrice = (subscription: { id?: number; name?: string; description?: string; monthlyPrice: any; yearlyPrice: any; features?: string[]; notIncluded?: string[]; popular?: boolean; color?: string; }) => {
    return billingPeriod === 'monthly' 
      ? subscription.monthlyPrice 
      : subscription.yearlyPrice;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 my-32" id='packages'>
      <h2 className="text-6xl font-light text-center mb-2">اختر باقتك</h2>
      
      {/* Subscription cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14">
        {subscriptions.map((subscription) => (
          <div 
            key={subscription.id}
            className={`rounded-2xl overflow-hidden border ${
              subscription.popular ? 'border-yellow-400 shadow-lg' : 'border-gray-200'
            } relative flex flex-col h-full`}
          >
            {subscription.popular && (
              <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                الأكثر مبيعًا
              </div>
            )}
            
            <div className={`${subscription.color} px-6 pt-8 pb-6`}>
              <h3 className="text-2xl font-bold mb-1">{subscription.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold">{`${getPrice(subscription)} ريال`}</span>
                <span className="text-gray-600 ml-2">
                  / {billingPeriod === 'monthly' ? 'شهر' : 'سنة'}
                </span>
              </div>
            </div>
            
            <div className="p-6 bg-white flex-grow">
              <div className="mb-6">
                <h4 className="font-semibold mb-3">مميزات الباقة:</h4>
                <ul className="space-y-3">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {subscription.notIncluded.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">الغير متاح في الباقة</h4>
                  <ul className="space-y-3">
                    {subscription.notIncluded.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-500">
                        <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white border-t border-gray-100">
              <button 
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  subscription.popular 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                اختر الباقة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;