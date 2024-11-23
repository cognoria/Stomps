"use client"

export default function LicenceInvalid() {
    function purchaseLicense() {
        window.location.href = 'https://stomps.io';
    }
    return <div className="w-full flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold text-sky-700">Invalid License Keys</p>
        <p className="text-sm text-zinc-800">
            You are not licensed to use this application. 
            Please purchase a license to continue
        </p>
        <button
            onClick={purchaseLicense}
            className={`w-full bg-sky-700 text-white px-5 py-3 rounded-lg text-sm font-bold font-manrope leading-snug mt-5 max-w-[200px] hover:bg-sky-700/75`}
        >
            Purchase License
        </button>
    </div>
}
