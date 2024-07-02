// /* eslint-disable @next/next/no-img-element */

// import Image from "next/image";
// import { plan_data } from "../../../data/data";

// /* eslint-disable react/no-unescaped-entities */
// export function PlanCards() {
//   return (
//     <div className="w-[95%] md:w-[570px] rounded-[16px]  border-[1px] p-[22px] md:p-[44px] border-gray-200">
//       {plan_data?.map((items, i) => (
//         <div className="mb-2 flex flex-row items-start gap-3" key={i}>
//           {items.availability && (
//             <Image
//               width={25}
//               height={25}
//               alt=""
//               src="./images/landing/Check_icon.svg"
//             />
//           )}

//           <div className="w-[434px]">
//             <span className="text-sky-700 text-base font-bold font-manrope leading-snug tracking-tight">
//               {items.tag}
//             </span>
//             <span className="text-gray-900 text-base font-normal font-manrope leading-relaxed tracking-tight">
//               {items.text}
//             </span>
//           </div>
//         </div>
//       ))}

//       <div className="w-full justify-center items-center flex flex-col my-6 gap-4">
//         <div className="text-center justify-center flex flex-row">
//           <div className="w-[296px] text-center">
//             <span className="text-sky-700 text-[40px] font-extrabold font-manrope leading-[48px]">
//               $999
//             </span>
//           </div>
//         </div>
//         <button
//           id="product-component-1714498324650"
//           className="flex flex-col items-center justify-center text-center font-manrope px-2 py-2 bg-transparent w-auto rounded-[8px] text-white"
//         />
//       </div>
//     </div>
//   );
// }
