import QA from "../../../../../../components/mainComponent/chatbot/QA";

function QA_page() {
  return (
    <div>
      <div className="lg:flex hidden flex-col items-center justify-center">
        <div className="text-sky-700 text-[32px] font-bold font-manrope leading-[38.40px]">
          Data Sources
        </div>
        <div className="text-center text-gray-900 text-base font-normal font-manrope leading-relaxed tracking-tight">
          Add a data source to train your chatbot
        </div>
      </div>
      <QA />
    </div>
  );
}

export default QA_page;
