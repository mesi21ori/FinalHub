
"use client"; // Marking this component as a Client Component

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

import '../../src/app/globals.css';
import Footer from "../../components/Footer";
import CommentPage from "../../components/CommentPage";
// Ensure the path is correct


interface ViewContentProps {
  uploadedImageFile?: File | null; // Expecting a File object or null
  uploadedText?: string; // Expecting a string
}

export default function ViewContent({ uploadedImageFile, uploadedText }: ViewContentProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [inputText, setInputText] = useState<string>(""); // State for custom input
  const [selectedOption, setSelectedOption] = useState<string>(""); // State for selected option
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // State for showing dropdown menu

  const router = useRouter(); // Initialize the useRouter hook
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown

  useEffect(() => {
    let imageUrl: string | null = null;

    // Set image source if an image file is provided
    if (uploadedImageFile) {
      imageUrl = URL.createObjectURL(uploadedImageFile);
      setImageSrc(imageUrl);
    } else {
      setImageSrc(null); // Reset to null if no file is provided
    }

    // Set displayed text
    setDisplayedText(uploadedText ?? ""); // If no text is provided, default to an empty string

    // Cleanup to revoke the object URL when the component unmounts
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [uploadedImageFile, uploadedText]); // Re-run effect when props change

  const handleSearch = () => {
    // Combine the custom input with the selected option when the button is clicked
    const query = inputText + selectedOption; // Fixed concatenation
    if (query) {
      console.log("Search query:", query);
      // Implement your search functionality here
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  const handleNavigation = (path: string) => {
    setShowDropdown(false); // Close dropdown after navigation
    router.push(path); // Navigate to the selected page
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false); // Close dropdown if clicked outside
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="bg-[#E5E5CB] min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#3C2A21] text-[#D5CEA3] p-2 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-lg">Logo</span>
        </div>
        {/* Centered navigation links */}
        <div className="flex-grow flex justify-center space-x-12 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Artifact</a>
          <a href="#" className="hover:text-white">Book</a>
          <a href="#" className="hover:text-white">Music</a>
          <a href="#" className="hover:text-white">Video</a>
          <a href="#" className="hover:text-white">Home</a>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          {/* Search Box with Stroke and Fill */}
          <div className="flex items-center border-2 border-[#D5CEA3] bg-[#3C2A21] p-1 rounded">
            <input
              type="text"
              placeholder="Enter Text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="px-2 py-1 rounded bg-[#3C2A21] text-[#D5CEA3] focus:outline-none w-24 md:w-32"
            />
            <div className="border-l-2 border-[#D5CEA3] mx-1 h-4" />
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="px-1 py-1 rounded bg-[#3C2A21] text-[#E5E5CB] focus:outline-none w-12 md:w-24 hover:bg-[#4b3825] hover:text-white" // Updated hover styles
            >
              <option value="">All</option>
              <option value="Past">Past</option>
              <option value="Present">Present</option>
              <option value="Future">Future</option>
            </select>
          </div>

          {/* Vertical Three-Dot Button with Smaller Size and Increased Gap */}
          <div className="flex flex-col items-center cursor-pointer ml-4 mr-4" onClick={toggleDropdown}>
            <div className="bg-[#D5CEA3] rounded-full w-1 h-1 mb-0.5" />
            <div className="bg-[#D5CEA3] rounded-full w-1 h-1 mb-0.5" />
            <div className="bg-[#D5CEA3] rounded-full w-1 h-1" />
          </div>
          {/* Dropdown Menu */}
          {showDropdown && (
            <div ref={dropdownRef} className="absolute top-12 right-16 mt-1 p-2 bg-[#E5E5CB] text-[#3C2A21] rounded shadow">
              <div className="cursor-pointer hover:underline" onClick={() => handleNavigation('/view-account')}>
                View Account
              </div>
              <div className="cursor-pointer hover:underline mt-1" onClick={() => handleNavigation('/sign-out')}>
                Sign Out
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-[#3C2A21] my-8">
          Gonder
        </h1>
        
        {/* Display Uploaded Image or Placeholder */}
        <div className="flex justify-center mb-4">
          <div className="rounded-lg overflow-hidden border-4 border-[#3C2A21] shadow-md w-full sm:w-[300px] h-[200px] flex items-center justify-center">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Uploaded Image"
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src="/images/p1.jpg"
                alt="Gonder, Ethiopia"
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>

        {/* Display Uploaded Text or Placeholder Text */}
        <div className="mt-8 text-[#3C2A21] text-lg leading-relaxed">
          {displayedText ? (
            <p className="mb-4">{displayedText}</p>
          ) : (
            <p className="mb-4">No text provided.</p>
          )}
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-12">
        <CommentPage />
      </div>

      {/* Footer Section */}
      <footer className="mt-12">
        <Footer />
      </footer>
    </div>
  );
}
