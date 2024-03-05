"use client"
// import Forgot_password from "@/src/components/authComponents/forgot_password/forgot_password";
// import Auth_header from "@/src/components/authComponents/header";
// import Nav_bar from "@/src/components/navigation/nav_bar";

import Auth_header from "../../../../../components/authComponents/header";
import { useSearchParams } from 'next/navigation';
import VerifyEmail from "../../../../../components/authComponents/verify/verify";

function Page({ params: { token } }) {
    const searchParams= useSearchParams();
    const email = searchParams.get('email');
    return (
        <div className="overflow-x-hidden">
            <Auth_header
                desc={"Verify Email Address"}
            />
            <VerifyEmail token={token} email={email} />
        </div>
    );
}

export default Page;
