// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp } from "react-icons/fi";

// interface MenuItem {
//   path: string | null;
//   icon: JSX.Element;
//   label: string;
//   hasSubMenu?: boolean;
//   subMenu?: MenuItem[];
// }

// interface SidebarProps {
//   menuItems: MenuItem[];
//   activeSubMenu: string | null;
//   onSubMenuToggle: (label: string | null) => void;
//   isExpanded: boolean;
//   onToggleSidebar: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   menuItems,
//   activeSubMenu,
//   onSubMenuToggle,
//   isExpanded,
//   onToggleSidebar,
// }) => {
//   const pathname = usePathname();

//   // Track screen size for responsive sidebar behavior
//   const [isLargeScreen, setIsLargeScreen] = useState(true);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024); // Large screen
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Initial check

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Helper function to determine active menu item
//   const isActive = (item: MenuItem) => {
//     return item.path ? pathname === item.path : false;
//   };

//   // Helper function to determine active submenu item
//   const isActiveSubMenu = (subItem: MenuItem) => {
//     return pathname === subItem.path;
//   };

//   return (
//     <div
//       className={`bg-[#3a2f2c] text-white transition-all duration-300 ${
//         isLargeScreen ? "w-64" : isExpanded ? "w-64" : "w-16"
//       } h-screen flex flex-col`}
//     >
//       {/* Sidebar Header with Toggle Button */}
//       <div className="flex items-center justify-between p-4 border-b mb-6 border-[#D5CEA3]">
//         <span className={`text-lg font-bold ${isExpanded ? "block" : "hidden"}`}>
//           Menu
//         </span>
//         <button
//           onClick={onToggleSidebar}
//           className="p-2 rounded-md hover:bg-[#D5CEA3] hover:text-[#3C2A21]"
//         >
//           {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
//         </button>
//       </div>
//       {/* Scrollable Sidebar Menu Items */}
//       <div className="overflow-y-auto flex-1">
//         {menuItems.map((item) => (
//           <div key={item.label} className="mb-4">
//             {/* Main Menu Item */}
//             <Link href={item.path || "#"} passHref>
//               <div
//                 className={`flex items-center justify-between ml-2 p-2 rounded-lg cursor-pointer ${
//                   isActive(item)
//                     ? "bg-[#E5E5CB] text-[#3C2A21] w-48"
//                     : "hover:bg-[#3C2A21] hover:text-[#D5CEA3] w-48"
//                 }`}
//                 onClick={() => {
//                   if (item.hasSubMenu) {
//                     onSubMenuToggle(activeSubMenu === item.label ? null : item.label);
//                   }
//                 }}
//               >
//                 <div className="flex items-center">
//                   {item.icon}
//                   <span className={`ml-2 ${isExpanded ? "block" : "hidden"}`}>
//                     {item.label}
//                   </span>
//                 </div>
//                 {item.hasSubMenu && isExpanded && (
//                   <span>
//                     {activeSubMenu === item.label ? <FiChevronUp /> : <FiChevronDown />}
//                   </span>
//                 )}
//               </div>
//             </Link>

//             {/* Submenu */}
//             {item.hasSubMenu && activeSubMenu === item.label && (
//               <div className={`ml-6 mt-2 flex flex-col space-y-2`}>
//                 {item.subMenu?.map((subItem) => (
//                   <Link key={subItem.label} href={subItem.path || "#"} passHref>
//                     <div
//                       className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
//                         isActiveSubMenu(subItem)
//                           ? "bg-[#E5E5CB] w-16 md:w-48 text-[#3C2A21]"
//                           : "hover:bg-[#3C2A21] w-48 hover:text-[#D5CEA3]"
//                       }`}
//                     >
//                       {subItem.icon}
//                       <span className={`ml-2 ${isExpanded ? "block" : "hidden"}`}>
//                         {subItem.label}
//                       </span>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp, FiLogOut } from "react-icons/fi";

interface MenuItem {
  path: string | null;
  icon: JSX.Element;
  label: string;
  hasSubMenu?: boolean;
  subMenu?: MenuItem[];
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeSubMenu: string | null;
  onSubMenuToggle: (label: string | null) => void;
  isExpanded: boolean;
  onToggleSidebar: () => void;
  onLogoutClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  activeSubMenu,
  onSubMenuToggle,
  isExpanded,
  onToggleSidebar,
  onLogoutClick,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Track screen size for responsive sidebar behavior
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Helper function to determine active menu item
  const isActive = (item: MenuItem): boolean => pathname === item.path;

  // Helper function to determine active submenu item
  const isActiveSubMenu = (subItem: MenuItem): boolean => pathname === subItem.path;

  return (
    <div
      className={`bg-[#3a2f2c] text-white transition-all duration-300 ${isLargeScreen ? "w-64" : isExpanded ? "w-64" : "w-16"} h-screen flex flex-col`}
    >
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b mb-6 border-[#D5CEA3]">
        <span className={`text-lg font-bold ${isExpanded ? "block" : "hidden"}`}>
          Menu
        </span>
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-[#D5CEA3] hover:text-[#3C2A21]"
        >
          {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Scrollable Sidebar Menu Items */}
      <div className="overflow-y-auto flex-1">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-4">
            {/* Main Menu Item */}
            <div onClick={() => {
                router.push(item.path!);
              }
            }>
            {/* <div href="google.com" passHref > */}
              <div
                className={`flex items-center justify-between ml-2 p-2 rounded-lg cursor-pointer ${
                  isActive(item)
                    ? "bg-[#E5E5CB] text-[#3C2A21] w-48"
                    : "hover:bg-[#3C2A21] hover:text-[#D5CEA3] w-48"
                }`}
                onClick={() => {
                  if (item.hasSubMenu) {
                    onSubMenuToggle(activeSubMenu === item.label ? null : item.label);
                  }
                }}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className={`ml-2 ${isExpanded ? "block" : "hidden"}`}>
                    {item.label}
                  </span>
                </div>
                {item.hasSubMenu && isExpanded && (
                  <span>
                    {activeSubMenu === item.label ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                )}
              </div>
            </div>

            {/* Submenu */}
            {item.hasSubMenu && activeSubMenu === item.label && (
              <div className={`ml-6 mt-2 flex flex-col space-y-2`}>
                {item.subMenu?.map((subItem) => (
                  <Link key={subItem.path} href={subItem.path ? subItem.path : "#"} passHref>
                    <div
                      className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                        isActiveSubMenu(subItem)
                          ? "bg-[#E5E5CB] w-16 md:w-48 text-[#3C2A21]"
                          : "hover:bg-[#3C2A21] w-48 hover:text-[#D5CEA3]"
                      }`}
                    >
                      {subItem.icon}
                      <span className={`ml-2 ${isExpanded ? "block" : "hidden"}`}>
                        {subItem.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Logout Menu Item */}
        <div className="mb-4">
          <div
            className="flex items-center justify-start ml-2 p-2 rounded-lg cursor-pointer hover:bg-[#3C2A21] hover:text-[#D5CEA3]"
            onClick={onLogoutClick}
          >
            <FiLogOut className="mr-2" />
            <span className={`${isExpanded ? "block" : "hidden"}`}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;