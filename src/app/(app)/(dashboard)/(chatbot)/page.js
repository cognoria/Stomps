"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../../../../components/customComponents/loading/loading";
import EmptyChatbotsDisplay from "../../../../components/mainComponent/chatbot/emptyChatbotDisplay";
import ChatbotsDisplay from "../../../../components/mainComponent/chatbot/ChatbotsDisplay";
import useKeysStore from "../../../../store/chatbot/useKeysStore";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { useUserStore } from "../../../../store/auth/userState";

const Page = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const { getUserChatBots, loading, chatbots } = useChatbotStore((state) => ({
    getUserChatBots: state.getUserChatBots,
    loading: state.loading,
    chatbots: state.chatbots,
  }));

  const { checkKeys, loadingKeys } = useKeysStore((state) => ({
    checkKeys: state.checkKeys,
    loadingKeys: state.loading,
    keysError: state.error,
    hasKeys: state.hasKeys,
  }));

  useEffect(() => {
    if (user) {
      checkKeys((hasKeys) => {
        if (!hasKeys) {
          router.push("/account/keys");
        }
      });
    }
  }, [user]);

  useEffect(() => {
    getUserChatBots();
  }, [])
  

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
