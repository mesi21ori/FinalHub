// import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import SearchBar from "./SearchBar"; // Ensure path is correct
// import ConfirmationModal from "./ConfirmationModal"; // Ensure path is correct

// interface NavbarProps {
//   onFilterChange: (category: string, searchTerm: string) => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ onFilterChange }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleCategoryClick = (category: string) => {
//     setSelectedCategory(category);
//     onFilterChange(category, searchTerm);
//     setMenuOpen(false); // Close menu on selection (mobile)
//   };

//   const handleSearch = (term: string) => {
//     setSearchTerm(term);
//     onFilterChange(selectedCategory, term);
//   };

//   const handleSignOut = () => setShowModal(true);

//   const confirmSignOut = () => {
//     setShowModal(false);
//     router.push("/auth/sign-in");
//   };

//   const cancelSignOut = () => setShowModal(false);

//   return (
//     <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-2 bg-[#3a2f2c] text-[#E5E5CB] shadow z-10">
//       {/* Logo Section */}
//       <div className="flex items-center space-x-4">
//         <span
//           className="font-bold text-lg cursor-pointer"
//           onClick={() => router.push("/")}
//         >
//           Logo
//         </span>
//       </div>

//       {/* Mobile Menu Toggle */}
//       <div className="flex md:hidden">
//         <button
//           className="text-[#D5CEA3] focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-expanded={menuOpen}
//           aria-controls="mobile-menu"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center space-x-6">
//         {["all", "music", "photo", "video", "book", "artifacts"].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => handleCategoryClick(cat)}
//             className={`px-4 py-2 focus:outline-none ${
//               selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
//             }`}
//           >
//             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Search Bar */}
//       <div className="hidden md:block">
//         <SearchBar
//           onSearch={handleSearch}
//           filters={[]} // Omit filters, use only the input functionality
//         />
//       </div>

//       {/* Dropdown */}
//       <button
//         className="flex flex-col items-center cursor-pointer"
//         onClick={() => setShowDropdown(!showDropdown)}
//       >
//         <div className="bg-[#D5CEA3] rounded-full w-1 h-1 mb-0.5" />
//         <div className="bg-[#D5CEA3] rounded-full w-1 h-1 mb-0.5" />
//         <div className="bg-[#D5CEA3] rounded-full w-1 h-1" />
//       </button>
//       {showDropdown && (
//         <div
//           ref={dropdownRef}
//           className="absolute top-12 right-0 mt-1 p-2 bg-[#E5E5CB] text-[#3C2A21] text-sm rounded shadow-lg z-20"
//         >
//           <button
//             className="block w-full text-left py-1 hover:underline"
//             onClick={() => router.push("/")}
//           >
//             Back to home
//           </button>
//           <button
//             className="block w-full text-left py-1 hover:underline"
//             onClick={() => router.push("/view-account")}
//           >
//             View Account
//           </button>
//           <button
//             className="block w-full text-left py-1 hover:underline"
//             onClick={handleSignOut}
//           >
//             Sign Out
//           </button>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div
//           id="mobile-menu"
//           className="absolute top-12 left-18 right-0 bg-[#3a2f2c] text-[#E5E5CB] flex flex-col space-y-1 p-3 z-10"
//         >
//           {["all", "music", "photo", "video", "book", "artifacts"].map((cat) => (
//             <button
//               key={cat}
//               onClick={() => handleCategoryClick(cat)}
//               className={`w-full text-left ${
//                 selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
//               }`}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//           <SearchBar
//             onSearch={handleSearch}
//             filters={[]} // Inline search bar for mobile
//           />
//         </div>
//       )}

//       {/* Sign-Out Confirmation Modal */}
//       {showModal && (
//         <ConfirmationModal
//           isOpen={showModal}
//           onClose={cancelSignOut}
//           onConfirm={confirmSignOut}
//           message="Are you sure you want to sign out?"
//         />
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import ConfirmationModal from "../components/ConfirmationModal";

// interface NavbarProps {
//   onFilterChange: (category: string, searchTerm: string) => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ onFilterChange }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleCategoryClick = (category: string) => {
//     // Normalize the category to uppercase to match API expectations
//     const normalizedCategory = category.toUpperCase();

//     setSelectedCategory(normalizedCategory);
//     onFilterChange(normalizedCategory, searchTerm); // Update the filter with the normalized category
//     setMenuOpen(false);
//   };


//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     onFilterChange(selectedCategory, term);
//   };

