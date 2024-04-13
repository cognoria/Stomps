import { useEffect } from "react";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import EmptyDashboard from "./emptyDashboard";
import BarHeader from "./header";

function Leeds({ botId }) {
  console.log(botId);
  const { getChatbotLead, loading, leads, error } = useChatbotStore(
    (state) => ({
      getChatbotLead: state.getChatbotLead,
      loading: state.loading,
      leads: state.leads,
    })
  );
  const bot = false;
  useEffect(() => {
    getChatbotLead(botId);
  }, [botId, getChatbotLead]);

  //TODO: call the analytics endpoint.
  return (
    <div className="w-full flex flex-col">
      {leads ? <Filled_bot_state leads={leads} /> : <EmptyDashboard />}
    </div>
  );
}

export default Leeds;
const Filled_bot_state = ({ leads }) => {
  // const dummy_data = [
  //   {
  //     name: "Ikem",
  //     phone_no: "+1234567890",
  //     email: "dev@Ikem",
  //     date: "12-23-45",
  //   },
  //   {
  //     name: "Ikem",
  //     phone_no: "+1234567890",
  //     email: "dev@Ikem",
  //     date: "12-23-45",
  //   },
  //   {
  //     name: "Ikem",
  //     phone_no: "+1234567890",
  //     email: "dev@Ikem",
  //     date: "12-23-45",
  //   },
  //   {
  //     name: "Ikem",
  //     phone_no: "+1234567890",
  //     email: "dev@Ikem",
  //     date: "12-23-45",
  //   },
  //   {
  //     name: "Ikem",
  //     phone_no: "+1234567890",
  //     email: "dev@Ikem",
  //     date: "12-23-45",
  //   },
  //   {
  //     name: "Ikem",
  //     phone_no: "+1234567890",
  //     email: "dev@Ikem",
  //     date: "12-23-45",
  //   },
  // ];
  return (
    <div className="lg:w-full w-[98%]  lg:p-[6%]  flex flex-col justify-center items-center  ">
      <div className="flex flex-col items-start justify-center w-full border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Leeds
        </div>

        <BarHeader date={true} exportData={true} confidence={false} />

        <div class="p-3 bg-white w-full sm:py-16 font-manrope flex flex-col ">

            <table class="min-w-full h-[40px] overflow-scroll  lg:divide-y lg:divide-gray-200">
              <thead class="hidden  bg-[#F6F9FF] lg:table-header-group">
                <tr>
                  <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                    Name
                  </td>

                  <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                    Email
                  </td>

                  <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                    phone Number
                  </td>

                  <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-normal">
                    Date & time sunmitted
                  </td>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                {leads?.map((list, i) => {
                  return (
                    <tr key={i}>
                      <td class="px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                        {list.name}
                        <div class="mt-1 lg:hidden">
                          <p class="font-medium text-gray-500">{list.email}</p>
                        </div>
                      </td>

                      <td class="hidden px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                        {list.email}
                      </td>

                      <td class="px-6 py-4 text-sm font-bold text-right text-gray-900 lg:text-left whitespace-nowrap">
                        {list.phone_no}
                        <div class="flex items-center justify-end mt-1 font-medium lg:hidden">
                          {list.date}
                        </div>
                      </td>

                      <td class="hidden px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                        <div class="inline-flex items-center">{list.date}</div>
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
