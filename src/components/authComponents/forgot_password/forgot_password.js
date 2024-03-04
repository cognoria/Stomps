import Link from "next/link";

function Forgot_password() {
  return (
    <div className="flex pb-[20px] flex-col mt-[30px] md:mt-[40px] gap-4 items-center justify-center w-screen h-auto">
      <form className="flex w-full flex-col items-center  justify-between gap-6">
        <div className="flex gap-4 md:w-[479px] w-[90%] flex-col items-start justify-start">
          <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
            Email Address
          </p>
          <input
            type="email"
            className="h-10 w-full p-2 pl-4 font-manrope text-[#8A8A8A] bg-transparent  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Janeearnest@gmail.com"
          />
        </div>
        <div className="md:w-[481px] w-[90%] mt-[20px] h-11 px-5 py-3 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex">
          <button
            type="submit"
            className="text-white text-sm font-bold font-manrope leading-snug"
          >
            Get Link
          </button>
        </div>
      </form>
      <Link className="w-full md:w-[481px]" href="/signin">
        <div className="md:w-[481px] w-[90%] mt-[10px] h-11 px-5 py-3  justify-center items-center gap-2 inline-flex">
          <img src="/images/auth/arrow_left.svg" alt="" className="w-6 h-6 " />
          <div className="text-sky-700 text-sm font-normal font-manrope leading-snug">
            Return to the login screen
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Forgot_password;
