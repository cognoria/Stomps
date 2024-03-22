"use client";

import { useEffect } from "react";
import Loading from "../../../../components/customComponents/loading/loading";
import Chatbot_key_check from "../../../../components/mainComponent/chatbot/key_check/chatbot_key_check";
import useUserChatbot from "../../../../store/chat_bot_state/user_chatbot";

function Page() {
  const { userChatBot, loading, error, chatbots } = useUserChatbot((state) => ({
    userChatBot: state.userChatBot,
    loading: state.loading,
    error: state.error,
    chatbots: state.chatbots,
  }));

  useEffect(() => {
    userChatBot();
  }, []);
  console.log(chatbots);
  return (
    <div>
      {loading && <Loading height={"h-50px"} width={"w-50px"} />}
      {/* {error && <p>Error: {error}</p>}
      {!loading && !error && !userChatBot.data && <Empty_bot />} */}
      {/* Show Empty_bot if data is not available */}
      {/* {!loading && !error && userChatBot.data && (
        <div className="mt-[80px] w-full">
          <Main_bot />
        </div>
      )} */}

      <Chatbot_key_check />
      {/* {chatbots === null || chatbots.length === 0 ? (
        <Empty_bot />
      ) : chatbots ? (
        <div className="mt-[80px] w-full">
          <Main_bot chatbots={chatbots} />
        </div>
      ) : (
        <Empty_bot />

      )} */}
    </div>
  );
}

export default Page;
