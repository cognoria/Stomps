"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../../../../components/customComponents/loading/loading";
import Empty_bot from "../../../../components/mainComponent/chatbot/empty_bot";
import Main_bot from "../../../../components/mainComponent/chatbot/main_bot";
import useUserChatbot from "../../../../store/chatbot/getChatbots";
import useKeysStore from "../../../../store/chatbot/keys";

function Page() {
  const router = useRouter();
  const { userChatBot, loading, error, chatbots } = useUserChatbot((state) => ({
    userChatBot: state.userChatBot,
    loading: state.loading,
    error: state.error,
    chatbots: state.chatbots,
  }));
  const { checkKeys, loadingKeys, keysError, hasKeys } = useKeysStore(
    (state) => ({
      checkKeys: state.checkKeys,
      loadingKeys: stasE.loading,
      key_error: state.error,
      hasKeys: state.hasKeys,
    })
  );

  useEffect(() => {
    checkKeys(() => {
      if (!hasKeys) {
        router.push("/account/keys");
      }
    });
    userChatBot();
  }, [hasKeys, router, checkKeys, userChatBot]);


  return (
    <div>
      {loadingKeys ||
        (loading && <Loading height={"h-50px"} width={"w-50px"} />)}

      <div>
        {chatbots === null || chatbots.length === 0 ? (
          <Empty_bot />
        ) : chatbots ? (
          <div className="mt-[80px] w-full">
            <Main_bot chatbots={chatbots} />
          </div>
        ) : (
          <Empty_bot />
        )}
      </div>
    </div>
  );
}

export default Page;
