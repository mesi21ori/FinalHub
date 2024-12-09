"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaBell, FaList, FaBuilding } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ConfirmationNotification from "./ConfirmationNotification";

interface LayoutProps {
  children: React.ReactNode;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

const menuItems = [
  { path: "/institution/profile", icon: <FaUser />, label: "Profile" },
  { path: "/institution/addstaff", icon: <FaBell />, label: "Add Staff" },
  { path: "/institution/stafflist", icon: <FaList />, label: "List of Staff" },
  { path: "/institution/list", icon: <FaBuilding />, label: "List of Content" },
];

const Layout: React.FC<LayoutProps> = ({ children, isEditMode, setIsEditMode }) => {
  const pathname = usePathname(); // Dynamically fetch current route
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const isActive = (path: string) => pathname === path; // Check active route dynamically

  const handleDeleteConfirm = () => {
    console.log("Item deleted!");
    setConfirmationVisible(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#E5E5CB]">
      {/* Header */}
      <header className="w-full bg-[#3C2A21] text-[#E5E5CB] p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Logo</h1>
          <Link href="/" className="text-[#E5E5CB]">
            Back to Menu
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-60 bg-[#3C2A21] text-[#E5E5CB] p-4 mt-0.5 h-full">
          <ul>
            {menuItems.map(({ path, icon, label }) => (
              <li
                key={path}
                className={`py-2 flex items-center ${
                  isActive(path) ? "text-white font-bold bg-[#4B3B31]" : "text-[#E5E5CB]"
                }`}
              >
                <Link href={path} className="flex items-center gap-2">
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>

      {/* Confirmation Notification */}
      <ConfirmationNotification
        visible={isConfirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Layout;
