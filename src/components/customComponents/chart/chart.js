// pages/index.js
import React, { useState, useEffect } from "react";
import Chart from "react-chartjs-2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Chart_page() {
  const [chartData, setChartData] = useState({});
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    // Fetch your data here
    // Replace this with your actual data fetching logic
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
    <div>
      <Chart data={chartData} />
      <div id="map" style={{ height: "400px" }} />
    </div>
  );
}

export default Chart_page;
