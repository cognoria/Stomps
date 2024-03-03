"use client";
import { yupResolver } from "@hookform/resolvers/yup";
// import { usePasswordValidationStore } from "@/src/store/store";
// import { auth_schema } from "@/src/utils/resolver/yup_schema";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegisterAuthStore from "../../../store/auth/register";
import { usePasswordValidationStore } from "../../../store/validation/validations";
import { auth_schema } from "../../../utils/resolver/yup_schema";
function Signup_form() {
  const router = useRouter();
  const { registerUser, loading, error } = useRegisterAuthStore((state) => ({
    registerUser: state.registerUser,
    loading: state.loading,
    error: state.error,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(auth_schema),
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    registerUser(data, () => {
      router.push("/");
    });
  };
  const updateValidation = usePasswordValidationStore(
    (state) => state.updateValidation
  );
  const { hasUppercase, hasNumber, isLongEnough } =
    usePasswordValidationStore();
  const passwordValue = watch("password");
  React.useEffect(() => {
    updateValidation(passwordValue);
  }, [passwordValue]);

  const [eye_open, setEye_open] = React.useState(true);
  return (
    <div className="flex pb-[20px] flex-col mt-[30px] md:mt-[40px] gap-4 items-center justify-center w-screen h-auto">
      <ToastContainer />
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
          <div className="w-full relative">
            <button
              type="click"
              className="absolute top-[30%] right-2"
              onClick={(e) => {
                e.preventDefault();
                setEye_open(!eye_open);
              }}
            >
              <img
                alt=""
                src={
                  eye_open
                    ? "/images/auth/eye_open.svg"
                    : "/images/auth/eye_slash.svg"
                }
              />
            </button>
            <input
              {...register("password")}
              name="password"
              type={eye_open ? "text" : "password"}
              className="h-10 w-full p-2 pl-4 font-manrope text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="****************"
            />
          </div>
          {errors.password && (
            <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
              <span>{errors.password.message}</span>
            </div>
          )}
        </div>
        <div className="flex w-[90%] md:w-[479px] flex-col">
          <div className="flex flex-row gap-3 items-start justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={hasUppercase ? "green" : "none"}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={hasUppercase ? "white" : "#B7B7B7"}
              className="w-6 h-6 "
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
              fill={isLongEnough ? "green" : "none"}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={isLongEnough ? "white" : "#B7B7B7"}
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="text-[#B7B7B7] mt-1 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
              Minimum of 6 characters
            </div>
          </div>
          <div className="flex flex-row gap-3  items-start justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={hasNumber ? "green" : "none"}
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke={hasNumber ? "white" : "#B7B7B7"}
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="text-[#B7B7B7] mt-1  text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
              At least one number
            </div>
          </div>
        </div>
        <div
          className={`md:w-[481px] w-[90%] mt-[20px] h-11 px-5 py-3 ${
            loading ? "bg-sky-700/30" : "bg-sky-700 "
          } rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex`}
        >
          <button
            disabled={loading}
            type="submit"
            className={`text-white text-sm font-bold font-manrope leading-snug`}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </div>
      </form>
      <div className="w-[90%] md:w-[481px] text-center mt-[20px]">
        <span className="text-zinc-800 text-sm font-normal font-manrope leading-snug">
          Already have an account?
        </span>
        <span className="text-blue-500 my-[20px] text-sm font-bold font-manrope leading-tight tracking-tight">
          <Link href="/signin"> Sign in</Link>
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
          Sign up with Google
        </div>
      </div>
    </div>
  );
}

export default Signup_form;
