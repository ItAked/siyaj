'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { readSubscriptions } from "../../../../../../server/SubscriptionsServer/read_subscriptions";
import { CreateFeature } from "../../../../../../server/FeaturesServer/create_new_feature";
import { readFeatures } from "../../../../../../server/FeaturesServer/read_features";
import { deleteFeature } from "../../../../../../server/FeaturesServer/delete_feature";
import { createSubscriptions } from "../../../../../../server/SubscriptionsServer/create_subscription";
import { updateSubscription } from "../../../../../../server/SubscriptionsServer/update_subscription";

interface Faetures {
    id: number;
    title: string;
}

interface Subscription {
    id: number;
    name: string;
    type: string;
    price: number;
    assigned_features: Faetures[];
    unassigned_features: Faetures[];
}

export default function Subscriptions() {
    const [titleFeature, setTitleFeature] = useState("");
    const [featureType, setFeatureType] = useState("");
    const [featurePrice, setFeaturePrice] = useState("");
    const [featureAssigned, setFeaturesAssigned] = useState<number[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [features, setFeatures] = useState<Faetures[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [subscreptionId, setSubscriptionId] = useState(0)

    async function getSubscriptions() {
        setIsLoading(true);
        try {
            const response = await readSubscriptions();
            
            setSubscriptions(response);
        } catch (error) {
            console.error("Failed to fetch lawyers:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function getFeatures() {
        setIsLoading(true);
        try {
            const response = await readFeatures();
            
            setFeatures(response);
        } catch (error) {
            console.error("Failed to fetch lawyers:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleAddFeature() {
        setIsLoading(true)
        try {
            const form = new FormData()

            form.append('title', titleFeature)
            await CreateFeature(form)
            getFeatures()
            getSubscriptions()
            setTitleFeature("")
        } catch (error) {
            console.error("Failed to fetch lawyers:", error);
        } finally {
            setIsLoading(false)
        }
    }

    async function handleRemoveFeature(id: number) {
        await deleteFeature(id);
        getFeatures()
        getSubscriptions()
    }

    async function handleAddSubscription() {
        await createSubscriptions({name: titleFeature, type: featureType, price: featurePrice, features: featureAssigned})
    }

    async function handleUpdateSubscription (id: number) {
        await updateSubscription(id, {name: titleFeature, type: featureType, price: featurePrice, features: featureAssigned})
        getSubscriptions();
        getFeatures();
    }

    useEffect(() => {
        getSubscriptions();
        getFeatures();
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
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">إضافة باقة جديدة</h5>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">الباقة</label>
                                        <input name="name" type="text" value={titleFeature} onChange={(e) => setTitleFeature(e.target.value)}
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
                                        <input name="type" type="text" value={featureType} onChange={(e) => setFeatureType(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">سعر الباقة</label>
                                        <input name="price" type="number" value={featurePrice} onChange={(e) => setFeaturePrice(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <details className="dropdown">
                                            <summary className="btn m-1">المميزات المفعلة</summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                { features.map((feature) => (
                                                    <li key={feature.id}>
                                                        <label className="label">
                                                            <input
                                                                type="checkbox"
                                                                value={feature.id}
                                                                onChange={(e) => {
                                                                    const id = Number(e.target.value);
                                                                    setFeaturesAssigned(prev =>
                                                                        e.target.checked
                                                                            ? [...prev, id]
                                                                            : prev.filter(fid => fid !== id)
                                                                    );
                                                                }}
                                                                className="checkbox"
                                                            /> {feature.title}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end modal-action">
                                <button type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto" onClick={handleAddSubscription}>إضافة باقة جديدة</button>
                                <form method="dialog">
                                    <button className="btn">إغلاق</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className="flex flex-col px-2">
                            <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">تعديل المميزات</h5>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">اضافة ميزة جديدة</label>
                                        <input name="laywer_name" type="text" value={titleFeature} onChange={(e) => setTitleFeature(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end modal-action">
                                <button onClick={handleAddFeature} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto">+</button>
                                <form method="dialog">
                                    <button className="btn">إغلاق</button>
                                </form>
                            </div>
                            <div className="grid grid-cols-3 place-items-center gap-y-8 mt-8">
                                { features.map((feature) => (
                                   <div key={feature.id} className="indicator">
                                        <div className="indicator-item indicator-top">
                                            <button className="btn btn-error" onClick={()=> handleRemoveFeature(feature.id)}>حذف</button>
                                        </div>
                                        <div className="card border-base-300 border shadow-sm">
                                            <div className="card-body">
                                                <h2 className="card-title">{feature.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                            <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">تعديل الباقة</h5>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">الباقة</label>
                                        <input name="name" type="text" value={titleFeature} onChange={(e) => setTitleFeature(e.target.value)}
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
                                        <input name="type" type="text" value={featureType} onChange={(e) => setFeatureType(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">سعر الباقة</label>
                                        <input name="price" type="number" value={featurePrice} onChange={(e) => setFeaturePrice(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <details className="dropdown">
                                            <summary className="btn m-1">المميزات المفعلة</summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                { features.map((feature) => (
                                                    <li key={feature.id}>
                                                        <label className="label">
                                                            <input
                                                                type="checkbox"
                                                                value={feature.id}
                                                                checked={featureAssigned.includes(feature.id)}
                                                                onChange={(e) => {
                                                                    const id = Number(e.target.value);
                                                                    setFeaturesAssigned(prev =>
                                                                        e.target.checked
                                                                            ? [...prev, id]
                                                                            : prev.filter(fid => fid !== id)
                                                                    );
                                                                }}
                                                                className="checkbox"
                                                            /> {feature.title}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end modal-action">
                                <button type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto" onClick={() => handleUpdateSubscription(subscreptionId)}>تعديل الباقة</button>
                                <form method="dialog">
                                    <button className="btn">إغلاق</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <div className="flex items-center">
                    <button onClick={() => {
                            const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
                            if (modal) modal.showModal();
                        }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                    py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto">إضافة باقة جديدة</button>
                    <button onClick={() => {
                            const modal = document.getElementById('my_modal_6') as HTMLDialogElement | null;
                            if (modal) modal.showModal();
                        }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                    py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto">تعديل المميزات</button>
                </div>

            </div>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">الباقة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">نوع الباقة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">سعر الباقة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">المميزات المفعلة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">المميزات الغير مفعلة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">تعديل</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {isLoading ? (
                            <TableRow>
                                <TableCell className="text-center py-4">جار التحميل...</TableCell>
                            </TableRow>
                        ) : subscriptions.map((subscription) => (
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
                                        {subscription.assigned_features.map((caseItem) => (
                                            <label key={caseItem.id} className="flex items-center gap-2">
                                                <input readOnly type="checkbox" value={caseItem.id} checked={true} className="checkbox checkbox-primary" />
                                                <span>{caseItem.title}</span>
                                            </label>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <div className="grid grid-cols-1 gap-2">
                                        {subscription.unassigned_features.map((caseItem) => (
                                            <label key={caseItem.id} className="flex items-center gap-2">
                                                <input readOnly type="checkbox" value={caseItem.id} checked={false} className="checkbox checkbox-primary" />
                                                <span>{caseItem.title}</span>
                                            </label>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <button onClick={() => {
                            const modal = document.getElementById('my_modal_7') as HTMLDialogElement | null;
                            if (modal) modal.showModal();
                            setTitleFeature(subscription.name)
                            setFeaturePrice(subscription.price.toString())
                            setFeatureType(subscription.type)
                            setFeaturesAssigned(subscription.assigned_features.map(f => f.id))
                            setSubscriptionId(subscription.id)
                        }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                    py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto">تعديل الباقة</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}