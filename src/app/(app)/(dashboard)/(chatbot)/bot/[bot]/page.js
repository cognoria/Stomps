import ChatPage from "../../../../../../components/mainComponent/chatbot/bot_chat/chat_page";

function page({ params: { bot } }) {

  return (
    <div className="flex flex-col w-full items-center justify-center mt-[100px] ">
      <ChatPage bot_id={bot} />
    </div>
  );
}

export default page;
