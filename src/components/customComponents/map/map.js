import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidHJhdmVyc3kiLCJhIjoiY2w3czRoYnJmMGFqazN3cXJnY3l6MDdnNCJ9.oLZjDcfoAWLkKPpzrO_U3A",
});

function CustomMap() {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Map>
  );
}

export default CustomMap;
