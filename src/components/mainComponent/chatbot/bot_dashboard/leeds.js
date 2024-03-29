function Leeds() {
  const bot = false;
  return (
    <div className="w-full flex flex-col">
      {bot ? <Filled_bot_state /> : <Empty_bot />}
    </div>
  );
}

export default Leeds;
const Filled_bot_state = () => {
  const dummy_data = [
    {
      name: "Ikem",
      phone_no: "+1234567890",
      email: "dev@Ikem",
      date: "12-23-45",
    },
    {
      name: "Ikem",
      phone_no: "+1234567890",
      email: "dev@Ikem",
      date: "12-23-45",
    },
    {
      name: "Ikem",
      phone_no: "+1234567890",
      email: "dev@Ikem",
      date: "12-23-45",
    },
    {
      name: "Ikem",
      phone_no: "+1234567890",
      email: "dev@Ikem",
      date: "12-23-45",
    },
    {
      name: "Ikem",
      phone_no: "+1234567890",
      email: "dev@Ikem",
      date: "12-23-45",
    },
    {
      name: "Ikem",
      phone_no: "+1234567890",
      email: "dev@Ikem",
      date: "12-23-45",
    },
  ];
  return (
    <div>
      <div class="py-12 bg-white sm:py-16 font-manrope lg:py-20">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div>
            <table class="min-w-full lg:divide-y lg:divide-gray-200">
              <thead class="hidden  bg-slate-50 lg:table-header-group">
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
                {dummy_data.map((list, i) => {
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
    </div>
  );
};

const Empty_bot = () => {
  return (
    <div>
      {" "}
      <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
        <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
          <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
            Chat logs
          </div>
          <div className="flex flex-row gap-6 w-full p-3 ">
            <div class="relative">
              <input
                type="date"
                class="appearance-none py-[20px] border border-gray-300 font-manrope rounded  px-4 w-[150px] leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Select a date"
              />

              <img
                src="/images/chatbox/calendar.svg"
                alt="Calendar Icon"
                class="absolute right-0 top-0 mt-2 mr-3 h-6 w-6 pointer-events-none"
              />
            </div>
          </div>
          <div className="w-full gap-4 h-[541px] flex flex-col items-center justify-center">
            <img src="/images/chatbox/chatbox.svg" alt="" className="" />

            <div className="text-zinc-500 text-sm font-medium font-['Manrope'] leading-tight tracking-tight">
              No Conversations yet.
            </div>
            <div className="flex flex-row gap-2  items-center justify-center w-full ">
              <div className="text-sky-700 text-sm font-bold font-manrope  leading-snug">
                Refresh
              </div>
              <img src="/images/chatbox/refres.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
