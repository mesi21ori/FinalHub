"use client";

import React, { useEffect, useState } from "react";
import * as yup from "yup"; // Import yup for form validation
import PhotoField from "../../../../components/PhotoField"; // Import PhotoField component
import Button from "../../../../components/Button"; // Reusable Button component
import InputField from "../../../../components/InputField"; // Reusable InputField component
import CustomDropdown from "../../../../components/CustomDropdown"; // Import your CustomDropdown component
import Notification from "../../../../components/Notification"; // Import the Notification component
import ConfirmationModal from "../../../../components/ConfirmationModal"; // Import ConfirmationModal

// Function to validate Ethiopian date
const isValidEthiopianDate = (dob: string) => {
  const [year, month, day] = dob.split("/").map(Number);
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 13; // Minimum age: 13 years
  const errors: any = {};

  // Check if the user is at least 13 years old
  if (year > minYear || year < 1900) {
    errors.year = "You must be at least 13 years old to sign up.";
  }

  // Ethiopian months: 1-13
  if (month < 1 || month > 13) {
    errors.month = "Month must be between 1 and 13.";
  }

  // Ethiopian days: 1-30 for each month
  if (day < 1 || day > 30) {
    errors.day = "Day must be between 1 and 30.";
  }

  return errors;
};

// Define the Yup validation schema
const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
    dateOfBirth: yup
    .string()
    .required("Date of Birth is required")
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, "Date of Birth must be in the format YYYY/MM/DD")
    .test("is-valid-ethiopian-date", "Invalid Date of Birth", (dateOfBirth, ctx) => {
      const errors = isValidEthiopianDate(dateOfBirth || "");
      if (errors.year) return ctx.createError({ message: errors.year });
      if (errors.month) return ctx.createError({ message: errors.month });
      if (errors.day) return ctx.createError({ message: errors.day });
      return true; // Valid if no errors
    }),
  gender: yup.string().required("Gender is required").oneOf(["MALE", "FEMALE",], "Please select a valid gender"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
});

