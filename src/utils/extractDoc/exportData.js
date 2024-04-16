export function exportToCSV(data, fileName) {
  // Extract headers from the first object in data
  const headers = Object.keys(data[0]);

  // Convert data to CSV format
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(",")]
      .concat(
        data.map((row) =>
          headers
            .map((header) => {
              if (Array.isArray(row[header])) {
                // Convert array to string
                return JSON.stringify(row[header]);
              } else if (
                typeof row[header] === "object" &&
                row[header] !== null
              ) {
                // Convert object to string
                return JSON.stringify(row[header]);
              } else {
                // Use value as is
                return row[header];
              }
            })
            .join(",")
        )
      )
      .join("\n");

  // Create a virtual link and trigger a download
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName + ".csv");
  document.body.appendChild(link); // Required for Firefox
  link.click();
}

export function exportToJSON(data, fileName) {
  // Convert data to JSON format
  const jsonContent = JSON.stringify(data, null, 2);

  // Create a virtual link and trigger a download
  const encodedUri = encodeURI("data:text/json;charset=utf-8," + jsonContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName + ".json");
  document.body.appendChild(link); // Required for Firefox
  link.click();
}
