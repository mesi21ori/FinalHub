// "use client";

// import React, { useState, ReactNode, useEffect } from "react";
// import LogoNavBar from "../../../components/LogoNavBar";
// import Sidebar from "../../../components/Sidebar";
// import { FiUser, FiSettings, FiEdit, FiStar, FiBook, FiLogOut } from "react-icons/fi";
// import ConfirmationModal from "../../../components/ConfirmationModal"; // Import your modal component

// // Define the user menu structure based on user roles
// const getUserMenuItems = (role: string) => {
//   const commonItems = [
//     { path: "/own-account-setting/account", icon: <FiUser />, label: "View Account" },
//   ];

//   const roleBasedItems: Record<string, typeof commonItems> = {
//     PUBLIC_USER: [
//       ...commonItems,
//       { path: "/upgrade/", icon: <FiBook />, label: "Upgrade" },
//     ],
//     PREMIUM_USER: [
//       ...commonItems,
//       { path: "/upgrade/", icon: <FiBook />, label: "Upgrade" },
//       { path: "/own-account-setting/subscription", icon: <FiStar />, label: "My Subscription" },
//     ],
//     RESEARCHER_USER: [
//       ...commonItems,
//       { path: "/upgrade/", icon: <FiBook />, label: "Upgrade" },
//       { path: "/own-account-setting/analytics", icon: <FiStar />, label: "Analytics" },
//     ],
//   };

//   return roleBasedItems[role] || commonItems;
// };

// interface UserDashboardLayoutProps {
//   children: ReactNode;
// }

// const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children }) => {
//   const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch the role from sessionStorage (or wherever it's stored)
//     const storedRole = sessionStorage.getItem("userRole");
//     console.log("Stored Role:", storedRole); // Debugging line to see the role
//     if (storedRole) {
//       setRole(storedRole);
//     } else {
//       setRole("PUBLIC_USER"); // Set default role if none exists
//     }
//   }, []);

//   const toggleSubMenu = (label: string | null) => {
//     setActiveSubMenu(activeSubMenu === label ? null : label);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   const userMenuItems = role ? getUserMenuItems(role) : [];

//   // Handle the click event of the logout menu item
//   const handleLogoutClick = () => {
//     setIsModalOpen(true); // Open the modal
//   };

//   // Handle confirmation of logout
//   const handleLogoutConfirm = () => {
//     // Insert your logout logic here (e.g., clearing session, redirecting, etc.)
//     console.log("User logged out.");
//     setIsModalOpen(false);
//   };

//   // Handle cancellation of logout
//   const handleLogoutCancel = () => {
//     setIsModalOpen(false); // Close the modal without logging out
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Top Navbar */}
//       <div className="w-full mb-14">
//         <LogoNavBar />
//       </div>

//       {/* Main Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <div
//           className={`fixed left-0 top-12 h-screen ${isSidebarExpanded ? "w-64" : "w-20"} transition-all custom-scrollbar`}
//         >
//           <div className="h-full overflow-y-auto">
//             <Sidebar
//               menuItems={userMenuItems} // Inject user menu items dynamically
//               activeSubMenu={activeSubMenu}
//               onSubMenuToggle={toggleSubMenu}
//               isExpanded={isSidebarExpanded}
//               onToggleSidebar={toggleSidebar}
//               onLogoutClick={handleLogoutClick} // Only one logout button in sidebar
//             />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div
//           className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-20"} transition-all bg-[#f7f4f0] p-6 overflow-y-auto`}
//         >
//           {children}
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={handleLogoutCancel}
//         onConfirm={handleLogoutConfirm}
//         message="Are you sure you want to logout?"
//       />
//     </div>
//   );
// };

// export default UserDashboardLayout;

"use client";

import React, { useState, ReactNode, useEffect } from "react";
import LogoNavBar from "../../../components/LogoNavBar";
import Sidebar from "../../../components/Sidebar";
import { FiUser, FiSettings, FiEdit, FiStar, FiBook, FiLogOut } from "react-icons/fi";
import ConfirmationModal from "../../../components/ConfirmationModal"; // Import your modal component
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// Define the user menu structure based on user roles
const getUserMenuItems = (role: string) => {
  const commonItems = [
    { path: "/own-account-setting/account", icon: <FiUser />, label: "View Account" },
  ];

  const roleBasedItems: Record<string, typeof commonItems> = {
    PUBLIC_USER: [
      ...commonItems,
      { path: "/upgrade/", icon: <FiBook />, label: "Upgrade" },
    ],
    PREMIUM_USER: [
      ...commonItems,
      { path: "/upgrade/", icon: <FiBook />, label: "Upgrade" },
      { path: "/own-account-setting/subscription", icon: <FiStar />, label: "My Subscription" },
    ],
    RESEARCHER_USER: [
      ...commonItems,
      { path: "/upgrade/", icon: <FiBook />, label: "Upgrade" },
      { path: "/own-account-setting/analytics", icon: <FiStar />, label: "Analytics" },
    ],
  };

  return roleBasedItems[role] || commonItems;
};

interface UserDashboardLayoutProps {
  children: ReactNode;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children }) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter(); // For navigation

  useEffect(() => {
    // Fetch the role from sessionStorage (or wherever it's stored)
    const storedRole = sessionStorage.getItem("userRole");
    console.log("Stored Role:", storedRole); // Debugging line to see the role
    if (storedRole) {
      setRole(storedRole);
    } else {
      setRole("PUBLIC_USER"); // Set default role if none exists
    }
  }, []);

  const toggleSubMenu = (label: string | null) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const userMenuItems = role ? getUserMenuItems(role) : [];

  // Handle the click event of the logout menu item
  const handleLogoutClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Handle confirmation of logout
  const handleLogoutConfirm = () => {
    // Insert your logout logic here (e.g., clearing session, redirecting, etc.)
    sessionStorage.removeItem('userRole'); // Clear the stored user role (logout action)
    sessionStorage.removeItem('userId'); // Clear user ID
    router.push('/signin'); // Redirect to the sign-in page
    setIsModalOpen(false); // Close the modal
  };

  // Handle cancellation of logout
  const handleLogoutCancel = () => {
    setIsModalOpen(false); // Close the modal without logging out
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="w-full mb-14">
        <LogoNavBar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-12 h-screen ${isSidebarExpanded ? "w-64" : "w-20"} transition-all custom-scrollbar`}
        >
          <div className="h-full overflow-y-auto">
            <Sidebar
              menuItems={userMenuItems} // Inject user menu items dynamically
              activeSubMenu={activeSubMenu}
              onSubMenuToggle={toggleSubMenu}
              isExpanded={isSidebarExpanded}
              onToggleSidebar={toggleSidebar}
              onLogoutClick={handleLogoutClick} // Only one logout button in sidebar
            />
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-20"} transition-all bg-[#f7f4f0] p-6 overflow-y-auto`}
        >
          {children}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        message="Are you sure you want to logout?"
      />
    </div>
  );
};

export default UserDashboardLayout;
