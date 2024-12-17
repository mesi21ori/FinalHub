"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { faArrows } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../components/Button";
import CustomDropdown from "../../../../components/CustomDropdown";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import DatePicker from "../../../../components/DatePicker";
import DynamicFields from "../../../../components/DynamicFields";
import InputField from "../../../../components/InputField";
import TimePicker from "../../../../components/TimePicker";
import Notification from "../../../../components/Notification";

// Validation schema using Yup
const videoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  //alternativeTitle: Yup.string().required("AlternativeTitle is required"),
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
  preservationStatus: Yup.string().required("Preservation Status is required"),
  source: Yup.string().required("Source is required"),
  eventDate: Yup.string().required("Event Date is required"),
  //publicationDate: Yup.string().required(" publication Date is required"),
  location: Yup.string().required("Location is required"),
  eventType: Yup.string().required("Event Type is required"),
  significance: Yup.string().required("Significance is required"),
  historicalFigures: Yup.string().required("Historical Figures is required"),
  //accessLevel: Yup.string().required("AccessLevel is required"),
  ageRating: Yup.string().required("Age Rating is required"),
  videoUrl: Yup.mixed()
    .required("Video URL is required")
    .test("fileType", "Unsupported file type", (value) => {
      const file = value as File;
      return file && file.type.startsWith("video/");
    }),
  coverImage: Yup.mixed()
    .required("Cover Image is required")
    .test("fileType", "Unsupported file type", (value) => {
      const file = value as File;
      return file && file.type.startsWith("image/");
    }),
});

const UploadVideoPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    alternativeTitle:"",
    description: "",
    publisher: "",
    copyrightHolder: "",
    language: "",
    resolution: "",
    subtitles: "",
    videoUrl: null,
    coverImage: null,
    duration: "",
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
    accessLevel:"",
    ageRating: "",
    publicationDate:""
  });

  const [errors, setFormErrors] = useState<Record<string, string>>({});
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success" as "success" | "error" | "warning",
    visible: false,
  });

  const handleInputChange = (value: string, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // Clear the error for the field that is being changed
    if (errors[field]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
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
  };

const handleRadioChange = (field: "source", value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = fieldName === "videoUrl" && file.type.startsWith("video/");
    const isImage = fieldName === "coverImage" && file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: fieldName === "videoUrl" ? "Unsupported video file type." : "Unsupported image file type.",
      }));
      return;
    }

    setFormErrors((prev) => ({ ...prev, [fieldName]: "" })); // Clear previous error for this field

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
  };

  const handleCastValuesChange = (values: string[], field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: values.join(", "),
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      eventDate: date,
    }));

    if (errors["eventDate"]) {
      setFormErrors((prev) => ({ ...prev, eventDate: 'undefined' }));
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     // Clear errors and enable loading state
  //     setIsLoading(true);
  
  //     // Validate form data with Yup
  //     await videoSchema.validate(formData, { abortEarly: false });
  
  //     // Simulate a network request (replace with your actual API call)
  //     console.log("Form Submitted:", formData);
  
  //     // Reset the form after successful submission

  //     setFormData({
  //       title: "",
  //       alternativeTitle:"",
  //       description: "",
  //       publisher: "",
  //       copyrightHolder: "",
  //       language: "",
  //       resolution: "",
  //       subtitles: "",
  //       videoUrl: null,
  //       coverImage: null,
  //       duration: "",
  //       preservationStatus: "",
  //       source: "",
  //       eventDate: "",
  //       location: "",
  //       eventType: "",
  //       significance: "",
  //       historicalFigures: "",
  //       director: "",
  //       producer: "",
  //       cameraman: "",
  //       cinematographer: "",
  //       cast: "",
  //       relatedArtifacts: "",
  //       accessLevel:"",
  //       ageRating: "",
  //       publicationDate:"",
  //     });

  //     setNotification({
  //       message: "Form submitted successfully!",
  //       type: "success",
  //       visible: true,
  //     });
  //   } catch (error) {
  //     console.log("Validation Errors:", error); // Log validation errors if needed
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // Clear errors and enable loading state
      setIsLoading(true);
  
      // Validate form data with Yup
      await videoSchema.validate(formData, { abortEarly: false });
  
      // Create a new FormData object to send files and other data
      const formDataToSend = new FormData();
  
      // Add all form data to FormData object
      formDataToSend.append('title', formData.title);
      formDataToSend.append('alternativeTitle', formData.alternativeTitle);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('publisher', formData.publisher);
      formDataToSend.append('copyrightHolder', formData.copyrightHolder);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('resolution', formData.resolution);
      formDataToSend.append('subtitles', JSON.stringify(formData.subtitles)); // If it's an array, stringifying it
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('preservationStatus', formData.preservationStatus);
      formDataToSend.append('source', formData.source);
      formDataToSend.append('eventDate', formData.eventDate);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('eventType', formData.eventType);
      formDataToSend.append('significance', formData.significance);
      formDataToSend.append('historicalFigures', JSON.stringify(formData.historicalFigures)); // If it's an array, stringifying it
      formDataToSend.append('director', JSON.stringify(formData.director));
      formDataToSend.append('producer', JSON.stringify(formData.producer));
      formDataToSend.append('cameraman', JSON.stringify(formData.cameraman));
      formDataToSend.append('cinematographer', JSON.stringify(formData.cinematographer));
      formDataToSend.append('cast', JSON.stringify(formData.cast));
      formDataToSend.append('relatedArtifacts', JSON.stringify(formData.relatedArtifacts));
      formDataToSend.append('accessLevel', formData.accessLevel);
      formDataToSend.append('ageRating', formData.ageRating);
      formDataToSend.append('publicationDate', formData.publicationDate);
  
      // Retrieve uploaderId and institutionId from localStorage
      const uploaderId = localStorage.getItem('userId');
      const institutionId = localStorage.getItem('institutionId');
  
      // Add these values to the form data
      if (uploaderId && institutionId) {
        formDataToSend.append('uploaderId', uploaderId);
        formDataToSend.append('institutionId', institutionId);
      } else {
        throw new Error('Uploader ID and Institution ID are required');
      }
  
      // Add files (video and cover image) to FormData object
      if (formData.videoUrl) {
        formDataToSend.append('videoUrl', formData.videoUrl); // Assuming formData.videoUrl is a file
      } else {
        throw new Error('Video is required');
      }
  
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage); // Assuming formData.coverImage is a file
      } else {
        throw new Error('Cover Image is required');
      }
  
      // Make the POST request to your API (backend)
      const response = await fetch('/api/content/upload-video', {
        method: 'POST',
        body: formDataToSend,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Handle success response
        console.log('Form Submitted Successfully:', result);
        setNotification({
          message: 'Form submitted successfully!',
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
          videoUrl: null,
          coverImage: null,
          duration: "",
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
          accessLevel: "",
          ageRating: "",
          publicationDate: "",
        });
      } else {
        throw new Error(result.message || 'An error occurred during form submission');
      }
    } catch (error: unknown) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        console.log('Validation Errors:', error.message); // Log error message
        setNotification({
          message: error.message || 'Form submission failed',
          type: 'error',
          visible: true,
        });
      } else {
        // Handle the case where error is not an instance of Error (optional)
        console.log('An unknown error occurred');
        setNotification({
          message: 'An unknown error occurred',
          type: 'error',
          visible: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  


  useEffect(() => {
    const validateForm = async () => {
      try {
        await videoSchema.validate(formData, { abortEarly: false });
        setIsEnabled(true);
      } catch {
        setIsEnabled(false);
      }
    };

    validateForm();
  }, [formData]);

const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        
        <Button onClick={() => router.push("/uploader-dashboard/videos")} variant="view" className="flex items-center">
          <FontAwesomeIcon icon={faArrows} className="mr-1" />
          Back to Video Lists
        </Button>
      </div>
      <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 */}
          <div className="flex flex-col space-y-4 font-medium">
            <InputField
              id="title"
              type="text"
              label="Title"
              required
              value={formData.title}
              onChange={(value) => handleInputChange(value, "title")}
              placeholder="Enter title"
            />
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
            <InputField
              id="publisher"
              type="text"
              label="Publisher"
              required
              value={formData.publisher}
              onChange={(value) => handleInputChange(value, "publisher")}
              placeholder="Enter publisher"
            />
            <InputField
              id="copyrightHolder"
              type="text"
              label="Copyright Holder"
              required
              value={formData.copyrightHolder}
              onChange={(value) => handleInputChange(value, "copyrightHolder")}
              placeholder="Enter copyright Holder"
            />
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
            <DatePicker
              label="Event Date"
              required
              name="eventDate"
              value={formData.eventDate}
              onChange={handleDateChange}
            />
            <CustomDropdown
              label="Event Type"
              required
              selectedOption={String(formData.eventType)}
              onOptionSelect={(value) => handleDropdownChange("eventType", String(value))}
              options={["WAR", "POLITICS", "RELIGION", "CULTURE", "FAMINE_CRISIS", "CIVIL_RIGHTS", "ECONOMY", 
    "DIPLOMACY", "LEADERSHIP", "ETHNIC_MOVMENTS"]}
            />
            <InputField
              id="significance"
              type="textarea"
              label="Significance"
              required
              value={formData.significance}
              onChange={(value) => handleInputChange(value, "significance")}
              placeholder="Enter significance"
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
          <CustomDropdown
              label="Acess Level"
              required
              selectedOption={String(formData.accessLevel)}
              onOptionSelect={(value) => handleDropdownChange("accessLevel", String(value))}
              options={["PRIVATE", "PUBLIC", "RESTRICTED"]}
            />
            <CustomDropdown
              label="Age Rating"
              required
              selectedOption={String(formData.ageRating)}
              onOptionSelect={(value) => handleDropdownChange("ageRating", String(value))}
              options={["General Audience", "Parental Guidance", "PG-13", "Restricted"]}
            />
            <DatePicker
              label="Publication Date"
              required
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleDateChange}
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
            <CustomDropdown
              label="Preservation Status"
              required
              selectedOption={String(formData.preservationStatus)}
              onOptionSelect={(value) => handleDropdownChange("preservationStatus", String(value))}
              options={["Restored", "Good Condition", "Damaged"]}
            />
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
            </div>
          </div>

{/* Column 3 */}
          <div className="flex flex-col space-y-4">
            <InputField
              id="location"
              type="text"
              label="Location"
              required
              value={formData.location}
              onChange={(value) => handleInputChange(value, "location")}
              placeholder="Enter location"
            />
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
              {errors.videoUrl && <p className="text-red-500">{errors.videoUrl}</p>}
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
              {errors.coverImage && <p className="text-red-500">{errors.coverImage}</p>}
            </div>
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
            <Button variant="border" onClick={() => router.push("/uploader-dashboard/videos")}
              className="mt-4 mb-12">
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