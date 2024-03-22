// pages/index.js
import { useEffect, useState } from "react";
import Map from "../map/map";

function Chart_page() {
  const [chartData, setChartData] = useState({});
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/chat-data")
      .then((res) => res.json())
      .then((data) => {
        const chartLabels = Object.keys(data);
        const chartValues = Object.values(data);
        const chartDataset = {
          label: "Chat Activity",
          data: chartValues,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        };
        const chartConfig = {
          type: "bar",
          data: {
            labels: chartLabels,
            datasets: [chartDataset],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
        setChartData(chartConfig);

        // Process map data (adjust according to your data structure)
        const mapMarkers = data.map(({ country, value }) => ({
          lat: getLocationData(country).latitude,
          lng: getLocationData(country).longitude,
          value,
        }));
        setMapData(mapMarkers);
      });
  }, []);

  return (
    <div className="flex flex-col w-full items-center overflow-hidden">
      {/* <Chart data={chartData} /> */}
      <Map markers={mapData} />
    </div>
  );
}

export default Chart_page;




const dummy_chart = [
    
]