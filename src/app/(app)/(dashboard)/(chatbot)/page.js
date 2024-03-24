"use client";

import { useEffect } from "react";
import Loading from "../../../../components/customComponents/loading/loading";
import Empty_bot from "../../../../components/mainComponent/chatbot/empty_bot";
import Chatbot_key_check from "../../../../components/mainComponent/chatbot/key_check/chatbot_key_check";
import Main_bot from "../../../../components/mainComponent/chatbot/main_bot";
import useUserApiKey from "../../../../store/chat_bot_state/api_key/api_key_check";
import useUserChatbot from "../../../../store/chat_bot_state/user_chatbot";

function Page() {
  const { userChatBot, loading, error, chatbots } = useUserChatbot((state) => ({
    userChatBot: state.userChatBot,
    loading: state.loading,
    error: state.error,
    chatbots: state.chatbots,
  }));
  const { userApiKeyCheck, key_loading, key_error, key_val } = useUserApiKey(
    (state) => ({
      userApiKeyCheck: state.userApiKeyCheck,
      key_loading: state.loading,
      key_error: state.error,
      key_val: state.key_val,
    })
  );

  useEffect(() => {
    userChatBot();
    userApiKeyCheck();
  }, []);
  // console.log(key_val);
  return (
    <div>
      {key_loading ||
        (loading && <Loading height={"h-50px"} width={"w-50px"} />)}

      {key_val && (
        <>
          {chatbots === null || chatbots.length === 0 ? (
            <Empty_bot />
          ) : chatbots ? (
            <div className="mt-[80px] w-full">
              <Main_bot chatbots={chatbots} />
            </div>
          ) : (
            <Empty_bot />
          )}
        </>
      )}

      {!key_val && <Chatbot_key_check />}
    </div>
  );
}

export default Page;
