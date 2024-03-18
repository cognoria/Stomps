/* eslint-disable @next/next/no-img-element */
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useResetPasswordAuthStore from "../../../store/auth/resetPassword";
import useModalStore from "../../../store/modal/modal_state";
import { usePasswordValidationStore } from "../../../store/validation/validations";
import { password_schema } from "../../../utils/resolver/yup_schema";
import { Reset_password_modal } from "../../customComponents/modals/auth_modal/auth_modal";
import { useRouter } from "next/navigation";

function Reset_password({ token }) {
  const router = useRouter()
  const { resetPassword, loading, error } = useResetPasswordAuthStore(
    (state) => ({
      resetPassword: state.resetPassword,
      loading: state.loading,
      error: state.error,
    })
  );
  const [eye_open, setEye_open] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(password_schema),
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    resetPassword({ ...data, token }, () => {
      useModalStore.getState().showModal(<Reset_password_modal />);
    });
  };

  const updateValidation = usePasswordValidationStore(
    (state) => state.updateValidation
  );
  const { hasUppercase, hasNumber, isLongEnough } =
    usePasswordValidationStore();
  const passwordValue = watch("password");
  useEffect(() => {
    updateValidation(passwordValue);
  }, [passwordValue]);
  return (
    <div className="flex pb-[20px] flex-col mt-[30px] md:mt-[40px] gap-4 items-center justify-center w-screen h-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center  justify-between gap-6"
      >
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
        {passwordValue && (
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
        )}

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
              {...register("confirmPassword")}
              name="confirmPassword"
              type={eye_open ? "text" : "password"}
              className="h-10 w-full p-2 pl-4 font-manrope text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="****************"
            />
          </div>
          {errors.confirmPassword && (
            <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
              <span>{errors.confirmPassword.message}</span>
            </div>
          )}
        </div>
        <div
          className={`md:w-[481px] w-[90%] mt-[20px] h-11 px-5 py-3 ${
            !loading ? "bg-sky-700" : "bg-sky-700/30"
          } rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex`}
        >
          <button
            type="submit"
            className=" w-full text-white text-sm font-bold font-manrope leading-snug"
          >
            {!loading ? "Reset" : "Reseting..."}
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

export default Reset_password;
