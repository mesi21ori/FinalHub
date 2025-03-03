

import React, { useState } from "react";
import InputField from "./InputField"; // Assuming InputField is in the same directory
import { PlusIcon, XIcon } from "lucide-react";

interface DynamicFieldsProps {
  fieldLabel: string; // Label for the fields (e.g., "Cast", "Actor", etc.)
  placeholder?: string; // Placeholder for the input fields
  onChange: (values: string[]) => void; // Callback to get the updated list of values
  error?: string; // Optional error message for validation feedback
  required?: boolean; // Optional required flag for the fields
}

const DynamicFields: React.FC<DynamicFieldsProps> = ({
  fieldLabel,
  placeholder = "Enter value",
  onChange,
  error,
  required = false,
}) => {
  const [fields, setFields] = useState<string[]>([]); // Store all the typed values
  const [currentValue, setCurrentValue] = useState<string>("");

  const handleFieldChange = (value: string) => {
    setCurrentValue(value);
  };

  const addNewField = () => {
    if (currentValue.trim()) {
      const updatedFields = [...fields, currentValue]; // Add the current value to the list
      setFields(updatedFields); // Update the list of entered fields
      setCurrentValue(""); // Reset the current input field
      onChange(updatedFields); // Notify parent of the updated values
    }
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index); // Remove field by index
    setFields(updatedFields); // Update the state
    onChange(updatedFields); // Notify parent of the updated values
  };

  return (
    <div>
      {/* Input Field and Plus Button */}
      <div className="flex items-center gap-2 ">
        <InputField
          id={fieldLabel}
          type="text"
          value={currentValue}
          onChange={handleFieldChange}
          placeholder={placeholder}
          label={""}
          className="flex-grow" // Allow the input to take up available space
        />
        <button
          type="button"
          onClick={addNewField}
          className="bg-[#3C2A21] text-white h-6 w-6 rounded-full hover:bg-[#D5CEA3] transition flex items-center justify-center"
          aria-label="Add field"
        >
          <PlusIcon className="h-3 w-3" />
        </button>
      </div>

      {/* Display added fields with delete (X) button */}
      <div>
        {fields.length > 0 && (
          <div className="flex flex-wrap gap-2 ">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex items-center bg-[#E5E5CB] px-3 py-1 rounded-lg"
              >
                <span className="mr-2">{field}</span>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="text-red-600 hover:text-red-200 transition"
                  aria-label="Remove field"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default DynamicFields;