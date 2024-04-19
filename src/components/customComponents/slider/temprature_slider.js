import { useState } from "react";

function Temprature_slider({ height, value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
    onChange(newValue); // Call the callback function to update the parent state
  };

  return (
    <div className="w-full flex flex-col items-baseline justify-end relative h-5">
      <div
        className="absolute top-1 transform -translate-y-full -translate-x-1/2 text-xs flex justify-center items-center w-5 h-5 rounded-full bg-[#1261AC] text-white"
        style={{ left: `${localValue * 100}%` }}
      >
        {localValue}
      </div>
      <div
        className={`relative ${height} w-full bg-gray-200 rounded-full overflow-hidden`}
      >
        <input
          type="range"
          min="0"
          max="1.0"
          step="0.1"
          value={localValue}
          onChange={handleChange}
          className={`absolute top-0 left-0 z-10 w-full ${height} opacity-0 cursor-pointer`}
        />
        <div
          className={`absolute bottom-0 left-0 ${height} bg-[#1261AC]`}
          style={{ width: `${localValue * 100}%` }}
        />
      </div>
    </div>
  );
}

export default Temprature_slider;
