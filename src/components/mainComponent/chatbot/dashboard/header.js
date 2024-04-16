import { exportToJSON } from "../../../../utils/extractDoc/exportData";

function BarHeader({ date, exportData, exportDataTitle, onDateSelect, exportDataFile }) {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    onDateSelect(selectedDate);
  };

  const exportFile = async () => {
    exportToJSON( exportDataFile, exportDataTitle );
  };

  return (
    <div className="flex w-full items-start justify-between  flex-col lg:flex-row gap-6 p-3 ">
      <div className="flex flex-[60%] gap-4 items-start ">
        {date && (
          <div class="relative">
            <input
              type="date"
              class="appearance-none py-[10px] lg:py-[20px] border border-gray-300 font-manrope rounded  px-4 w-[100px] lg:w-[150px] leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Select a date"
              onChange={handleDateChange}
            />

            {/* <img
              src="/images/chatbox/calendar.svg"
              alt="Calendar Icon"
              class="absolute right-0 top-0 hidden lg:block mt-2 mr-3 h-6 w-6 pointer-events-none"
            /> */}
          </div>
        )}

        {/* {confidence && (
          <div class="relative">
            <select className="text-zinc-500 text-[15px] lg:text-[18px] font-normal py-[10px]  lg:py-[20px] font-manrope tracking-tight border w-150 lg:w-[250px] appearance-none border-gray-300 rounded pl-16 pr-3 leading-tight focus:outline-none focus:border-blue-500">
              <option>confidence 1</option>
              <option>confidence 2</option>
              <option>confidence 3</option>
              <option>confidence 4</option>
            </select>
            <img
              src="/images/chatbox/arrow-down.svg"
              alt="Calendar Icon"
              class="absolute right-1 hidden lg:block top-0 mt-4 mr-3 h-6 w-6 pointer-events-none"
            />
            <img
              src="/images/chatbox/filter.svg"
              alt="Calendar Icon"
              class="absolute left-1 hidden lg:block top-0 mt-4 mr-3 h-6 w-6 pointer-events-none"
            />
          </div>
        )} */}
      </div>
      <div className="flex flex-[40%] items-end justify-end">
        {exportData && (
          <button
            onClick={exportFile}
            className="flex flex-row rounded-lg items-center font-manrope w-fit p-4 text-white font-[700] gap-4  bg-[#1261AC]"
          >
            <p>Export</p>
            <img src="/images/chatbox/downloadIcon.png" />
          </button>
        )}
      </div>
    </div>
  );
}

export default BarHeader;
