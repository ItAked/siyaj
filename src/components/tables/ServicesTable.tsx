'use client'

import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { Ellipsis } from "lucide-react";
import { createService } from "../../../services/services";
import Alert from "../ui/alert/Alert";

const ServicesTable = () => {
    const [errorMsg, setErrorMsg] = useState('')
    const [isError, setIsError] = useState(false)
    const [titleService, setTitleService] = useState("");
    const [descriptionService, setDescriptionService] = useState("");
    const [typeService, setTypeService] = useState("");
    const [priceService, setPriceService] = useState(0);
    const [checkType, setCheckType] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    // const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    // const [pages, setPages] = useState<Meta>({})
    // const [subscreptionId, setSubscriptionId] = useState(0)

    async function handleAddService() {
        try {
            setIsLoading(true)
            const response = await createService({title: titleService, description: descriptionService, type: typeService, price: priceService})
            setIsError(false)
            setErrorMsg(response.message)
            // getSubscriptions();
        } catch (error) {
            setIsError(true)
            setErrorMsg(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    // async function handleUpdateSubscription (id: number) {
    //     try {
    //         const response = await updateSubscription(id, {name: titleFeature, price: featurePrice})
    //         setIsError(false)
    //         setErrorMsg(response.message)
    //         getSubscriptions();
    //         setTitleFeature('')
    //         setFeaturePrice(0)
    //     } catch (error) {
    //         setIsError(true)
    //         setErrorMsg(error.response.data.message)
    //     }
    // }
    // async function getSubscriptions(page = 1) {
    //     setIsLoading(true);
    //     try {
    //         const response = await readSubscriptions(page);
    //         setSubscriptions(response.data);
    //         setPages(response.meta)
    //     } catch (error) {
    //         console.error("Failed to fetch lawyers:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }
    // async function handleRemoveSubscription(id: number) {
    //     await deleteSubscriptions(id)
    //     getSubscriptions();
    // }

    // useEffect(() => {
    //     getSubscriptions();
    // }, []);
    
    return(
        <>
            <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-medium text-gray-800 dark:text-white/90">الاستشارات والخدمات الاخرى</h3>
                    <button onClick={() => {
                            const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
                            if (modal) modal.showModal();
                        }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                    py-2.5 text-base font-medium text-white sm:w-auto shadow-none border-none">+ إضافة</button>
                </div>

                <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box dark:bg-gray-900">
                        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                            <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90
                                lg:text-2xl">إضافة إستشارة او خدمة</h5>
                                { errorMsg != '' && (
                                    isError ? <Alert variant={"error"} title={"حدث خطأ!"} message={errorMsg} />
                                    : <Alert variant={"success"} title="" message={errorMsg} />
                                )}
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">العنوان 
                                            <span className="text-error">*</span></label>
                                        <input name="title" type="text" value={titleService} onChange={(e) => setTitleService(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">التفاصيل
                                            <span className="text-error">*</span></label>
                                        <textarea name="description" value={descriptionService} onChange={(e) => setDescriptionService(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                                        dark:focus:border-brand-800"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">النوع
                                            <span className="text-error">*</span></label>
                                        <div className="grid gap-y-3.5">
                                            <label className="flex items-center gap-x-1.5 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                                            dark:focus:border-brand-800">
                                                <input type="radio" name="type" value="consultant" onChange={(event) => setTypeService(event.target.value)}
                                                className="radio checked:text-brand-500" />
                                                <p>استشارة</p>
                                            </label>
                                            <label className="flex items-center gap-x-1.5 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                                            dark:focus:border-brand-800">
                                                <input type="radio" name="type" value="service" onChange={(event) => setTypeService(event.target.value)}
                                                className="radio checked:text-brand-500" />
                                                <p>خدمة أخرى</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">التسعيرة
                                            <span className="text-error">*</span></label>
                                        <div className="grid gap-y-3.5">
                                            <label className="flex items-center gap-x-1.5 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                                            dark:focus:border-brand-800">
                                                <input type="radio" name="checkType" value={1} onChange={(event) => setCheckType(Number(event.target.value))}
                                                className="radio checked:text-brand-500" />
                                                <p>مدفوعة</p>
                                            </label>
                                            <label className="flex items-center gap-x-1.5 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                                            dark:focus:border-brand-800">
                                                <input type="radio" name="checkType" value={0} onChange={(event) => setCheckType(Number(event.target.value))}
                                                className="radio checked:text-brand-500" />
                                                <p>مجانية</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { checkType === 1 && (
                                <div className="mt-8">
                                    <div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">سعر الاستشارة 
                                                <span className="text-error">*</span></label>
                                            <input name="price" type="number" value={priceService} onChange={(e) => setPriceService(Number(e.target.value))}
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                            shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                            dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-start modal-action">
                                <button type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                py-2.5 text-sm font-medium text-white hover:bg-sky-300 sm:w-auto" onClick={handleAddService}>إضافة</button>
                                <form method="dialog">
                                    <button className="btn bg-transparent border-brand-500 text-brand-500 dark:text-white dark:border-white" onClick={() => {
                                        setPriceService(0)
                                        setTitleService('')
                                        setDescriptionService('')
                                        setTypeService('')
                                        setErrorMsg('')}}>إلغاء</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                            {/* <div>
                                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-center text-theme-xl dark:text-white/90 lg:text-2xl">تعديل التصنيف</h5>
                                { errorMsg != '' && (
                                    isError ? <Alert variant={"error"} title={"حدث خطأ!"} message={errorMsg} />
                                    : <Alert variant={"success"} title="" message={errorMsg} />
                                )}
                            </div> */}
                            {/* <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">التصنيف</label>
                                        <input name="name" type="text" value={titleFeature} onChange={(e) => setTitleFeature(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="mt-8">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">سعر التصنيف</label>
                                        <input name="price" type="number" value={featurePrice} onChange={(e) => setFeaturePrice(Number(e.target.value))}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800
                                        shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
                                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-start modal-action">
                                <button type="button" className="btn btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4
                                py-2.5 text-sm font-medium text-white sm:w-auto" onClick={() => handleUpdateSubscription(subscreptionId)}>تعديل التصنيف</button>
                                <form method="dialog">
                                    <button className="btn border-black bg-transparent text-black dark:text-white dark:border-white" onClick={() => {
                                        setFeaturePrice(0)
                                        setTitleFeature('')
                                        setErrorMsg('')}}>إلغاء</button>
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
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">#</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">عنوان الاستشارة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">نوع الاستشارة</TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">سعر الاستشارة</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {/* {isLoading ? (
                            <TableRow>
                                <TableCell className="text-center py-4">جار التحميل...</TableCell>
                            </TableRow>
                        ) : subscriptions.map((subscription) => ( */}
                            <TableRow>
                                <TableCell className="py-3">#</TableCell>
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">عنوان الاستشارة</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">نوع الاتسشارة</TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">سعر الاتسشارة</TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <details className="dropdown">
                                        <summary className="btn btn-ghost dark:text-white hover:bg-transparent shadow-none border-none m-1">
                                            <Ellipsis className="dark:text-white" /></summary>
                                        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm left-4 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800">
                                            <li>
                                                <button onClick={() => {
                                                    const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
                                                    if (modal) modal.showModal();
                                                    // setTitleFeature(subscription.name)
                                                    // setFeaturePrice(subscription.price)
                                                    // setSubscriptionId(subscription.id)
                                                }} type="button" className="btn btn-update-event flex w-full justify-center rounded-lg btn-ghost px-4
                                                py-2.5 text-sm font-medium hover:bg-transparent dark:text-white text-black sm:w-auto shadow-none">تعديل</button>
                                            </li>
                                            {/* <li>
                                                <button onClick={() => handleRemoveSubscription(subscription.id)} type="button" className="btn btn-update-event flex w-full
                                                justify-center rounded-lg btn-ghost px-4 py-2.5 text-sm font-medium hover:bg-transparent text-error shadow-none
                                                sm:w-auto">حذف</button>
                                            </li> */}
                                        </ul>
                                    </details>
                                </TableCell>
                            </TableRow>
                        {/* ))} */}
                    </TableBody>
                </Table>
                {/* <Pagination currentPage={pages.current_page} totalPages={pages.last_page} onPageChange={function (page: number): void {
                    getSubscriptions(page)
                } } /> */}
            </div>
        </>
    )
}
export default ServicesTable