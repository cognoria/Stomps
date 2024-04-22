const ColorPicker = ({ selectedColor, onColorChange }) => {
  return (
    <div className="flex p-2 flex-row gap-3 items-center w-[150px] h-10 bg-zinc-100 rounded">
      <input
        type="color"
        className="w-10 h-10 border-none rounded-[15px]"
        value={selectedColor}
        onChange={onColorChange}
      />
      <div className="text-gray-900 text-base font-normal font-manrope leading-relaxed tracking-tight">
        {selectedColor}
      </div>
    </div>
  );
};

export default ColorPicker;
