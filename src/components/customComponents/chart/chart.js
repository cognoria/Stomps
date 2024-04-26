import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import * as d3 from "d3";
import { Line } from "react-chartjs-2";
import ChoroplethMap from "../map/map";
import MapLegend from "../map/mapLegend";
import ChatRange from "./chatRange";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Chat Analytics Data",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      title: {
        display: true,
        text: "Chat Sessions",
      },
    },
  },
  scale: {
    ticks: {
      precision: 0,
    },
  },
};

export function Chart_page({
  data,
  mapData,
  country,
  count,
  startDate,
  endDate,
  handleDateRangeSelect,
}) {
  // const dataDemo = [
  //   { country: "Canada", count: 78 },
  //   { country: "NIGERIA", count: 305 },
  //   { country: "UNITED STATES", count: 1005 },
  //   { country: "SWEDEN", count: 25 },
  //   { country: "CHINA", count: 200 },
  // ];
  const colorScale = d3
    .scaleThreshold()
    .domain([0, 50, 100, 200])
    .range(d3.range(0, 1.1, 0.25).map(d3.interpolateBlues));

  return (
    <div className="w-[90%] flex flex-col font-manrope overflow-hidden">
      <ChatRange
        startDate={startDate}
        endDate={endDate}
        onDateRangeSelect={handleDateRangeSelect}
      />

      <Line options={options} data={data} />

      <div className="w-full h-full p-4 flex flex-col lg:flex-row font-manrope items-start gap-4">
        <ChoroplethMap data={mapData} />
        <div className="flex flex-col w-full lg:w-[20%] mt-[10px] items-start">
          <table className="min-w-full font-manrope rounded-t-[15px] shadow-lg overflow-scroll lg:divide-y lg:divide-gray-200">
            <thead className=" bg-[#F6F9FF] table-header-group">
              <tr>
                <th className="px-6 py-4 font-manrope text-sm font-medium text-[#1261AC] whitespace-normal">
                  Country
                </th>
                <th className="px-6 py-4 text-sm fonr-manrope font-medium text-[#1261AC] whitespace-normal">
                  Chats
                </th>
              </tr>
            </thead>

            <tbody className="divide-y justify-start font-manrope overflow-y-scroll max-h-[380px] divide-gray-200">
              <tr>
                <td className=" px-6 py-4 text-sm font-manrope font-medium text-gray-900 table-cell whitespace-nowrap">
                  {country.map((country, i) => (
                    <p key={i}>{country}</p>
                  ))}
                </td>
                <td className=" px-6 py-4 text-sm font-manrope font-medium text-gray-900 table-cell whitespace-nowrap">
                  {count.map((count, i) => (
                    <p key={i}>{count}</p>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <MapLegend colorScale={colorScale} />
        </div>
      </div>
    </div>
  );
}
