function ExportButton() {
  return (
    <div>
      <button className="w-[101px] h-9 px-3.5 py-2 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex">
        <p className="text-white text-sm">Export</p>
        <img src="/images/chatbox/exportIcon.svg" />
      </button>
    </div>
  );
}

export default ExportButton;
