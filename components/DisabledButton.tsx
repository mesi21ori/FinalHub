import React, { ReactNode } from "react"; // Import ReactNode

interface DisabledButtonProps {
  isEnabled: boolean;
  onClick: () => void;
  label: ReactNode; // Change from string to ReactNode
}

const DisabledButton: React.FC<DisabledButtonProps> = ({ isEnabled, onClick, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isEnabled}
      className={`w-full py-2 px-4 rounded-md transition-colors ${
        isEnabled
          ? "bg-[#3a2f2c] text-white hover:bg-[#2d1a14]"
          : "bg-[#E5E5CB] text-gray-500 cursor-not-allowed"
      }`}
    >
      {label}
    </button>
  );
};

export default DisabledButton;