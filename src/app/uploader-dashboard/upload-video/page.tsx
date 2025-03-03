"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrows } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import CustomDropdown from "../../../../components/CustomDropdown";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import DynamicFields from "../../../../components/DynamicFields";
import InputField from "../../../../components/InputField";
import TimePicker from "../../../../components/TimePicker";
import Notification from "../../../../components/Notification"; // Ensure this import statement is correct

// Function to check if a year is a leap year in the Ethiopian calendar
const isLeapYear = (year: number): boolean => {
  return year % 4 === 3; // Corrected the leap year check to match Ethiopian calendar rules
};

// Combined validation schema using Yup
const videoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  publisher: Yup.string().required("Publisher is required"),
  copyrightHolder: Yup.string().required("Copyright Holder is required"),
  language: Yup.string().required("Language is required"),
  subtitles: Yup.string().optional(),
  duration: Yup.string().required("Duration is required"),
  director: Yup.string().optional(),
  producer: Yup.string().optional(),
  cameraman: Yup.string().optional(),
  cinematographer: Yup.string().optional(),
  cast: Yup.string().optional(),
  source: Yup.string().required("Source is required"),
  accessLevel: Yup.string().required("Access Level is required"),
  eventDate: Yup.string()
    .required("Event Date is required")
    .test("is-ethiopian-date", "Invalid Event Date", (value) => {
      const match = value?.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if (!match) return false;

      const [_, yearStr, monthStr, dayStr] = match;
      const year = Number(yearStr);
      const month = Number(monthStr);
      const day = Number(dayStr);

      if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
      if (month < 1 || month > 13) return false; // Month must be between 1 and 13
      if (day < 1 || day > 30) return false; // Days must be at least 1
      
      // Handle Pagumē (the 13th month)
      if (month === 13 && (day < 1 || day > (isLeapYear(year) ? 6 : 5))) {
        return false; // 5 days in a common year and 6 in a leap year
      }
      return true; // Passes validation
    }),
  publicationDate: Yup.string()
    .required("Publication Date is required")
    .test("is-ethiopian-date", "Invalid Publication Date", (value) => {
      const match = value?.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      if (!match) return false;

      const [_, yearStr, monthStr, dayStr] = match;
      const year = Number(yearStr);
      const month = Number(monthStr);
      const day = Number(dayStr);

      if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
      if (month < 1 || month > 13) return false; // Month must be between 1 and 13
      if (day < 1 || day > 30) return false; // Days must be at least 1
      
      // Handle Pagumē (the 13th month)
      if (month === 13 && (day < 1 || day > (isLeapYear(year) ? 6 : 5))) {
        return false; // 5 days in a common year and 6 in a leap year
      }
      return true; // Passes validation
    }),
  videoUrl: Yup.mixed()
    .required("Video URL is required")
    .test("fileType", "Unsupported video file type", (value) => {
      const file = value as File;
      return file && file.type.startsWith("video/");
    })
    .test("fileSize", "File size is too large", (value) => {
      const file = value as File;
      return file && file.size <= 2 * 1024 * 1024 * 1024; // Limit to 2 GB
    }),
  coverImage: Yup.mixed()
    .required("Cover Image is required")
    .test("fileType", "Unsupported image file type", (value) => {
      const file = value as File;
      return file && file.type.startsWith("image/");
    })
    .test("fileSize", "File size is too large", (value) => {
      const file = value as File;
      return file && file.size <= 5 * 1024 * 1024; // Limit to 5 MB
    }),
});

const UploadVideoPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    alternativeTitle: "",
    description: "",
    publisher: "",
    copyrightHolder: "",
    language: "",
    resolution: "",
    subtitles: "",
    accessLevel: "",
    videoUrl: null,
    coverImage: null,
    duration: "",
    preservationStatus: "",
    source: "",
    publicationDate: "",
    eventDate: "",
    location: "",
    eventType: "",
    significance: "",
    historicalFigures: "",
    director: "",
    producer: "",
    cameraman: "",
    cinematographer: "",
    cast: "",
    relatedArtifacts: "",
    ageRating: "",
  });

  const [errors, setFormErrors] = useState<Record<string, string>>({});
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success" as "success" | "error" | "warning",
    visible: false,
  });
  
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({}); // Track touched fields to manage error display

  // Validate form data
  const validateFormData = async () => {
    try {
      await videoSchema.validate(formData, { abortEarly: false });
      setIsEnabled(true);
      setFormErrors({}); // Clear all errors if validation is successful
    } catch (err) {
      setIsEnabled(false);
      const newErrors: Record<string, string> = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          newErrors[error.path!] = error.message;
        });
      }
      setFormErrors(newErrors);
    }
  };

  useEffect(() => {
    validateFormData();
  }, [formData]);

  const handleInputChange = (value: string, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }

    // Mark field as touched
    setFormTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
  };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (errors[field]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }

    setFormTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
  };

  const handleRadioChange = (field: "source", value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    setFormTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = fieldName === "videoUrl" && file.type.startsWith("video/");
    const isImage = fieldName === "coverImage" && file.type.startsWith("image/");

    // If the file type is not valid
    if (!isVideo && !isImage) {
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: fieldName === "videoUrl" ? "Unsupported video file type." : "Unsupported image file type.",
      }));
      return;
    }

    // Clear previous error for this field
    setFormErrors((prev) => ({ ...prev, [fieldName]: "" }));

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));

    // Mark field as touched
    setFormTouched((prevTouched) => ({
      ...prevTouched,
      [fieldName]: true,
    }));
  };

  const handleCastValuesChange = (values: string[], field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: values.join(", "),
    }));
  };

  const handleSubmit = async () => {
    try {
      // Clear errors and enable loading state
      setIsLoading(true);
      setFormErrors({}); // Reset errors on submit
  
      // Validate form data with Yup
      await videoSchema.validate(formData, { abortEarly: false });
  
      console.log("Form Submitted:", formData); // Log the form data
  
      // Prepare FormData to send with the request
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('alternativeTitle', formData.alternativeTitle);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('publisher', formData.publisher);
      formDataToSend.append('copyrightHolder', formData.copyrightHolder);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('resolution', formData.resolution);
      formDataToSend.append('subtitles', formData.subtitles);
      formDataToSend.append('accessLevel', formData.accessLevel);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('publicationDate', formData.publicationDate);
      formDataToSend.append('preservationStatus', formData.preservationStatus);
      formDataToSend.append('source', formData.source);
      formDataToSend.append('eventDate', formData.eventDate);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('eventType', formData.eventType);
      formDataToSend.append('significance', formData.significance);
      formDataToSend.append('historicalFigures', formData.historicalFigures);
      formDataToSend.append('director', formData.director);
      formDataToSend.append('producer', formData.producer);
      formDataToSend.append('cameraman', formData.cameraman);
      formDataToSend.append('cinematographer', formData.cinematographer);
      formDataToSend.append('cast', formData.cast);
      formDataToSend.append('relatedArtifacts', formData.relatedArtifacts);
      formDataToSend.append('ageRating', formData.ageRating);
  
      // Append uploaderId and institutionId
      const uploaderId = sessionStorage.getItem('userId');
      const institutionId = sessionStorage.getItem('institutionId');
      formDataToSend.append("uploaderId", uploaderId || ""); 
      formDataToSend.append("institutionId", institutionId || ""); 
  
      // Append video file and cover image file to FormData
      if (formData.videoUrl) formDataToSend.append('videoUrl', formData.videoUrl);
      if (formData.coverImage) formDataToSend.append('coverImage', formData.coverImage);
  
      // Send the form data to the backend
      const response = await fetch('/api/content/video/upload-video', {
        method: 'POST',
        body: formDataToSend,
      });
  
      // Check if the response is valid JSON
      if (response.ok) {
        const result = await response.json();
        setNotification({
          message: result.message,
          type: 'success',
          visible: true,
        });
  
        // Reset the form after successful submission
        setFormData({
          title: "",
          alternativeTitle: "",
          description: "",
          publisher: "",
          copyrightHolder: "",
          language: "",
          resolution: "",
          subtitles: "",
          accessLevel: "",
          videoUrl: null,
          coverImage: null,
          duration: "",
          publicationDate: "",
          preservationStatus: "",
          source: "",
          eventDate: "",
          location: "",
          eventType: "",
          significance: "",
          historicalFigures: "",
          director: "",
          producer: "",
          cameraman: "",
          cinematographer: "",
          cast: "",
          relatedArtifacts: "",
          ageRating: "",
        });
      } else {
        // If not OK, handle error
        const error = await response.json();
        setNotification({
          message: error.message,
          type: 'error',
          visible: true,
        });
      }
    } catch (error) {
      console.log("Error occurred while submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="p-6 bg-[#f7f4f0]">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => router.push("/uploader-dashboard/videos")} variant="view" className="flex items-center">
          <FontAwesomeIcon icon={faArrows} className="mr-1" />
          Back to Video Lists
        </Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          {/* Column 1 */}
          <div className="flex flex-col space-y-4 font-medium">
            <div>
              <div className="flex items-center">
                <label htmlFor="videoUrl" className="block mb-2">Upload Video</label>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, "videoUrl")}
              />
              {formTouched.videoUrl && errors.videoUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.videoUrl}</p>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <label htmlFor="coverImage" className="block mb-2">Upload Cover Image</label>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "coverImage")}
              />
              {formTouched.coverImage && errors.coverImage && (
                <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
              )}
            </div>
            <InputField
              id="title"
              type="text"
              label="Title"
              required
              value={formData.title}
              onChange={(value) => handleInputChange(value, "title")}
              placeholder="Enter title"
            />
            {formTouched.title && errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
            <InputField
              id="alternativeTitle"
              type="text"
              label="Alternative Title"
              value={formData.alternativeTitle}
              onChange={(value) => handleInputChange(value, "alternativeTitle")}
              placeholder="Enter alternative title"
            />
            <InputField
              id="description"
              type="textarea"
              label="Description"
              required
              value={formData.description}
              onChange={(value) => handleInputChange(value, "description")}
              placeholder="Enter description"
            />
            {formTouched.description && errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
            <InputField
              id="eventDate"
              type="text"
              label="Event Date"
              required
              value={formData.eventDate}
              onChange={(value) => handleInputChange(value, "eventDate")}
              placeholder="YYYY-MM-DD" // Placeholder format
            />
            {formTouched.eventDate && errors.eventDate && (
              <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
            )}
            <CustomDropdown
              label="Event Type"
              required
              selectedOption={String(formData.eventType)}
              onOptionSelect={(value) => handleDropdownChange("eventType", String(value))}
              options={["War", "Politics", "Religion", "Culture", "Famine & Crisis", "Civil Rights", "Economy", "Diplomacy", "Leadership", "Ethnic Movements"]}
            />
            <InputField
              id="publisher"
              type="text"
              label="Publisher"
              required
              value={formData.publisher}
              onChange={(value) => handleInputChange(value, "publisher")}
              placeholder="Enter publisher"
            />
            {formTouched.publisher && errors.publisher && (
              <p className="text-red-500 text-sm mt-1">{errors.publisher}</p>
            )}
            <InputField
              id="copyrightHolder"
              type="text"
              label="Copyright Holder"
              required
              value={formData.copyrightHolder}
              onChange={(value) => handleInputChange(value, "copyrightHolder")}
              placeholder="Enter copyright Holder"
            />
            {formTouched.copyrightHolder && errors.copyrightHolder && (
              <p className="text-red-500 text-sm mt-1">{errors.copyrightHolder}</p>
            )}
            <InputField
              id="significance"
              type="textarea"
              label="Significance"
              required
              value={formData.significance}
              onChange={(value) => handleInputChange(value, "significance")}
              placeholder="Enter significance"
            />
            <CustomDropdown
              label="Preservation Status"
              required
              selectedOption={String(formData.preservationStatus)}
              onOptionSelect={(value) => handleDropdownChange("preservationStatus", String(value))}
              options={["Restored", "Good Condition", "Damaged"]}
            />
            <InputField
              id="location"
              type="text"
              label="Location"
              required
              value={formData.location}
              onChange={(value) => handleInputChange(value, "location")}
              placeholder="Enter location"
            />
            {formTouched.location && errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
            <CustomDropdown
              label="Language"
              required
              selectedOption={String(formData.language)}
              onOptionSelect={(value) => handleDropdownChange("language", String(value))}
              options={["Amharic", "Geez", "Afan Oromo", "Tigrinya", "Somali", "Afar", "Wolaytta", "English"]}
            />
            <DynamicFields
              fieldLabel="Subtitle"
              placeholder="Enter Subtitle"
              onChange={(values) => handleCastValuesChange(values, "subtitles")}
            />
            <DynamicFields
              fieldLabel="Historical Figures"
              required
              placeholder="Enter historical figures"
              onChange={(values) => handleCastValuesChange(values, "historicalFigures")}
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-4">
            <div className="col-span-2">
              <div className="flex items-center">
                <label className="block text-md text-[#3e251c] font-medium mb-2 ml-1">Source</label>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </div>
              <CustomRadioButton
                name="source"
                label="Primary"
                value="Primary"
                checked={formData.source === "Primary"}
                onChange={() => handleRadioChange("source", "Primary")}
              />
              <CustomRadioButton
                name="source"
                label="Secondary"
                value="Secondary"
                checked={formData.source === "Secondary"}
                onChange={() => handleRadioChange("source", "Secondary")}
              />
              {formTouched.source && errors.source && (
                <p className="text-red-500 text-sm mt-1">{errors.source}</p>
              )}
            </div>
            <CustomDropdown
              label="Access Level"
              required
              selectedOption={String(formData.accessLevel)}
              onOptionSelect={(value) => handleDropdownChange("accessLevel", String(value))}
              options={["Public", "Premium", "Researcher"]}
            />
            <CustomDropdown
              label="Age Rating"
              required
              selectedOption={String(formData.ageRating)}
              onOptionSelect={(value) => handleDropdownChange("ageRating", String(value))}
              options={["General Audience", "Parental Guidance", "PG-13", "Restricted"]}
            />
            <InputField
              id="publicationDate"
              type="text"
              label="Publication Date"
              required
              value={formData.publicationDate}
              onChange={(value) => handleInputChange(value, "publicationDate")}
              placeholder="YYYY-MM-DD" // Placeholder format
            />
            {formTouched.publicationDate && errors.publicationDate && (
              <p className="text-red-500 text-sm mt-1">{errors.publicationDate}</p>
            )}
            <CustomDropdown
              label="Resolution"
              selectedOption={String(formData.resolution)}
              onOptionSelect={(value) => handleDropdownChange("resolution", String(value))}
              options={["144p", "240p", "360p", "480p", "720p", "1080p", "2K", "4K (UHD)", "8K (UHD)"]}
            />
            <TimePicker
              label="Duration"
              require
              name="duration"
              value={formData.duration}
              onChange={(value) => handleInputChange(value, "duration")}
            />
            <DynamicFields
              fieldLabel="Director"
              placeholder="Enter director name"
              onChange={(values) => handleCastValuesChange(values, "director")}
            />
            <DynamicFields
              fieldLabel="Producer"
              placeholder="Enter producer name"
              onChange={(values) => handleCastValuesChange(values, "producer")}
            />
            <DynamicFields
              fieldLabel="Cameraman"
              placeholder="Enter cameraman name"
              onChange={(values) => handleCastValuesChange(values, "cameraman")}
            />
            <DynamicFields
              fieldLabel="Cinematographer"
              placeholder="Enter cinematographer name"
              onChange={(values) => handleCastValuesChange(values, "cinematographer")}
            />
            <DynamicFields
              fieldLabel="Cast"
              placeholder="Enter cast name"
              onChange={(values) => handleCastValuesChange(values, "cast")}
            />
            <DynamicFields
              fieldLabel="Related Artifact"
              placeholder="Enter Artifact URL"
              onChange={(values) => handleCastValuesChange(values, "relatedArtifacts")}
            />
            <Button
              disabled={!isEnabled || isLoading}
              loading={isLoading}
              onClick={handleSubmit}
              className="mt-2"
              variant="view"
              size="md"
            >
              Submit
            </Button>
            <Button variant="border" onClick={() => router.push("/uploader-dashboard/videos")} className="mt-4 mb-12">
              Cancel
            </Button>
          </div>
        </div>
      </form>

      {/* Notification Component */}
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default UploadVideoPage;