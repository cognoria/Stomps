"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../../../../components/customComponents/loading/loading";
import Empty_bot from "../../../../components/mainComponent/chatbot/empty_bot";
import Main_bot from "../../../../components/mainComponent/chatbot/main_bot";
import useKeysStore from "../../../../store/chatbot/useKeysStore";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";

function Page() {
  const router = useRouter();
  const { getUserChatBots, loading, chatbots } = useChatbotStore((state) => ({
    getUserChatBots: state.getUserChatBots,
    loading: state.loading
  }))
  
  const { checkKeys, loadingKeys, keysError, hasKeys } = useKeysStore(
    (state) => ({
      checkKeys: state.checkKeys,
      loadingKeys: state.loading,
      key_error: state.error,
      hasKeys: state.hasKeys,
    })
  );

  useEffect(() => {
    checkKeys((hasKeys) => {
      if (!hasKeys) {
        router.push("/account/keys");
      }
    });
    getUserChatBots();
  }, []);


  return (
    <div>
      {loadingKeys ||
        (loading && <Loading height={"h-50px"} width={"w-50px"} />)}

      <div>
        {chatbots && chatbots?.length === 0 ? (
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
