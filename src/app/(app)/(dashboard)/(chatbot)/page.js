"use client";

import { useEffect } from "react";
import EmptyChatbotsDisplay from "../../../../components/mainComponent/chatbot/emptyChatbotDisplay";
import ChatbotsDisplay from "../../../../components/mainComponent/chatbot/ChatbotsDisplay";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";

const Page = () => {
  const { getUserChatBots, chatbots } = useChatbotStore((state) => ({
    getUserChatBots: state.getUserChatBots,
    loading: state.loading,
    chatbots: state.chatbots,
  }));

  useEffect(() => {
    getUserChatBots();
  }, [getUserChatBots])
  

  if (!chatbots || chatbots.length === 0) {
    return <EmptyChatbotsDisplay />;
  }

  return (
    <div className="mt-[80px] w-full">
      <ChatbotsDisplay chatbots={chatbots} />
    </div>
  );
};

export default Page;
