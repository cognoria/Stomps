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
import CustomMap from "../map/map";

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
      position: "top",
    },
    title: {
      display: true,
      text: "Chat Analytics Data",
    },
  },
};

export function Chart_page({ data }) {
  console.log(data);
  return (
    <div className="w-[90%] flex flex-col overflow-hidden">
      <Line options={options} data={data} />
      <CustomMap />
    </div>
  );
}
