"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import '../../../app/globals.css';

// Notification component
interface NotificationProps {
  message: string;
  type: "success" | "error" | "warning";
  visible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(); // Close the notification after 30 seconds
      }, 30000);
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [visible, onClose]);

  return (
    visible && (
      <div
        className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          type === "success"
            ? "bg-[#f7f4f0] border-2 border-green-500 text-black"
            : type === "error"
            ? "bg-[#f7f4f0] border-2 border-yellow-500 text-black"
            : "bg-yellow-500 text-black"
        }`}
        style={{ zIndex: 9999 }}
      >
        <span>{message}</span>
        <button
          className="absolute top-0 right-0 p-1 text-black"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    )
  );
};

// CustomSelect component
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling up to the form
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (e: React.MouseEvent, option: string) => {
    e.stopPropagation(); // Prevent event from bubbling up
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full p-2 border border-[#F7F4F0] rounded-md bg-[#F7F4F0] text-[#3A2F2C] text-left"
      >
        {value || 'Select One'}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-[#F7F4F0] border border-[#3A2F2C] rounded-md mt-1">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={(e) => handleOptionClick(e, option)}
              className="p-2 cursor-pointer hover:bg-[#3A2F2C] hover:text-[#F7F4F0]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


// InstitutionCreatePage component
const InstitutionCreatePage: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    registrationNumber: string;
    address: string;
    website: string;
    emailDomain: string;
    collaborationPurpose: string;
    establishDate: string;
    numberOfEmploy: string; 
    Phone: string;
    type: 'MUSEUM' | 'CHURCH' | 'LIBRARY' | 'SCHOOL' | 'OTHER'; 
    adminEmail: string;
    adminFirstName: string;
    adminLastName: string;
    adminGender: 'MALE' | 'FEMALE';
    adminUsername: string;
    adminPassword: string;
  }>({
    name: '',
    registrationNumber: '',
    address: '',
    website: '',
    emailDomain: '',
    collaborationPurpose: '',
    establishDate: '',
    numberOfEmploy: '',
    Phone: '',
    type: 'MUSEUM',
    adminEmail: '',
    adminFirstName: '',
    adminLastName: '',
    adminGender: 'MALE',
    adminUsername: '',
    adminPassword: '',
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning";
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'document') => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (type === 'photo') {
        setPhotoFile(file);
      } else if (type === 'document') {
        setDocumentFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numberOfEmploy = parseInt(formData.numberOfEmploy, 10); 

    if (isNaN(numberOfEmploy)) {
      setNotification({
        message: "Invalid value for 'numberOfEmploy'. It must be a number.",
        type: 'error',
        visible: true,
      });
      return;
    }

    const formattedData = {
      ...formData,
      establishDate: new Date(formData.establishDate).toISOString(),
      numberOfEmploy,
      address: JSON.stringify({ address: formData.address }),
    };

    const formDataToSend = new FormData();

    if (photoFile) {
      formDataToSend.append('photo', photoFile);
    } else {
      setNotification({
        message: 'Please upload a photo.',
        type: 'warning',
        visible: true,
      });
      return;
    }

    if (documentFile) {
      formDataToSend.append('document', documentFile);
    }

    for (const key in formattedData) {
      formDataToSend.append(key, String(formattedData[key as keyof typeof formattedData]));
    }

    try {
      const response = await fetch('/api/institutions/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        setNotification({
          message: `Error: ${errorText}`,
          type: 'error',
          visible: true,
        });
        return;
      }

      setNotification({
        message: 'Institution and admin created successfully!',
        type: 'success',
        visible: true,
      });
    } catch (error) {
      setNotification({
        message: 'An error occurred while creating the institution.',
        type: 'error',
        visible: true,
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="min-h-screen bg-[#F7F4F0] flex flex-col pt-16">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-[#3A2F2C] p-3 z-10 shadow-lg">
        <div className="text-[#3A2F2C] font-bold text-lg">Institution Creation</div>
        <Link href="/" className="text-[#3A2F2C] hover:underline">
          Back to home
        </Link>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={handleCloseNotification}
      />

      <div className="flex-grow flex flex-col items-center overflow-y-auto" style={{ maxHeight: 'calc(100vh - 60px)' }}>
        <h3 className="text-lg md:text-xl font-bold mt-16 text-center text-[#3A2F2C] px-4">
          Create a New Institution
        </h3>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-[#F7F4F0] p-8 rounded-lg shadow-md mt-4 space-y-6 border border-[#3A2F2C]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[#3A2F2C]">Institution Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="registrationNumber" className="block text-[#3A2F2C]">Registration Number</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-[#3A2F2C]">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-[#3A2F2C]">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="emailDomain" className="block text-[#3A2F2C]">Email Domain</label>
                <input
                  type="text"
                  id="emailDomain"
                  name="emailDomain"
                  value={formData.emailDomain}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="collaborationPurpose" className="block text-[#3A2F2C]">Collaboration Purpose</label>
                <input
                  type="text"
                  id="collaborationPurpose"
                  name="collaborationPurpose"
                  value={formData.collaborationPurpose}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="Phone" className="block text-[#3A2F2C]">Contact Phone</label>
                <input
                  type="text"
                  id="Phone"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="photo" className="block text-[#3A2F2C]">Institution Photo</label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'photo')}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="document" className="block text-[#3A2F2C]">Institution Document (*.pdf)</label>
                <input
                  type="file"
                  id="document"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'document')}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-[#3A2F2C]">Type</label>
                <CustomSelect
                  value={formData.type}
                  onChange={(value) => setFormData({ ...formData, type: value as any })}
                  options={['MUSEUM', 'CHURCH', 'LIBRARY', 'SCHOOL', 'OTHER']}
                />
              </div>
              <div>
                <label htmlFor="establishDate" className="block text-[#3A2F2C]">Establish Date</label>
                <input
                  type="date"
                  id="establishDate"
                  name="establishDate"
                  value={formData.establishDate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="numberOfEmploy" className="block text-[#3A2F2C]">Number of Employees</label>
                <input
                  type="number"
                  id="numberOfEmploy"
                  name="numberOfEmploy"
                  value={formData.numberOfEmploy}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="adminFirstName" className="block text-[#3A2F2C]">Admin First Name</label>
                <input
                  type="text"
                  id="adminFirstName"
                  name="adminFirstName"
                  value={formData.adminFirstName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="adminLastName" className="block text-[#3A2F2C]">Admin Last Name</label>
                <input
                  type="text"
                  id="adminLastName"
                  name="adminLastName"
                  value={formData.adminLastName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="adminEmail" className="block text-[#3A2F2C]">Admin Email</label>
                <input
                  type="email"
                  id="adminEmail"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="adminGender" className="block text-[#3A2F2C]">Admin Gender</label>
                <select
                  id="adminGender"
                  name="adminGender"
                  value={formData.adminGender}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="adminUsername" className="block text-[#3A2F2C]">Admin Username</label>
                <input
                  type="text"
                  id="adminUsername"
                  name="adminUsername"
                  value={formData.adminUsername}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="adminPassword" className="block text-[#3A2F2C]">Admin Password</label>
                <input
                  type="password"
                  id="adminPassword"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-[#3A2F2C] rounded-md bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#3A2F2C] text-white px-6 py-2 rounded-lg shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstitutionCreatePage;
