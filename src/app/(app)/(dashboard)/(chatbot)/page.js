"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Empty_bot from "../../../../components/mainComponent/chatbot/empty_bot";
import Main_bot from "../../../../components/mainComponent/chatbot/main_bot";
import useUserChatbot from "../../../../store/chat_bot_state/user_chatbot";

function Page() {
  const router = useRouter();

  const { userChatBot, loading, error } = useUserChatbot((state) => ({
    userChatBot: state.userChatBot,
    loading: state.loading,
    error: state.error,
  }));

  useEffect(() => {
    // Fetch user chatbot data
    userChatBot();
  }, [userChatBot]);

  return (
    <div>
      {loading && <p>Loading...</p>} {/* Show loading message */}
      {error && <p>Error: {error}</p>} {/* Show error message */}
      {!loading && !error && !userChatBot.data && <Empty_bot />}
      {/* Show Empty_bot if data is not available */}
      {!loading && !error && userChatBot.data && (
        <div className="mt-[80px] w-full">
          <Main_bot />
        </div>
      )}
      {/* Show Main_bot if data is available */}
    </div>
  );
}

export default Page;
