"use client";

import { useEffect } from "react";
import Support from "../../../../components/mainComponent/support/support";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";

function Support_page() {
  const { getUserChatBots, loading, chatbots } = useChatbotStore((state) => ({
    getUserChatBots: state.getUserChatBots,
    loading: state.loading,
    chatbots: state.chatbots,
  }));

  useEffect(() => {
    getUserChatBots();
  }, []);


  return (
    <div className="overflow-x-hidden">
      <Support data={chatbots} />
    </div>
  );
}

export default Support_page;
