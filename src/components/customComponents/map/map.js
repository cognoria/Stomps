// components/Map.js
import React, { useEffect, useRef } from "react";
import L from "leaflet";

function Map({ markers }) {
    const mapRef = useRef(null);




    useEffect(() => {
        if (!mapRef.current.leafletElement)
           
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers for each location
    markers?.forEach((marker) => {
      L.marker([marker.lat, marker.lng]).addTo(map);
    });
  }, [markers]);

  return <div ref={mapRef} className="map" />;
}

export default Map;
