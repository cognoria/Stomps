"use client";

import { useEffect } from "react";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { Chart_page } from "../../../customComponents/chart/chart";
import EmptyDashboard from "./emptyDashboard";

function Analytics({ botId }) {
  const { getChatbotAnalytics, loading, analytics, error } = useChatbotStore(
    (state) => ({
      getChatbotAnalytics: state.getChatbotAnalytics,
      loading: state.loading,
      analytics: state.analytics,
    })
  );

  useEffect(() => {
    getChatbotAnalytics(botId);
  }, [botId, getChatbotAnalytics]);

  const dataValue = analytics?.chatsPerDay?.map((item) => item.count);
  const label = analytics?.chatsPerDay?.map((item) => item.date);
  const country = analytics?.chatsPerCountry?.map((item) => item.country);
  const count = analytics?.chatsPerCountry?.map((item) => item.count);

  const chartData = {
    labels: label,
    datasets: [
      {
        fill: true,
        label: "",
        data: dataValue,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log(analytics);

  // map data Structure

  return (
    <div className="flex flex-col w-full items-center overflow-hidden">
      {analytics ? (
        <Chart_page data={chartData} count={count} country={country} />
      ) : (
        <EmptyDashboard />
      )}
    </div>
  );
}

export default Analytics;
