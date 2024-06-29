"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { securityQuestions } from "../../../helpers/enums";
import useRegisterAuthStore from "../../../store/auth/register";
import { usePasswordValidationStore } from "../../../store/validation/validations";
import { auth_schema } from "../../../utils/resolver/Schema";
import Image from "next/image";

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
    control,
  } = useForm({
    resolver: yupResolver(auth_schema),
  });


  const { fields, append } = useFieldArray({
    control,
    name: "security",
  });

  useEffect(() => {
    if (fields.length < 2) {
      append({ question: "", answer: "" });
      append({ question: "", answer: "" });
    }
  }, [fields, append]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    registerUser(data, () => {
      router.push("/signin");
    });
  };

  const updateValidation = usePasswordValidationStore(
    (state) => state.updateValidation
  );

  const { hasUppercase, hasNumber, isLongEnough } =
    usePasswordValidationStore();
  const passwordValue = watch("password");

  useEffect(() => {
    if (passwordValue != '') updateValidation(passwordValue);
  }, [passwordValue]);

  const [eye_open, setEye_open] = React.useState(false);
  return (
    <div className="flex pb-[20px] flex-col mt-[30px] md:mt-[40px] gap-4 items-center justify-center w-screen h-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center  justify-between gap-6"
      >
        <div className="flex gap-2 md:w-[479px] w-[90%] flex-col items-start justify-start">
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
        <div className="flex w-[90%] gap-2 md:w-[479px] flex-col items-start justify-start">
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
              <Image
                alt=""
                height={20}
                width={20}
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
        {passwordValue && (
          <div className="flex w-[90%] md:w-[479px] flex-col">
            <div className="flex flex-row gap-3 items-start justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={hasUppercase ? "green" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={hasUppercase ? "white" : "#B7B7B7"}
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                strokeWidth="1.5"
                stroke={isLongEnough ? "white" : "#B7B7B7"}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                strokeWidth="1.5"
                stroke={hasNumber ? "white" : "#B7B7B7"}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <div className="text-[#B7B7B7] mt-1  text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                At least one number
              </div>
            </div>
          </div>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col w-[90%] gap-6 md:w-[479px]">
            <div className="flex flex-col gap-2 items-start">
              <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
                Security Question {index + 1}
              </p>
              <select
                {...register(`security.${index}.question`)}
                name={`security.${index}.question`}
                className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {securityQuestions.map((q, index) => (
                  <option key={index} value={q.question}>{q.question}</option>
                ))}
              </select>
              {errors.security && errors.security[index] && errors.security[index].question && (
                <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
                  <span>{errors.security[index].question.message}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 items-start">
              <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
                Security Answer {index + 1}
              </p>
              <input
                name={`security.${index}.answer`}
                {...register(`security.${index}.answer`)}
                type="text"
                className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your answer"
              />
              {errors.security && errors.security[index] && errors.security[index].answer && (
                <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
                  <span>{errors.security[index].answer.message}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* <div className="flex w-[90%] gap-4 md:w-[479px] flex-col items-start justify-start">
          <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
            Security Question
          </p>
          <select
            {...register("question")}
            name="question"
            className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {securityQuestions.map((q, index) => (
              <option key={index} value={q.question}>{q.question}</option>
            ))}
          </select>
          {errors.question && (
            <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
              <span>{errors.question.message}</span>
            </div>
          )}
        </div>

        <div className="flex gap-4 md:w-[479px] w-[90%] flex-col items-start justify-start">
          <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
            Security Answer
          </p>
          <input
            name="answer"
            {...register("answer")}
            type="text"
            className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your answer"
          />
          {errors.answer && (
            <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
              <span>{errors.answer.message}</span>
            </div>
          )}
        </div> */}
        <div
          className={`md:w-[481px] w-[90%] mt-[20px] h-11 px-5 py-3 ${loading ? "bg-sky-700/30" : "bg-sky-700 "
            } rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex`}
        >
          <button
            disabled={loading}
            type="submit"
            className={`w-full text-white text-sm font-bold font-manrope leading-snug`}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup_form;
