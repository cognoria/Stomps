import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatRangeDate } from "../../../utils/dataFormat/dateRange";
import {
  exportToCSV,
  exportToJSON,
} from "../../../utils/extractDoc/exportData";

function ChatRange({
  startDate,
  endDate,
  onDateRangeSelect,
  exportData,
  exportDataTitle,
  exportDataFile,
}) {
  const [showExportFormat, setShowExportFormat] = useState(false);
  const [displayFormat, setDisplayFormat] = useState("0");
  const handleStartDateChange = (date) => {
    onDateRangeSelect({ startDate: formatRangeDate(date), endDate });
    setDisplayFormat("dd/MM/yyyy");
  };

  const handleEndDateChange = (date) => {
    onDateRangeSelect({ startDate, endDate: formatRangeDate(date) });
    setDisplayFormat("dd/MM/yyyy");
  };

  const exportFileJson = async () => {
    setShowExportFormat(false);
    exportToJSON(exportDataFile, exportDataTitle);
  };

  const exportFileCSV = async () => {
    setShowExportFormat(false);
    exportToCSV(exportDataFile, exportDataTitle);
  };

  return (
    <div className="flex w-full items-start justify-between font-manrope  flex-col lg:flex-row gap-6 p-3 ">
      <div className="flex flex-[60%] gap-4 items-start ">
        <div className="flex gap-4 items-center">
          <div className="w-[150px] flex flex-col">
            <p className="font-medium font-manrope text-sm">Start</p>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText={startDate && endDate ? "Select" : "Select"}
              dateFormat={displayFormat}
              className="border w-full border-gray-300 rounded font-medium font-manrope placeholder:font-medium placeholder:font-manrope placeholder:text-sm px-2 lg:px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-[150px] flex flex-col">
            <p className="font-medium font-manrope text-sm">End</p>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText={startDate && endDate ? "Select" : "Select"}
              dateFormat={displayFormat}
              className="border w-full border-gray-300 rounded font-medium font-manrope placeholder:font-medium placeholder:font-manrope placeholder:text-sm px-2 lg:px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex relative w-full flex-[40%] flex-col items-end justify-end">
        <button
          onClick={() => setShowExportFormat(!showExportFormat)}
          className="flex flex-row rounded-lg text-sm lg:text-medium items-center font-manrope w-fit p-2 lg:p-4 text-white font-[700] gap-4  bg-[#1261AC]"
        >
          <p>Export</p>
          <img src="/images/chatbox/downloadIcon.png" alt="Download Icon" />
        </button>

        {showExportFormat && (
          <div className="flex absolute top-[100%] right-0 flex-col gap-2 bg-[#1261AC] text-white p-3 items-center justify-center">
            <button
              className="border-b-[1px] border-gray-200"
              onClick={exportFileJson}
            >
              JSON
            </button>

            <button onClick={exportFileCSV}>CSV</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatRange;