//   const handleSignOut = () => {
//     console.log("User signed out.");
//     setIsModalOpen(false);
//     router.push("/auth/sign-in");
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-2 bg-[#3a2f2c] text-[#ffffff] shadow-md z-10 text-xs">
//         {/* Logo Section */}
//         <div className="flex items-center">
//           <Image
//             src="/images/logo.png"
//             alt="Ethiopian Shield Logo"
//             width={24}
//             height={24}
//             className="mr-1"
//           />
//           <span className="text-xs font-bold">Heritage Hub</span>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-[#D5CEA3] focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-expanded={menuOpen}
//           aria-controls="mobile-menu"
//         >
//           ☰
//         </button>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-3">
//           {["all", "videos", "musics", "photos", "books", "articles"].map((cat) => (
//             <button
//               key={cat}
//               onClick={() => handleCategoryClick(cat)}
//               className={`px-2 py-1 text-xs ${selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
//                 }`}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="hidden md:block w-1/3">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search by name or historical figure..."
//             className="w-full px-4 py-2 rounded text-black border border-[#D5CEA3] focus:outline-none focus:ring-2 focus:ring-[#D5CEA3]"
//           />
//         </div>

//         {/* Dropdown and Modal */}
//         <div className="relative mr-6">
//           <button
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() => setShowDropdown(!showDropdown)}
//           >
//             <div className="bg-[#ffffff] rounded-full w-1 h-1 mb-0.5" />
//             <div className="bg-[#ffffff] rounded-full w-1 h-1 mb-0.5" />
//             <div className="bg-[#ffffff] rounded-full w-1 h-1" />
//           </button>
//           {showDropdown && (
//             <div
//               ref={dropdownRef}
//               className="absolute top-10 right-0 mt-1 p-2 bg-[#f7f4f0] text-[#3C2A21] text-xs rounded shadow-lg z-20  w-36"
//             >
//               <button
//                 className="block w-full text-left py-1 hover:underline"
//                 onClick={() => router.push("/")}
//               >
//                 Back to home
//               </button>
//               <button
//                 className="block w-full text-left py-1 hover:underline"
//                 onClick={() => router.push("/own-account-setting")} // Redirect to the same page for all users
//               >
//                 View Account
//               </button>

//               <button
//                 className="block w-full text-left py-1 hover:underline"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div
//             id="mobile-menu"
//             className="absolute top-12 left-0 right-0 bg-[#3a2f2c] text-[#E5E5CB] flex flex-col space-y-1 p-3 z-10"
//           >
//             {["all", "videos", "musics", "photos", "books", "articles"].map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => handleCategoryClick(cat)}
//                 className={`w-full text-left py-1 ${selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
//                   }`}
//               >
//                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </button>
//             ))}
//             <div className="mt-2">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search..."
//                 className="w-full px-4 py-2 rounded text-black border border-[#D5CEA3] focus:outline-none focus:ring-2 focus:ring-[#D5CEA3]"
//               />
//             </div>
//           </div>
//         )}
//       </nav>

//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleSignOut}
//         message="Are you sure you want to sign out?"
//       />
//     </>
//   );
// };

// export default Navbar;


// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import ConfirmationModal from "../components/ConfirmationModal";

// interface NavbarProps {
//   onFilterChange: (category: string, searchTerm: string) => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ onFilterChange }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleCategoryClick = (category: string) => {
//     const normalizedCategory = category.toUpperCase();
//     console.log("Category selected:", normalizedCategory); // Debug log
//     setSelectedCategory(normalizedCategory);
//     onFilterChange(normalizedCategory, searchTerm);
//     setMenuOpen(false);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const term = e.target.value;
//     console.log("Search term:", term); // Debug log
//     setSearchTerm(term);
//     onFilterChange(selectedCategory, term);
//   };

//   const handleSignOut = () => {
//     console.log("User signed out.");
//     setIsModalOpen(false);
//     router.push("/auth/sign-in");
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-2 bg-[#3a2f2c] text-[#ffffff] shadow-md z-10 text-xs">
//         <div className="flex items-center">
//           <Image
//             src="/images/logo.png"
//             alt="Ethiopian Shield Logo"
//             width={24}
//             height={24}
//             className="mr-1"
//           />
//           <span className="text-xs font-bold">Heritage Hub</span>
//         </div>

//         <button
//           className="md:hidden text-[#D5CEA3] focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-expanded={menuOpen}
//           aria-controls="mobile-menu"
//         >
//           ☰
//         </button>

//         <div className="hidden md:flex items-center space-x-3">
//           {["all", "videos", "musics", "photos", "books", "articles"].map((cat) => (
//             <button
//               key={cat}
//               onClick={() => handleCategoryClick(cat)}
//               className={`px-2 py-1 text-xs ${
//                 selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
//               }`}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="hidden md:block w-1/3">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search by name or historical figure..."
//             className="w-full px-4 py-2 rounded text-black border border-[#D5CEA3] focus:outline-none focus:ring-2 focus:ring-[#D5CEA3]"
//           />
//         </div>

//         <div className="relative mr-6">
//           <button
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() => setShowDropdown(!showDropdown)}
//           >
//             <div className="bg-[#ffffff] rounded-full w-1 h-1 mb-0.5" />
//             <div className="bg-[#ffffff] rounded-full w-1 h-1 mb-0.5" />
//             <div className="bg-[#ffffff] rounded-full w-1 h-1" />
//           </button>
//           {showDropdown && (
//             <div
//               ref={dropdownRef}
//               className="absolute top-10 right-0 mt-1 p-2 bg-[#f7f4f0] text-[#3C2A21] text-xs rounded shadow-lg z-20  w-36"
//             >
//               <button
//                 className="block w-full text-left py-1 hover:underline"
//                 onClick={() => router.push("/")}
//               >
//                 Back to home
//               </button>
//               <button
//                 className="block w-full text-left py-1 hover:underline"
//                 onClick={() => router.push("/own-account-setting")}
//               >
//                 View Account
//               </button>
//               <button
//                 className="block w-full text-left py-1 hover:underline"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>

