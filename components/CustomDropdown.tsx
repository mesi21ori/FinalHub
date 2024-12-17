import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

interface CustomDropdownProps {
  label: string;
  options: (string | number)[]; // Supports both string and number options
  selectedOption: string | number; // Supports both string and number selected
  onOptionSelect: (option: string | number) => void; // Handler for selecting an option
  error?: string; // Optional error message
  required?: boolean; // Optional prop to indicate if the field is required
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selectedOption,
  onOptionSelect,
  error,
  required = false, // Default to false if not provided
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown state
  };

  const handleSelectOption = (option: string | number) => {
    onOptionSelect(option); // Call handler to update selected value
    setIsOpen(false); // Close the dropdown when an option is selected
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-[#3e251c] mb-1 font-medium ">
        {label}
        {required && <span className="text-red-700 text-2xl ml-1">*</span>} {/* Display asterisk for required */}
      </label>
      <div
        onClick={handleToggleDropdown}
        className={`mt-1 block w-full p-2 bg-transparent border ${
          error ? "border-red-500" : "border-[#3C2A21]"
        } rounded-md cursor-pointer flex justify-between items-center`}
        role="button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="listbox"
      >
        <span className={selectedOption ? "text-[#3C2A21]" : "text-gray-500"}>
          {selectedOption || "Select an option"}
        </span>
        <FaChevronDown />
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full bg-[#E5E5CB] border border-[#3C2A21] rounded-md shadow-md z-10 custom-scrollbar sticky top-0"
          role="listbox"
        >
          <ul className="max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)}
                className={`cursor-pointer px-4 py-2 ${
                  selectedOption === option
                    ? "text-[#3C2A21]" // Ensure selected option remains #3C2A21
                    : "text-[#3C2A21] hover:bg-[#3C2A21] hover:text-[#E5E5CB]"
                }`}
                role="option"
                aria-selected={selectedOption === option ? "true" : "false"}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>} {/* Display error message if exists */}
    </div>
  );
};

export default CustomDropdown;

