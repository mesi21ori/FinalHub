import React from "react";
import LogoNavBar from "../../../components/LogoNavBar";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#E5E5CB] text-[#D5CEA3] flex flex-col h-screen">
      {/* LogoNavBar as part of the layout */}
      <LogoNavBar />

      <main
        role="main"
        className="flex-grow flex justify-center items-center p-4 overflow-hidden"
      >
        <div className="w-full max-w-5xl p-4 bg-transparent overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;