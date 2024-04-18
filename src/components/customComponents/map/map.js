import * as d3 from "d3";
import { useEffect, useRef } from "react";
import * as topojson from "topojson-client";

const ChoroplethMap = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Set the viewBox attribute to scale the content
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      // Load the world map data
      d3.json("https://d3js.org/world-110m.v1.json").then((world) => {
        // Create a GeoJSON feature collection from the world map data
        const countries = topojson.feature(world, world.objects.countries);

        // Create a projection to fit the map to the SVG container
        const projection = d3.geoMercator().fitSize([width, height], countries);

        // Create the path generator using the projection
        const path = d3.geoPath().projection(projection);

        // Remove any existing map elements
        svg.selectAll(".countries").remove();

        // Create the choropleth map
        svg
          .append("g")
          .attr("class", "countries")
          .selectAll("path")
          .data(countries.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("fill", (d) => {
            const country = data.find((item) => {
              // console.log({ dataSet: item.id, mapSet: d.id });
              return item.id === d.id;
            });
            // console.log(country);
            return country ? getColor(country.count) : "#ccc";
          });
      });
    };

    // Update dimensions initially and on window resize
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [data]);

  const getColor = (count) => {
    if (count >= 0 && count <= 50) {
      // Light blue to dark blue
      return d3.interpolateBlues(count / 50);
    } else if (count >= 51 && count <= 100) {
      // Light blue to dark blue
      return d3.interpolateBlues(count / 100);
    } else if (count >= 101 && count <= 200) {
      // Light blue to dark blue
      return d3.interpolateBlues(count / 200);
    } else {
      // Dark blue for counts above 200
      return d3.interpolateBlues(1);
    }
  };

  return <svg ref={svgRef} />;
};

export default ChoroplethMap;
