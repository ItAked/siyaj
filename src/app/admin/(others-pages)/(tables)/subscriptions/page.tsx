'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../../components/ui/table";
import { useEffect, useState } from "react";
import { readSubscriptions } from "../../../../../../server/SubscriptionsServer/read_subscriptions";
import { CreateFeature } from "../../../../../../server/FeaturesServer/create_new_feature";
import { readFeatures } from "../../../../../../server/FeaturesServer/read_features";
import { deleteFeature } from "../../../../../../server/FeaturesServer/delete_feature";
import { createSubscriptions } from "../../../../../../server/SubscriptionsServer/create_subscription";
import { updateSubscription } from "../../../../../../server/SubscriptionsServer/update_subscription";
import { deleteSubscriptions } from "../../../../../../server/SubscriptionsServer/delete_subscription";
import { HorizontaLDots } from "../../../../../icons";
import Pagination from "../../../../../components/tables/Pagination";
import Alert from "../../../../../components/ui/alert/Alert";

interface Faetures {
    id: number;
    title: string;
}
interface Subscription {
    id: number;
    name: string;
    price: number;
    assigned_features: Faetures[];
}
type Meta = {
  current_page?: number;
  last_page?: number;
}

export default function Subscriptions() {
    const [titleFeature, setTitleFeature] = useState("");
    const [featurePrice, setFeaturePrice] = useState("");
    const [featureAssigned, setFeaturesAssigned] = useState<number[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [features, setFeatures] = useState<Faetures[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [subscreptionId, setSubscriptionId] = useState(0)
    const [pages, setPages] = useState<Meta>({})
    const [errorMsg, setErrorMsg] = useState('')
    const [isError, setIsError] = useState(false)

    async function getSubscriptions(page = 1) {
        setIsLoading(true);
        try {
            const response = await readSubscriptions(page);
            
            setSubscriptions(response.data);
            setPages(response.meta)
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
        try {
            const response = await createSubscriptions({name: titleFeature, price: featurePrice, features: featureAssigned})
            
            setIsError(false)
            setErrorMsg(response.message)
            getSubscriptions();
            getFeatures();
        } catch (error) {
            setIsError(true)
            setErrorMsg(error.response.data.message)
        }
    }

    async function handleUpdateSubscription (id: number) {
        try {
            const response = await updateSubscription(id, {name: titleFeature, price: featurePrice, features: featureAssigned})
    
            setIsError(false)
            setErrorMsg(response.message)
            getSubscriptions();
            getFeatures();
        } catch (error) {
            setIsError(true)
            setErrorMsg(error.response.data.message)
        }
    }

    async function handleRemoveSubscription(id: number) {
        await deleteSubscriptions(id)
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
                <div className="grid gap-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">الإشتراكات</h3>
                    <div className="flex items-center gap-x-4">
                        <button onClick={() => {
                                const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
                                if (modal) modal.showModal();
                            }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                        py-2.5 text-base font-medium text-white hover:bg-yellow-600 sm:w-auto">+ إضافة تصنيف جديد</button>
                        <button onClick={() => {
                                const modal = document.getElementById('my_modal_6') as HTMLDialogElement | null;
                                if (modal) modal.showModal();
                            }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-yellow-600 px-4
                                        py-2.5 text-sm font-medium text-white sm:w-auto">تعديل الدرجات</button>
                    </div>
                </div>

                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box dark:bg-gray-900">
                        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                            <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">إضافة تصنيف جديد</h5>
                                { errorMsg != '' && (
                                    isError ? <Alert variant={"error"} title={"حدث خطأ!"} message={errorMsg} />
                                    : <Alert variant={"success"} title="" message={errorMsg} />
                                )}
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">التصنيف</label>
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
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">سعر التصنيف</label>
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
                                            <summary className="btn m-1">الدرجات التي يخدمها التصنيف</summary>
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
                                py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto" onClick={handleAddSubscription}>إضافة تصنيف جديد</button>
                                <form method="dialog">
                                    <button className="btn" onClick={() => setErrorMsg('')}>إغلاق</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="my_modal_6" className="modal modal-bottom h-full sm:modal-middle">
                    <div className="modal-box dark:bg-gray-900">
                        <div className="flex flex-col px-2">
                            <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">تعديل الدرجات</h5>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">اضافة درجة جديدة</label>
                                        <div className="flex items-center gap-x-2.5">
                                            <input name="title" type="text" value={titleFeature} onChange={(e) => setTitleFeature(e.target.value)}
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                            shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                            dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                            <button onClick={handleAddFeature} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg
                                            bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 place-items-center gap-y-8 mt-8">
                                { features.map((feature) => (
                                    <div className="bg-gray-100 rounded-sm flex items-center gap-x-2 p-1" key={feature.id}>
                                        <p>{feature.title}</p>
                                        <button className="btn text-error btn-ghost p-0" onClick={()=> handleRemoveFeature(feature.id)}>X</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-center modal-action">
                        <form method="dialog">
                            <button className="btn bg-yellow-600 hover:bg-yellow-600 text-white">حفظ االدرجات</button>
                        </form>
                    </div>
                    </div>
                </dialog>

                <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                            <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">تعديل التصنيف</h5>
                                { errorMsg != '' && (
                                    isError ? <Alert variant={"error"} title={"حدث خطأ!"} message={errorMsg} />
                                    : <Alert variant={"success"} title="" message={errorMsg} />
                                )}
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">التصنيف</label>
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
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">سعر التصنيف</label>
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
                                            <summary className="btn m-1">الدرجات التي يخدمها التصنيف</summary>
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
                                py-2.5 text-sm font-medium text-white hover:bg-yellow-600 sm:w-auto" onClick={() => handleUpdateSubscription(subscreptionId)}>تعديل التصنيف</button>
                                <form method="dialog">
                                    <button className="btn" onClick={() => setErrorMsg('')}>إغلاق</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">التصنيف</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">سعر التصنيف</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">الدرجات التي يخدمها التصنيف</TableCell>
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
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{subscription.price}</TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <div className="grid grid-cols-1 gap-2">
                                        <ul>
                                            {subscription.assigned_features.map((caseItem) => (
                                                <li key={caseItem.id}>
                                                    <span>{caseItem.title}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <details className="dropdown">
                                        <summary className="btn btn-ghost dark:text-white hover:bg-transparent shadow-none border-none m-1"><HorizontaLDots /></summary>
                                        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm left-4">
                                            <li>
                                                <button onClick={() => {
                                                    const modal = document.getElementById('my_modal_7') as HTMLDialogElement | null;
                                                    if (modal) modal.showModal();
                                                    setTitleFeature(subscription.name)
                                                    setFeaturePrice(subscription.price.toString())
                                                    setFeaturesAssigned(subscription.assigned_features.map(f => f.id))
                                                    setSubscriptionId(subscription.id)
                                                }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg btn-ghost px-4
                                                py-2.5 text-sm font-medium hover:bg-transparent text-gray-900 sm:w-auto">تعديل</button>
                                            </li>
                                            <li>
                                                <button onClick={() => handleRemoveSubscription(subscription.id)} type="button" className="btn btn-update-event flex w-full
                                                justify-center rounded-lg btn-ghost px-4 py-2.5 text-sm font-medium hover:bg-transparent text-error
                                                sm:w-auto">حذف</button>
                                            </li>
                                        </ul>
                                    </details>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination currentPage={pages.current_page} totalPages={pages.last_page} onPageChange={function (page: number): void {
                    getSubscriptions(page)
                } } />
            </div>
        </div>
    );
}