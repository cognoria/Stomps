// "use client"

// // components/Map.js
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { useEffect, useRef } from "react";

// function Map({ markers }) {
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {
//     if (!mapInstance.current) {
//       mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapInstance.current);
//     }

//     const map = mapInstance.current;

//     // Clear existing markers
//     map.eachLayer((layer) => {
//       if (layer instanceof L.Marker) {
//         map.removeLayer(layer);
//       }
//     });

//     // Add markers for each location
//     markers?.forEach((marker) => {
//       L.marker([marker.lat, marker.lng]).addTo(map);
//     });

//     return () => {
//       // Clean up the map instance when component unmounts
//       mapInstance.current.remove();
//       mapInstance.current = null; // Reset map instance to null
//     };
//   }, [markers]);

//   return <div ref={mapRef} style={{ height: "400px" }} />;
// }

// export default Map;
