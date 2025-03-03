"use client";

import React, { useState, ReactNode } from "react";
import {
  FiHome,
  FiFilm,
  FiMusic,
  FiBook, 
  FiCamera,
  FiEdit,
  FiSettings,
} from "react-icons/fi";
import LogoNavBar from "../../../components/LogoNavBar";
import Sidebar from "../../../components/Sidebar";

// Define the uploader menu structure
const uploaderMenuItems = [
  { path: "/uploader-dashboard/overview", icon: <FiHome />, label: "Overview" },
  { path: "/uploader-dashboard/notifications", icon: <FiEdit />, label: "Notifications" },
  { path: "/uploader-dashboard/videos", icon: <FiFilm />, label: "Videos" },
  { path: "/uploader-dashboard/musics", icon: <FiMusic />, label: "Musics" },
  { path: "/uploader-dashboard/books", icon: <FiBook />, label: "Books" },
  { path: "/uploader-dashboard/photos", icon: <FiCamera />, label: "Photos" },
  { path: "/uploader-dashboard/articles", icon: <FiEdit />, label: "Articles" },
  { path: "/uploader-dashboard/analytics", icon: <FiEdit />, label: "Analytics" },
  { path: "/uploader-dashboard/account-setting", icon: <FiSettings />, label: "Account Setting" },
];

const UploaderDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);

  const toggleSubMenu = (label: string | null) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="h-screen flex flex-col ">
      {/* Top Navbar */}
      <div className="w-full mb-12">
        <LogoNavBar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-12 h-screen ${
            isSidebarExpanded ? "w-64" : "w-20"
          } transition-all custom-scrollbar`}
        >
          <div className="h-full overflow-y-auto">
            <Sidebar
              menuItems={uploaderMenuItems}
              activeSubMenu={activeSubMenu}
              onSubMenuToggle={toggleSubMenu}
              isExpanded={isSidebarExpanded}
              onToggleSidebar={toggleSidebar}
            />
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 ${
            isSidebarExpanded ? "ml-64" : "ml-20"
          } transition-all bg-[#f7f4f0] p-6 overflow-y-auto`}
          
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default UploaderDashboardLayout;