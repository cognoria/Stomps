function Reset_password() {
  return (
    <div className="flex pb-[20px] flex-col mt-[30px] md:mt-[40px] gap-4 items-center justify-center w-screen h-auto">
      <form className="flex w-full flex-col items-center  justify-between gap-6">
        <div className="flex w-[90%] gap-4 md:w-[479px] flex-col items-start justify-start">
          <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
            Enter New Password
          </p>
          <input
            value=""
            // onChange={() => {}}
            type="password"
            className="h-10 w-full p-2 pl-4 font-manrope text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="****************"
          />
        </div>
        <div className="flex w-[90%] md:w-[479px] flex-col">
          <div className="flex flex-row gap-3 items-start justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#B7B7B7"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="text-[#B7B7B7] text-[10px] mt-1 font-normal font-manrope leading-[14px] tracking-tight">
              At least one uppercase letter
            </div>
          </div>
          <div className="flex flex-row gap-3 items-start justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#B7B7B7"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="text-[#B7B7B7] mt-1 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
              At least one uppercase letter
            </div>
          </div>
          <div className="flex flex-row gap-3  items-start justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#B7B7B7"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="text-[#B7B7B7] mt-1  text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
              At least one uppercase letter
            </div>
          </div>
        </div>
        <div className="flex w-[90%] gap-4 md:w-[479px] flex-col items-start justify-start">
          <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
            Confrim Password
          </p>
          <input
            value=""
            // onChange={() => {}}
            type="password"
            className="h-10 w-full p-2 pl-4 font-manrope text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="****************"
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

      <div className="md:w-[481px] w-[90%] mt-[10px] h-11 px-5 py-3  justify-center items-center gap-2 inline-flex">
        <img src="/images/auth/arrow_left.svg" alt="" className="w-6 h-6 " />
        <div className="text-sky-700 text-sm font-normal font-manrope leading-snug">
          Return to the login screen
        </div>
      </div>
    </div>
  );
}

export default Reset_password;
