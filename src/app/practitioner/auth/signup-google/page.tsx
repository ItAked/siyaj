import { Suspense } from "react";
import SignUpGoogleForm from "../../../../components/auth/SignUpGoogleForm";

export default function SignUpGooglePage(){    
    return(
        <>
            <Suspense fallback={<>Loading...</>}>
                <SignUpGoogleForm />
            </Suspense>  
        </>
    )
}