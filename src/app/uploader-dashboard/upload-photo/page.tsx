"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrows } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../../../components/InputField";
import CustomDropdown from "../../../../components/CustomDropdown";
import DynamicFields from "../../../../components/DynamicFields";
import Button from "../../../../components/Button";
import Notification from "../../../../components/Notification";

// Function to check if a year is a leap year
const isLeapYear = (year: number) => {
  return year % 4 === 3;
};

// Custom date validation for Ethiopian dates
const ethiopianDateSchema = Yup.string()
  .required("Date is required")
  .test("is-ethiopian-date", "Invalid date format. Use 'YYYY-MM-DD'.", (value) => {
    if (!value) return false;
    const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return false;

    const [_, year, month, day] = match.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
    if (month < 1 || month > 13) return false;
    if (day < 1 || day > 30) return false;

    // Handle Pagumē (the 13th month)
    if (month === 13 && (day < 1 || day > (isLeapYear(year) ? 6 : 5))) {
      return false;
    }
    return true;
  });

const photoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  photo: Yup.mixed().required("Photo is required"),
  format: Yup.string().required("Format is required"),
  resolution: Yup.string().required("Resolution is required"),
  aspectRatio: Yup.string().required("Aspect ratio is required"),
  photoLocation: Yup.string().optional(),
  capturedDate: ethiopianDateSchema,
  photographer: Yup.string().required("Photographer is required"),
  cameraMake: Yup.string().optional(),
  cameraModel: Yup.string().optional(),
  eventType: Yup.string().required("Event Type is required"),
  historicalFigures: Yup.array().of(Yup.string()).optional(),
  accessLevel: Yup.string().required("Access Level is required"),
  relatedArticles: Yup.array().of(Yup.string()).optional(),
});

const UploadPhotoPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: null as File | null,
    photo: null as File | null,
    format: "",
    resolution: "",
    aspectRatio: "",
    photoLocation: "",
    capturedDate: "",
    photographer: "",
    cameraMake: "",
    cameraModel: "",
    eventType: "",
    historicalFigures: [] as string[],
    accessLevel: "",
    relatedArticles: [] as string[],
  });

  const [errors, setFormErrors] = useState<Record<string, string>>({});
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success" as "success" | "error" | "warning",
    visible: false,
  });

  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

  const fileTypes = ["image/jpeg", "image/png"];
  const maxFileSize = 4097152; // 4MB

  const validateFormData = async () => {
    try {
      await photoSchema.validate(formData, { abortEarly: false });
      setIsEnabled(true);
      setFormErrors({});
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

  const handleInputChange = (value: string | boolean | number | File | null, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Clear any previous errors for the updated field
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    setFormTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
  };

  const handleCastValuesChange = (values: string[], field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: values,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!fileTypes.includes(file.type)) {
        alert("Invalid file type. Only JPEG and PNG files are allowed.");
        return;
      }
      if (file.size > maxFileSize) {
        alert("File size exceeds the maximum allowed size of 4MB.");
        return;
      }
      handleInputChange(file, field);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default submission
  
    try {
      setIsLoading(true);
      setFormErrors({});
  
      // Frontend validation using Yup
      await photoSchema.validate(formData, { abortEarly: false });
  
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("format", formData.format);
      data.append("resolution", formData.resolution);
      data.append("aspectRatio", formData.aspectRatio);
      data.append("photoLocation", formData.photoLocation);
      data.append("capturedDate", formData.capturedDate);
      data.append("photographer", formData.photographer);
      data.append("cameraMake", formData.cameraMake);
      data.append("cameraModel", formData.cameraModel);
      data.append("eventType", formData.eventType);
      data.append("accessLevel", formData.accessLevel);
      data.append("historicalFigures", formData.historicalFigures?.join(",") || "");
      data.append("relatedArticles", formData.relatedArticles?.join(",") || "");
  
      // Append files with correct field names
      if (formData.photo) {
        data.append("PhotoUrl", formData.photo); // Align with backend
      }
      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }
  
      // Append uploader and institution IDs
      const uploaderId = sessionStorage.getItem("userId");
      const institutionId = sessionStorage.getItem("institutionId");
      data.append("uploaderId", uploaderId || "");
      data.append("institutionId", institutionId || "");
  
      const response = await fetch("/api/content/photo/upload-photo", {
        method: "POST",
        body: data,
      });
  
      if (response.ok) {
        setNotification({
          message: "Photo uploaded successfully!",
          type: "success",
          visible: true,
        });
  
        console.log("Form Submitted:", formData);
  
        // Reset the form
        setFormData({
          title: "",
          description: "",
          coverImage: null,
          photo: null,
          format: "",
          resolution: "",
          aspectRatio: "",
          photoLocation: "",
          capturedDate: "",
          photographer: "",
          cameraMake: "",
          cameraModel: "",
          eventType: "",
          historicalFigures: [],
          accessLevel: "",
          relatedArticles: [],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload the photo.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          newErrors[err.path!] = err.message;
        });
        setFormErrors(newErrors);
      } else {
        console.error("Error during submission:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => router.push("/uploader-dashboard/photos")} variant="view" className="flex items-center">
          <FontAwesomeIcon icon={faArrows} className="mr-1" />
          Back to Photo List
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div className="flex flex-col space-y-4">
            <div>
              <div className="flex items-center">
                <label htmlFor="photo" className="block mb-2">Upload Photo</label>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, "photo")}
              />
              {formTouched.photo && errors.photo && (
                <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
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
              id="description"
              type="textarea"
              label="Description"
              required
              value={formData.description}
              onChange={(value) => handleInputChange(value, "description")}
              placeholder="Enter description"
            />

            <CustomDropdown
              label="Format"
              required
              selectedOption={formData.format}
              onOptionSelect={(value) => handleInputChange(value, "format")}
              options={["JPEG", "PNG"]}
            />
            {formTouched.format && errors.format && (
              <p className="text-red-500 text-sm mt-1">{errors.format}</p>
            )}

            <CustomDropdown
              label="Resolution"
              required
              selectedOption={formData.resolution}
              onOptionSelect={(value) => handleInputChange(value, "resolution")}
              options={["1920x1080", "1280x720", "640x480", "3840x2160"]}
            />
            {formTouched.resolution && errors.resolution && (
              <p className="text-red-500 text-sm mt-1">{errors.resolution}</p>
            )}

            <CustomDropdown
              label="Aspect Ratio"
              required
              selectedOption={formData.aspectRatio}
              onOptionSelect={(value) => handleInputChange(value, "aspectRatio")}
              options={["16:9", "4:3", "1:1", "21:9"]}
            />
            {formTouched.aspectRatio && errors.aspectRatio && (
              <p className="text-red-500 text-sm mt-1">{errors.aspectRatio}</p>
            )}

            <InputField
              id="photographer"
              type="text"
              label="Photographer"
              required
              value={formData.photographer}
              onChange={(value) => handleInputChange(value, "photographer")}
              placeholder="Enter photographer name"
            />
            {formTouched.photographer && errors.photographer && (
              <p className="text-red-500 text-sm mt-1">{errors.photographer}</p>
            )}

            <InputField
              id="capturedDate"
              type="text"
              label="Captured Date"
              value={formData.capturedDate}
              onChange={(value) => handleInputChange(value, "capturedDate")}
              placeholder="YYYY-MM-DD"
            />
            {formTouched.capturedDate && errors.capturedDate && (
              <p className="text-red-500 text-sm mt-1">{errors.capturedDate}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <CustomDropdown
              label="Access Level"
              required
              selectedOption={formData.accessLevel}
              onOptionSelect={(value) => handleInputChange(value, "accessLevel")}
              options={["Public", "Premium", "Researcher"]}
            />

            <InputField
              id="photoLocation"
              type="text"
              label="Photo Location"
              value={formData.photoLocation}
              onChange={(value) => handleInputChange(value, "photoLocation")}
              placeholder="Enter photo location"
            />
            <InputField
              id="cameraMake"
              type="text"
              label="Camera Make"
              value={formData.cameraMake}
              onChange={(value) => handleInputChange(value, "cameraMake")}
              placeholder="Enter camera make"
            />

            <InputField
              id="cameraModel"
              type="text"
              label="Camera Model"
              value={formData.cameraModel}
              onChange={(value) => handleInputChange(value, "cameraModel")}
              placeholder="Enter camera model"
            />

            <CustomDropdown
              label="Event Type"
              required
              selectedOption={formData.eventType}
              onOptionSelect={(value) => handleInputChange(value, "eventType")}
              options={["War", "Politics", "Religion", "Culture", "Famine & Crisis", "Civil Rights", "Economy", "Diplomacy", "Leadership", "Ethnic Movements"]}
            />
            {formTouched.eventType && errors.eventType && (
              <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
            )}

            <DynamicFields
              fieldLabel="Historical Figures"
              required
              placeholder="Enter historical figures"
              onChange={(values) => handleCastValuesChange(values, "historicalFigures")}
            />

            <DynamicFields
              fieldLabel="Related Articles"
              placeholder="Enter related articles"
              onChange={(values) => handleCastValuesChange(values, "relatedArticles")}
            />

            <Button
              disabled={!isEnabled || isLoading}
              loading={isLoading}
              className="mt-2"
              variant="view"
              size="md"
              type="submit" // Make sure to add type="submit" to button
            >
              Submit
            </Button>
            <Button variant="border" onClick={() => router.push("/uploader-dashboard/photos")} className="mt-4 mb-12">
              Cancel
            </Button>
          </div>
        </div>
      </form>

      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default UploadPhotoPage;