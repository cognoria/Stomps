export function RoundedSubmitButton({
  button_content,
  color,
  text_color,
  radius,
  width,
  text_size,
  border,
  border_color,
  loading,
}) {
  // console.log("Loading state in button:", loading);
  return (
    <div
      className={`${color ? color : "bg-[#74B4F1]"}    ${
        width ? width : "w-full "
      } ${text_color} px-2 py-2 ${radius} flex flex-col item-center justify-center ${
        border ? border : ""
      } ${border_color ? border_color : ""} ${
        loading ? "bg-[#1261AC]/30" : ""
      }`}
    >
      <button
        disabled={loading}
        type="submit"
        className={`${text_size ? text_size : ""}`}
      >
        {button_content}
      </button>
    </div>
  );
}

export function SquareSubmitButton({
  button_content,
  loading,
  color,
  text_color,
}) {
  // console.log("Loading state in button:", loading);
  return (
    <div
      className={`${color} ${text_color} px-2 py-2 rounded-sm  ${
        loading ? "bg-[#1261AC]/30" : ""
      }
      }`}
    >
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : button_content}
      </button>
    </div>
  );
}
