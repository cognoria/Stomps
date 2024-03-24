import { useState } from "react";

function Toggle() {
  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
  };

  return (
    <div
      className={`relative rounded-full w-12 h-6 transition-colors duration-300 ${
        checked ? "bg-blue-500" : "bg-gray-100"
      }`}
      onClick={toggle}
    >
      <div
        className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
          checked ? "translate-x-full" : ""
        }`}
      ></div>
    </div>
  );
}

export default Toggle;
