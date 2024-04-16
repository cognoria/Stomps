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
import { Line } from "react-chartjs-2";
import Map2 from "../map/map2";

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
  scale: {
    ticks: {
      precision: 0,
    },
  },
};

export function Chart_page({ data, count, country }) {
  console.log(data);
  return (
    <div className="w-[90%] flex flex-col overflow-hidden">
      <Line options={options} data={data} />
      <Map2 count={count} country={country} />
    </div>
  );
}
