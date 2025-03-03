
// import React, { useState, useEffect, useRef } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import InputField from "./InputField"; // Assuming InputField is in the same folder
// import Button from "./Button"; // Import the Button component

// interface CustomDropdownProps {
//   label: string;
//   options: (string | number)[]; // The options for the dropdown
//   selectedOption: string | number;
//   onOptionSelect: (option: string | number) => void;
//   error?: string;
//   required?: boolean;
//   disabled?: boolean; // Add the disabled prop
// }

// const CustomDropdown: React.FC<CustomDropdownProps> = ({
//   label,
//   options,
//   selectedOption,
//   onOptionSelect,
//   error,
//   required = false,
//   disabled = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [highlightedIndex, setHighlightedIndex] = useState(-1);
//   const [otherValue, setOtherValue] = useState(""); // To store the value for "Other" option
//   const [isEditing, setIsEditing] = useState(false); // Track if the user is editing "Other" option
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsOpen(false);
//       }

//       if (event.key === "ArrowDown" && isOpen) {
//         setHighlightedIndex((prevIndex) =>
//           Math.min(prevIndex + 1, options.length - 1)
//         );
//       }

//       if (event.key === "ArrowUp" && isOpen) {
//         setHighlightedIndex((prevIndex) =>
//           Math.max(prevIndex - 1, 0)
//         );
//       }

//       if (event.key === "Enter" && isOpen && highlightedIndex >= 0) {
//         onOptionSelect(options[highlightedIndex]);
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       window.addEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen, highlightedIndex, options, onOptionSelect]);

//   const handleToggleDropdown = () => {
//     if (!disabled) {
//       setIsOpen((prev) => !prev);
//       if (!isOpen) {
//         setHighlightedIndex(-1);
//       }
//     }
//   };

//   const handleSelectOption = (option: string | number) => {
//     if (option === "Others") {
//       setIsEditing(true); // Start editing when "Others" is selected
//       setIsOpen(false); // Close the dropdown immediately
//       onOptionSelect("Others");
//     } else {
//       onOptionSelect(option);
//       setIsOpen(false);
//     }
//   };

//   const handleSave = () => {
//     if (!otherValue.trim()) {
//       // Check if 'Other' value is empty
//       alert("Please enter a value for 'Other' before saving.");
//       return; // Prevent saving if the value is empty
//     }

//     onOptionSelect(otherValue); // Save the custom value
//     setIsEditing(false); // Exit editing mode
//   };

//   const handleCancel = () => {
//     setOtherValue(""); // Reset the custom value
//     setIsEditing(false); // Exit editing mode
//   };

//   return (
//     <div className="flex flex-col mb-4 relative" ref={dropdownRef}>
//       <label className="block text-[#3e251c] mb-1 font-normal">
//         {label}
//         {required && <span className="text-red-700 text-2xl ml-1">*</span>}
//       </label>
// {/* Dropdown Trigger */}
//       <div
//         onClick={handleToggleDropdown}
//         className={`mt-1 block w-full max-w-xl p-2 bg-transparent border rounded-md text-[#3C2A21] cursor-pointer flex justify-between items-center ${
//           error ? "border-red-500" : "border-[#3a2f2c]"
//         } focus:outline-none focus:ring focus:ring-[#3C2A21] ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
//         role="button"
//         aria-expanded={isOpen ? "true" : "false"}
//         aria-haspopup="listbox"
//         aria-controls="dropdown-options"
//         tabIndex={disabled ? -1 : 0}
//       >
//         <span className={selectedOption ? "text-[#3a2f2c]" : "text-gray-500"}>
//           {selectedOption || "Select an option"}
//         </span>
//         <FaChevronDown />
//       </div>

//       {/* Dropdown Menu */}
//       {isOpen && !disabled && !isEditing && (
//         <div
//           id="dropdown-options"
//           className={`absolute top-full mt-2 w-full max-w-xl bg-[#f7f4f0] border border-[#3a2f2c] rounded-md shadow-lg`}
//           style={{ zIndex: 50 }}
//           role="listbox"
//         >
//           <ul className="max-h-60 overflow-y-auto">
//             {options.map((option, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleSelectOption(option)}
//                 className={`cursor-pointer px-4 py-2 ${
//                   selectedOption === option
//                     ? "bg-[#3a2f2c] text-[#f7f4f0]"
//                     : highlightedIndex === index
//                     ? "bg-[#E5E5CB] text-white"
//                     : "text-[#3a2f2c] hover:bg-[#3a2f2c] hover:text-[#f7f4f0]"
//                 }`}
//                 role="option"
//                 aria-selected={selectedOption === option ? "true" : "false"}
//               >
//                 {option}
//               </li>
//             ))}
//             {/* Option for "Others" */}
//             <li
//               onClick={() => handleSelectOption("Others")}
//               className={`cursor-pointer px-4 py-2 text-[#3a2f2c] hover:bg-[#3a2f2c] hover:text-[#f7f4f0]`}
//               role="option"
//             >
//               Others
//             </li>
//           </ul>
//         </div>
//       )}

