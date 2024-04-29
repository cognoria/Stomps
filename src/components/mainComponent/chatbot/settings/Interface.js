/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { chatBotCustomizeDataDefault } from "../../../../helpers/enums";
import useChatbotSettings from "../../../../store/chatbot/useChatbotSettings";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { convertImageToBase64 } from "../../../../utils/imageConverter/base64Image";
import ColorPicker from "../../../customComponents/colorPicker/color";
import SkeletonLoader from "../../../skeleton";

function InterfaceSettings({ botId }) {
  const { updatingInterface, updateInterface } = useChatbotSettings(
    (state) => ({
      updatingInterface: state.updatingInterface,
      updateInterface: state.updateInterface,
    })
  );
  const { getChatbot, loading, chatbot } = useChatbotStore((state) => ({
    getChatbot: state.getChatbot,
    loading: state.loading,
    chatbot: state.chatbot,
  }));

  useEffect(() => {
    getChatbot(botId);
  }, [botId, getChatbot]);

  const [initialMsg, setInitialMsg] = useState();
  const [initialMsgsArr, setInitialMsgsArr] = useState();
  const [displayName, setDisplayName] = useState(
    chatbot?.chatBotCustomizeData.assistantTabHeader
  );
  const [autoShowMsg, setAutoShowMsg] = useState(
    chatbot?.chatBotCustomizeData.popupDelay
  );
  const [msgPlaceholder, setMsgPlaceholder] = useState(
    chatbot?.chatBotCustomizeData.chatInputPlaceholderText
  );

  const [chatColour, setChatColour] = useState("");
  // theme selection
  const [selectedTheme, setSelectedTheme] = useState(
    chatbot?.chatBotCustomizeData.widgetTheme
  );
  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };
  // Theme selection
  //chat alignment
  const [alignChat, setAlignChat] = useState(
    chatbot?.chatBotCustomizeData.placement
  );
  const handleAlignChat = (event) => {
    setAlignChat(event.target.value);
  };
  //chat alignment

  // chat profile image
  const [profileImg, setProfileImg] = useState(
    chatbot?.chatBotCustomizeData.profileImage
  );
  const [profileImgName, setProfileImgName] = useState("");
  const [delProfileImg, setDelProfileImg] = useState(false);
  const handleChatProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (delProfileImg) return;
    if (file) {
      try {
        setProfileImgName(file.name);
        const base64String = await convertImageToBase64(file);
        setProfileImg(base64String);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };
  //chat profile image
  // chat Icon
  const [usePlainColor, setUsePlainColor] = useState(false);
  const [imageColour, setImageColour] = useState("");
  const [chatIcon, setChatIcon] = useState(
    chatbot?.chatBotCustomizeData.launcherIcon
  );
  const [chatIconName, setChatIconName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const handleChatIconChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setChatIconName(file.name);
        const base64String = await convertImageToBase64(file);

        setImgFile(base64String);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  useEffect(() => {
    if (usePlainColor) {
      setChatIcon(imageColour);
    } else if (!usePlainColor && !imgFile) {
      setChatIcon(chatbot ? chatbot?.chatBotCustomizeData.launcherIcon : "");
    } else {
      setChatIcon(imgFile);
    }
  }, [chatbot, imageColour, imgFile, usePlainColor]);
  //chat Icon

  const [suggestedMessages, setSuggestedMessages] = useState();
  const [suggestMsgArr, setSuggestMsgArr] = useState();

  useEffect(() => {
    if (chatbot) {
      setAlignChat(chatbot.chatBotCustomizeData.placement);
      setAutoShowMsg(chatbot.chatBotCustomizeData.popupDelay);
      setChatIcon(chatbot.chatBotCustomizeData.launcherIcon);
      setProfileImg(chatbot.chatBotCustomizeData.profileImage);
      // setSuggestMsgArr(chatbot.chatBotCustomizeData.questionExamples);
      const dbMsgStringArr = chatbot.chatBotCustomizeData.questionExamples.map(
        (message) => message.question
      );
      setSuggestedMessages(dbMsgStringArr.join("\n"));
      setDisplayName(chatbot.chatBotCustomizeData.assistantTabHeader);
      setSelectedTheme(chatbot.chatBotCustomizeData.widgetTheme);
      setMsgPlaceholder(chatbot.chatBotCustomizeData.chatInputPlaceholderText);
      // setInitialMsgsArr(chatbot.chatBotCustomizeData.welcomeMessages);
      setInitialMsg(chatbot.chatBotCustomizeData.welcomeMessages.join("\n"));
    }
  }, [chatbot]);

  useEffect(() => {
    if (suggestedMessages) {
      const msgArr = suggestedMessages?.split("\n")?.map((message) => ({
        question: message,
      }));
      setSuggestMsgArr(msgArr);
    }
  }, [suggestedMessages]);

  useEffect(() => {
    if (initialMsg) {
      const msgArr = initialMsg?.split("\n");
      setInitialMsgsArr(msgArr);
    }
  }, [initialMsg]);

  const handleSubmitChatInterface = (e) => {
    e.preventDefault();
    const botData = {
      initialMsgs: initialMsgsArr,
      suggestedMsgs: suggestMsgArr,
      msgPlaceholder: msgPlaceholder,
      theme: selectedTheme,
      displayName: displayName,
      chatIcon: chatIcon,
      alignChatButton: alignChat,
      autoShowMsg: autoShowMsg,
      profileImage: profileImg,
    };

    updateInterface({ botData, botId }, async () => {
      await getChatbot(botId);
    });
  };

  const containerRef = useRef(null);
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setShowScrollArrow(container.scrollWidth > container.clientWidth);
    }
  }, [containerRef]);

  const resetInterface = () => {
    const botData = {
      initialMsgs: chatBotCustomizeDataDefault.welcomeMessages,
      suggestedMsgs: chatBotCustomizeDataDefault.questionExamples,
      msgPlaceholder: chatBotCustomizeDataDefault.chatInputPlaceholderText,
      theme: chatBotCustomizeDataDefault.widgetTheme,
      displayName: chatBotCustomizeDataDefault.assistantTabHeader,
      chatIcon: chatBotCustomizeDataDefault.launcherIcon,
      alignChatButton: chatBotCustomizeDataDefault.placement,
      autoShowMsg: chatBotCustomizeDataDefault.popupDelay,
      profileImage: chatBotCustomizeDataDefault.profileImage,
    };

    setAlignChat(chatBotCustomizeDataDefault.placement);
    setAutoShowMsg(chatBotCustomizeDataDefault.popupDelay);
    setChatIcon(chatBotCustomizeDataDefault.launcherIcon);
    setProfileImg(chatBotCustomizeDataDefault.profileImage);
    const dbMsgStringArr = chatBotCustomizeDataDefault.questionExamples.map(
      (message) => message.question
    );
    setSuggestedMessages(dbMsgStringArr.join("\n"));
    setDisplayName(chatBotCustomizeDataDefault.assistantTabHeader);
    setSelectedTheme(chatBotCustomizeDataDefault.widgetTheme);
    setMsgPlaceholder(chatBotCustomizeDataDefault.chatInputPlaceholderText);
    setInitialMsg(chatBotCustomizeDataDefault.welcomeMessages.join("\n"));

    updateInterface({ botData, botId }, async () => {
      await getChatbot(botId);
    });
  };

  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col overflow-x-hidden items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-t-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3  font-manrope leading-snug">
          Chat Interface
        </div>
      </div>
      <div className="w-full flex overflow-x-hidden flex-col gap-8 border-gray-200 border-[1px]">
        <div className="w-full overflow-x-hidden flex flex-col lg:flex-row items-start py-8  px-3 ">
          <div className="flex overflow-x-hidden flex-col w-full flex-1">
            <div className="flex flex-col w-full items-end justify-end px-4">
              <button
                disabled={updatingInterface}
                onClick={resetInterface}
                className="h-[31px] text-sky-700 disabled:bg-sky-300 text-xs font-bold font-manrope leading-snug rounded-lg  px-3.5 py-1 bg-sky-50 shadow border border-sky-50 justify-center items-center flex flex-row "
              >
                Reset
              </button>
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Initial Messages
              </div>
              
              {/* <input
                value={initialMsg}
                onChange={(e) => setInitialMsg(e.target.value)}
                placeholder="👋 Hi!  How can I help"
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              /> */}

              <textarea
                value={initialMsg}
                onChange={(e) => setInitialMsg(e.target.value)}
                className="max-h-[150px] lg:w-full text-sm font-normal max-w-full overflow-auto p-2 font-manrope border border-gray-200 rounded-md"
                placeholder={"👋 Hi!  How can I help"}
              ></textarea>

              <p className="text-gray-600 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                <span className="text-gray-600 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                  Hint:
                </span>
                Enter each message in a new line.
              </p>
            </div>
            <div className="flex gap-y-4 max-w-full w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Suggested Messages
              </div>

              <textarea
                value={suggestedMessages}
                onChange={(e) => setSuggestedMessages(e.target.value)}
                className="max-h-[150px] lg:w-full text-sm font-normal max-w-full overflow-auto p-2 font-manrope border border-gray-200 rounded-md"
                placeholder={"example email.com"}
              ></textarea>

              <p className="text-gray-600 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                <span className="text-gray-600 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                  Hint:
                </span>
                Enter each message in a new line.
              </p>
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Message Placeholder
              </div>
              <input
                value={msgPlaceholder}
                onChange={(e) => setMsgPlaceholder(e.target.value)}
                placeholder="Message..."
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Theme
              </div>
              <select
                value={selectedTheme}
                onChange={handleThemeChange}
                className="h-[50px] w-full font-manrope text-sm -mt-2 border-[1px] border-gray-200 rounded-md"
              >
                <option
                  value={"LIGHT"}
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  Light
                </option>
                <option
                  value={"DARK"}
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  Dark
                </option>
              </select>
            </div>

            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Upload Chat profile Image
              </div>
              <div className="flex gap-x-4 w-full flex-row items-center">
                <div
                  className="upload-container flex-1 p-4"
                  //  onDragOver={handleDragOver}
                  //    onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    disabled={delProfileImg}
                    id="file-input-profile"
                    style={{ display: "none" }}
                    onChange={handleChatProfileImageChange}
                  />
                  <label htmlFor="file-input-profile" className="upload-label">
                    {profileImg?.startsWith("#") && (
                      <div
                        className={`h-[50px] w-[50px] rounded-full bg-[${profileImg}]`}
                      />
                    )}
                    {profileImg?.startsWith("data:image") && (
                      <Image
                        className="w-[50px] h-[50px] rounded-full"
                        src={profileImg}
                        alt={""}
                      />
                    )}
                    <div className="main-text text-sm">
                      {profileImgName ? profileImgName : "no file choosen"}
                    </div>
                    <div className="sub-text mb-2">choose file</div>
                  </label>
                </div>
                <div className="flex-1 flex flex-row gap-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 "
                    onChange={(e) => {
                      setDelProfileImg(e.target.checked), setProfileImg("");
                    }}
                  />
                  <p className="text-zinc-800 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                    Delete Chat Profile image
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Display name
              </div>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Example"
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />
            </div>
            {/* <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 flex flex-row  items-center gap-4 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                <p>User Chat color</p>

                <button className="h-[31px] text-sky-700 text-xs font-bold font-manrope leading-snug rounded-lg  px-3.5 py-1 bg-sky-50 shadow border border-sky-50 justify-center items-center flex flex-row ">
                  Reset
                </button>
              </div>
              <ColorPicker
                selectedColor={chatColour}
                onColorChange={(e) => setChatColour(e.target.value)}
              />
            </div> */}
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Upload Chat icon
                <span className="text-zinc-800 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  (images can only be square)
                </span>
              </div>
              <div className="flex gap-x-4 w-full flex-row items-center">
                <div className="upload-container flex-1 p-4">
                  <input
                    disabled={usePlainColor}
                    type="file"
                    accept="image/*"
                    id="file-input-chat"
                    style={{ display: "none" }}
                    onChange={handleChatIconChange}
                  />
                  <label htmlFor="file-input-chat" className="upload-label">
                    {chatIcon?.startsWith("#") && (
                      <div
                        className={`h-[50px] w-[50px] rounded-full bg-[${chatIcon}]`}
                      />
                    )}
                    {chatIcon?.startsWith("data:image") && (
                      <Image
                        className="w-[50px] h-[50px] rounded-full"
                        src={chatIcon}
                        alt={""}
                      />
                    )}
                    <div className="main-text text-sm">
                      {chatIconName ? chatIconName : "no file chosen"}
                    </div>
                    <div className="sub-text mb-2">choose file</div>
                  </label>
                </div>
                <div className="flex flex-col gap-y-5 items-start">
                  <div className="flex-1 flex flex-row gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      onChange={(e) => setUsePlainColor(e.target.checked)}
                    />
                    <p className="text-zinc-800 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                      Use a plain color instead
                    </p>
                  </div>

                  {usePlainColor && (
                    <ColorPicker
                      selectedColor={imageColour}
                      onColorChange={(e) => {
                        setImageColour(e.target.value),
                          setChatIcon(e.target.value);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Align Chat Button
              </div>
              <select
                value={alignChat}
                onChange={handleAlignChat}
                className="h-[50px] w-full font-manrope text-sm -mt-2 border-[1px] border-gray-200 rounded-md"
              >
                <option
                  value={"LEFT"}
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  Left
                </option>
                <option
                  value={"RIGHT"}
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  Right
                </option>
              </select>
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Auto show initial messages pop-ups after
              </div>
              <input
                type="number"
                value={autoShowMsg}
                onChange={(e) => setAutoShowMsg(e.target.value)}
                placeholder="5"
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />
            </div>
          </div>

          {loading ? (
            <SkeletonLoader width={"50%"} height={"638px"} />
          ) : (
            <div
              className={`border-[1px] w-full lg:w-[50%] overflow-hidden rounded-lg h-[638px] border-gray-200  items-start flex-col ${
                selectedTheme === "DARK" ? "bg-black" : ""
              } `}
            >
              <div className="flex border-b-[1px] h-[10%] border-gray-200 flex-row  px-4 py-2 w-full flex-start items-start justify-between">
                <div className="flex flex-row items-center justify-start gap-x-4">
                  {profileImg?.startsWith("#") && (
                    <div
                      className={`h-[50px] w-[50px] rounded-full bg-[${profileImg}]`}
                    />
                  )}
                  {profileImg?.startsWith("data:image") && (
                    <Image
                      className="w-[50px] h-[50px] rounded-full"
                      src={profileImg}
                      alt={""}
                    />
                  )}
                  {displayName && (
                    <p
                      className={`font - bold text-sm ${
                        selectedTheme === "DARK" ? "text-zinc-100" : ""
                      }`}
                    >
                      {displayName}
                    </p>
                  )}
                </div>
                <div>
                  <p className="mx-3 text-red-500 font-manrope font-normal text-sm">
                    {/* {error && error} */}
                  </p>{" "}
                  <img src="/images/chatbox/refresh.svg" alt="" />
                </div>
              </div>
              <div className="w-full overflow-y-scroll h-[72%] flex flex-col gap-3 p-4">
                {initialMsg && (
                  <div className="gap-1 flex flex-col max-w-[70%]">
                    {initialMsgsArr?.map((msg, i) => {
                      return (
                        <div
                          key={i}
                          className={` w-fit  px-[15px] py-[11px] items-start ${
                            selectedTheme === "DARK"
                              ? "bg-gray-800 text-zinc-100"
                              : "bg-zinc-100 text-stone-900"
                          }    rounded-tl rounded-tr rounded-br border justify-center  flex-col flex`}
                        >
                          <div className=" text-start text-sm font-normal font-manrope leading-snug break-words">
                            {msg}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className=" bg-transparent justify-end  w-full items-end flex-col flex">
                  <div className="max-w-[70%] h-auto px-[15px] py-[11px] items-start  bg-[#0C4173]  text-zinc-100    rounded-tl rounded-tr rounded-br border justify-center  flex-col flex">
                    <div className=" text-start text-sm font-normal font-manrope leading-snug">
                      hi
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full px-4 custom-scrollbar overflow-x-scroll h-[7%] items-start justify-start gap-x-3">
                {suggestMsgArr &&
                  suggestMsgArr?.map((msg, i) => {
                    return (
                      <div
                        className={`rounded-md py-1 px-2 font-normal font-manrope leading-snug text-sm text-center whitespace-nowrap ${
                          selectedTheme === "DARK"
                            ? "bg-gray-800 hover:bg-gray-600 text-zinc-100"
                            : "bg-sky-700 text-white"
                        } `}
                        key={i}
                      >
                        {msg.question}
                      </div>
                    );
                  })}
              </div>

              <div className="w-full h-[12%] relative p-2 items-center flex-col  flex">
                <input
                  placeholder={msgPlaceholder}
                  className={`text-neutral-700 ${
                    selectedTheme === "DARK"
                      ? "bg-transparent text-zinc-100 placeholder:text-neutral-300"
                      : "bg-transparent text-white placeholder:text-neutral-300"
                  } outline-gray-200 w-full h-full border  flex flex-col  active:outline-none pl-[15px] rounded-lg  pr-[50px]   decoration-none  text-sm font-normal font-manrope leading-snug`}
                />
                <button
                  className="w-[32px] h-[32px] absolute top-6 right-7"
                  type="click"
                >
                  <img
                    src="/images/chatbox/send.svg"
                    alt=""
                    className="w-full h-full "
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full p-3 mt-[30px] flex-end items-end flex flex-col">
          <button
            disabled={updatingInterface}
            onClick={handleSubmitChatInterface}
            className="text-white justify-center items-center text center disabled:bg-sky-300 lg:w-auto font-manrope w-[150px] h-11 flex-end rounded-lg     p-2 bg-sky-700  shadow border border-sky-700   "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterfaceSettings;
