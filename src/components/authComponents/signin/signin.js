"use client";
import { auth_schema } from "@/src/utils/resolver/yup_schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";

function Signin_form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(auth_schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="flex pb-[20px] flex-col mt-[30px] md:mt-[40px] gap-4 items-center justify-center w-screen h-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center  justify-between gap-6"
      >
        <div className="flex gap-4 md:w-[479px] w-[90%] flex-col items-start justify-start">
          <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
            Email Address
          </p>
          <input
            name="email"
            {...register("email")}
            type="email"
            className="h-10 w-full p-2 pl-4 font-manrope text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Janeearnest@gmail.com"
          />
          {errors.email && (
            <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>
        <div className="flex w-[90%] gap-4 md:w-[479px] flex-col items-start justify-start">
          <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
            Password
          </p>
          <input
            {...register("password")}
            name="password"
            type="password"
            className="h-10 w-full p-2 pl-4 font-manrope text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="****************"
          />
          {errors.password && (
            <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
              <span>{errors.password.message}</span>
            </div>
          )}
        </div>
        <div className="flex w-[90%] md:w-[479px] flex-col">
          <div className="w-[481px]">
            <span className="text-zinc-500 text-xs leading-none tracking-tight md:text-sm font-normal font-manrope md:leading-snug">
              Forgot password?{" "}
            </span>
            <span className="text-sky-700 text-sm font-bold font-manrope leading-tight tracking-tight">
              <Link href="/auth/forgot_password">Reset</Link>
            </span>
          </div>
        </div>
        <div className="md:w-[481px] w-[90%] mt-[20px] h-11 px-5 py-3 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex">
          <button
            type="submit"
            className="text-white text-sm font-bold font-manrope leading-snug"
          >
            Log in
          </button>
        </div>
      </form>
      <div className="w-[90%] md:w-[481px] text-center mt-[20px]">
        <span className="text-zinc-800 text-sm font-normal font-manrope leading-snug">
          Don’t have an account?
        </span>
        <span className="text-blue-500 my-[20px] text-sm font-bold font-manrope leading-tight tracking-tight">
          <Link href="/auth/signup">Create Account</Link>
        </span>
      </div>
      <div className="mt-[20px] w-full md:w-[481px] h-5 justify-center items-center gap-4 inline-flex">
        <hr className="text-center w-[40%] mt-[2px] h-[3px] text-zinc-500 text-sm font-medium font-manrope leading-tight tracking-tight" />
        Or
        <hr className="text-center w-[40%] h-[3px] mt-[2px] text-zinc-500 text-sm font-medium font-manrope leading-tight tracking-tight" />
      </div>

      <div className="md:w-[430px] w-[90%] my-[20px] h-11 md:px-[126px] px-[25%] py-2.5 rounded-[36px] border border-indigo-400 justify-center items-center gap-4 flex-row flex">
        <img src="/images/auth/google_logo.svg" alt="" className="w-6 h-6 " />
        <div className="text-center w-full text-zinc-800 text-xs md:text-sm font-medium font-manrope leading-none md:leading-tight tracking-tight">
          Sign in with Google
        </div>
      </div>
    </div>
  );
}

export default Signin_form;
