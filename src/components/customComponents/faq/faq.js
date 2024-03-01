"use client";

import { Fragment, useState, useEffect } from "react";
export default function Faq({ faq_item, text_color, sub_text_color }) {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    const initialFaqState = faq_item.map((item, index) => ({
      ...item,
      open: index === 0,
    }));
    setFaq(initialFaqState);
  }, [faq_item]);

  const toggleFaq = (index) => {
    setFaq(
      faq.map((item, i) => {
        if (i === index) {
          return { ...item, open: !item.open };
        }

        return { ...item, open: false };
      })
    );
  };

  return (
    <Fragment>
      <section className="bg-transparent w-full">
        <div className="max-w-3xl mx-auto ">
          {faq?.map((item, index) => (
            <div
              key={index}
              className="transition-all duration-200  border-b-[1px] text-start  border-gray-200 cursor-pointer "
              data-aos="fade-up"
              data-aos-duration="3000"
            >
              <button
                type="button"
                className="flex flex-row items-start justify-between w-full md:py-5 py-3  "
                onClick={() => toggleFaq(index)}
              >
                <span
                  className={`flex text-lg text-[16px] text-start font-[500] leading-[25.6px] ${
                    text_color ? text_color : "text-white"
                  }`}
                  data-aos="zoom-in-up"
                >
                  {item.question}
                </span>

                <svg
                  className={`w-6 h-6 text-gray-400 ${
                    item.open ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`${
                  item.open ? "block" : "hidden"
                } px-4 pb-5 sm:px-6 sm:pb-6 `}
              >
                <p
                  className={`${
                    sub_text_color ? sub_text_color : "text-white"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
