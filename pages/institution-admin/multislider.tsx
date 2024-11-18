"use client";
import { useState } from "react";
import JoinRequestPage from "./JoinRequestPage";
import RegisterPage from "./RegisterPage";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  
  // State to hold data from both steps
  const [institutionData, setInstitutionData] = useState({
    name: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    photo: null,
    type: "",
    description: "",
    date: "",
  });
  const [adminData, setAdminData] = useState({
    adminUsername: "",
    adminPassword: "",
    adminEmail: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInstitutionSubmit = (data: any) => {
    setInstitutionData(data);
    nextStep();
  };

  const handleAdminSubmit = async (data: any) => {
    setAdminData(data);
    const payload = { ...institutionData, ...data };

    try {
      const response = await fetch("/api/institutions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log("Institution created successfully:", result);
        // Optionally redirect or show success message here
      } else {
        const error = await response.json();
        console.error("Error:", error.message);
      }
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#E5E5CB] flex items-center justify-center p-4 overflow-hidden">
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
          step === 1 ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <JoinRequestPage onSubmit={handleInstitutionSubmit} />
      </div>
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
          step === 2 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <RegisterPage onSubmit={handleAdminSubmit} onBack={prevStep} />
      </div>
    </div>
  );
}
