// import Chart_page from "../../../customComponents/chart/chart";

function Analytics() {
  const analytics = false;
  return (
    <div className="flex flex-col w-full items-center overflow-hidden">
      {/* {analytics ?
        <Chart_page />
        : <Empty_state />} */}

      <Empty_state />
    </div>
  );
}

export default Analytics;

const Empty_state = () => {
  return (
    <div className="w-full items-center flex-col gap-5 mb-5 p-2 border-[2px] border-gray-200">
      <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
        Chat logs
      </div>
      <div className="flex flex-row gap-6 w-full p-3 ">
        <div class="relative">
          <input
            type="date"
            class=" custom-date-input "
            placeholder="Select a date"
          />
        </div>
      </div>
      <img src="/images/chatbox/chat_frame.svg" />
      <img src="/images/chatbox/map_frame.svg" />
    </div>
  );
};