const ProfilePage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between view and edit mode
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null); // State for profile photo
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({}); // Initialize form data
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Validation errors
  const [notificationVisible, setNotificationVisible] = useState(false); // State for notification visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // Notification message
  const [notificationType, setNotificationType] = useState<"success" | "error" | "warning">("success"); // Notification type
  const [isModalOpen, setIsModalOpen] = useState(false); // State for confirmation modal
  const [userId, setUserId] = useState<string | null>(null); // Store userId in the state

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safely access sessionStorage only on the client side
      const userIdFromStorage = sessionStorage.getItem("userId");
      setUserId(userIdFromStorage); // Store the userId in the state
    }
  }, []);
  

  useEffect(() => {
    if (userId) {
      // Fetch user data using userId
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/auth/${userId}`);
          const data = await response.json();
          console.log("Fetched data: ", data); 
          if (response.ok) {
            setFormData({
              profilePicture:data.profilePicture,
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              email: data.email,
              dateOfBirth: data.dateOfBirth,
              gender: data.gender,
              password: data.password,
            });
            setProfilePhoto(data.profilePhoto); // Set the profile photo if available
          } else {
            showNotification("Failed to load user data.", "error");
          }
        } catch (error) {
          showNotification("Error fetching user data.", "error");
        }
      };

      fetchUserData(); // Call the function to fetch user data
    }
  }, [userId]);

  // Validate the form data before saving
  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true; // Form is valid
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message; // Map errors
      });
      setErrors(newErrors); // Update errors state
      return false; // Form is invalid
    }
  };

  // Show notification
  const showNotification = (message: string, type: "success" | "error" | "warning") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setNotificationVisible(true);
  };

  // Handle input field changes
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle profile photo change
  const handlePhotoChange = (file: File | null) => {
    setProfilePhoto(file); // Update profile photo immediately
  };

  // Handle logout confirmation
  const confirmLogout = () => {
    // Logic for logging out the user
    console.log("User logged out");
    showNotification("You have logged out successfully.", "success"); // Show success notification
    setIsModalOpen(false); // Close the modal
  };

  // Save the profile data
  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
  
    if (!userId) {
      showNotification("User ID is missing. Please log in again.", "error");
      return;
    }
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key] as string);
    });
  
    // Append the userId to formData
    formDataToSend.append("userId", userId);
  
    if (profilePhoto) {
      formDataToSend.append("profilePicture", profilePhoto);
    }
  
    try {
      const response = await fetch('/api/auth/edit', {
        method: 'PUT',
        body: formDataToSend,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setFormData((prev) => ({ ...prev, ...formData }));
        setIsEditMode(false);
        setErrors({}); // Reset validation errors
        showNotification('Profile updated successfully!', 'success');
      } else {
        showNotification(result.message, 'error');
      }
    } catch (error) {
      showNotification('Failed to update profile. Please try again later.', 'error');
    }
  };
  

  // Cancel the changes and show confirmation modal
  const handleCancel = () => {
    setIsEditMode(false); // Open confirmation modal
  };

  // Enable edit mode
  const handleEdit = () => {
    setIsEditMode(true); // Enable edit mode
  };

  // Open logout confirmation modal
  const handleLogout = () => {
    setIsModalOpen(true); // Open confirmation modal for logout
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#3C2A21]">Profile</h1>
      
      {/* Notification Component */}
      <Notification 
        message={notificationMessage} 
        type={notificationType} 
        visible={notificationVisible} 
        onClose={() => setNotificationVisible(false)} 
      />

      {/* Confirmation Modal for Logout */}
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmLogout}
        message="Are you sure you want to log out?"
      />

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* First Column - Profile Photo */}
        <div className="flex flex-col items-center justify-center">
          <PhotoField
            profilePicture={profilePhoto}
            onProfilePictureChange={isEditMode ? handlePhotoChange : () => {}}
            isEditable={isEditMode}
          />
        </div>

        {/* Second Column - First Name, Last Name, Username */}
        <div>
          {["firstName", "lastName", "username"].map((key) => (
            <div key={key} className="mt-4">
              {isEditMode ? (
                <InputField
                  id={key}
                  type="text"
                  label={key === "firstName" ? "First Name" : key === "lastName" ? "Last Name" : "Username"}
                  value={formData[key] as string}
                  onChange={(val) => handleInputChange(key, val)}
                  placeholder={`Enter your ${key}`}
                  error={errors[key]}
                />
              ) : (
                <div>
                  <label className="block text-[#3e251c] font-bold">
                    {key === "firstName" ? "First Name" : key === "lastName" ? "Last Name" : "Username"}:
                  </label>
                  <p className="mt-1 text-[#3C2A21]">
                    {formData[key] !== undefined ? formData[key] : "Not provided"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Third Column - Email, DOB, Gender, Password */}
        <div>
          {/* Date of Birth Input */}
          <div className="mt-4">
            {isEditMode ? (
              <InputField
                id="dateOfBirth"
                type="text"
                label="Date of Birth (YYYY/MM/DD)"
                value={formData.dateOfBirth as string}
                onChange={(val) => handleInputChange("dateOfBirth", val)}
                placeholder="YYYY/MM/DD"
                error={errors.dateOfBirth}
              />
            ) : (
              <div>
                <label className="block text-[#3e251c] font-bold">Date of Birth:</label>
                <p className="mt-1 text-[#3C2A21]">{formData.dateOfBirth !== undefined ? formData.dateOfBirth : "Not provided"}</p>
              </div>
            )}
          </div>

          {/* Gender Dropdown */}
          <div className="mt-4">
            {isEditMode ? (
              <CustomDropdown
                label="Gender"
                options={["male", "female", "other"]}
                selectedOption={formData.gender as string}
                onOptionSelect={(value) => handleInputChange("gender", value)}
                error={errors.gender}
              />
            ) : (
              <div>
                <label className="block text-[#3e251c] font-bold">Gender:</label>
                <p className="mt-1 text-[#3C2A21]">{formData.gender !== undefined ? formData.gender : "Not provided"}</p>
              </div>
            )}
          </div>

          {/* Other Fields */}
          {["email", "password"].map((key) => (
            <div key={key} className="mt-4">
              {isEditMode ? (
                <InputField
                  id={key}
                  type={key === "email" ? "email" : "password"}
                  label={key === "email" ? "Email" : "Password"}
                  value={formData[key] as string}
                  onChange={(val) => handleInputChange(key, val)}
                  placeholder={`Enter your ${key}`}
                  error={errors[key]}
                />
              ) : (
                <div>
                  <label className="block text-[#3e251c] font-bold">
                    {key === "email" ? "Email" : "Password"}:
                  </label>
                  <p className="mt-1 text-[#3C2A21]">
                    {formData[key] !== undefined ? formData[key] : "Not provided"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center md:justify-start md:ml-10">
        {isEditMode ? (
          <>
            <Button onClick={handleSave} variant="view" size="md">Save</Button>
            <div className="ml-8">
              <Button onClick={handleCancel} variant="border" size="md">Cancel</Button>
            </div>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} variant="view" size="md">Edit</Button>
            <div className="ml-8">
              <Button onClick={handleLogout} variant="border" size="md">Log Out</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
