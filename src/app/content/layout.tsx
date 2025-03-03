"use client";

import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f7f4f0] w-full flex flex-col">
      {/* Ensure full width and vertical stacking */}
      <main className="flex-1 w-full px-0 sm:px-0 lg:px-0 mt-8">
        {/* Remove side padding to ensure full width */}
        {children}
      </main>
    </div>
  );
};

export default Layout;