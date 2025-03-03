// "use client";

// import React, { useState, ReactNode } from "react";
// import { FiHome, FiSettings, FiMessageSquare, FiUser, FiStar, FiSearch, FiUpload, FiCheckSquare, FiVideo, FiBook, FiArchive, FiBox, FiServer, FiBarChart, FiFileText } from "react-icons/fi";
// import LogoNavBar from "../../../components/LogoNavBar";
// import Sidebar from "../../../components/Sidebar";


// // Define the main menu structure
// const menuItems = [
//   { path: "/dashboard/overview", icon: <FiHome />, label: "Overview" },
//   { path: "/dashboard/request", icon: <FiMessageSquare />, label: "Requests" },
//   {
//     path: null,
//     icon: <FiUser />,
//     label: "User List",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/user-list/institution", label: "Institution", icon: <FiHome /> },
//       { path: "/dashboard/user-list/institutional-admin", label: "Institutional Admin", icon: <FiUser /> },
//       { path: "/dashboard/user-list/public-users", label: "Public Users", icon: <FiUser /> },
//       { path: "/dashboard/user-list/premium-users", label: "Premium Users", icon: <FiStar /> },
//       { path: "/dashboard/user-list/researchers", label: "Researchers", icon: <FiSearch /> },
//       { path: "/dashboard/user-list/uploaders", label: "Uploaders", icon: <FiUpload /> },
//       { path: "/dashboard/user-list/reviewers", label: "Reviewers", icon: <FiCheckSquare /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiUser />,
//     label: "Content List",
//     hasSubMenu: true,
    // subMenu: [
    //   { path: "/dashboard/content-list/video", label: "Videos", icon: <FiVideo /> },
    //   { path: "/dashboard/content-list/artifacts", label: "Artifacts", icon: <FiArchive /> },
    //   { path: "/dashboard/content-list/music", label: "Music", icon: <FiBox /> },
    //   { path: "/dashboard/content-list/book", label: "Books", icon: <FiBook /> },
    // ],
//   },
//   {
//     path: null,
//     icon: <FiSettings />,
//     label: "Settings",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/settings/platform", label: "Platform Setting", icon: <FiSettings /> },
//       { path: "/dashboard/settings/account", label: "Account Setting", icon: <FiUser /> },
//       { path: "/dashboard/settings/api-integration", label: "API/Integration Setting", icon: <FiServer /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiStar />,
//     label: "Subscription",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/subscription/manage", label: "Manage Subscriptions", icon: <FiSettings /> },
//       { path: "/dashboard/subscription/plans", label: "Subscription Plans", icon: <FiBook /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiMessageSquare />,
//     label: "Announcement",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/announcement/create", label: "Create Announcement", icon: <FiUpload /> },
//       { path: "/dashboard/announcement/list", label: "View Announcements", icon: <FiCheckSquare /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiBarChart />,
//     label: "Analytics",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/analytics/overview", label: "Overview", icon: <FiHome /> },
//       { path: "/dashboard/analytics/reports", label: "Reports", icon: <FiArchive /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiFileText />,
//     label: "Reporting",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/reporting/user-reports", label: "User Reports", icon: <FiHome /> },
//       { path: "/dashboard/reporting/content-reports", label: "Content Reports", icon: <FiBox /> },
//     ],
//   },
// ];

// const DashboardLayout = ({ children }: { children: ReactNode }) => {
//   const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // Track active submenu
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true); // Sidebar expansion state

//   // Handle submenu toggling
//   const toggleSubMenu = (label: string | null) => {
//     setActiveSubMenu(activeSubMenu === label ? null : label);
//   };

//   // Handle sidebar toggle
//   const toggleSidebar = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };
// return (
//     <div className="h-screen flex flex-col">
//       {/* Top Navbar */}
//       <div className="w-full mb-12">
//         <LogoNavBar />
//       </div>

//       {/* Main Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar (Fixed and Full Height) */}
//         <div
//           className={`fixed left-0 top-12 h-screen ${
//             isSidebarExpanded ? "w-64" : "w-20"
//           } transition-all custom-scrollbar`}
//         >
//           <div className="h-full overflow-y-auto">
//             <Sidebar
//               menuItems={menuItems}
//               activeSubMenu={activeSubMenu}
//               onSubMenuToggle={toggleSubMenu}
//               isExpanded={isSidebarExpanded}
//               onToggleSidebar={toggleSidebar}
//             />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div
//           className={`flex-1 ${
//             isSidebarExpanded ? "ml-64" : "ml-20"
//           } transition-all bg-[#f7f4f0] p-6 overflow-y-auto`}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// "use client";

