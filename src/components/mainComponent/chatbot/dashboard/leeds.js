import { useEffect, useState } from "react";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { sortDate } from "../../../../utils/dataFormat/date";
import EmptyDashboard from "./emptyDashboard";
import BarHeader from "./header";

function Leeds({ botId }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const { getChatbotLead, loading, leads, error } = useChatbotStore(
    (state) => ({
      getChatbotLead: state.getChatbotLead,
      loading: state.loading,
      leads: state.leads,
    })
  );
  useEffect(() => {
    getChatbotLead(botId);
  }, [botId, getChatbotLead]);
  const [filteredLeads, setFilteredLeads] = useState(leads);

  useEffect(() => {
    // Filter chats based on selected date
    if (selectedDate) {
      const leadsData = leads?.filter(
        (lead) => sortDate(lead.createdAt) === selectedDate
      );
      setFilteredLeads(leadsData);
    } else {
      setFilteredLeads(leads);
    }
  }, [selectedDate, leads]);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="w-full flex flex-col items-center">
      {filteredLeads && leads.length > 0 ? (
        <Filled_bot_state
          handleDateSelect={handleDateSelect}
          leads={filteredLeads}
        />
      ) : (
        <EmptyDashboard />
      )}
    </div>
  );
}

export default Leeds;
const Filled_bot_state = ({ leads, handleDateSelect }) => {
  return (
    <div className="lg:w-full w-[98%]  lg:p-[6%]  flex flex-col justify-center items-center  ">
      <div className="flex flex-col items-start justify-center w-full border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Leads
        </div>

        <BarHeader
          exportDataFile={leads}
          date={true}
          exportData={true}
          exportDataTitle="leads_Details"
          onDateSelect={handleDateSelect}
        />

        <div class="p-3 bg-white w-full sm:py-16 font-manrope flex flex-col ">
          <table class="min-w-full font-manrope h-[40px] overflow-scroll  lg:divide-y lg:divide-gray-200">
            <thead class="hidden  bg-[#F6F9FF] lg:table-header-group">
              <tr>
                <td class="px-6 py-4 text-sm font-manrope font-medium text-gray-400 whitespace-normal">
                  Name
                </td>

                <td class="px-6 py-4 text-sm font-medium font-manrope text-gray-400 whitespace-normal">
                  Email
                </td>

                <td class="px-6 py-4 text-sm font-medium font-manrope text-gray-400 whitespace-normal">
                  phone Number
                </td>

                <td class="px-6 py-4 text-sm font-medium font-manrope text-gray-400 whitespace-normal">
                  Date & time sunmitted
                </td>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              {leads
                ?.slice()
                .reverse()
                .map((list, i) => {
                  return (
                    <tr key={i}>
                      <td class="px-6 py-4 text-sm  font-manrope font-medium text-gray-900 whitespace-nowrap">
                        {list.Name}
                        <div class="mt-1 lg:hidden">
                          <p class="font-medium text-gray-500">{list.Email}</p>
                        </div>
                      </td>

                      <td class="hidden px-6 py-4 text-sm font-manrope font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                        {list.Email}
                      </td>

                      <td class="px-6 py-4 text-sm font-medium font-manrope text-right text-gray-900 lg:text-left whitespace-nowrap">
                        {list.Phone}
                        <div class="flex items-center justify-end font-manrope mt-1 font-medium lg:hidden">
                          {sortDate(list.createdAt)}
                        </div>
                      </td>

                      <td class="hidden px-6 py-4 text-sm font-medium font-manrope text-gray-900 lg:table-cell whitespace-nowrap">
                        <div class="inline-flex items-center">
                          {sortDate(list.createdAt)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
