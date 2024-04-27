import { useEffect, useState } from "react";
import {
  chatBotCustomizeDataDefault,
  chatModelEnum,
} from "../../../../helpers/enums";
import useChatbotSettings from "../../../../store/chatbot/useChatbotSettings";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { formatDate } from "../../../../utils/dataFormat/date";
import Temprature_slider from "../../../customComponents/slider/temprature_slider";

/* eslint-disable react/no-unescaped-entities */
function ModelSettings({ botId }) {
  const { getChatbot, loading, chatbot } = useChatbotStore((state) => ({
    getChatbot: state.getChatbot,
    loading: state.loading,
    chatbot: state.chatbot,
  }));

  const { updateModel, updatingModel } = useChatbotSettings((state) => ({
    updateModel: state.updateModel,
    updatingModel: state.updatingModel,
  }));

  useEffect(() => {
    getChatbot(botId);
  }, [botId, getChatbot]);

  // model selection
  const [selectedModel, setSelectedModel] = useState(
    chatbot?.chatBotCustomizeData.model
  );
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  // model selection

  //chatbot temprature
  const [selectedTemperature, setSelectedTemperature] = useState(
    chatbot?.chatBotCustomizeData.temparature
  );
  const handleTemperatureChange = (value) => {
    setSelectedTemperature(value);
  };
  //chatbot temprature

  //model prompt
  const [modelText, setModelText] = useState(
    chatbot?.chatBotCustomizeData.prompt
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

    updateModel({ botData, botId }, async () => {
      await getChatbot(botId);
    });
  };
  // submit handler
  const resetModel = async () => {
    const botData = {
      prompt: chatBotCustomizeDataDefault.prompt,
      model: chatBotCustomizeDataDefault.model,
      temparature: chatBotCustomizeDataDefault.temparature,
    };
    setSelectedModel(chatBotCustomizeDataDefault.model);
    setSelectedTemperature(chatBotCustomizeDataDefault.temparature);
    setModelText(chatBotCustomizeDataDefault.prompt);

    await updateModel({ botData, botId });

    await getChatbot(botId);
  };
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
                Personality input
              </div>
              <button
                disabled={updatingModel}
                onClick={resetModel}
                className="h-[31px] disabled:bg-sky-300 text-sky-700 text-xs font-bold font-manrope leading-snug rounded-lg  px-3.5 py-1 bg-sky-50 shadow border border-sky-50 justify-center items-center flex flex-row "
              >
                Reset
              </button>
            </div>

            <textarea
              value={modelText}
              onChange={handleTextChange}
              className="flex flex-col items-start p-3 h-[150px] active:border-gray-300  border-[1px] font-manrope text-sm font-medium border-gray-200 shadow-md w-full"
            ></textarea>
          </div>
          <div className="flex flex-col gap-4  items-start w-full p-3">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Fallback Response
            </div>
            <textarea
              // value={modelText}
              // onChange={handleFallBackResponse}
              className="flex flex-col items-start p-3 h-[150px] active:border-gray-300  border-[1px] font-manrope text-sm font-medium border-gray-200 shadow-md w-full"
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
                value={selectedModel}
                onChange={handleModelChange}
                className="h-[50px] w-full -mt-2 border-[1px] font-manrope border-gray-200 rounded-md"
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
                value={selectedTemperature}
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
                disabled={updatingModel}
                onClick={handleSubmitBotModel}
                className="text-white justify-center items-center text center disabled:bg-sky-300 lg:w-auto font-manrope w-[150px] h-11 flex-end rounded-lg     p-2 bg-sky-700  shadow border border-sky-700   "
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
