function DatePicker() {
  return (
    <div class="relative h-[30px]">
      <input
        type="date"
        class="appearance-none py-[10px] h-full lg:py-[20px] border border-gray-300 font-manrope rounded  px-4 w-[100px] lg:w-[150px] leading-tight focus:outline-none focus:border-blue-500"
        placeholder="Select a date"
      />

      {/* <img
        src="/images/chatbox/calendar.svg"
        alt="Calendar Icon"
        class="absolute right-0 top-0 hidden lg:block mt-2 mr-3 h-6 w-6 pointer-events-none"
      /> */}
    </div>
  );
}

export default DatePicker;
