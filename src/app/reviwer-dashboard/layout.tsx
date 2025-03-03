"use client";

import React, { useState, ReactNode } from "react";
import { FiHome, FiSettings, FiMessageSquare, FiUser, FiStar, FiSearch, FiUpload, FiCheckSquare, FiVideo, FiBook, FiArchive, FiBox, FiServer, FiBarChart, FiFileText } from "react-icons/fi";
import LogoNavBar from "../../../components/LogoNavBar";
import Sidebar from "../../../components/Sidebar";


// Define the main menu structure
const menuItems = [
  { path: "/reviwer-dashboard/overview", icon: <FiHome />, label: "Overview" },
  { path: "/reviwer-dashboard/resercher-list", label: " content-Request", icon: <FiUpload /> },
  {
    path: null,
    icon: <FiUser />,
    label: "Contents",
    hasSubMenu: true,
    subMenu: [
      { path: "/reviwer-dashboard/content-list/video", label: "Videos", icon: <FiVideo /> },
      { path: "/reviwer-dashboard/content-list/artifacts", label: "Artifacts", icon: <FiArchive /> },
      { path: "/reviwer-dashboard/content-list/music", label: "Music", icon: <FiBox /> },
      { path: "/reviwer-dashboard/content-list/book", label: "Books", icon: <FiBook /> },
    ],
  },
  {
    path: null,
    icon: <FiSettings />,
    label: "Settings",
    hasSubMenu: true,
    subMenu: [
      { path: "/reviwer-dashboard/settings/platform", label: "Platform Setting", icon: <FiSettings /> },
      { path: "/reviwer-dashboard/settings/account", label: "Account Setting", icon: <FiUser /> },
      { path: "/reviwer-dashboard/settings/api-integration", label: "API/Integration Setting", icon: <FiServer /> },
    ],
  },

 
    
    
  
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // Track active submenu
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true); // Sidebar expansion state

  // Handle submenu toggling
  const toggleSubMenu = (label: string | null) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="w-full mb-12">
        <LogoNavBar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar (Fixed and Full Height) */}
        <div
          className={`fixed left-0 top-12 h-screen ${
            isSidebarExpanded ? "w-64" : "w-20"
          } transition-all custom-scrollbar`}
        >
          <div className="h-full overflow-y-auto">
            <Sidebar
              menuItems={menuItems}
              activeSubMenu={activeSubMenu}
              onSubMenuToggle={toggleSubMenu}
              isExpanded={isSidebarExpanded}
              onToggleSidebar={toggleSidebar}
              onLogoutClick={() => { /* handle logout */ }}
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

export default DashboardLayout;