//       {/* If "Others" is selected, display InputField with Save and Cancel buttons below it */}
//       {isEditing && (
//         <div className="mt-2">
//           <InputField
//             id="other-option"
//             type="text"
//             label="Please specify"
//             value={otherValue}
//             onChange={(value) => setOtherValue(value)}
//             placeholder="Type your own option"
//             disabled={disabled}
//           />
//           <div className="mt-2 flex justify-center space-x-2"> {/* Adjust space-x-2 for closer buttons */}
//             <Button
//               onClick={handleSave}
//               variant="curved"
//               size="sm"
//               disabled={disabled}
//             >
//               Save
//             </Button>
//             <Button
//               onClick={handleCancel}
//               variant="inactive"
//               size="sm"
//               disabled={disabled}
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && <p className="text-red-600 text-sm mt-1 font-normal">{error}</p>}
//     </div>
//   );
// };

// export default CustomDropdown;


import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import InputField from "./InputField"; // Assuming InputField is in the same folder
import Button from "./Button"; // Import the Button component

interface CustomDropdownProps {
  label: string;
  options: (string | number)[]; // The options for the dropdown
  selectedOption: string | number;
  onOptionSelect: (option: string | number) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean; // Add the disabled prop
  className?: string; // Add className as an optional prop
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selectedOption,
  onOptionSelect,
  error,
  required = false,
  disabled = false,
  className = "", // Default to an empty string if no className is provided
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [otherValue, setOtherValue] = useState(""); // To store the value for "Other" option
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing "Other" option
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowDown" && isOpen) {
        setHighlightedIndex((prevIndex) =>
          Math.min(prevIndex + 1, options.length - 1)
        );
      }

      if (event.key === "ArrowUp" && isOpen) {
        setHighlightedIndex((prevIndex) =>
          Math.max(prevIndex - 1, 0)
        );
      }

      if (event.key === "Enter" && isOpen && highlightedIndex >= 0) {
        onOptionSelect(options[highlightedIndex]);
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, highlightedIndex, options, onOptionSelect]);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setHighlightedIndex(-1);
      }
    }
  };

  const handleSelectOption = (option: string | number) => {
    if (option === "Others") {
      setIsEditing(true); // Start editing when "Others" is selected
      setIsOpen(false); // Close the dropdown immediately
      onOptionSelect("Others");
    } else {
      onOptionSelect(option);
      setIsOpen(false);
    }
  };

  const handleSave = () => {
    if (!otherValue.trim()) {
      // Check if 'Other' value is empty
      alert("Please enter a value for 'Other' before saving.");
      return; // Prevent saving if the value is empty
    }

    onOptionSelect(otherValue); // Save the custom value
    setIsEditing(false); // Exit editing mode
  };

  const handleCancel = () => {
    setOtherValue(""); // Reset the custom value
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className={`flex flex-col mb-4 relative ${className}`} ref={dropdownRef}>
      <label className="block text-[#3e251c] mb-1 font-normal">
        {label}
        {required && <span className="text-red-700 text-2xl ml-1">*</span>}
      </label>
{/* Dropdown Trigger */}
      <div
        onClick={handleToggleDropdown}
        className={`mt-1 block w-full max-w-xl p-2 bg-transparent border rounded-md text-[#3C2A21] cursor-pointer flex justify-between items-center ${
          error ? "border-red-500" : "border-[#3a2f2c]"
        } focus:outline-none focus:ring focus:ring-[#3C2A21] ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
        role="button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="listbox"
        aria-controls="dropdown-options"
        tabIndex={disabled ? -1 : 0}
      >
        <span className={selectedOption ? "text-[#3a2f2c]" : "text-gray-500"}>
          {selectedOption || "Select an option"}
        </span>
        <FaChevronDown />
      </div>

      {/* Dropdown Menu */}
      {isOpen && !disabled && !isEditing && (
        <div
          id="dropdown-options"
          className={`absolute top-full mt-2 w-full max-w-xl bg-[#f7f4f0] border border-[#3a2f2c] rounded-md shadow-lg`}
          style={{ zIndex: 10 }}
          role="listbox"
        >
          <ul className="max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)}
                className={`cursor-pointer px-4 py-2 ${
                  selectedOption === option
                    ? "bg-[#3a2f2c] text-[#f7f4f0]"
                    : highlightedIndex === index
                    ? "bg-[#E5E5CB] text-white"
                    : "text-[#3a2f2c] hover:bg-[#3a2f2c] hover:text-[#f7f4f0]"
                }`}
                role="option"
                aria-selected={selectedOption === option ? "true" : "false"}
              >
                {option}
              </li>
            ))}
            {/* Option for "Others" */}
            <li
              onClick={() => handleSelectOption("Others")}
              className={`cursor-pointer px-4 py-2 text-[#3a2f2c] hover:bg-[#3a2f2c] hover:text-[#f7f4f0]`}
              role="option"
            >
              Others
            </li>
          </ul>
        </div>
      )}

      {/* If "Others" is selected, display InputField with Save and Cancel buttons below it */}
      {isEditing && (
        <div className="mt-2">
          <InputField
            id="other-option"
            type="text"
            label="Please specify"
            value={otherValue}
            onChange={(value) => setOtherValue(value)}
            placeholder="Type your own option"
            disabled={disabled}
          />
          <div className="mt-2 flex justify-center space-x-2"> {/* Adjust space-x-2 for closer buttons */}
            <Button
              onClick={handleSave}
              variant="curved"
              size="sm"
              disabled={disabled}
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="inactive"
              size="sm"
              disabled={disabled}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-1 font-normal">{error}</p>}
    </div>
  );
};

export default CustomDropdown;