import Plotly from "plotly.js-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

function Map2({ country, count }) {
  const locations = country;
  const z = count;
  const text = country;

  return (
    <div className="w-full items-start  flex flex-row gap-4">
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
            showscale: false,
           
          },
        ]}
        config={{
          showLink: false,
          displayModeBar: false,
        }}
      />
      <div className="flex flex-col mt-[90px]">
        <table class="min-w-full h-[40px] rounded-t-[15px] shadow-lg overflow-scroll  lg:divide-y lg:divide-gray-200">
          <thead class="hidden  bg-[#F6F9FF] lg:table-header-group">
            <tr>
              <td class="px-6 py-4 text-sm font-medium text-[#1261AC] whitespace-normal">
                Country
              </td>
              <td class="px-6 py-4 text-sm font-medium text-[#1261AC] whitespace-normal">
                Chats
              </td>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="hidden px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                {country.map((country, i) => (
                  <p key={i}>{country}</p>
                ))}
              </td>
              <td class="hidden px-6 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                {count.map((count, i) => (
                  <p key={i}>{count}</p>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Map2;
