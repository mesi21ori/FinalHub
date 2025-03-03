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
import Notification from "../../../../components/Notification"; 

// Combined validation schema using Yup
const musicSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  alternativeTitle: Yup.string().optional(),
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
  bookFile: Yup.mixed()
    .required("Book file is required")
    .test("fileType", "Unsupported book file type", (value) => {
      const file = value as File;
      return file && file.type.startsWith("application/pdf");
    })
    .test("fileSize", "File size is too large", (value) => {
      const file = value as File;
      return file && file.size <= 100 * 1024 * 1024; // Limit to 100 MB
    }),
  description: Yup.string().required("Description is required"),
  language: Yup.string().required("Language is required"),
  author: Yup.string().required("Author is required"),
  publisher: Yup.string().required("Publisher is required"),
  accessLevel: Yup.string().required("Access Level is required"),
  copyrightHolder: Yup.string().required("Copyright Holder is required"),
  significant: Yup.string().optional(),
  publicationDate: Yup.date().required("Publication date is required"), // Validation for publication date only
  eventType: Yup.string().required("Event type is required"), // Validation for event type
});

const UploadBookPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    alternativeTitle: "",
    coverImage: null as File | null, 
    bookFile: null as File | null,
    ISBN: "",
    description: "",
    language: "",
    author: "",
    coAuthors: [] as string[],
    editor: [] as string[],
    numberOfPages: "",
    edition: "",
    bookType: "",
    publisher: "",
    accessLevel: "",
    significant: "",
    copyrightHolder: "",
    publicationDate: "", // State for publication date
    eventType: "", // State for event type
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

  // Validate form data
  const validateFormData = async () => {
    try {
      await musicSchema.validate(formData, { abortEarly: false });
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

  const handleInputChange = (value: string | number, field: string) => {
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      [field]: values,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setFormErrors({}); // Reset errors on submit
  
      await musicSchema.validate(formData, { abortEarly: false });
  
      console.log("Form Submitted:", formData); // Log the form data for debugging
  
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('alternativeTitle', formData.alternativeTitle);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('coAuthors', formData.coAuthors.join(','));
      formDataToSend.append('editor', formData.editor.join(','));
      formDataToSend.append('ISBN', formData.ISBN);
      formDataToSend.append('numberOfPages', formData.numberOfPages);
      formDataToSend.append('edition', formData.edition);
      formDataToSend.append('bookType', formData.bookType);
      formDataToSend.append('publisher', formData.publisher);
      formDataToSend.append('accessLevel', formData.accessLevel);
      formDataToSend.append('significant', formData.significant);
      formDataToSend.append('copyrightHolder', formData.copyrightHolder);
      formDataToSend.append('publicationDate', formData.publicationDate);
      formDataToSend.append('eventType', formData.eventType);
  
      if (formData.bookFile) {
        formDataToSend.append('BookUrl', formData.bookFile);
      }
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const uploaderId = sessionStorage.getItem('userId');
      const institutionId = sessionStorage.getItem('institutionId');
      formDataToSend.append("uploaderId", uploaderId || ""); 
      formDataToSend.append("institutionId", institutionId || ""); 
  
      const response = await fetch('/api/content/book/upload-book', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload the book and cover image');
      }
  
      const responseData = await response.json();
      console.log('Upload Success:', responseData);
  
      setFormData({
        title: "",
        alternativeTitle: "",
        coverImage: null,
        bookFile: null,
        ISBN: "",
        description: "",
        language: "",
        author: "",
        coAuthors: [],
        editor: [],
        numberOfPages: "",
        edition: "",
        bookType: "",
        publisher: "",
        accessLevel: "",
        significant: "",
        copyrightHolder: "",
        publicationDate: "",
        eventType: "",
      });
  
      setNotification({
        message: "Book uploaded successfully!",
        type: "success",
        visible: true,
      });
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) { // Check if `err.path` is defined
            newErrors[err.path] = err.message;
          }
        });
        setFormErrors(newErrors);
      } else if (error instanceof Error) {
        console.log("Error:", error.message);
        setNotification({
          message: error.message || 'Something went wrong.',
          type: 'error',
          visible: true,
        });
      } else {
        console.log("Unexpected error:", error);
        setNotification({
          message: 'Something went wrong.',
          type: 'error',
          visible: true,
        });
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
                <Button onClick={() => router.push("/uploader-dashboard/books")} variant="view" className="flex items-center">
                    <FontAwesomeIcon icon={faArrows} className="mr-1" />
                    Back to Book List
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
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block mb-2 flex items-center">
                <span>Upload Book File (PDF)</span>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </label>
              <input
                type="file"
                accept=".pdf, .epub"
                onChange={(e) => handleFileChange(e, "bookFile")}
              />
              {formTouched.bookFile && errors.bookFile && (
                <p className="text-red-500 text-sm mt-1">{errors.bookFile}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 flex items-center">
                <span>Upload Cover Image</span>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </label>
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
<CustomDropdown
              label="Language"
              required
              selectedOption={String(formData.language)}
              onOptionSelect={(value) => handleInputChange(value, "language")}
              options={["Amharic", "Geez", "Afan Oromo", "Tigrinya", "Somali", "Afar", "Wolaytta", "English"]}
            />
            {formTouched.language && errors.language && (
              <p className="text-red-500 text-sm mt-1">{errors.language}</p>
            )}
          
          <InputField
              id="author"
              type="text"
              label="Author"
              required
              value={formData.author}
              onChange={(value) => handleInputChange(value, "author")}
              placeholder="Enter author name"
            />
            <DynamicFields
              fieldLabel="Co-Authors"
              placeholder="Enter co-author names"
              onChange={(values) => handleCastValuesChange(values, "coAuthors")}
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
              placeholder="Enter copyright holder"
            />
            {formTouched.copyrightHolder && errors.copyrightHolder && (
              <p className="text-red-500 text-sm mt-1">{errors.copyrightHolder}</p>
            )}

            <InputField
              id="significant"
              type="textarea"
              label="Significance"
              value={formData.significant}
              onChange={(value) => handleInputChange(value, "significant")}
              placeholder="Enter significance (optional)"
            />

<InputField
              id="ISBN"
              type="text"
              label="ISBN"
              value={String(formData.ISBN)}
              onChange={(value) => handleInputChange(value, "ISBN")}
              placeholder="Enter ISBN"
            />
            {formTouched.ISBN && errors.ISBN && (
              <p className="text-red-500 text-sm mt-1">{errors.ISBN}</p>
            )}


            <DynamicFields
              fieldLabel="Historical Figures"
              required
              placeholder="Enter historical figures"
              onChange={(values) => handleCastValuesChange(values, "editor")}
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-4">
            <InputField
              id="publicationDate"
              type="text" // Keep it as text to match the previous form
              label="Publication Date"
              required
              value={formData.publicationDate}
              onChange={(value) => handleInputChange(value, "publicationDate")}
              placeholder="YYYY-MM-DD"
            />
            {formTouched.publicationDate && errors.publicationDate && (
              <p className="text-red-500 text-sm mt-1">{errors.publicationDate}</p>
            )}

            <CustomDropdown
              label="Access Level"
              required
              selectedOption={String(formData.accessLevel)}
              onOptionSelect={(value) => handleInputChange(value, "accessLevel")}
              options={["Public", "Premium", "Researcher"]}
            />
            {formTouched.accessLevel && errors.accessLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.accessLevel}</p>
            )}
<CustomDropdown
              label="Event Type"
              required
              selectedOption={String(formData.eventType)}
              onOptionSelect={(value) => handleInputChange(value, "eventType")}
              options={["War", "Politics", "Religion", "Culture", "Famine & Crisis", "Civil Rights", "Economy", "Diplomacy", "Leadership", "Ethnic Movements"]} // Sample event types
            />
            {formTouched.eventType && errors.eventType && (
              <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
            )}

            <InputField
              id="numberOfPages"
              type="number"
              label="Number of Pages"
              value={formData.numberOfPages}
              onChange={(value) => handleInputChange(value, "numberOfPages")}
              placeholder="Enter number of pages"
            />
            <InputField
              id="edition"
              type="text"
              label="Edition"
              value={formData.edition}
              onChange={(value) => handleInputChange(value, "edition")}
              placeholder="Enter edition"
            />
            
            <DynamicFields
              fieldLabel="Editors"
              placeholder="Enter editor names"
              onChange={(values) => handleCastValuesChange(values, "editor")}
            />
            <DynamicFields
              fieldLabel="Related Articles"
              placeholder="Enter related articles"
              onChange={(values) => handleCastValuesChange(values, "relatedArticles")}
            />

            {/* Buttons */}
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
            <Button variant="border" onClick={() => router.push("/uploader-dashboard/music")} className="mt-4 mb-12">
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

export default UploadBookPage;