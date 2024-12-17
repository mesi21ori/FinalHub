"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "view" | "active" | "inactive" | "border" | "curved"; // Added curved variant
  size?: "sm" | "md" | "lg" | "xs"; // Added xs size for smaller button
  className?: string; // Additional custom classes
  disabled?: boolean; // Disabled state
  type?: "button" | "submit" | "reset"; // Button type
  loading?: boolean; // Loading state to show a spinner
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "view",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  loading = false,
}) => {
  // Base styles applied to all buttons
  const baseStyles = "font-semibold transition-all duration-200";

  // Variant-specific styles
  const variantStyles = {
    view: "bg-[#3C2A21] text-white hover:bg-[#3C2A21]", // Dark brown background with white text
    active: "bg-white text-[#3C2A21] border-2 border-[#A7D7A7]", // Light beige background, green hover
    inactive: "bg-white text-[#3C2A21] border-2 border-[#F2B4B4]", // Light beige background, red hover
    border:
      "border-2 border-[#3C2A21] text-[#3C2A21] hover:bg-[#3C2A21] hover:text-white", // Border-only button
    curved:
      "bg-[#3C2A21] text-white rounded-full hover:bg-[#3C2A21]", // Curved button variant
  } as const;

  // Size-specific styles
  const sizeStyles = {
    xs: "px-2 py-1 text-xs", // Extra small size
    sm: "px-2 py-1 text-sm", // Small size
    md: "px-4 py-2 text-base", // Medium size
    lg: "px-6 py-3 text-lg", // Large size
  } as const;

  const borderRadius = "rounded-lg"; // Default uniform border radius

  // Combine styles using clsx
  const combinedStyles = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    borderRadius,
    className,
    {
      "opacity-50 cursor-not-allowed": disabled || loading, // Disabled state styles or loading state
    },
    "w-full sm:w-auto" // Make the button full width on smaller screens and auto width on larger screens
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled || loading} // Correct combination of disabled and loading states
      aria-disabled={disabled || loading} // Correct combination of aria-disabled for accessibility
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