// import React, { useState, ReactNode } from "react";
// import LogoNavBar from "../../../components/LogoNavBar"; // Import your LogoNavBar component
// import Sidebar from "../../../components/Sidebar"; // Import the Sidebar component
// import { FiHome, FiSettings, FiMessageSquare, FiUser, FiStar, FiSearch, FiUpload, FiCheckSquare, FiVideo, FiBook, FiArchive, FiBox, FiMessageCircle, FiBarChart, FiFileText } from "react-icons/fi";

// // Define the main menu structure
// const menuItems = [
//   { path: "/dashboard/overview", icon: <FiHome />, label: "Overview" },
//   { path: "/dashboard/request", icon: <FiMessageSquare />, label: "Requests" },
//   {
//     path: null,
//     icon: <FiUser />,
//     label: "User List",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/user-list/institution", label: "Institution", icon: <FiHome /> },
//       { path: "/dashboard/user-list/institutional-admin", label: "Institutional Admin", icon: <FiUser /> },
//       { path: "/dashboard/user-list/public-users", label: "Public Users", icon: <FiUser /> },
//       { path: "/dashboard/user-list/premium-users", label: "Premium Users", icon: <FiStar /> },
//       { path: "/dashboard/user-list/researchers", label: "Researchers", icon: <FiSearch /> },
//       { path: "/dashboard/user-list/uploaders", label: "Uploaders", icon: <FiUpload /> },
//       { path: "/dashboard/user-list/reviewers", label: "Reviewers", icon: <FiCheckSquare /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiUser />,
//     label: "Content List",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/content-list/video", label: "Videos", icon: <FiVideo /> },
//       { path: "/dashboard/content-list/artifacts", label: "Artifacts", icon: <FiArchive /> },
//       { path: "/dashboard/content-list/music", label: "Music", icon: <FiBox /> },
//       { path: "/dashboard/content-list/book", label: "Books", icon: <FiBook /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiSettings />,
//     label: "Settings",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/settings/platform", label: "Platform Setting", icon: <FiSettings /> },
//       { path: "/dashboard/settings/account", label: "Account Setting", icon: <FiUser /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiStar />,
//     label: "Subscription",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/subscription/manage", label: "Manage Subscriptions", icon: <FiSettings /> },
//       { path: "/dashboard/subscription/plans", label: "Subscription Plans", icon: <FiBook /> },
//     ],
//   },
//   {
//     path: null,
//     icon: <FiMessageSquare />,
//     label: "Announcement",
//     hasSubMenu: true,
//     subMenu: [
//       { path: "/dashboard/announcement/create", label: "Create Announcement", icon: <FiUpload /> },
//       { path: "/dashboard/announcement/list", label: "View Announcements", icon: <FiCheckSquare /> },
//     ],
//   },
  
//   { path: "/dashboard/feedbacks", icon: <FiMessageCircle />, label: "Feedbacks" },
// ];

// const DashboardLayout = ({ children }: { children: ReactNode }) => {
//   const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // Track active submenu
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true); // Sidebar expansion state

//   // Handle submenu toggling
//   const toggleSubMenu = (label: string | null) => {
//     setActiveSubMenu(activeSubMenu === label ? null : label);
//   };

//   // Handle sidebar toggle
//   const toggleSidebar = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };

//   // Handle logout click
//   const handleLogoutClick = () => {
//     // Add your logout logic here, e.g., clearing cookies or redirecting
//     console.log("Logging out...");
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Top Navbar */}
//       <div className="w-full mb-12">
//         <LogoNavBar />
//       </div>

// {/* Main Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar (Fixed and Full Height) */}
//         <div
//           className={`fixed left-0 top-12 h-screen ${isSidebarExpanded ? "w-64" : "w-20"} transition-all custom-scrollbar`}
//         >
//           <div className="h-full overflow-y-auto">
//             <Sidebar
//               menuItems={menuItems}
//               activeSubMenu={activeSubMenu}
//               onSubMenuToggle={toggleSubMenu}
//               isExpanded={isSidebarExpanded}
//               onToggleSidebar={toggleSidebar}
//               onLogoutClick={handleLogoutClick} // Passing the logout handler
//             />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-20"} transition-all bg-[#f7f4f0] p-6 overflow-y-auto`}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



