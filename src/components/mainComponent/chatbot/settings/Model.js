import { useEffect, useState } from "react";
import { chatModelEnum } from "../../../../helpers/enums";
import { useBotModelStore } from "../../../../store/chatbot/chatbotSettings/settings";
import useSingleChatbot from "../../../../store/chatbot/getChatbot";
import { formatDate } from "../../../../utils/data_format/date";
import Temprature_slider from "../../../customComponents/slider/temprature_slider";


/* eslint-disable react/no-unescaped-entities */
function ModelSettings({ botId }) {
  const { singleChatBot, loading, error, chatbot } = useSingleChatbot(
    (state) => ({
      singleChatBot: state.singleChatBot,
      loading: state.loading,
      error: state.error,
      chatbot: state.chatbot,
    })
  );
  const { updatemodel, loading_model, model_error } = useBotModelStore(
    (state) => ({
      updatemodel: state.botModel,
      loading_model: state.loading,
      model_error: state.error,
    })
  );

  useEffect(() => {
    singleChatBot(botId);
  }, [botId, singleChatBot]);

  // model selection
  const [selectedModel, setSelectedModel] = useState(chatModelEnum.GPT_3_5);
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  // model selection

  // open ai and picone key
  const [openAiKey, setOpenAiKey] = useState("");
  const [pineconeKey, setPineconeKey] = useState("");

  // open ai and picone key

  //chatbot temprature
  const [selectedTemperature, setSelectedTemperature] = useState(0.1);
  const handleTemperatureChange = (value) => {
    setSelectedTemperature(value);
  };

  // console.log(selectedTemperature);
  //chatbot temprature

  //model prompt
  const [modelText, setModelText] = useState(
    chatbot ? chatbot?.model?.text : text
  );
  const handleTextChange = (event) => {
    setModelText(event.target.value);
  };
  //model prompt

  // submit handler

  const handleSubmitBotModel = (e) => {
    e.preventDefault();
    const botData = {
      prompt: modelText,
      model: selectedModel,
      temparature: selectedTemperature,
    };

    updatemodel({ botData, botId });
  };

  // submit handler
  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Model
        </div>
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col gap-4  items-start w-full p-3">
            <div className="w-full flex flex-row items-center justify-between ">
              <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                Prompt
              </div>
              <button className="h-[31px] text-sky-700 text-xs font-bold font-manrope leading-snug rounded-lg  px-3.5 py-1 bg-sky-50 shadow border border-sky-50 justify-center items-center flex flex-row ">
                Reset
              </button>
            </div>

            <textarea
              value={chatbot?.chatBotCustomizeData.prompt}
              onChange={handleTextChange}
              className="flex flex-col items-start p-3 h-[150px] active:border-gray-300  border-[1px]  border-gray-200 shadow-md w-full"
            ></textarea>
          </div>
          <div className="w-full p-3 text-zinc-500 text-xs font-medium font-manrope tracking-tight">
            The instructions allows you to customize your chatbot's personality
            and style. Please make sure to experiment with the instructions by
            making it very specific to your data and use case.
          </div>
          <div className="flex flex-col lg:flex-row w-full items-start justify-between">
            <div className="flex-1 flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Model
              </div>
              <select
                value={chatbot?.chatBotCustomizeData.model}
                onChange={handleModelChange}
                className="h-[50px] w-full -mt-2 border-[1px] border-gray-200 rounded-md"
              >
                <option
                  value={chatModelEnum.GPT_3_5}
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  {chatModelEnum.GPT_3_5}
                </option>
                <option
                  value={chatModelEnum.GPT_4}
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  {chatModelEnum.GPT_4}
                </option>
                <option
                  value={chatModelEnum.GPT_4_turbo}
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  {chatModelEnum.GPT_4_turbo}
                </option>
              </select>
              <div className="w-auto text-gray-600 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                gpt-4 is much better at following the instructions and not
                hallucinating, but slower and more expensive than gpt-3.5-turbo
                (1 message using gpt-3.5-turbo costs 1 message credit. 1 message
                using gpt-4-turbo costs 10 message credits.)
              </div>
            </div>
            {/* <div className="flex-1 w-full flex gap-y-4 p-3 flex-col items-start ">
              <div className="flex flex-col w-full">
                <div className="text-zinc-800 text-[10px] mb-2 font-bold font-manrope leading-[14px] tracking-tight">
                  OpenAI API Key
                </div>
                <input
                  onChange={(e) => setOpenAiKey(e.target.value)}
                  className="w-full h-[50px] p-3 rounded-md font-manrope active:border-gray-200 border-gray-200 border-[1px]"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="text-zinc-800 text-[10px] mb-4 font-bold font-manrope leading-[14px] tracking-tight">
                  Pinecone API Key
                </div>
                <input
                  onChange={(e) => setPineconeKey(e.target.value)}
                  className="w-full h-[50px] p-3 rounded-md font-manrope active:border-gray-200 border-gray-200 border-[1px]"
                />
              </div>
            </div> */}
          </div>
          <div className="w-full gap-y-3 p-3 flex flex-col items-start ">
            <p className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Temprature
            </p>
            <div className="w-full">
              <Temprature_slider
                height={"h-3"}
                value={chatbot?.chatBotCustomizeData.temparature}
                onChange={handleTemperatureChange}
              />
            </div>
            <div className="flex w-full flex-row items-end justify-between">
              <p className="text-zinc-800 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                Reserved
              </p>
              <p className="text-zinc-800 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                Creative
              </p>
            </div>
          </div>

          <div className="flex p-3 flex-col lg:flex-row lg:items-end  justify-between w-full  mt-[30px]">
            <div className="flex flex-col w-full">
              <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                Last Trained:
              </div>
              <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                {formatDate(chatbot?.updatedAt)}
              </div>
            </div>
            <div className="flex fle-end items-end  w-full flex-col ">
              <button
                onClick={handleSubmitBotModel}
                className="text-white justify-end lg:w-auto w-[150px] h-11 flex-end mt-[70px] lg:mt-0 rounded-lg lg:justify-start items-start   lg:px-5 lg:py-3 bg-sky-700  shadow border border-sky-700  gap-2 "
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelSettings;
const text = `I want you to act as a support agent. Your name is "AI Assistant". You will provide me with answers from the given info. If the answer is not included, say exactly "Hmm, I am not sure." and stop after that. Refuse to answer any question not about the info. Never break character.`;
const model = ["gpt-3.5-turbo", "gpt-4"];
