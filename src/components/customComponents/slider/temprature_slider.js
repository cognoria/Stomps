import { useState } from "react";

function Temprature_slider({ height }) {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleEnd = () => {
    // Handle the end of dragging or tapping
  };

  return (
    <div
      className={`relative ${height} w-full bg-gray-200 rounded-full overflow-hidden`}
    >
      <input
        type="range"
        min="0"
        max="1"
        value={value}
        onChange={handleChange}
        onTouchStart={handleChange} // Update value on touch
        onTouchMove={handleChange} // Update value on touch move
        onTouchEnd={handleEnd} // End of touch
        onMouseDown={handleChange} // Update value on mouse click
        onMouseMove={handleChange} // Update value on mouse move
        onMouseUp={handleEnd} // End of mouse click
        className="absolute top-0 left-0 z-10 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute top-0 left-0 h-full bg-blue-500"
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
}

export default Temprature_slider;
