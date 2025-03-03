"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEdit, FaArrowUp, FaTrash } from "react-icons/fa";
import { usePathname } from "next/navigation";  
import { useRouter } from 'next/router'; // Import useRouter
import ConfirmationNotification from "./ConfirmationNotification";
import '../src/app/globals.css'; 
import axios from 'axios';

interface LayoutProps {
  children: React.ReactNode;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isEditMode, setIsEditMode }) => {
  const pathname = usePathname();
  const router = useRouter(); // Initialize the router
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(pathname);

  const isActive = (path: string) => selectedMenu === path;

  const handleDeleteConfirm = async () => {
    setConfirmationVisible(false); 

    const userId = localStorage.getItem('userId'); 

    if (userId) {
      try {
        const response = await axios.delete(`/api/users/delete`, {
          data: { id: userId }, 
        });

        if (response.status === 200) {
          console.log("User deleted successfully!");
          router.push('/'); 
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    if (menu === "edit") setIsEditMode(true);
    if (menu === "delete") setConfirmationVisible(true);
    if (menu === "/view-account") setIsEditMode(false); 
  };

  return (
    <div className="flex flex-col h-screen bg-[#E5E5CB]">
      <header className="w-full bg-[#3C2A21] text-[#E5E5CB] p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Logo</h1>
          <Link href="/" className="text-[#E5E5CB]">
            Back to Home
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-60 bg-[#3C2A21] text-[#E5E5CB] p-4 mt-0.5 h-full">
          <ul>
            <li className={`py-2 flex items-center ${isActive("/new") ? "text-white font-bold underline" : "text-[#E5E5CB]"}`}>
              <FaEye className="mr-2" />
              <Link href="/new" onClick={() => handleMenuClick("/new")}>View</Link>
            </li>
            <li className={`py-2 flex items-center ${isActive("edit") ? "text-white font-bold underline" : "text-[#E5E5CB]"}`}>
              <FaEdit className="mr-2" />
              <button onClick={() => handleMenuClick("edit")} className="text-inherit">
                Edit
              </button>
            </li>
            <li className={`py-2 flex items-center ${isActive("/upgrade") ? "text-white font-bold underline" : "text-[#E5E5CB]"}`}>
              <FaArrowUp className="mr-2" />
              <Link href="/upgrade" onClick={() => setSelectedMenu("/upgrade")}>Upgrade</Link>
            </li>
            <li className={`py-2 flex items-center ${isActive("delete") ? "text-white font-bold underline" : "text-[#E5E5CB]"}`}>
              <FaTrash className="mr-2" />
              <button onClick={() => handleMenuClick("delete")} className="text-inherit">
                Delete
              </button>
            </li>
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