'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { readSubscriptions } from "../../../../../../server/read_subscriptions";
import { SettingIcon } from "@/icons";

interface Subscriptions {
    id: number
    name: string
    type: string
    price: number
    active_features: string[]
    inactive_features: string[]
}

export default function Subscriptions() {
    const [subscriptionName, setsubscriptionName] = useState("");
    const [subscriptionType, setsubscriptionType] = useState("");
    const [subscriptionActiveFeatures, setsubscriptionActiveFeatures] = useState(['']);
    const [subscritions, setSubscritions] = useState<Subscriptions[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getSubscriptions() {
        setIsLoading(true);
        try {
            const response = await readSubscriptions();
            
            setSubscritions(response);
        } catch (error) {
            console.error("Failed to fetch subscriptions:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getSubscriptions();
    }, []);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">الباقات</h3>
                </div>

                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                            <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">تعديل الباقة</h5>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">إسم الباقة</label>
                                        <input name="laywer_name" type="text" value={subscriptionName} onChange={(e) => setsubscriptionName(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">نوع الباقة</label>
                                        <input name="laywer_email" type="email" value={subscriptionType} onChange={(e) => setsubscriptionType(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">الميزات المفعلة</label>
                                        <select defaultValue="Pick a color" className="select w-full">
                                            {subscriptionActiveFeatures.map((feature, index) => (
                                                <option key={index}>{feature}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">إضافة ميزة أخرى (تكون مفعلة تلقائيا)</label>
                                        <input className="input w-full" type="text" name="" id="" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end modal-action">
                                <form method="dialog" onSubmit={handleUpdateSubscription}>
                                    <button type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                    py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto">تعديل الباقة</button>
                                </form>
                                <form method="dialog">
                                    <button className="btn">إغلاق</button>
                                </form>
                            </div> */}
                        </div>
                    </div>
                </dialog>
            </div>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">الباقة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">نوع الباقة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">سعر الباقة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">المميزات المفعلة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">المميزات الغير المفعلة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">الإعدادات</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {isLoading ? (
                            <TableRow>
                                <TableCell className="text-center py-4">جار التحميل...</TableCell>
                            </TableRow>
                        ) : subscritions.map((subscription) => (
                            <TableRow key={subscription.id}>
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{subscription.name}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{subscription.type}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{subscription.price}</TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <div className="grid grid-cols-1 gap-2">
                                        <ul>
                                            {subscription.active_features.map((value, index) => (
                                                <li key={index}>{`${index + 1} ${value}`}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <div className="grid grid-cols-1 gap-2">
                                        <ul>
                                            {subscription.inactive_features.map((value, index) => (
                                                <li key={index}>{`${index + 1} ${value}`}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <details className="dropdown">
                                        <summary className="btn m-1 bg-transparent shadow-none border-none"><SettingIcon /></summary>
                                        <ul className="menu dropdown-content bg-base-100 rounded-box p-2 shadow-sm -left-0.5">
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        setsubscriptionName(subscription.name);
                                                        setsubscriptionType(subscription.type);
                                                        setsubscriptionActiveFeatures(subscription.active_features);

                                                        (document.getElementById('my_modal_5') as HTMLDialogElement | null)?.showModal();
                                                    }}
                                                >
                                                    تعديل
                                                </button>
                                            </li>
                                            <li><button>حذف</button></li>
                                        </ul>
                                    </details>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}