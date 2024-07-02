"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { securityQuestions } from "../../../helpers/enums";
import useForgetPasswordAuthStore from "../../../store/auth/forgetPassword";
import useModalStore from "../../../store/modal/modalState";
import { email_schema } from "../../../utils/resolver/Schema";
import { ForgetPass } from "../../customComponents/modals/authModal/authModals";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Forgetpassword() {
  const router = useRouter();
  const { forgetPassword, loading, error } = useForgetPasswordAuthStore(
    (state) => ({
      forgetPassword: state.forgetPassword,
      loading: state.loading,
      error: state.error,
    })
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(email_schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const res = await forgetPassword(data);
    if (res.message) toast.success(res.message)
    if (res.token) router.push(`/reset/${res.token}`)
  };

  return (
    <div className="flex pb-[20px] flex-col mt-[30px] md:mt-[40px] gap-4 items-center justify-center w-screen h-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center  justify-between gap-6"
      >
        <div className="flex gap-2 md:w-[479px] w-[90%] flex-col items-start justify-start">
          <p className="text-xs font-bold font-manrope leading-none  tracking-tight text-[#8A8A8A]">
            Email Address
          </p>
          <input
            name="email"
            {...register("email")}
            type="email"
            className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Janeearnest@gmail.com"
          />
        </div>

        {[1, 2].map((index) => (
          <div key={index} className="gap-6 flex flex-col">
            <div className="flex w-[90%] gap-2 md:w-[479px] flex-col items-start justify-start">
              <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
                Security Question {index}
              </p>
              <select
                {...register(`questions[${index - 1}].question`)}
                name={`questions[${index - 1}].question`}
                className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {securityQuestions.map((q, index) => (
                  <option key={index} value={q.question}>{q.question}</option>
                ))}
              </select>
              {errors.questions && errors.questions[index - 1] && (
                <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
                  <span>{errors.questions[index - 1].question.message}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 md:w-[479px] w-[90%] flex-col items-start justify-start">
              <p className="text-xs font-bold font-manrope leading-none tracking-tight text-[#8A8A8A]">
                Security Answer {index}
              </p>
              <input
                name={`questions[${index - 1}].answer`}
                {...register(`questions[${index - 1}].answer`)}
                type="text"
                className="h-10 w-full p-2 pl-4 font-manrope placeholder:font-manrope text-sm placeholder:text-xs text-[#8A8A8A] bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your answer"
              />
              {errors.questions && errors.questions[index - 1] && (
                <div aria-live="polite" className="text-red-500 text-xs md:text-sm">
                  <span>{errors.questions[index - 1].answer.message}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div
          className={`md:w-[481px] w-[90%] mt-[20px] h-11 px-5 py-3 ${loading ? "bg-sky-700/30" : "bg-sky-700"
            } rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex`}
        >
          <button
            disabled={loading}
            type="submit"
            className="w-full text-white text-sm font-bold font-manrope leading-snug"
          >
            {loading ? "Processing..." : "Proceed"}
          </button>
        </div>
      </form>
      <Link className="w-full md:w-[481px]" href="/signin">
        <div className="md:w-[481px] w-[90%] mt-[10px] h-11 px-5 py-3  justify-center items-center gap-2 inline-flex">
          <Image height={30} width={30} src="/images/auth/arrow_left.svg" alt="" className="w-6 h-6 " />
          <div className="text-sky-700 text-sm font-normal font-manrope leading-snug">
            Return to the login screen
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Forgetpassword;
