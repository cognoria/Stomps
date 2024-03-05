"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import useVerifyStore from "../../../store/auth/verify";
import { useEffect } from "react";

function VerifyEmail({ token, email }) {
    const { verifyUser, resend, loading, error, verified, message } = useVerifyStore((state) => ({
        verifyUser: state.verifyUser,
        verified: state.verified,
        message: state.message,
        loading: state.loading,
        resend: state.resend,
        error: state.error,
    }));

    useEffect(() => {
        if (token) {
            verifyUser(token, () => { })
        }
    }, [token])

    return (
        <div className="flex pb-[20px] flex-col mt-[30px] md:mt-[40px] gap-4 items-center justify-center w-screen h-auto">
            <div className="flex w-full flex-col items-center  justify-between gap-6">
                <div className="flex gap-4 md:w-[479px] w-[90%] flex-col items-start justify-start">
                    {/* <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
                        Email Address
                    </p>
                    <input
                        type="email"
                        className="h-10 w-full p-2 pl-4 font-manrope text-[#8A8A8A] bg-transparent  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Janeearnest@gmail.com"
                    /> */}
                    {!loading && error && <Error message={error} />}
                    {!loading && message && <Success message={message} />}
                    {loading && <div class="flex items-center justify-center mx-auto w-full">
                        <div class="w-20 h-20 border-4 border-sky-700 border-dotted rounded-full animate-spin"></div>
                    </div>
                    }
                </div>
               {!loading && !verified && error && <div className="md:w-[481px] w-[90%] mt-[20px] h-11 px-5 py-3 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex">
                     <button disabled={loading} onClick={() => resend(email, () =>{})}
                        className="text-white text-sm font-bold font-manrope leading-snug"
                    >
                        Resent Verification Email
                    </button>
                </div>}
            </div>
            {!loading && <Link className="w-full md:w-[481px]" href="/signin">
                <div className="md:w-[481px] w-[90%] mt-[10px] h-11 px-5 py-3  justify-center items-center gap-2 inline-flex">
                    <img src="/images/auth/arrow_left.svg" alt="" className="w-6 h-6 " />
                    <div className="text-sky-700 text-sm font-normal font-manrope leading-snug">
                        Return to the login screen
                    </div>
                </div>
            </Link>}
        </div>
    );
}

function Success({ message }) {
    return (
        <>
            <div className="flex items-center justify-center mx-auto  w-full">
                <div className="bg-green-500 rounded-full p-2 animate-fade-in inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <p className="text-center w-full font-semibold">
                {message}
            </p>
        </>
    )
}

function Error({ message }) {
    return (
        <>
            <div class="flex items-center justify-center mx-auto w-full">
                <div class="bg-red-500 rounded-full p-2 animate-fade-in inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <p  className="text-center w-full font-semibold">
                {message}
            </p>
        </>
    )
}
export default VerifyEmail;
