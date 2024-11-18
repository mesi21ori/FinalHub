


"use client";
import Link from "next/link";
import { useState } from "react";
import '../../src/app/globals.css';

// Define types for the CustomSelect props
interface CustomSelectProps {
  value: string; // The selected value
  onChange: (value: string) => void; // Callback for when an option is selected
  options: string[]; // Array of options for the select
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full p-2 border border-[#D5CEA3] rounded-md bg-[#D5CEA3] text-[#3C2A21] text-left"
      >
        {value || 'Select One'}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-[#E5E5CB] border border-[#3C2A21] rounded-md mt-1">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer hover:bg-[#3C2A21] hover:text-[#D5CEA3]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Define types for the JoinRequestPage props
interface JoinRequestPageProps {
  onSubmit: (data: any) => void;
}

export default function JoinRequestPage({ onSubmit }: JoinRequestPageProps) {
  const [institutionName, setInstitutionName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); // Correctly named state for address
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState<File | null>(null); 
  const [photoUrl, setPhotoUrl] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressOptions = ["Addis Ababa", "Nairobi", "Kampala", "Cairo", "Johannesburg"];

  const filteredAddressOptions = addressOptions.filter((loc) =>
    loc.toLowerCase().includes(address.toLowerCase())
  );

  const handleLocationSelect = (selectedLocation: string) => {
    setAddress(selectedLocation); // Use address state
    setShowSuggestions(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setPhoto(selectedFile);
      setPhotoUrl(URL.createObjectURL(selectedFile)); // Create a URL for the selected file
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: institutionName,
      contactEmail: email,
      contactPhone: phone,
      address: address, // Pass the correct address state
      type,
      description,
      photo,
    });
  };

  return (
    <div className="min-h-screen bg-[#E5E5CB] flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-[#3C2A21] p-3 z-10">
        <div className="text-[#D5CEA3] font-bold text-lg">Logo</div>
        <Link href="/" className="text-[#D5CEA3] hover:underline">
          Back to home
        </Link>
      </div>

      <h3 className="text-lg md:text-xl font-bold mt-16 text-center text-[#3C2A21] px-4">
        Start Now to Submit Your Join Request!
      </h3>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-[#E5E5CB] p-8 rounded-lg shadow-md mt-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex justify-center mt-4">
              <div className="w-32 h-32 border-2 border-dashed border-[#3C2A21] rounded-full flex items-center justify-center overflow-hidden relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="opacity-0 absolute inset-0 cursor-pointer"
                />
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Selected"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center text-[#3C2A21]">
                    <span className="text-lg font-small">Tap to select </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="institutionName" className="block text-[#3C2A21]">Institution Name</label>
              <input
                type="text"
                id="institutionName"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
                placeholder="Enter your institution name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[#3C2A21]">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
                placeholder="Enter your institution email"
                required
                pattern=".+@.+\.edu|.+@.+\.ac|.+@yourinstitution\.edu" // Adjust to your specific institution email pattern
                title="Please enter a valid institution email address."
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-[#3C2A21]">Type</label>
              <CustomSelect
                value={type}
                onChange={setType}
                options={['MUSEUM', 'CHURCH', 'LIBRARY','SCHOOL', 'OTHER']}
              
              />
            </div>
           
            <div>
              <label htmlFor="location" className="block text-[#3C2A21]">Location</label>
              <input
                type="text"
                id="location" // Update ID to location
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value); // Use address state
                  setShowSuggestions(true);
                }}
                className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
                placeholder="Type to search"
                required
              />
              {showSuggestions && address && (
                <ul className="border border-[#3C2A21] rounded-md mt-1 bg-[#E5E5CB]">
                  {filteredAddressOptions.map((loc, index) => (
                    <li
                      key={index}
                      onClick={() => handleLocationSelect(loc)}
                      className="cursor-pointer p-2 hover:bg-[#3C2A21] hover:text-[#D5CEA3]"
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-[#3C2A21]">Phone</label>
              <div className="flex mt-1">
                <span className="p-2 border border-[#3C2A21] rounded-l-md bg-[#D5CEA3] text-[#3C2A21]">
                  +251
                </span>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                    setPhone(value);
                  }}
                  className="block w-full p-2 border border-[#3C2A21] rounded-r-md bg-transparent focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-[#3C2A21]">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
                placeholder="Description"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="py-2 px-6 bg-[#3C2A21] text-white rounded-md hover:bg-[#2d1a14] transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
