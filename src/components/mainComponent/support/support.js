import Image from "next/image";
import emailjs from "emailjs-com";

function Support() {
  const handleSunmitMessage = async (values) => {
    if ( true
      /**ensure all neccesary field was filed  */
    ) {
      toast.error("All Fields are Required")
    } else {
      emailjs
        .send(
          "service_c8ptsgf", // service id
          "template_cseme6r", // template id
          values,
          "jzLVRt4ErlDhmrvvY" //api key
        )
        .then(() => {
          toast.success("Your Message has been successfully sent. We will contact you soon.")
        
          values.name = "";
          values.email = "";
          values.message = "";
        });
    }
  };
  return (
    <div className="w-screen overflow-x-hidden mt-[80px] flex flex-col justify-center font-manrope items-center">
      <div className="text-sky-700 w-full text-center items-center flex justify-center flex-col my-[30px] text-[28px] font-extrabold font-manrope leading-[33.60px]">
        Complaint Form
      </div>
      <div className="w-[95%] flex-col items-center flex lg:w-[45%] my-[30px] h-auto py-4 relative rounded-lg border border-gray-200">
        <div className="w-full p-[17px] text-sky-700 text-base font-bold font-manrope leading-snug">
          Submit a case to our customer support team
        </div>
        <div className="w-full my-[5px] border border-gray-200" />
        <div className="flex flex-col gap-1 items-start w-full">
          <div className="flex w-full gap-3 flex-col items-start px-[3%] py-[2%]">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Email
            </div>
            <input className="w-full h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex" />
          </div>
          <div className="flex gap-3 w-full flex-col items-start px-[3%] py-[2%]">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Select Chatbot
            </div>
            <select className="w-full h-[37px] px-3.5  bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex">
              <option className="text-xs font-medium font-manrope leading-tight tracking-tight text-gray-400">
                Example 1 Chatbot
              </option>
            </select>
          </div>
          <div className="flex w-full px-[3%] flex-col lg:flex-row gap-x-2 items-start justify-between">
            <div className="flex w-full  lg:flex-1 gap-3  flex-col items-start  py-[2%]">
              <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                Selected Problem
              </div>
              <select className="w-full h-[37px] px-3.5  bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex">
                <option className="text-xs font-medium font-manrope leading-tight tracking-tight text-gray-400">
                  Example 1 Chatbot
                </option>
              </select>
            </div>
            <div className="flex w-full   lg:flex-1 gap-3 flex-col items-start py-[2%]">
              <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                Level of Severity
              </div>
              <select className="w-full h-[37px] px-3.5  bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex">
                <option className="text-xs font-medium font-manrope leading-tight tracking-tight text-gray-400">
                  Example 1 Chatbot
                </option>
              </select>
            </div>
          </div>
          <div className="w-full my-[15px] h-[1px] px-[3%] lg:hidden block border border-gray-200" />

          <div className="flex w-full gap-3 flex-col items-start px-[3%] py-[2%]">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Subject
            </div>
            <input className="w-full h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex" />
          </div>

          <div className="flex w-full gap-3 flex-col items-start px-[3%] py-[2%]">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Description
            </div>
            <textarea className="w-full h-[120px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex"></textarea>
            <div className="w-[500px] text-zinc-500 text-xs font-medium font-manrope leading-none tracking-tight">
              Please add a description before you submit.
            </div>
          </div>
          <div className="flex px-[3%] flex-row items-center lg:items-end gap-4 justify-around lg:justify-end w-full mt-[50px] mb-[15px]">
            <button className="w-[161px] h-9 px-3.5 py-2 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 inline-flex">
              <div className="w-5 h-5 justify-center items-center flex">
                <Image width={15} height={15}
                  src="/images/main/support/link.svg"
                  alt="/"
                  className="w-5 h-5 relative"
                />
              </div>
              <div className="text-sky-700 text-xs font-bold font-manrope leading-snug">
                Add Attachment
              </div>{" "}
            </button>
            <button className=" h-9 px-3.5 text-white py-2 bg-sky-700 rounded-lg shadow border border-sky-700 text-xs font-bold font-manrope leading-snug justify-center items-center gap-2 flex">
              Load Sitemap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
