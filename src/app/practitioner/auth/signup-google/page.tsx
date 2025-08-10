import { Suspense } from "react";
import SignUpGoogleForm from "../../../../components/auth/SignUpGoogleForm";
import Header from "../../../../components/home/header";

export default function SignUpGooglePage(){    
    return(
        <>
            <Header />
            <Suspense fallback={<>Loading...</>}>
                <SignUpGoogleForm />
            </Suspense>
        </>
    )
}