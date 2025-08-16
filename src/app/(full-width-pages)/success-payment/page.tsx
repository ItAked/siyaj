import { Suspense } from "react";
import SuccessPayment from "../../../components/SuccessPayment";

export default function Page() {
    return(
        <Suspense fallback={<div>Loading content...</div>}>
            <SuccessPayment />
        </Suspense>
    )
}