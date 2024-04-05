import { useState } from "react";
import useFormDataStore from "../../../store/chatbot/useChatbotSource";
import Image from "next/image";

export default function QA() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const questionList = useFormDataStore((state) => state.formData.questions);
  
  const addQuestionToEquationStore = async (e) => {
    e.preventDefault();
    const newQuestion = { question, answer };
    if (question && answer != null)
      await useFormDataStore.getState().addQuestion(newQuestion);
    await setQuestion("");
    await setAnswer("");
  };

  //did a small move around of your jsx
  //so that button does goes below the page when more Q&A are been applied
  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <div className="flex mt-[60px] w-full flex-col lg:flex-row items-center lg:items-start gap-3  justify-center">
        <div className="w-[95%] lg:w-[570px] h-auto border-[1px]  pb-2 rounded-lg  border-gray-200">
          <div className="w-full  h-auto px-3 py-4 border-[1px] text-sky-700  border-gray-200 text-base font-bold font-manrope leading-snug">
            Q & A
          </div>
          <div className="h-[85%] w-full ">
            <div className="p-3 h-[80%] w-full">
              <div className="border-[1px] gap-y-5 w-full rounded-lg h-full border-gray-200">
                <div className="p-3 h-[30%] w-full flex flex-col items-start">
                  <div className="text-zinc-800 w-full text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                    Question
                  </div>
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className=" w-full h-[40px] p-2 rounded-md border-[1px] border-gray-200"
                  />
                </div>
                <div className="p-3 h-[70%] flex flex-col items-start">
                  <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                    Answer
                  </div>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="h-[130px] rounded-md w-full border-[1px] p-3 border-gray-200"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="h-[20%] p-5 border-gray-200 flex flex-col items-end justify-end">
              <div className="flex flex-row items-center  gap-x-5 ">
                <button
                  onClick={() =>
                    useFormDataStore.getState().deleteAll(["questions"])
                  }
                  className="bg-transparent items-center gap-2 flex flex-row"
                >
                  <Image width={15} height={15} alt="" src="/images/chatbox/trash.svg" />
                  <p className="text-red-500 text-xs font-bold font-manrope leading-snug">
                    Delete all
                  </p>
                </button>
                <button
                  onClick={addQuestionToEquationStore}
                  className=" px-5 py-3 text-[#1261AC] text-xs font-bold font-manrope leading-snug bg-[#EEF8FF] flex items-center justify-center flex-col  rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
            {questionList && (
              <div className="w-full px-2 mt-[40px]">
                <ul className="w-full">
                  {questionList.map((items, index) => (
                    <li
                      key={index}
                      className="w-full flex flex-col items-center gap-2 justify-between "
                    >
                      <div className="p-3 h-[80%] w-full">
                        <div className="border-[1px] gap-y-5 w-full rounded-lg h-full border-gray-200">
                          <div className="p-3 h-[30%] flex flex-col items-start">
                            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                              Question
                            </div>
                            <input
                              readonly
                              value={items.question}
                              onChange={(e) => setQuestion(e.target.value)}
                              className="px-2 w-full h-[40px] rounded-md border-[1px] border-gray-200"
                            />
                          </div>
                          <div className="p-3 h-[70%] flex flex-col items-start">
                            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                              Answer
                            </div>
                            <textarea
                              readonly
                              value={items.answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              className="h-[130px] px-2 rounded-md w-full border-[1px] border-gray-200"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row  w-full items-end justify-end">
                        <button
                          onClick={() =>
                            useFormDataStore.getState().deleteQuestion(index)
                          }
                        >
                          <Image width={15} height={15}
                            src="/images/chatbox/trash.svg"
                            alt=""
                            classNAme="w-full h-auto"
                          />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// QA;
