"use client"
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
