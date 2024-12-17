import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";


interface InputFieldProps {
  id: string;
  name?: string; // Optional name prop
  type: string; // Either "text", "password", or "textarea"
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>; // Optional onBlur
  placeholder?: string;
  error?: string;
  className?: string; // Custom class name for styling
  readOnly?: boolean; // Whether the field is read-only
  required?: boolean; // Optional required prop to determine if field is required
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  className,
  readOnly = false,
  required = false, // Default to false if not provided
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Determine the input type based on visibility toggle for password
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  // Handle value change only if not read-only
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!readOnly) {
      onChange(e.target.value); // Update only if not read-only
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="block text-[#3e251c] font-medium">
        {label}
        {required && <span className="text-red-700 text-2xl ml-1">*</span>} {/* Add the * if required */}
      </label>
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`mt-1 block w-full max-w-xl p-2 bg-transparent border rounded-md text-[#3C2A21] focus:outline-none focus:ring focus:ring-[#3C2A21] ${
              error ? "border-red-600" : "border-[#3C2A21]"
            } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={inputType}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`mt-1 block w-full max-w-xl p-2 bg-transparent border rounded-md text-[#3C2A21] focus:outline-none focus:ring focus:ring-[#3C2A21] ${
              error ? "border-red-600" : "border-[#3C2A21]"
            } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
          />
        )}
        {/* Password visibility toggle for password fields */}
        {type === "password" && !readOnly && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-[#3C2A21] opacity-75"
          >
            {isPasswordVisible ? (
              <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {/* Show error message if any */}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;