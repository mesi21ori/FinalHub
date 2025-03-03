import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (searchTerm: string, filter: string) => void; // Callback for search
  filters: string[]; // List of filters
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, filters }) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search input state
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]); // Default filter
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state

  // Handle search input change
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value, selectedFilter); // Trigger search
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    onSearch(searchTerm, filter); // Trigger search with new filter
    setDropdownVisible(false); // Close dropdown
  };

  return (
    <div className="flex items-center gap-4 relative w-full max-w-lg">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        placeholder="Search..."
        className="border p-2 rounded-md text-sm w-full sm:w-64" // Full width on mobile, 64 width on larger screens
      />
      <div className="relative">
        <FaFilter
          className="h-5 w-5 text-[#3C2A21] cursor-pointer"
          onClick={() => setDropdownVisible((prev) => !prev)}
        />
        {dropdownVisible && (
          <div className="absolute top-8 left-0 w-full sm:w-48 bg-[#E5E5CB] border border-[#3C2A21] rounded-md shadow-md z-10 custom-scrollbar">
            <ul className="max-h-60 overflow-y-auto">
              {filters.map((filter, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterChange(filter)}
                  className={`cursor-pointer px-4 py-2 text-[#3C2A21] hover:bg-[#3C2A21] hover:text-[#E5E5CB] ${
                    selectedFilter === filter ? "bg-[#3C2A21] text-[#E5E5CB]" : ""
                  }`}
                >
                  {filter}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;