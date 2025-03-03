// src/app/register/layout.tsx

import React, { ReactNode } from "react";
import LogoNavBar from "../../../components/LogoNavBar";

interface RegisterLayoutProps {
  children: ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#f7f4f0] text-[#D5CEA3] flex flex-col h-screen">
      {/* Navigation Bar */}
      <LogoNavBar />

      {/* Optional: Add any header or navigation specific to this section */}
      

      {/* Main content area */}
      <main className="flex-grow p-4 overflow-y-auto mt-4">{children}</main> {/* Added mt-4 to separate content from header */}
    </div>
  );
};

export default RegisterLayout;