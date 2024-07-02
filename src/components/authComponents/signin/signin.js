/* eslint-disable @next/next/no-img-element */
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useLoginAuthStore from "../../../store/auth/login.js";
import { loginSchema } from "../../../utils/resolver/Schema.js";

function Signin_form() {
  const router = useRouter();
  const { loginUser, loading, error } = useLoginAuthStore((state) => ({
    loginUser: state.loginUser,
    loading: state.loading,
    error: state.error,
  }));
  
  const onSuccess = () => {
    router.push("/");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    try {
      await loginUser(data, onSuccess);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const [eye_open, setEye_open] = useState(false);
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
            className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="w-[481px]">
            <span className="text-zinc-500 text-xs leading-none tracking-tight md:text-sm font-normal font-manrope md:leading-snug">
              Forgot password?{" "}
            </span>
            <span className="text-sky-700 text-sm font-bold font-manrope leading-tight tracking-tight">
              <Link href="/forget">Reset</Link>
            </span>
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
            className={`w-full text-white text-sm font-bold font-manrope leading-snug`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      <div className="w-[90%] md:w-[481px] text-center mt-[20px]">
        <span className="text-zinc-800 text-sm font-normal font-manrope leading-snug">
          Don’t have an account?{" "}
        </span>
        <span className="text-blue-500 my-[20px] text-sm font-bold font-manrope leading-tight tracking-tight">
          <Link href="/signup">Create Account</Link>
        </span>
      </div>
    </div>
  );
}

export default Signin_form;
