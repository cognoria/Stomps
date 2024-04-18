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
    // legend: {
    //   position: "top",
    // },
    title: {
      display: true,
      text: "Chat Analytics Data",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Chatbot data collection date", // Add your descriptive label for the x-axis here
      },
    },
    y: {
      title: {
        display: true,
        text: "Chatbot data collection count", // Add your descriptive label for the y-axis here
      },
    },
  },
  scale: {
    ticks: {
      precision: 0,
    },
  },
};

export function Chart_page({ data, mapData, country, count }) {
  console.log(mapData);
  const dataDemo = [
    { country: "CA", count: 78, id: "124" },
    { country: "NG", count: 305, id: "566" },
    { country: "US", count: 1005, id: "840" },
    { country: "MX", count: 25, id: "484" },
    { country: "CM", count: 200, id: "120" },
  ];
  const colorScale = d3
    .scaleThreshold()
    .domain([0, 16, 51, 501])
    .range(d3.range(0, 1.1, 0.25).map(d3.interpolateBlues));

  return (
    <div className="w-[90%] flex flex-col overflow-hidden">
      <Line options={options} data={data} />
      <div className="w-full h-full p-4 flex flex-row items-start gap-4">
        <ChoroplethMap data={dataDemo} />
        <div className="flex flex-col w-[20%] mt-[10px] items-start">
          <table class="min-w-full  rounded-t-[15px] shadow-lg overflow-scroll  lg:divide-y lg:divide-gray-200">
            <thead class="hidden  bg-[#F6F9FF] lg:table-header-group">
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-[#1261AC] whitespace-normal">
                  Country
                </td>
                <td class="px-6 py-4 text-sm font-medium text-[#1261AC] whitespace-normal">
                  Chats
                </td>
              </tr>
            </thead>

            <tbody class="divide-y  justify-start overflow-y-scroll h-[400px] divide-gray-200">
              <tr>
                <td class="hidden px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                  {country.map((country, i) => (
                    <p key={i}>{country}</p>
                  ))}
                </td>
                <td class="hidden px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
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
