"use client";

import React from "react";
import Link from "next/link";

interface TermsAgreementProps {
  isChecked: boolean;
  onToggle: () => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ isChecked, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="checkbox"
        id="terms"
        checked={isChecked}
        onChange={onToggle}
        className="hidden" // Hiding the default checkbox input
      />
      <label
        htmlFor="terms"
        className={`flex items-center justify-center w-5 h-5 border-2 rounded-sm ${
          isChecked ? "border-[#3C2A21] bg-white" : "border-[#3C2A21] bg-transparent"
        }`}
      >
        <span
          className={`text-[#3C2A21] ${isChecked ? "block" : "hidden"} text-center`}
          style={{ fontSize: "12px" }} // Smaller checkmark font size
        >
          ✓
        </span>
      </label>
      <label htmlFor="terms" className="text-[#3e251c]">
        I agree with the{" "}
        <Link
          href="/terms-policy"
          className="text-[#BFA740] hover:underline" // Added font-bold class for bolder text
        >
          terms and policy
        </Link>
      </label>
    </div>
  );
};

export default TermsAgreement;
