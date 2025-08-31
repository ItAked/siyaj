import ServicesTable from "../../../../../components/tables/ServicesTable";
import SubscriptionTable from "../../../../../components/tables/SubscriptionTable";

export default function Subscriptions() {

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                <SubscriptionTable />
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 mt-11">
                <ServicesTable />
            </div>
        </>
    );
}