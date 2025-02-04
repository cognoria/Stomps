import useBotMessagingStore from "../../../../store/chatbot/useChatbotMessaging";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import useModalStore from "../../../../store/modal/modalState";

export function DeleteBot({ text, button_name, id }) {
  const hideModal = useModalStore((state) => state.hideModal);

  const { deleteChatBot, deletingChatbot, getUserChatBots } = useChatbotStore(
    (state) => ({
      getUserChatBots: state.getUserChatBots,
      deleteChatBot: state.deleteChatBot,
      deletingChatbot: state.loading,
    })
  );

  const delete_bot = async (id) => {
    try {
      await deleteChatBot(id, async () => {
        await hideModal();
        await getUserChatBots();
        await useBotMessagingStore.getState().removeBot(id);
      });
    } catch (error) {
      await hideModal();
      console.error("Failed to delete chatbot:", error);
    }
  };
  // console.log(id);
  return (
    <div className="w-[90%] lg:w-[365.63px] h-[319px] relative px-6 py-10 bg-white rounded-xl flex-col justify-center items-center gap-10 inline-flex">
      <div className="flex absolute top-3 right-3 justify-end items-end flex-end w-full">
        <button
          onClick={hideModal}
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          <img src="/images/auth/close_button.svg" />
        </button>
      </div>
      <div className="self-stretch h-11 flex-col justify-center items-center gap-[13px] flex">
        <div className="w-[317.63px] text-center text-zinc-800 text-base font-bold font-manrope leading-snug tracking-tight">
          {text}
        </div>
      </div>
      <div className="self-stretch h-24 flex-col justify-center items-center gap-4 flex">
        <div className="self-stretch rounded-lg justify-start items-start inline-flex">
          <div className="grow shrink basis-0 h-10 px-4 py-2.5 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex">
            <button
              onClick={hideModal}
              className="grow w-full shrink basis-0 text-center text-white text-sm font-bold font-manrope leading-snug"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="self-stretch rounded-lg justify-start items-start inline-flex">
          <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg shadow border border-red-600 justify-center items-center gap-2 flex">
            <button
              disabled={deletingChatbot}
              onClick={() => delete_bot(id)}
              className={`grow shrink basis-0 text-center ${
                deletingChatbot ? "" : ""
              }  text-red-600 text-sm font-bold font-manrope leading-snug`}
            >
              {deletingChatbot ? "deleting" : button_name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
