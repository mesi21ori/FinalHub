"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaBell, FaList, FaBuilding, FaClipboardList, FaComment, FaStar } from "react-icons/fa"; 
import { usePathname } from "next/navigation";  
import ConfirmationNotification from "./ConfirmationNotification";

interface LayoutProps {
  children: React.ReactNode;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

const menuItems = [
  { path: "", icon: <FaUser />, label: "Profile" },
  { path: "/reviewer/dashboard", icon: <FaBell />, label: "NewRsearcher" },
  { path: "#", icon: <FaList />, label: "List of Rsearcher " },

];

const Layout: React.FC<LayoutProps> = ({ children, isEditMode, setIsEditMode }) => {
  const pathname = usePathname();
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(pathname);

  const isActive = (path: string) => selectedMenu === path;

  const handleDeleteConfirm = () => {
    console.log("Item deleted!");
    setConfirmationVisible(false);
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    if (menu === "edit") setIsEditMode(true);
    if (menu === "delete") setConfirmationVisible(true);
    if (menu === "/view-account") setIsEditMode(false); // Set edit mode to false for view account
  };

  return (
    <div className="flex flex-col h-screen bg-[#E5E5CB]">
      <header className="w-full bg-[#3C2A21] text-[#E5E5CB] p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Logo</h1>
          <Link href="/" className="text-[#E5E5CB]">
            Back to Menu
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-60 bg-[#3C2A21] text-[#E5E5CB] p-4 mt-0.5 h-full">
          <ul>
            {menuItems.map(({ path, icon, label }) => (
              <li
                key={path}
                className={`py-2 flex items-center ${
                  isActive(path) ? "text-white font-bold bg-[#4B3B31]" : "text-[#E5E5CB]"
                }`}
              >
                {icon}
                <Link href={path} onClick={() => handleMenuClick(path)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>

      <ConfirmationNotification
        visible={isConfirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Layout;