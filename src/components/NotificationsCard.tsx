'use client'

import { CircleAlert } from "lucide-react"
import { useEffect, useState } from "react"
import { readNotifications } from "../../services/notification";
import Alert from "./ui/alert/Alert";

interface Notification {
    content: string;
}

const NotificationCard = () => {
    const [notfications, setNotifications] = useState<Notification[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    async function getNotifications(){
        try {
            setIsLoading(true)
            setError('')
            const response = await readNotifications()
            console.log(response.data);
            
            setNotifications(response.data);
        } catch (error) {
            setIsError(true)
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
            setError('')
        }
    }

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <>
            <section className="bg-gray-25 border border-gray-300 rounded-xl w-full h-full p-7 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:focus:border-brand-800">
                <h1 className="text-2xl font-medium dark:text-white">الإشعارات</h1>
                { isLoading && (<span className="loading loading-spinner text-info mx-96 my-20 max-sm:mx-52"></span>) }
                { isError && (<Alert variant={"error"} title={""} message={error} />) }
                <div className="grid my-11 gap-y-6">
                    { notfications.length > 0 ? notfications.map((notification, index) => (
                        <div className="card w-full bg-base-100 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800" key={index}>
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-x-6">
                                        <CircleAlert color="#FCFCFC" className="w-11 rounded-full h-11 bg-black text-center p-2.5" />
                                        <h2 className="text-2xl">قضية جديدة</h2>
                                    </div>
                                    <div className="status status-info"></div>
                                </div>
                                <span className="text-blue-300 text-sm">{notification.content}</span>
                            </div>
                        </div>
                    )) : (<span className="text-blue-300 text-sm">لا توجد إشعارات</span>)}
                </div>
            </section>
        </>
    )
}
export default NotificationCard