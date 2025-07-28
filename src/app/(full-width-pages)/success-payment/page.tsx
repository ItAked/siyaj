import { Suspense } from "react";
import SuccessPayment from "../../../components/SuccessPayment";

export default function Page() {
    return(
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading payment details...</div>}>
            <SuccessPayment />
        </Suspense>
    )
}