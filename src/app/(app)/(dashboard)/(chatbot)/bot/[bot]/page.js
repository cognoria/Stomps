import ChatPage from "../../../../../../components/mainComponent/chatbot/Chats/Chat";

function page({ params: { bot } }) {

  return (
    <div className="flex flex-col w-full items-center justify-center mt-[100px] ">
      <ChatPage botId={bot} />
    </div>
  );
}

export default page;
