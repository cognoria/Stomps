import Datasource from "../../../../../../components/mainComponent/chatbot/datasource";

function Data_source() {
  return (
    <div className="">
      <div className="lg:flex flex-col items-center  hidden justify-center">
        <div className="text-sky-700  text-[32px] font-bold font-manrope leading-[38.40px]">
          Data Sources
        </div>
        <div className="text-center  text-gray-900 text-base font-normal font-manrope leading-relaxed tracking-tight">
          Add a data source to train your chatbot
        </div>
      </div>
      <Datasource />
    </div>
  );
}

export default Data_source;
