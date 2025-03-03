// "use client";

// import React, { useState, ReactNode } from "react";

// import {
//   FiHome,
//   FiUser,
//   FiMessageSquare,
//   FiCheckSquare,
//   FiUpload,
// } from "react-icons/fi"; // Retaining necessary icons
// import LogoNavBar from "../../../components/LogoNavBar";
// import Sidebar from "../../../components/Sidebar";

// // Define the main menu structure
// const menuItems = [
//   { path: "/dashboard/overview", icon: <FiHome />, label: "Overview" },
//   {
//     path: null,
//     icon: <FiUser />,
//     label: "Staff Management",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/institutional-admin-dashboard/add", label: "Add Staff", icon: <FiUpload /> }, // New route for adding staff
//       { path: "/institutional-admin-dashboard/list", label: "Staff List", icon: <FiCheckSquare /> }, // New route for staff list
//     ],
//   },
//   { path: "/institutional-admin-dashboard/moderate", icon: <FiMessageSquare />, label: "Moderate Comments" },
 
// ];

// const DashboardLayout = ({ children }: { children: ReactNode }) => {
//   const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // Track active submenu
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true); // Sidebar expansion state

//   const toggleSubMenu = (label: string | null) => {
//     setActiveSubMenu(activeSubMenu === label ? null : label);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="w-full mb-12">
//         <LogoNavBar />
//       </div>
//       <div className="flex flex-1">
//         <div
//           className={`fixed left-0 top-12 h-screen ${isSidebarExpanded ? "w-64" : "w-20"
//             } transition-all custom-scrollbar`}
//         >
//           <div className="h-full overflow-y-auto">
//             <Sidebar
//               menuItems={menuItems}
//               activeSubMenu={activeSubMenu}
//               onSubMenuToggle={toggleSubMenu}
//               isExpanded={isSidebarExpanded}
//               onToggleSidebar={toggleSidebar}
//               onLogoutClick={() => { /* handle logout */ }}
//             />
//           </div>
//         </div>
//         <div
//           className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-20"
//             } transition-all bg-[#f7f4f0] p-6 overflow-y-auto`}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


"use client";

import React, { useState, ReactNode } from "react";
import { FiHome, FiUser, FiMessageSquare, FiCheckSquare, FiUpload } from "react-icons/fi"; // Retaining necessary icons
import LogoNavBar from "../../../components/LogoNavBar";
import Sidebar from "../../../components/Sidebar";
import ConfirmationModal from "../../../components/ConfirmationModal"; // Importing the Confirmation Modal
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// Define the main menu structure
const menuItems = [
  { path: "/dashboard/overview", icon: <FiHome />, label: "Overview" },
  {
    path: null,
    icon: <FiUser />,
    label: "Staff Management",
    hasSubMenu: true,
    subMenu: [
      { path: "/institutional-admin-dashboard/add", label: "Add Staff", icon: <FiUpload /> },
      { path: "/institutional-admin-dashboard/list", label: "Staff List", icon: <FiCheckSquare /> },
    ],
  },
  { path: "/institutional-admin-dashboard/moderate", icon: <FiMessageSquare />, label: "Moderate Comments" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // Track active submenu
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true); // Sidebar expansion state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state for logout confirmation
  const router = useRouter(); // Router instance for navigation

  // Handle submenu toggling
  const toggleSubMenu = (label: string | null) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Handle logout click (opens modal)
  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  // Handle confirmation of logout
  const handleLogoutConfirm = () => {
    // Clear session data or perform necessary logout operations
    console.log("Logging out...");
    sessionStorage.removeItem('userRole'); // Clear stored role
    sessionStorage.removeItem('userId'); // Clear user ID or other session data
    router.push('/auth/sign-in'); // Redirect to sign-in page
    setIsModalOpen(false); // Close the modal
  };

  // Handle cancellation of logout
  const handleLogoutCancel = () => {
    setIsModalOpen(false); // Simply close the modal without logging out
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full mb-12">
        <LogoNavBar />
      </div>
      <div className="flex flex-1">
        <div
          className={`fixed left-0 top-12 h-screen ${isSidebarExpanded ? "w-64" : "w-20"
            } transition-all custom-scrollbar`}
        >
          <div className="h-full overflow-y-auto">
            <Sidebar
              menuItems={menuItems}
              activeSubMenu={activeSubMenu}
              onSubMenuToggle={toggleSubMenu}
              isExpanded={isSidebarExpanded}
              onToggleSidebar={toggleSidebar}
              onLogoutClick={handleLogoutClick} // Passing logout handler
            />
          </div>
        </div>
        <div
          className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-20"
            } transition-all bg-[#f7f4f0] p-6 overflow-y-auto`}
        >
          {children}
        </div>
      </div>

      {/* Confirmation Modal for Logout */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        message="Are you sure you want to logout?"
      />
    </div>
  );
};

export default DashboardLayout;
