import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar"; // Ensure path is correct
import ConfirmationModal from "./ConfirmationModal"; // Ensure path is correct

interface NavbarProps {
  onFilterChange: (category: string, searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
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
    setSelectedCategory(category);
    onFilterChange(category, searchTerm);
    setMenuOpen(false); // Close menu on selection (mobile)
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onFilterChange(selectedCategory, term);
  };

  const handleSignOut = () => setShowModal(true);

  const confirmSignOut = () => {
    setShowModal(false);
    router.push("/auth/sign-in");
  };

  const cancelSignOut = () => setShowModal(false);

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-2 bg-[#3a2f2c] text-[#E5E5CB] shadow z-10">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <span
          className="font-bold text-lg cursor-pointer"
          onClick={() => router.push("/")}
        >
          Logo
        </span>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden">
        <button
          className="text-[#D5CEA3] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {["all", "music", "photo", "video", "book", "artifacts"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 focus:outline-none ${
              selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="hidden md:block">
        <SearchBar
          onSearch={handleSearch}
          filters={[]} // Omit filters, use only the input functionality
        />
      </div>

      {/* Dropdown */}
      <button
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="bg-[#D5CEA3] rounded-full w-1 h-1 mb-0.5" />
        <div className="bg-[#D5CEA3] rounded-full w-1 h-1 mb-0.5" />
        <div className="bg-[#D5CEA3] rounded-full w-1 h-1" />
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-12 right-0 mt-1 p-2 bg-[#E5E5CB] text-[#3C2A21] text-sm rounded shadow-lg z-20"
        >
          <button
            className="block w-full text-left py-1 hover:underline"
            onClick={() => router.push("/")}
          >
            Back to home
          </button>
          <button
            className="block w-full text-left py-1 hover:underline"
            onClick={() => router.push("/view-account")}
          >
            View Account
          </button>
          <button
            className="block w-full text-left py-1 hover:underline"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-12 left-18 right-0 bg-[#3a2f2c] text-[#E5E5CB] flex flex-col space-y-1 p-3 z-10"
        >
          {["all", "music", "photo", "video", "book", "artifacts"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`w-full text-left ${
                selectedCategory === cat ? "text-[#D5CEA3] underline" : "hover:text-[#D5CEA3]"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
          <SearchBar
            onSearch={handleSearch}
            filters={[]} // Inline search bar for mobile
          />
        </div>
      )}

      {/* Sign-Out Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          isOpen={showModal}
          onClose={cancelSignOut}
          onConfirm={confirmSignOut}
          message="Are you sure you want to sign out?"
        />
      )}
    </nav>
  );
};

export default Navbar;
