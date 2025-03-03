import React from "react";

interface CustomRadioButtonProps {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  required?: boolean; // Optional prop to indicate if the field is required
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  name,
  label,
  value,
  checked,
  onChange,
  required = false, // Default to false if not provided
}) => {
  // Handle the option selection
  const handleSelect = () => {
    onChange(value); // Update the selected value in the parent component
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:opacity-80 focus:outline-none"
      onClick={handleSelect} // Select option on click
      role="radio"
      aria-checked={checked}
      tabIndex={0} // Make it focusable via keyboard
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Space") {
          handleSelect(); // Allow selection via keyboard (Enter/Space)
        }
      }}
    >
      {/* Custom radio button circle */}
      <div
        className={`w-4 h-4 ml-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          checked ? "border-[#3A2F2C] bg-[#3A2F2C]" : "border-[#3A2F2C]"
        }`}
      >
        {/* Inner circle fully filled when selected */}
        {checked && <div className="w-3 h-3 rounded-full bg-[#3A2F2C]" />}
      </div>

      {/* Option label */}
      <span className="text-[#3A2F2C] text-sm mb-2">
        {label}
        {required && <span className="text-red-700 text-2xl ml-1">*</span>} {/* Display asterisk for required */}
      </span>
    </div>
  );
};

export default CustomRadioButton;