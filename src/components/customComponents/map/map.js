import * as d3 from "d3";
import * as countryData from "i18n-iso-countries";
import { useEffect, useRef, useState } from "react";
import * as topojson from "topojson-client";

const ChoroplethMap = ({ data }) => {
  const svgRef = useRef(null);
  const [countryCode, setCountryCode] = useState("");
  useEffect(() => {
    if (!data || data.length === 0) return;
    countryData.registerLocale(require("i18n-iso-countries/langs/en.json"));

    const svg = d3.select(svgRef.current);
    // console.log(data)
    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(data, (d) => d.count)]);

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
              function convertCountryToIsoNumeric(country) {
                // console.log({ country });
                // Handle case-insensitivity
                // country = country.toLowerCase();

                // Check for numeric code (ISO 3166-1 numeric)
                if (!isNaN(country) && country.length === 3) {
                  return country;
                }

                if (country.length > 2)
                  country = countryData.getAlpha2Code(country, "en");

                // Try converting by country name (ISO 3166-1 alpha-2)
                const isoNumericCode = countryData.alpha2ToNumeric(country);

                if (isoNumericCode) {
                  // console.log({ isoNumericCode });
                  return isoNumericCode;
                }

                // If no match found, throw an error
                throw new Error(`Invalid country name/code: ${country}`);
              }
              const cId = convertCountryToIsoNumeric(item.country);

              return cId === d.id;
            });
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

  function convertCountryToIsoNumeric(country) {
    // Handle case-insensitivity
    country = country.toUpperCase();

    // Check for numeric code (ISO 3166-1 numeric)
    if (!isNaN(country) && country.length === 3) {
      return country;
    }

    // Try converting by country name (ISO 3166-1 alpha-2)
    const isoNumericCode = countryData.alpha2ToNumeric(country);
    if (isoNumericCode) {
      return isoNumericCode;
    }

    // If no match found, throw an error
    throw new Error(`Invalid country name/code: ${country}`);
  }

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