//         {menuOpen && (
//           <div
//             id="mobile-menu"
//             className="absolute top-12 left-0 right-0 bg-[#3a2f2c] text-[#E5E5CB] flex flex-col space-y-1 p-3 z-10"
//           >
//             {["all", "videos", "musics", "photos", "books", "articles"].map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => handleCategoryClick(cat)}
//                 className={`w-full text-left py-1 ${
//                   selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
//                 }`}
//               >
//                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </button>
//             ))}
//             <div className="mt-2">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search..."
//                 className="w-full px-4 py-2 rounded text-black border border-[#D5CEA3] focus:outline-none focus:ring-2 focus:ring-[#D5CEA3]"
//               />
//             </div>
//           </div>
//         )}
//       </nav>

//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleSignOut}
//         message="Are you sure you want to sign out?"
//       />
//     </>
//   );
// };

// export default Navbar;


"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../components/ConfirmationModal";

interface NavbarProps {
  onFilterChange: (category: string, searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (category: string) => {
    // Normalize category value to uppercase
    const normalizedCategory = category.toUpperCase();
    console.log("Category selected:", normalizedCategory); // Debug log
    setSelectedCategory(normalizedCategory);
    onFilterChange(normalizedCategory, searchTerm);
    setMenuOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    console.log("Search term:", term); // Debug log
    setSearchTerm(term);
    onFilterChange(selectedCategory, term);
  };

  const handleSignOut = () => {
    console.log("User signed out.");
    setIsModalOpen(false);
    router.push("/auth/sign-in");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-2 bg-[#3a2f2c] text-[#ffffff] shadow-md z-10 text-xs">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Ethiopian Shield Logo"
            width={24}
            height={24}
            className="mr-1"
          />
          <span className="text-xs font-bold">Heritage Hub</span>
        </div>

        <button
          className="md:hidden text-[#D5CEA3] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>

        <div className="hidden md:flex items-center space-x-3">
          {["all", "video", "music", "photo", "book", "article"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-2 py-1 text-xs ${
                selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Capitalize first letter */}
            </button>
          ))}
        </div>

        <div className="hidden md:block w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name or historical figure..."
            className="w-full px-4 py-2 rounded text-black border border-[#D5CEA3] focus:outline-none focus:ring-2 focus:ring-[#D5CEA3]"
          />
        </div>

        <div className="relative mr-6">
          <button
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="bg-[#ffffff] rounded-full w-1 h-1 mb-0.5" />
            <div className="bg-[#ffffff] rounded-full w-1 h-1 mb-0.5" />
            <div className="bg-[#ffffff] rounded-full w-1 h-1" />
          </button>
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-10 right-0 mt-1 p-2 bg-[#f7f4f0] text-[#3C2A21] text-xs rounded shadow-lg z-20  w-36"
            >
              <button
                className="block w-full text-left py-1 hover:underline"
                onClick={() => router.push("/")}
              >
                Back to home
              </button>
              <button
                className="block w-full text-left py-1 hover:underline"
                onClick={() => router.push("/own-account-setting")}
              >
                View Account
              </button>
              <button
                className="block w-full text-left py-1 hover:underline"
                onClick={() => setIsModalOpen(true)}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-12 left-0 right-0 bg-[#3a2f2c] text-[#E5E5CB] flex flex-col space-y-1 p-3 z-10"
          >
            {["all", "video", "music", "photo", "book", "article"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full text-left py-1 ${
                  selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Capitalize first letter */}
              </button>
            ))}
            <div className="mt-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full px-4 py-2 rounded text-black border border-[#D5CEA3] focus:outline-none focus:ring-2 focus:ring-[#D5CEA3]"
              />
            </div>
          </div>
        )}
      </nav>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSignOut}
        message="Are you sure you want to sign out?"
      />
    </>
  );
};

export default Navbar;
