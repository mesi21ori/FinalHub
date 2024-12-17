import React, { useState } from "react";
import InputField from "./InputField"; // Assuming InputField is in the same directory
import { MinusIcon, PlusIcon } from "lucide-react";

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
  const [fields, setFields] = useState<string[]>([""]);

  const handleFieldChange = (value: string, index: number) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
    onChange(updatedFields);
  };

  const addNewField = () => {
    setFields([...fields, ""]);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    onChange(updatedFields);
  };

  return (
    <div>
      {fields.map((fieldValue, index) => (
        <div key={index} className="flex flex-col mb-4">
          <label htmlFor={`${fieldLabel}-${index}`} className="flex items-center">
            {fieldLabel} {index + 1}
            {required && <span className="text-red-700 text-2xl ml-1">*</span>} {/* Asterisk */}
          </label>

          <InputField
            id={`${fieldLabel}-${index}`}
            type="text"
            value={fieldValue}
            onChange={(value) => handleFieldChange(value, index)}
            placeholder={placeholder}
            label={""}
          />

          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => removeField(index)}
              className="flex items-center justify-center p-1 rounded-full transition hover:bg-[#D5CEA3]"
              aria-label="Remove field"
              style={{
                color: "#3a2f2c",
              }}
            >
              <MinusIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="button"
        onClick={addNewField}
        className="flex items-center space-x-2 text-[#3C2A21] text-sm opacity-50 hover:text-[#3C2A21] transition"
      >
        <PlusIcon className="h-5 w-5" />
        <span>Add {fieldLabel}</span>
      </button>
    </div>
  );
};

export default DynamicFields; // Export the component as default
