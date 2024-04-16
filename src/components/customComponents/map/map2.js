import Plotly from "plotly.js-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

function Map2({ country, count }) {
  // Generate dummy data
  const locations = country ? country : ["USA", "CAN", "MEX", "NGN"];
  const z = count; // GDP in billions
  const text = country
    ? country
    : ["United States", "Canada", "Mexico", "Nigeria"];
  console.log({ count, country });
  return (
    <Plot
      data={[
        {
          type: "choropleth",
          locations,
          z,
          text,
          colorscale: [
            [0, "rgb(5, 10, 172)"],
            [0.35, "rgb(40, 60, 190)"],
            [0.5, "rgb(70, 100, 245)"],
            [0.6, "rgb(90, 120, 245)"],
            [0.7, "rgb(106, 137, 247)"],
            [1, "rgb(220, 220, 220)"],
          ],
          marker: {
            line: {
              color: "rgb(180,180,180)",
              width: 1,
            },
          },

          colorbar: {
            autotic: false,
            // tickprefix: "",
            title: "Key",
          },
        },
      ]}
      config={{
        showLink: false,
        displayModeBar: false,
      }}
    />
  );
}

export default Map2;
