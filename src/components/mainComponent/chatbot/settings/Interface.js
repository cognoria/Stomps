import { useRef, useState } from "react";
import useChatbotSettings from "../../../../store/chatbot/useChatbotSettings";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { convertImageToBase64 } from "../../../../utils/imageConverter/base64Image";
import ColorPicker from "../../../customComponents/colorPicker/color";

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
  const chatMessages = [
    {
      content: "👋 Hi!  How can I help",
      role: "client",
    },
    { role: "user", content: "Hi" },
  ];
  const [initialMsg, setInitialMsg] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [autoShowMsg, setAutoShowMsg] = useState("");
  const [msgPlaceholder, setMsgPlaceholder] = useState("");
  const [chatColour, setChatColour] = useState("");
  // theme selection
  const [selectedTheme, setSelectedTheme] = useState("");
  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };
  // Theme selection
  //chat alignment
  const [alignChat, setAlignChat] = useState("");
  const handleAlignChat = (event) => {
    setAlignChat(event.target.value);
  };
  //chat alignment

  // chat profile image
  const [profileImg, setProfileImg] = useState("");
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
  const [chatIcon, setChatIcon] = useState(null);
  const [chatIconName, setChatIconName] = useState("");
  const handleChatIconChange = async (event) => {
    const file = event.target.files[0];
    if (usePlainColor) {
      setChatIcon(imageColour);
    } else {
      if (file) {
        try {
          setChatIconName(file.name);
          const base64String = await convertImageToBase64(file);

          setChatIcon(base64String);
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      }
    }
  };
  //chat Icon

  // Function to handle adding a new suggested message
  const [suggestedMessages, setSuggestedMessages] = useState([]);
  const divRef = useRef(null);
  const handleAddMessage = () => {
    const content = divRef.current.textContent;
    if (content.trim() !== "") {
      setSuggestedMessages((prevMessages) => [...prevMessages, content]);
      divRef.current.textContent = ""; // Clear the editable div after adding the message
    }
  };
  // suggested text

  //bot Data Submission
  const botData = {
    initialMsg: initialMsg,

    suggestedMsgs: suggestedMessages.map((message) => ({
      question: message,
    })),
    msgPlaceholder: msgPlaceholder,
    theme: selectedTheme,
    // chatColor: chatColour,
    displayName: displayName,
    chatIcon: chatIcon,
    alignChatButton: alignChat,
    autoShowMsg: autoShowMsg,
    profileImage: profileImg,
  };
  const handleSubmitChatInterface = () => {
    updateInterface({ botData, botId }, async () => {
      await getChatbot(botId);
    });
  };
  //bot Data Submission

  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col overflow-x-hidden items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3  font-manrope leading-snug">
          Chat Interface
        </div>
      </div>
      <div className="w-full flex overflow-x-hidden flex-col gap-8 border-gray-200 border-[1px]">
        <div className="w-full overflow-x-hidden flex flex-col lg:flex-row items-start py-8  px-3 ">
          <div className="flex overflow-x-hidden flex-col w-full flex-1">
            <div className="flex flex-col w-full items-end justify-end px-4">
              <button className="h-[31px] text-sky-700 text-xs font-bold font-manrope leading-snug rounded-lg  px-3.5 py-1 bg-sky-50 shadow border border-sky-50 justify-center items-center flex flex-row ">
                Reset
              </button>
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Initial Message
              </div>
              <input
                onChange={(e) => setInitialMsg(e.target.value)}
                placeholder="👋 Hi!  How can I help"
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />

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

              <div
                ref={divRef}
                className="max-h-[150px] lg:w-full max-w-full overflow-auto p-2 border border-gray-200 rounded-md"
                contentEditable="true"
                placeholder={"example email.com"}
              ></div>
              <div className="flex flex-col w-full items-end justify-end px-4">
                <button
                  className="h-[31px] text-sky-700 text-xs font-bold font-manrope leading-snug rounded-lg px-3.5 py-1 bg-sky-50 shadow border border-sky-50 justify-center items-center flex flex-row "
                  onClick={handleAddMessage}
                >
                  Add
                </button>
              </div>

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
                className="h-[50px] w-full -mt-2 border-[1px] border-gray-200 rounded-md"
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
                    <img
                      className="w-[50px] h-[50px]"
                      src="/images/chatbox/gallery.svg"
                      alt="Upload icon"
                    />
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
                  <p className="text-zinc-800 text-[10px] font-normal font-['Manrope'] leading-[14px] tracking-tight">
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
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Example"
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
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
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Upload Chat icon
                <span className="text-zinc-800 text-[10px] font-normal font-['Manrope'] leading-[14px] tracking-tight">
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
                    <img
                      className="w-[50px] h-[50px]"
                      src="/images/chatbox/gallery.svg"
                      alt="Upload icon"
                    />
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
                    <p className="text-zinc-800 text-[10px] font-normal font-['Manrope'] leading-[14px] tracking-tight">
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
                className="h-[50px] w-full -mt-2 border-[1px] border-gray-200 rounded-md"
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
                onChange={(e) => setAutoShowMsg(e.target.value)}
                placeholder="5"
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />
            </div>
          </div>
          <div className="border-[1px] w-full lg:w-[50%] overflow-x-hidden rounded-lg h-[588px] border-gray-200  items-start flex-col ">
            <div className="flex border-b-[1px] border-gray-200 flex-row  p-4 w-full flex-end items-end justify-end">
              <p className="mx-3 text-red-500 font-manrope font-normal text-sm">
                {/* {error && error} */}
              </p>{" "}
              <img src="/images/chatbox/refresh.svg" alt="" />
            </div>
            <div
              // style={{ scrollBehavior: "smooth" }}
              className="w-full overflow-y-scroll h-[70%] flex flex-col gap-3 p-4"
            >
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`w-full h-auto flex flex-col ${
                    message?.role === "user"
                      ? "justify-end  items-end"
                      : " justify-start"
                  } `}
                >
                  <div
                    className={`max-w-[70%] h-auto px-[15px] items-start py-[11px] ${
                      message?.role === "user"
                        ? "bg-[#0C4173] text-white"
                        : "bg-zinc-100 text-stone-900 "
                    }  rounded-tl rounded-tr rounded-br border justify-center  flex-col flex`}
                  >
                    <div className=" text-start text-sm font-normal font-manrope leading-snug">
                      {message?.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-row w-[100%] px-4 overflow--scroll h-[5%] items-start justify-start gap-x-3">
              {suggestedMessages &&
                suggestedMessages.map((msg, i) => {
                  return (
                    <p
                      className="rounded-lg p-1 text-center w-auto h-full bg-sky-700 text-white"
                      key={i}
                    >
                      {msg}
                    </p>
                  );
                })}
            </div>

            <div
              // onSubmit={sendMessage}
              className="w-full h-[15%] relative p-4 items-center flex-col  flex"
            >
              <input
                // value={messageInput}
                // readOnly={chatting || status !== "READY"}
                // onChange={(e) => setMessageInput(e.target.value)}
                placeholder="message... "
                className="text-neutral-700 outline-gray-200 w-full h-full border  flex flex-col  active:outline-gray-300 pl-[15px] rounded-lg  pr-[50px]   decoration-none placeholder:text-neutral-300 text-sm font-normal font-manrope leading-snug"
              />
              <button
                className="w-[32px] h-[32px] absolute top-7 right-7"
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
        </div>

        <div className="w-full p-3 mt-[30px] flex-end items-end flex flex-col">
          <button
            disabled={updatingInterface}
            onClick={handleSubmitChatInterface}
            className="text-white h-11 disabled:bg-sky-300 rounded-lg justify-start items-start  px-5 py-3 bg-sky-700  shadow border border-sky-700  gap-2 "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterfaceSettings;
