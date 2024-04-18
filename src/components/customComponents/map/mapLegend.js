const MapLegend = ({ colorScale }) => {
  const legendEntries = colorScale.domain();

  return (
    <div className="bg-transparent flex flex-col w-full items-start bg-opacity-80 p-4  rounded-md ">
      <h2 className="text-lg font-semibold mb-2">key</h2>
      <div className="flex flex-row gap-0">
        {legendEntries.map((entry, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-8 h-8"
              style={{ backgroundColor: colorScale(entry) }}
            ></div>
            <span>{entry}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