"use client";

import React, { useState, ReactNode } from "react";
import LogoNavBar from "../../../components/LogoNavBar"; // Import your LogoNavBar component
import Sidebar from "../../../components/Sidebar"; // Import the Sidebar component
import { FiHome, FiSettings, FiMessageSquare, FiUser, FiStar, FiSearch, FiUpload, FiCheckSquare, FiVideo, FiBook, FiArchive, FiBox, FiMessageCircle, FiBarChart, FiFileText } from "react-icons/fi";
import ConfirmationModal from "../../../components/ConfirmationModal"; // Import the modal component
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// Define the main menu structure
const menuItems = [
  { path: "/dashboard/overview", icon: <FiHome />, label: "Overview" },
  { path: "/dashboard/request", icon: <FiMessageSquare />, label: "Requests" },
  {
    path: null,
    icon: <FiUser />,
    label: "User List",
    hasSubMenu: true,
    subMenu: [
      { path: "/dashboard/user-list/institution", label: "Institution", icon: <FiHome /> },
      { path: "/dashboard/user-list/institutional-admin", label: "Institutional Admin", icon: <FiUser /> },
      { path: "/dashboard/user-list/public-users", label: "Public Users", icon: <FiUser /> },
      { path: "/dashboard/user-list/premium-users", label: "Premium Users", icon: <FiStar /> },
      { path: "/dashboard/user-list/researchers", label: "Researchers", icon: <FiSearch /> },
      { path: "/dashboard/user-list/uploaders", label: "Uploaders", icon: <FiUpload /> },
      { path: "/dashboard/user-list/reviewers", label: "Reviewers", icon: <FiCheckSquare /> },
    ],
  },
  {
    path: null,
    icon: <FiUser />,
    label: "Content List",
    hasSubMenu: true,
    subMenu: [
      { path: "/dashboard/content-list/video", label: "Videos", icon: <FiVideo /> },
      { path: "/dashboard/content-list/artifacts", label: "Artifacts", icon: <FiArchive /> },
      { path: "/dashboard/content-list/music", label: "Music", icon: <FiBox /> },
      { path: "/dashboard/content-list/book", label: "Books", icon: <FiBook /> },
    ],
  },
  {
    path: null,
    icon: <FiSettings />,
    label: "Settings",
    hasSubMenu: true,
    subMenu: [
      { path: "/dashboard/settings/platform", label: "Platform Setting", icon: <FiSettings /> },
      { path: "/dashboard/settings/account", label: "Account Setting", icon: <FiUser /> },
    ],
  },
  {
    path: null,
    icon: <FiStar />,
    label: "Subscription",
    hasSubMenu: true,
    subMenu: [
      { path: "/dashboard/subscription/manage", label: "Manage Subscriptions", icon: <FiSettings /> },
      { path: "/dashboard/subscription/plans", label: "Subscription Plans", icon: <FiBook /> },
    ],
  },
  {
    path: null,
    icon: <FiMessageSquare />,
    label: "Announcement",
    hasSubMenu: true,
    subMenu: [
      { path: "/dashboard/announcement/create", label: "Create Announcement", icon: <FiUpload /> },
      { path: "/dashboard/announcement/list", label: "View Announcements", icon: <FiCheckSquare /> },
    ],
  },
  
  { path: "/dashboard/feedbacks", icon: <FiMessageCircle />, label: "Feedbacks" },
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
      {/* Top Navbar */}
      <div className="w-full mb-12">
        <LogoNavBar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar (Fixed and Full Height) */}
        <div
          className={`fixed left-0 top-12 h-screen ${isSidebarExpanded ? "w-64" : "w-20"} transition-all custom-scrollbar`}
        >
          <div className="h-full overflow-y-auto">
            <Sidebar
              menuItems={menuItems}
              activeSubMenu={activeSubMenu}
              onSubMenuToggle={toggleSubMenu}
              isExpanded={isSidebarExpanded}
              onToggleSidebar={toggleSidebar}
              onLogoutClick={handleLogoutClick} // Passing the logout handler to sidebar
            />
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-20"} transition-all bg-[#f7f4f0] p-6 overflow-y-auto`}>
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
