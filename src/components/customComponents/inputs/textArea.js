import { useState } from "react";

function AutoResizeTextarea({ placeholder, className, onTextareaChange }) {
  const [textareaHeight, setTextareaHeight] = useState("20px"); // Starting height

  const handleChange = (event) => {
    const textareaLineHeight = 24; // Adjust this value based on your textarea font-size and line-height
    const minRows = 1;
    const maxRows = 5; // Adjust this value based on your requirement
    const previousRows = event.target.rows;
    event.target.rows = minRows; // Reset rows to minimum to calculate new height
    const currentRows = Math.ceil(
      (event.target.scrollHeight - textareaLineHeight) / textareaLineHeight
    );
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }
    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.style.overflowY = "auto";
      setTextareaHeight("150px");
    } else {
      event.target.rows = currentRows;
      event.target.style.overflowY = "hidden";
      setTextareaHeight(`${Math.min(currentRows * textareaLineHeight, 100)}px`);
    }
    onTextareaChange(event.target.value); // Pass textarea value to parent component
  };

  return (
    <textarea
      placeholder={placeholder}
      className={` ${className}`}
      style={{ height: textareaHeight }}
      onChange={handleChange}
    />
  );
}

export default AutoResizeTextarea;
