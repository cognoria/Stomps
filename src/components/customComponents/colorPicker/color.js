import { useState } from "react";

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("#1708ff");

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="flex p-2 flex-row gap-3 items-center w-[150px] h-10 bg-zinc-100 rounded">
      <input
        type="color"
        className="w-10 h-10 border-none rounded-[15px]"
        value={selectedColor}
        onChange={handleColorChange}
      />
      <div className="text-gray-900 text-base font-normal font-['Manrope'] leading-relaxed tracking-tight">
        {selectedColor}
      </div>
    </div>
  );
};

export default ColorPicker;
