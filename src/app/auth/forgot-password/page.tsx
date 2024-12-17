"use client";

import Link from "next/link";
import { useState } from "react";
import DisabledButton from "../../../../components/DisabledButton";
import InputField from "../../../../components/InputField";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  // Update the button's disabled state based on the email input
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsDisabled(value === ""); // Disable button if email is empty
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here, like making an API call to reset the password
    alert("Password reset instructions have been sent to your email.");
  };

  return (
    <div className="min-h-screen bg-[#E5E5CB] flex flex-col items-center justify-center pt-20"> {/* Added padding for navbar */}
      {/* Main Box for Forgot Password */}
      <div className="w-full max-w-md p-8 bg-[#E5E5CB] rounded-lg shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3e251c]">Forgot Password</h1>
          {/* Adjusted the font weight to font-normal for less boldness */}
          <p className="text-[#3e251c] font-thin ">
            Enter your email to reset your password.
          </p>
        </header>

        <form className="space-y-2" onSubmit={handleSubmit}>
          {/* Using InputField component for email */}
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange} // Passing the email change handler
          />

          {/* Conditionally render the button */}
          {isDisabled ? (
            <DisabledButton 
              isEnabled={false} 
              onClick={() => {}} 
              label="Reset Password"
            />
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#3e251c] text-white rounded-md hover:bg-[#2d1a14] transition-colors mt-2"
            >
              Reset Password
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-[#3e251c]">
          Remembered your password?{" "}
          <Link href="/auth/sign-in" className="hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}