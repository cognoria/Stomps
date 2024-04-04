import ColorPicker from "../../../customComponents/colorPicker/color";

function Chat_interface() {
  const chatMessages = [
    {
      content: "👋 Hi!  How can I help",
      role: "client",
      confidence_score: "1.3",
    },
    { role: "user", content: "Hi" },
  ];
  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3  font-manrope leading-snug">
          Chat Interface
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 border-gray-200 border-[1px]">
        <div className="w-full flex flex-col lg:flex-row items-start py-8  px-3 ">
          <div className="flex flex-col w-full flex-1">
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
                // onChange={(e) => setLimitMessage(e.target.value)}
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
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Suggested Messages
              </div>
              <input
                // onChange={(e) => setLimitMessage(e.target.value)}
                placeholder="What is example.com?"
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />

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
                // onChange={(e) => setLimitMessage(e.target.value)}
                placeholder="Message..."
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Theme
              </div>
              <select
                value=""
                // onChange={handleModelChange}
                className="h-[50px] w-full -mt-2 border-[1px] border-gray-200 rounded-md"
              >
                <option
                  value=""
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  Light
                </option>
                <option
                  value=""
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
                  // onDragOver={handleDragOver}
                  // onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    // accept=".pdf,.doc,.txt,.docx"
                    style={{ display: "none" }}
                    // onChange={handleFileChange}
                  />
                  <label htmlFor="file-input" className="upload-label">
                    <img
                      className="w-[50px] h-[50px]"
                      src="/images/chatbox/gallery.svg"
                      alt="Upload icon"
                    />
                    <div className="main-text text-sm">no file choosen</div>
                    <div className="sub-text mb-2">choose file</div>
                  </label>
                  {/* {selectedFile && (
                <div className="file-name">
                  Selected file: {selectedFile.name}
                </div>
              )} */}
                </div>
                <div className="flex-1 flex flex-row gap-4">
                  <input type="checkbox" className="w-4 h-4 " />
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
                // onChange={(e) => setLimitMessage(e.target.value)}
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
              <ColorPicker />
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Upload Chat icon
                <span className="text-zinc-800 text-[10px] font-normal font-['Manrope'] leading-[14px] tracking-tight">
                  (images can only be square)
                </span>
              </div>
              <div className="flex gap-x-4 w-full flex-row items-center">
                <div
                  className="upload-container flex-1 p-4"
                  // onDragOver={handleDragOver}
                  // onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    // accept=".pdf,.doc,.txt,.docx"
                    style={{ display: "none" }}
                    // onChange={handleFileChange}
                  />
                  <label htmlFor="file-input" className="upload-label">
                    <img
                      className="w-[50px] h-[50px]"
                      src="/images/chatbox/gallery.svg"
                      alt="Upload icon"
                    />
                    <div className="main-text text-sm">no file choosen</div>
                    <div className="sub-text mb-2">choose file</div>
                  </label>
                  {/* {selectedFile && (
                <div className="file-name">
                  Selected file: {selectedFile.name}
                </div>
              )} */}
                </div>
                <div className="flex flex-col gap-y-5 items-start">
                  <div className="flex-1 flex flex-row gap-4">
                    <input type="checkbox" className="w-4 h-4 " />
                    <p className="text-zinc-800 text-[10px] font-normal font-['Manrope'] leading-[14px] tracking-tight">
                      Use a plain color instead
                    </p>
                  </div>
                  <ColorPicker />
                </div>
              </div>
            </div>
            <div className="flex gap-y-4 w-full flex-col items-start p-3">
              <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
                Align Chat Button
              </div>
              <select
                value=""
                // onChange={handleModelChange}
                className="h-[50px] w-full -mt-2 border-[1px] border-gray-200 rounded-md"
              >
                <option
                  value=""
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  Left
                </option>
                <option
                  value=""
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
                // onChange={(e) => setLimitMessage(e.target.value)}
                placeholder="5"
                className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
              />
            </div>
          </div>
          <div className="border-[1px] w-full lg:w-[50%] rounded-lg h-[588px] border-gray-200  items-start flex-col ">
            <div className="flex border-b-[1px] border-gray-200 flex-row  p-4 w-full flex-end items-end justify-end">
              <p className="mx-3 text-red-500 font-manrope font-normal text-sm">
                {/* {error && error} */}
              </p>{" "}
              <img src="/images/chatbox/refresh.svg" alt="" />
            </div>
            <div
              // style={{ scrollBehavior: "smooth" }}
              className="w-full overflow-y-scroll h-[75%] flex flex-col gap-3 p-4"
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
            <form
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
                type="submit"
              >
                <img
                  src="/images/chatbox/send.svg"
                  alt=""
                  className="w-full h-full "
                />
              </button>
            </form>
          </div>
        </div>
        <div className="w-full p-3 mt-[30px] flex-end items-end flex flex-col">
          <button
            // disabled={loadingSecurity}
            // onClick={handleSubmitBotSecurity}
            className="text-white h-11 disabled:bg-sky-300 rounded-lg justify-start items-start  px-5 py-3 bg-sky-700  shadow border border-sky-700  gap-2 "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat_interface;
