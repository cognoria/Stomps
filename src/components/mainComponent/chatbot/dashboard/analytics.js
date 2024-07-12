"use client";

import { useEffect, useState } from "react";
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

  const [filteredData, setFilteredData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (!analytics || !startDate || !endDate) return;

    // Filter data within the selected date range
    const filtered = analytics?.chatsPerDay?.filter((item) => {
      const itemDate = new Date(item.date);
      const convStartDate = new Date(startDate);
      const convEndDate = new Date(endDate);

      return itemDate >= convStartDate && itemDate <= convEndDate;
    });

    // Update the filtered data state
    setFilteredData(filtered);
  }, [analytics, startDate, endDate]);

  const handleDateRangeSelect = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="flex flex-col w-full items-center overflow-hidden">
      {analytics?.chatsPerCountry?.length > 0 ? (
        <Chart_page
          startDate={startDate}
          endDate={endDate}
          handleDateRangeSelect={handleDateRangeSelect}
          country={analytics?.chatsPerCountry?.map((item) => item.country)}
          count={analytics?.chatsPerCountry?.map((item) => item.count)}
          data={{
            labels: filteredData
              ? filteredData?.map((item) => item.date)
              : analytics?.chatsPerDay?.map((item) => item.date),
            datasets: [
              {
                fill: true,
                label: "",
                data: filteredData
                  ? filteredData?.map((item) => item.count)
                  : analytics?.chatsPerDay?.map((item) => item.count),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
          mapData={analytics?.chatsPerCountry}
          onDateRangeSelect={handleDateRangeSelect}
        />
      ) : (
        <EmptyDashboard header={'Analytics'} msg={"No Analytics yet"} />
      )}
    </div>
  );
}

export default Analytics;
