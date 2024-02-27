"use client";

import { RoundedSubmitButton } from "../custom_buttons/button1";

export function InputsWithInternalButton({
  text,
  width,
  type,
  submit,
  inputValue,
  onInputChange,
  loading,
}) {
  return (
    <form method="submit" onSubmit={submit}>
      <div className="flex flex-row items-center w-[100%] relative justify-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src="./images/landing/sms.svg" alt="" />
        </div>
        <input
          value={inputValue}
          onChange={onInputChange}
          type={type}
          className="h-10 w-full p-2 pl-10 bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="johndoe@gmail.com"
        />
        <div className="absolute right-[10px]">
          <RoundedSubmitButton
            text_color={"bg-button-blue"}
            color={"text-white"}
            button_content={text}
            radius={"rounded-[33px]"}
            width={width}
            loading={loading}
          />
        </div>
      </div>
    </form>
  );
}

export function InputsWithExternalButton({
  text,
  width,
  submit,
  inputValue,
  onInputChange,
  loading,
}) {
  return (
    <form method="submit" onSubmit={submit}>
      <div className="flex flex-row items-center w-full gap-2 justify-center">
        <div className="relative w-70% lg:w-55%">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src="./images/landing/sms.svg" alt="" />
          </div>
          <input
            value={inputValue}
            onChange={onInputChange}
            className="h-10 p-2 pl-10 w-full bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="lg:w-[45%] w-[30%]">
          <RoundedSubmitButton
            loading={loading}
            text_color={"bg-button-blue"}
            color={"text-white"}
            button_content={text}
            radius={"rounded-[8px]"}
            width={"w-full"}
            text_size={"text-[10px] lg:text-[14px]"}
          />
        </div>
      </div>
    </form>
  );
}
