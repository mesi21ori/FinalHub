// "use client";

// import React, { ChangeEvent, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import * as Yup from "yup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrows } from "@fortawesome/free-solid-svg-icons";
// import Button from "../../../../components/Button";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import CustomRadioButton from "../../../../components/CustomRadioButton";
// import DynamicFields from "../../../../components/DynamicFields";
// import InputField from "../../../../components/InputField";
// import TimePicker from "../../../../components/TimePicker";
// import Notification from "../../../../components/Notification"; // Ensure this import is correct

// // Function to check if a year is a leap year in the Ethiopian calendar
// const isLeapYear = (year: number) => {
//     return year % 4 === 3;
// };

// // Custom date validation for Ethiopian dates
// const ethiopianDateSchema = Yup.string()
//     .required("Date is required")
//     .test("is-ethiopian-date", "Invalid date format. Use 'YYYY-MM-DD'.", (value) => {
//         if (!value) return false;
//         const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
//         if (!match) return false;

//         const [_, year, month, day] = match.map(Number);

//         if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
//         if (month < 1 || month > 13) return false;
//         if (day < 1 || day > 30) return false;

//         // Handle Pagumē (the 13th month)
//         if (month === 13 && (day < 1 || day > (isLeapYear(year) ? 6 : 5))) {
//             return false;
//         }
//         return true;
//     });

// // Music validation schema
// const musicSchema = Yup.object().shape({
//      title: Yup.string().required("Title is required"),
//     alternativeTitle: Yup.string().optional(),
//     coverImage: Yup.mixed()
//         .required("Album image is required")
//         .test("fileType", "Unsupported file type", (value) => value && (value as File).type.startsWith("image/"))
//         .test("fileSize", "File size must be less than 5MB", (value) => value && (value as File).size <= 5 * 1024 * 1024),
//     music: Yup.mixed()
//         .required("Music file is required")
//         .test("fileType", "Unsupported audio file type", (value) => value && (value as File).type.startsWith("audio/"))
//         .test("fileSize", "File size must be less than 10MB", (value) => value && (value as File).size <= 10 * 1024 * 1024),
//     eventDate: ethiopianDateSchema,
//     publicationDate: ethiopianDateSchema,
//     language: Yup.string().required(),
//     description: Yup.string().required("Description is required"),
//     duration: Yup.string().required("Duration is required"),
//     composer: Yup.string().optional(),
//     musicProducer: Yup.string().optional(),
//     musicType: Yup.string().required("Music Type is required"),
//     singer: Yup.string().required("Singer information is required"),
//     additionalSinger: Yup.array().of(Yup.string()).optional(),
//     melodyAuthor: Yup.array().of(Yup.string()).required("Melody Author(s) is/are required"),
//     poemAuthor: Yup.array().of(Yup.string()).required("Poem Author(s) is/are required"),
//     accessLevel: Yup.string().required("Access Level is required"),
//     instrument: Yup.array().of(Yup.string()).optional(),
//     instrumentPlayer: Yup.array().of(Yup.string()).optional(),
//     audioQuality: Yup.string().required("Audio Quality is required"),
//     musicAlbum: Yup.string().optional(),
//     musicNumber: Yup.string().optional(),
//     recorder: Yup.string().optional(),
//     eventType: Yup.string().required("Event Type is required"),
//     historicalFigures: Yup.array().of(Yup.string()).required("Historical Figure(s) is/are required"),
//     location: Yup.string().optional(),
//     significance: Yup.string().required("Significance is required"),
//     source: Yup.string().required("Source is required"),
   
//     copyrightHolder: Yup.string().required("Copyright Holder is required"),
//     relatedArticles: Yup.array().of(Yup.string()).optional(),
// });

// const UploadMusicPage: React.FC = () => {
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         title: "",
//         alternativeTitle: "",
//         coverImage: null as File | null,
//         music: null as File | null,
//         language: "",
//         description: "",
//         duration: "",
//         composer: "",
//         musicProducer: "",
//         musicType: "",
//         singer: "",
//         additionalSinger: [],
//         melodyAuthor: [],
//         accessLevel: "",
//         poemAuthor: [],
//         instrument: [],
//         instrumentPlayer: [],
//         audioQuality: "",
//         musicAlbum: "",
//         musicNumber: "",
//         recorder: "",
//         eventType: "",
//         eventDate: "",
//         historicalFigures: [],
//         location: "",
//         significance: "",
//         source: "",
//         publisher: "",
//         copyrightHolder: "",
//         relatedArticles: [],
//         publicationDate: "",
//     });

//     const [errors, setFormErrors] = useState<Record<string, string>>({});
//     const [isEnabled, setIsEnabled] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [notification, setNotification] = useState({
//         message: "",
//         type: "success" as "success" | "error" | "warning",
//         visible: false,
//     });

//     const [formTouched, setFormTouched] = useState<Record<string, boolean>>({}); // Track touched fields to manage error display

//     // Validate form data
//     const validateFormData = async () => {
//         console.log("Form Data Before Validation:", formData); // Add this debug line
//         try {
//             await musicSchema.validate(formData, { abortEarly: false });
//             setIsEnabled(true);
//             setFormErrors({}); // Clear all errors if validation is successful
//         } catch (err) {
//             setIsEnabled(false);
//             const newErrors: Record<string, string> = {};
//             if (err instanceof Yup.ValidationError) {
//                 err.inner.forEach((error) => {
//                     newErrors[error.path!] = error.message;
//                 });
//             }
//             setFormErrors(newErrors);
//         }
//     };

//     useEffect(() => {
//         validateFormData();
//     }, [formData]);

//     const handleInputChange = (value: string, field: string) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [field]: value,
//         }));

//         // Clear error for this field
//         if (errors[field]) {
//             setFormErrors((prevErrors) => ({
//                 ...prevErrors,
//                 [field]: "",
//             }));
//         }

//         // Mark field as touched
//         setFormTouched((prevTouched) => ({
//             ...prevTouched,
//             [field]: true,
//         }));
//     };

//     const handleDropdownChange = (field: string, value: string) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [field]: value,
//         }));

//         if (errors[field]) {
//             setFormErrors((prevErrors) => ({
//                 ...prevErrors,
//                 [field]: "",
//             }));
//         }

//         setFormTouched((prevTouched) => ({
//             ...prevTouched,
//             [field]: true,
//         }));
//     };

//     const handleRadioChange = (field: "source", value: string) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             [field]: value,
//         }));

//         setFormTouched((prevTouched) => ({
//             ...prevTouched,
//             [field]: true,
//         }));
//     };

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const isAudio = file.type.startsWith("audio/");
//         const isImage = file.type.startsWith("image/");

//         // If the file type is not valid
//         if ((fieldName === "music" && !isAudio) || (fieldName === "albumImage" && !isImage)) {
//             setFormErrors((prev) => ({
//                 ...prev,
//                 [fieldName]: fieldName === "music" ? "Unsupported audio file type." : "Unsupported image file type.",
//             }));
//             return;
//         }

//         // Clear previous error for this field
//         setFormErrors((prev) => ({ ...prev, [fieldName]: "" }));

//         // Update form data
//         setFormData((prevData) => ({
//             ...prevData,
//             [fieldName]: file,
//         }));

//         // Mark field as touched
//         setFormTouched((prevTouched) => ({
//             ...prevTouched,
//             [fieldName]: true,
//         }));
//     };

//     const handleCastValuesChange = (values: string[], field: string) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             [field]: values,
//         }));
//     };

//     const handleSubmit = async () => {
//         try {
//             // Clear errors and enable loading state
//             setIsLoading(true);
//             setFormErrors({}); // Reset errors on submit
    
//             // Validate form data with Yup
//             await musicSchema.validate(formData, { abortEarly: false });
    
//             console.log("Form Submitted:", formData); 
    
//             // Create FormData to send files and data
//             const data = new FormData();
//             data.append("title", formData.title);
//             data.append("alternativeTitle", formData.alternativeTitle || "");
//             data.append("language", formData.language || "");
//             data.append("description", formData.description);
//             data.append("duration", formData.duration);
//             data.append("composer", formData.composer || "");
//             data.append("musicProducer", formData.musicProducer || "");
//             data.append("musicType", formData.musicType);
//             data.append("singer", formData.singer);
//             data.append("accessLevel", formData.accessLevel);
//             // Handle arrays (like additionalSinger, melodyAuthor, etc.)
//             data.append("additionalSinger", formData.additionalSinger?.join(",") || "");
//             data.append("melodyAuthor", formData.melodyAuthor?.join(",") || "");
//             data.append("poemAuthor", formData.poemAuthor?.join(",") || "");
//             data.append("instrument", formData.instrument?.join(",") || "");
//             data.append("instrumentPlayer", formData.instrumentPlayer?.join(",") || "");
    
//             data.append("audioQuality", formData.audioQuality);
//             data.append("musicAlbum", formData.musicAlbum || "");
//             data.append("musicNumber", formData.musicNumber || "");
//             data.append("recorder", formData.recorder || "");
//             data.append("eventType", formData.eventType);
//             data.append("eventDate", formData.eventDate);
//             data.append("historicalFigures", formData.historicalFigures?.join(",") || "");
//             data.append("location", formData.location || "");
//             data.append("significance", formData.significance);
//             data.append("source", formData.source);
//             data.append("copyrightHolder", formData.copyrightHolder);
//             data.append("relatedArticles", formData.relatedArticles?.join(",") || "");
//             data.append("publicationDate", formData.publicationDate);
    
//             // Attach files (check if the fields are valid before appending)
//             if (formData.music) {
//                 // Make sure formData.music is a valid File object
//                 if (formData.music instanceof File) {
//                     data.append("MusicUrl", formData.music);
//                 } else {
//                     console.error("Invalid music file.");
//                 }
//             }
            
//             if (formData.coverImage) {
//                 // Make sure formData.coverImage is a valid File object
//                 if (formData.coverImage instanceof File) {
//                     data.append("coverImage", formData.coverImage);
//                 } else {
//                     console.error("Invalid cover image file.");
//                 }
//             }
    
//             // Replace these with actual IDs or relevant values
//             const uploaderId = sessionStorage.getItem('userId');
//             const institutionId = sessionStorage.getItem('institutionId');
//             data.append("uploaderId", uploaderId || ""); 
//             data.append("institutionId", institutionId || ""); 
    
//             // Send data to API endpoint
//             const response = await fetch("/api/content/music/upload-music", {
//                 method: "POST",
//                 body: data,
//             });
    
//             if (response.ok) {
//                 const result = await response.json();
//                 setNotification({
//                     message: "Form submitted successfully!",
//                     type: "success",
//                     visible: true,
//                 });
    
//                 // Reset form data
//                 setFormData({
//                     title: "",
//                     alternativeTitle: "",
//                     coverImage: null,
//                     music: null,
//                     language: "",
//                     description: "",
//                     duration: "",
//                     composer: "",
//                     musicProducer: "",
//                     musicType: "",
//                     singer: "",
//                     additionalSinger: [],
//                     melodyAuthor: [],
//                     accessLevel: "",
//                     poemAuthor: [],
//                     instrument: [],
//                     instrumentPlayer: [],
//                     audioQuality: "",
//                     musicAlbum: "",
//                     musicNumber: "",
//                     recorder: "",
//                     eventType: "",
//                     eventDate: "",
//                     historicalFigures: [],
//                     location: "",
//                     significance: "",
//                     source: "",
//                     publisher: "",
//                     copyrightHolder: "",
//                     relatedArticles: [],
//                     publicationDate: "",
//                 });
//             } else {
//                 // If not OK, handle error
//                 const error = await response.json();
//                 setNotification({
//                     message: error.message || "An error occurred while submitting the form.",
//                     type: "error",
//                     visible: true,
//                 });
//             }
//         } catch (error) {
//             console.error("Error during submission:", error);
//             setNotification({
//                 message: "An error occurred while submitting the form.",
//                 type: "error",
//                 visible: true,
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
    

//     const closeNotification = () => {
//         setNotification((prev) => ({ ...prev, visible: false }));
//     };

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//                 <Button onClick={() => router.push("/uploader-dashboard/music")} variant="view" className="flex items-center">
//                     <FontAwesomeIcon icon={faArrows} className="mr-1" />
//                     Back to Music List
//                 </Button>
//             </div>
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSubmit();
//                 }}
//                 className="space-y-4"
//             >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
//                     {/* Column 1 */}
//                     <div className="flex flex-col space-y-4 font-medium">
//                         {/* File Uploads */}
//                         <div>
//                             <div className="flex items-center">
//                                 <label htmlFor="music" className="block mb-2">Upload Music</label>
//                                 <span className="text-red-700 text-2xl ml-1">*</span>
//                             </div>
//                             <input
//                                 type="file"
//                                 accept="audio/*"
//                                 onChange={(e) => handleFileChange(e, "music")}
//                             />
//                             {formTouched.music && errors.music && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.music}</p>
//                             )}
//                         </div>

//                         <div>
//                             <div className="flex items-center">
//                                 <label htmlFor="coverImage" className="block mb-2">Upload Cover Image</label>
//                                 <span className="text-red-700 text-2xl ml-1">*</span>
//                             </div>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={(e) => handleFileChange(e, "coverImage")}
//                             />
//                             {formTouched.albumImage && errors.albumImage && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.albumImage}</p>
//                             )}
//                         </div>

//                         {/* Text Inputs */}
//                         <InputField
//                             id="title"
//                             type="text"
//                             label="Title"
//                             required
//                             value={formData.title}
//                             onChange={(value) => handleInputChange(value, "title")}
//                             placeholder="Enter title"
//                         />
//                         {formTouched.title && errors.title && (
//                             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//                         )}

//                         <InputField
//                             id="alternativeTitle"
//                             type="text"
//                             label="Alternative Title"
//                             value={formData.alternativeTitle}
//                             onChange={(value) => handleInputChange(value, "alternativeTitle")}
//                             placeholder="Enter alternative title"
//                         />

//                         <CustomDropdown
//                             label="Language"
//                             required
//                             selectedOption={formData.language}
//                             onOptionSelect={(value) => handleDropdownChange("language", String(value))}
//                             options={["Amharic", "Geez", "Afan Oromo", "Tigrinya", "Somali", "Afar", "Wolaytta", "English"]}
//                         />

//                         <InputField
//                             id="description"
//                             type="textarea"
//                             label="Description"
//                             required
//                             value={formData.description}
//                             onChange={(value) => handleInputChange(value, "description")}
//                             placeholder="Enter description"
//                         />

//                         <TimePicker
//                             label="Duration"
//                             name="duration"
//                             require
//                             value={formData.duration}
//                             onChange={(value) => handleInputChange(value, "duration")}
//                         />
//                         {formTouched.duration && errors.duration && (
//                             <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
//                         )}

//                         <InputField
//                             id="composer"
//                             type="text"
//                             label="Composer"
//                             value={formData.composer}
//                             onChange={(value) => handleInputChange(value, "composer")}
//                             placeholder="Enter composer's name"
//                         />

//                         <InputField
//                             id="musicProducer"
//                             type="text"
//                             label="Music Producer"
//                             value={formData.musicProducer}
//                             onChange={(value) => handleInputChange(value, "musicProducer")}
//                             placeholder="Enter music producer's name"
//                         />

//                         <CustomDropdown
//                             label="Music Type"
//                             required
//                             selectedOption={formData.musicType}
//                             onOptionSelect={(value) => handleDropdownChange("musicType", String(value))}
//                             options={["Traditional", "Religious", "Fusion & Modern", "Dance & Festival", "Instrumental"]}
//                         />
//                         {formTouched.musicType && errors.musicType && (
//                             <p className="text-red-500 text-sm mt-1">{errors.musicType}</p>
//                         )}

//                         {/* Singer and Authors */}
//                         <InputField
//                             id="singer"
//                             type="text"
//                             label="Singer"
//                             required
//                             value={formData.singer}
//                             onChange={(value) => handleInputChange(value, "singer")}
//                             placeholder="Enter singer's name"
//                         />
//                         {formTouched.singer && errors.singer && (
//                             <p className="text-red-500 text-sm mt-1">{errors.singer}</p>
//                         )}

//                         <DynamicFields
//                             fieldLabel="Additional Singers"
//                             placeholder="Enter additional singers"
//                             onChange={(values) => handleCastValuesChange(values, "additionalSinger")}
//                         />
//                         <DynamicFields
//                             fieldLabel="Melody Authors"
//                             required
//                             placeholder="Enter melody authors"
//                             onChange={(values) => handleCastValuesChange(values, "melodyAuthor")}
                            
//                         />
//                         <DynamicFields
//                             fieldLabel="Poem Authors"
//                             required
//                             placeholder="Enter poem authors"
//                             onChange={(values) => handleCastValuesChange(values, "poemAuthor")}
                            
//                         />
//                         <DynamicFields
//                             fieldLabel="Instruments"
//                             placeholder="Enter instruments used"
//                             onChange={(values) => handleCastValuesChange(values, "instrument")}
//                         />
//                         <DynamicFields
//                             fieldLabel="Instrument Players"
//                             placeholder="Enter instrument players"
//                             onChange={(values) => handleCastValuesChange(values, "instrumentPlayer")}
//                         />
//                     </div>

//                     {/* Column 2 */}
//                     <div className="flex flex-col space-y-4">
//                         {/* Audio Quality Dropdown */}
//                         <CustomDropdown
//                             label="Audio Quality"
//                             required
//                             selectedOption={formData.audioQuality}
//                             onOptionSelect={(value) => handleDropdownChange("audioQuality", String(value))}
//                             options={["320kbps", "256kbps", "128kbps", "64kbps"]}
//                         />
//                         {formTouched.audioQuality && errors.audioQuality && (
//                             <p className="text-red-500 text-sm mt-1">{errors.audioQuality}</p>
//                         )}

//                         <InputField
//                             id="musicAlbum"
//                             type="text"
//                             label="Music Album"
//                             value={formData.musicAlbum}
//                             onChange={(value) => handleInputChange(value, "musicAlbum")}
//                             placeholder="Enter music album name"
//                         />

//                         <InputField
//                             id="musicNumber"
//                             type="text"
//                             label="Music Number"
//                             value={formData.musicNumber}
//                             onChange={(value) => handleInputChange(value, "musicNumber")}
//                             placeholder="Enter music number in album"
//                         />

//                         <InputField
//                             id="recorder"
//                             type="text"
//                             label="Recorder"
//                             value={formData.recorder}
//                             onChange={(value) => handleInputChange(value, "recorder")}
//                             placeholder="Enter recording engineer's name"
//                         />

//                         <CustomDropdown
//                             label="Event Type"
//                             required
//                             selectedOption={formData.eventType}
//                             onOptionSelect={(value) => handleDropdownChange("eventType", String(value))}
//                             options={["War", "Politics", "Religion", "Culture", "Famine_Crisis", "Civil_Rights", "Economy", "Diplomacy", "Leadership", "Ethnic_Movements"]}
//                         />
//                         {formTouched.eventType && errors.eventType && (
//                             <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
//                         )}

//                         {/* Event Date Input */}
//                         <InputField
//                             id="eventDate"
//                             type="text"
//                             label="Event Date"
//                             required
//                             value={formData.eventDate}
//                             onChange={(value) => handleInputChange(value, "eventDate")}
//                             placeholder="YYYY-MM-DD"
//                         />
//                         {formTouched.eventDate && errors.eventDate && (
//                             <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
//                         )}
//                         <InputField
//                             id="significance"
//                             type="textarea"
//                             label="Significance"
//                             required
//                             value={formData.significance}
//                             onChange={(value) => handleInputChange(value, "significance")}
//                             placeholder="Enter significance"
//                         />
//                         {formTouched.significance && errors.significance && (
//                             <p className="text-red-500 text-sm mt-1">{errors.significance}</p>
//                         )}

//                         <InputField
//                             id="location"
//                             type="text"
//                             label="Location"
//                             value={formData.location}
//                             onChange={(value) => handleInputChange(value, "location")}
//                             placeholder="Enter location"
//                         />

//                         <CustomDropdown
//                             label="Access Level"
//                             required
//                             selectedOption={formData.accessLevel}
//                             onOptionSelect={(value) => handleDropdownChange("accessLevel", String(value))}
//                             options={["Public", "Premium", "Researcher"]}
//                         />
//                         {formTouched.accessLevel && errors.accessLevel && (
//                             <p className="text-red-500 text-sm mt-1">{errors.accessLevel}</p>
//                         )}

//                         {/* Publication Date Input */}
//                         <InputField
//                             id="publicationDate"
//                             type="text"
//                             label="Publication Date"
//                             required
//                             value={formData.publicationDate}
//                             onChange={(value) => handleInputChange(value, "publicationDate")}
//                             placeholder="YYYY-MM-DD"
//                         />
//                         {formTouched.publicationDate && errors.publicationDate && (
//                             <p className="text-red-500 text-sm mt-1">{errors.publicationDate}</p>
//                         )}

//                         <InputField
//                             id="copyrightHolder"
//                             type="text"
//                             label="Copyright Holder"
//                             required
//                             value={formData.copyrightHolder}
//                             onChange={(value) => handleInputChange(value, "copyrightHolder")}
//                             placeholder="Enter copyright holder's name"
//                         />
//                         {formTouched.copyrightHolder && errors.copyrightHolder && (
//                             <p className="text-red-500 text-sm mt-1">{errors.copyrightHolder}</p>
//                         )}
//                         <DynamicFields
//                             fieldLabel="Historical Figures"
//                             placeholder="Enter historical figures"
//                             onChange={(values) => handleCastValuesChange(values, "historicalFigures")}
//                             required
//                         />

//                         <div className="flex items-center">
//                             <div className="col-span-2">
//                                 <div className="flex items-center">
//                                     <label className="block text-md text-[#3e251c] font-medium mb-2 ml-1">Source</label>
//                                     <span className="text-red-700 text-2xl ml-1">*</span>
//                                 </div>
//                                 <CustomRadioButton
//                                     name="source"
//                                     label="Primary"
//                                     value="Primary"
//                                     checked={formData.source === "Primary"}
//                                     onChange={() => handleRadioChange("source", "Primary")}
//                                 />
//                                 <CustomRadioButton
//                                     name="source"
//                                     label="Secondary"
//                                     value="Secondary"
//                                     checked={formData.source === "Secondary"}
//                                     onChange={() => handleRadioChange("source", "Secondary")}
//                                 />
//                                 {formTouched.source && errors.source && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.source}</p>
//                                 )}
//                             </div>
//                         </div>

//                         <DynamicFields
//                             fieldLabel="Related Articles"
//                             placeholder="Enter related articles"
//                             onChange={(values) => handleCastValuesChange(values, "relatedArticles")}
//                         />
//                         <Button
//                             disabled={!isEnabled || isLoading}
//                             loading={isLoading}
//                             onClick={handleSubmit}
//                             className="mt-2"
//                             variant="view"
//                             size="md"
//                         >
//                             Submit
//                         </Button>
//                         <Button variant="border" onClick={() => router.push("/uploader-dashboard/music")} className="mt-4 mb-12">
//                             Cancel
//                         </Button>
//                     </div>
//                 </div>
//             </form>

//             {/* Notification Component */}
//             <Notification
//                 message={notification.message}
//                 type={notification.type}
//                 visible={notification.visible}
//                 onClose={closeNotification}
//             />
//         </div>
//     );
// };

// export default UploadMusicPage;

// "use client";

// import React, { ChangeEvent, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import * as Yup from "yup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrows } from "@fortawesome/free-solid-svg-icons";
// import Button from "../../../../components/Button";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import CustomRadioButton from "../../../../components/CustomRadioButton";
// import DynamicFields from "../../../../components/DynamicFields";
// import InputField from "../../../../components/InputField";
// import TimePicker from "../../../../components/TimePicker";
// import Notification from "../../../../components/Notification";

// // Function to check if a year is a leap year in the Ethiopian calendar
// const isLeapYear = (year: number) => {
//     return year % 4 === 3;
// };

// // Custom date validation for Ethiopian dates
// const ethiopianDateSchema = Yup.string()
//     .required("Date is required")
//     .test("is-ethiopian-date", "Invalid date format. Use 'YYYY-MM-DD'.", (value) => {
//         if (!value) return false;
//         const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
//         if (!match) return false;

//         const [_, year, month, day] = match.map(Number);

//         if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
//         if (month < 1 || month > 13) return false;
//         if (day < 1 || day > 30) return false;

//         // Handle Pagumē (the 13th month)
//         if (month === 13 && (day < 1 || day > (isLeapYear(year) ? 6 : 5))) {
//             return false;
//         }
//         return true;
//     });

// // Music validation schema
// const musicSchema = Yup.object().shape({
//     title: Yup.string().required("Title is required"),
//     alternativeTitle: Yup.string().optional(),
//     coverImage: Yup.mixed()
//         .required("Album image is required")
//         .test("fileType", "Unsupported file type", (value) => value && (value as File).type.startsWith("image/"))
//         .test("fileSize", "File size must be less than 5MB", (value) => value && (value as File).size <= 5 * 1024 * 1024),
//     music: Yup.mixed()
//         .required("Music file is required")
//         .test("fileType", "Unsupported audio file type", (value) => value && (value as File).type.startsWith("audio/"))
//         .test("fileSize", "File size must be less than 10MB", (value) => value && (value as File).size <= 10 * 1024 * 1024),
//     eventDate: ethiopianDateSchema,
//     publicationDate: ethiopianDateSchema,
//     language: Yup.string().required(),
//     description: Yup.string().required("Description is required"),
//     duration: Yup.string().required("Duration is required"),
//     composer: Yup.string().optional(),
//     musicProducer: Yup.string().optional(),
//     musicType: Yup.string().required("Music Type is required"),
//     singer: Yup.string().required("Singer information is required"),
//     additionalSinger: Yup.array().of(Yup.string()).optional(),
//     melodyAuthor: Yup.array().of(Yup.string()).required("Melody Author(s) is/are required"),
//     poemAuthor: Yup.array().of(Yup.string()).required("Poem Author(s) is/are required"),
//     accessLevel: Yup.string().required("Access Level is required"),
//     instrument: Yup.array().of(Yup.string()).optional(),
//     instrumentPlayer: Yup.array().of(Yup.string()).optional(),
//     audioQuality: Yup.string().required("Audio Quality is required"),
//     musicAlbum: Yup.string().optional(),
//     musicNumber: Yup.string().optional(),
//     recorder: Yup.string().optional(),
//     eventType: Yup.string().required("Event Type is required"),
//     historicalFigures: Yup.array().of(Yup.string()).required("Historical Figure(s) is/are required"),
//     location: Yup.string().optional(),
//     significance: Yup.string().required("Significance is required"),
//     source: Yup.string().required("Source is required"),
//     copyrightHolder: Yup.string().required("Copyright Holder is required"),
//     relatedArticles: Yup.array().of(Yup.string()).optional(),
// });

// const UploadMusicPage: React.FC = () => {
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         title: "",
//         alternativeTitle: "",
//         coverImage: null as File | null,
//         music: null as File | null,
//         language: "",
//         description: "",
//         duration: "",
//         composer: "",
//         musicProducer: "",
//         musicType: "",
//         singer: "",
//         additionalSinger: [],
//         melodyAuthor: [],
//         accessLevel: "",
//         poemAuthor: [],
//         instrument: [],
//         instrumentPlayer: [],
//         audioQuality: "",
//         musicAlbum: "",
//         musicNumber: "",
//         recorder: "",
//         eventType: "",
//         eventDate: "",
//         historicalFigures: [],
//         location: "",
//         significance: "",
//         source: "",
//         publisher: "",
//         copyrightHolder: "",
//         relatedArticles: [],
//         publicationDate: "",
//     });

//     const [errors, setFormErrors] = useState<Record<string, string>>({});
//     const [isEnabled, setIsEnabled] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
    
//     // Notification state for showing messages
//     const [notification, setNotification] = useState({
//         message: "",
//         type: "success" as "success" | "error" | "warning",
//         visible: false,
//     });

//     const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

//     // Validate form data
//     const validateFormData = async () => {
//         console.log("Form Data Before Validation:", formData);
//         try {
//             await musicSchema.validate(formData, { abortEarly: false });
//             setIsEnabled(true);
//             setFormErrors({});
//         } catch (err) {
//             setIsEnabled(false);
//             const newErrors: Record<string, string> = {};
//             if (err instanceof Yup.ValidationError) {
//                 err.inner.forEach((error) => {
//                     newErrors[error.path!] = error.message;
//                 });
//             }
//             setFormErrors(newErrors);
//         }
//     };

//     useEffect(() => {
//         validateFormData();
//     }, [formData]);

//     const handleInputChange = (value: string, field: string) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [field]: value,
//         }));

//         // Clear error for this field
//         if (errors[field]) {
//             setFormErrors((prevErrors) => ({
//                 ...prevErrors,
//                 [field]: "",
//             }));
//         }

//         // Mark field as touched
//         setFormTouched((prevTouched) => ({
//             ...prevTouched,
//             [field]: true,
//         }));
//     };

//     const handleDropdownChange = (field: string, value: string) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [field]: value,
//         }));

//         if (errors[field]) {
//             setFormErrors((prevErrors) => ({
//                 ...prevErrors,
//                 [field]: "",
//             }));
//         }

//         setFormTouched((prevTouched) => ({
//             ...prevTouched,
//             [field]: true,
//         }));
//     };

//     const handleRadioChange = (field: "source", value: string) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             [field]: value,
//         }));

//         setFormTouched((prevTouched) => ({
//             ...prevTouched,
//             [field]: true,
//         }));
//     };

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const isAudio = file.type.startsWith("audio/");
//         const isImage = file.type.startsWith("image/");

//         // If the file type is not valid
//         if ((fieldName === "music" && !isAudio) || (fieldName === "coverImage" && !isImage)) {
//             setFormErrors((prev) => ({
//                 ...prev,
//                 [fieldName]: fieldName === "music" ? "Unsupported audio file type." : "Unsupported image file type.",
//             }));
//             return;
//         }

//         // Clear previous error for this field
//         setFormErrors((prev) => ({ ...prev, [fieldName]: "" }));

//         // Update form data
//         setFormData((prevData) => ({
//             ...prevData,
//             [fieldName]: file,
//         }));

//         // Mark field as touched
//         setFormTouched((prevTouched) => ({
//             ...prevTouched,
//             [fieldName]: true,
//         }));
//     };

//     const handleCastValuesChange = (values: string[], field: string) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             [field]: values,
//         }));
//     };

//     const handleSubmit = async () => {
//         try {
//             setIsLoading(true);
//             setFormErrors({});

//             await musicSchema.validate(formData, { abortEarly: false });

//             console.log("Form Submitted:", formData);

//             const data = new FormData();
//             data.append("title", formData.title);
//             data.append("alternativeTitle", formData.alternativeTitle || "");
//             data.append("language", formData.language || "");
//             data.append("description", formData.description);
//             data.append("duration", formData.duration);
//             data.append("composer", formData.composer || "");
//             data.append("musicProducer", formData.musicProducer || "");
//             data.append("musicType", formData.musicType);
//             data.append("singer", formData.singer);
//             data.append("accessLevel", formData.accessLevel);
//             data.append("additionalSinger", formData.additionalSinger.join(",") || "");
//             data.append("melodyAuthor", formData.melodyAuthor.join(",") || "");
//             data.append("poemAuthor", formData.poemAuthor.join(",") || "");
//             data.append("instrument", formData.instrument.join(",") || "");
//             data.append("instrumentPlayer", formData.instrumentPlayer.join(",") || "");
//             data.append("audioQuality", formData.audioQuality);
//             data.append("musicAlbum", formData.musicAlbum || "");
//             data.append("musicNumber", formData.musicNumber || "");
//             data.append("recorder", formData.recorder || "");
//             data.append("eventType", formData.eventType);
//             data.append("eventDate", formData.eventDate);
//             data.append("historicalFigures", formData.historicalFigures.join(",") || "");
//             data.append("location", formData.location || "");
//             data.append("significance", formData.significance);
//             data.append("source", formData.source);
//             data.append("copyrightHolder", formData.copyrightHolder);
//             data.append("relatedArticles", formData.relatedArticles.join(",") || "");
//             data.append("publicationDate", formData.publicationDate);

//             if (formData.music) {
//                 if (formData.music instanceof File) {
//                     data.append("MusicUrl", formData.music);
//                 } else {
//                     console.error("Invalid music file.");
//                 }
//             }
            
//             if (formData.coverImage) {
//                 if (formData.coverImage instanceof File) {
//                     data.append("coverImage", formData.coverImage);
//                 } else {
//                     console.error("Invalid cover image file.");
//                 }
//             }

//             const uploaderId = sessionStorage.getItem('userId');
//             const institutionId = sessionStorage.getItem('institutionId');
//             data.append("uploaderId", uploaderId || ""); 
//             data.append("institutionId", institutionId || ""); 

//             const response = await fetch("/api/content/music/upload-music", {
//                 method: "POST",
//                 body: data,
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 setNotification({
//                     message: "Form submitted successfully!",
//                     type: "success",
//                     visible: true,
//                 });

//                 // Reset form data
//                 // setFormData({
//                 //     title: "",
//                 //     alternativeTitle: "",
//                 //     coverImage: null,
//                 //     music: null,
//                 //     language: "",
//                 //     description: "",
//                 //     duration: "",
//                 //     composer: "",
//                 //     musicProducer: "",
//                 //     musicType: "",
//                 //     singer: "",
//                 //     additionalSinger: [],
//                 //     melodyAuthor: [],
//                 //     accessLevel: "",
//                 //     poemAuthor: [],
//                 //     instrument: [],
//                 //     instrumentPlayer: [],
//                 //     audioQuality: "",
//                 //     musicAlbum: "",
//                 //     musicNumber: "",
//                 //     recorder: "",
//                 //     eventType: "",
//                 //     eventDate: "",
//                 //     historicalFigures: [],
//                 //     location: "",
//                 //     significance: "",
//                 //     source: "",
//                 //     publisher: "",
//                 //     copyrightHolder: "",
//                 //     relatedArticles: [],
//                 //     publicationDate: "",
//                 // });
//             } else {
//                 const error = await response.json();
//                 setNotification({
//                     message: error.message || "An error occurred while submitting the form.",
//                     type: "error",
//                     visible: true,
//                 });
//             }
//         } catch (error) {
//             console.error("Error during submission:", error);
//             setNotification({
//                 message: "An error occurred while submitting the form.",
//                 type: "error",
//                 visible: true,
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const closeNotification = () => {
//         setNotification((prev) => ({ ...prev, visible: false }));
//     };

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//                 <Button onClick={() => router.push("/uploader-dashboard/music")} variant="view" className="flex items-center">
//                     <FontAwesomeIcon icon={faArrows} className="mr-1" />
//                     Back to Music List
//                 </Button>
//             </div>
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSubmit();
//                 }}
//                 className="space-y-4"
//             >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
//                     {/* Column 1 */}
//                     <div className="flex flex-col space-y-4 font-medium">
//                         {/* File Uploads */}
//                         <div>
//                             <div className="flex items-center">
//                                 <label htmlFor="music" className="block mb-2">Upload Music</label>
//                                 <span className="text-red-700 text-2xl ml-1">*</span>
//                             </div>
//                             <input
//                                 type="file"
//                                 accept="audio/*"
//                                 onChange={(e) => handleFileChange(e, "music")}
//                             />
//                             {formTouched.music && errors.music && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.music}</p>
//                             )}
//                         </div>

//                         <div>
//                             <div className="flex items-center">
//                                 <label htmlFor="coverImage" className="block mb-2">Upload Cover Image</label>
//                                 <span className="text-red-700 text-2xl ml-1">*</span>
//                             </div>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={(e) => handleFileChange(e, "coverImage")}
//                             />
//                             {formTouched.coverImage && errors.coverImage && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
//                             )}
//                         </div>

//                         {/* Text Inputs */}
//                         <InputField
//                             id="title"
//                             type="text"
//                             label="Title"
//                             required
//                             value={formData.title}
//                             onChange={(value) => handleInputChange(value, "title")}
//                             placeholder="Enter title"
//                         />
//                         {formTouched.title && errors.title && (
//                             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//                         )}

//                         <InputField
//                             id="alternativeTitle"
//                             type="text"
//                             label="Alternative Title"
//                             value={formData.alternativeTitle}
//                             onChange={(value) => handleInputChange(value, "alternativeTitle")}
//                             placeholder="Enter alternative title"
//                         />

//                         <CustomDropdown
//                             label="Language"
//                             required
//                             selectedOption={formData.language}
//                             onOptionSelect={(value) => handleDropdownChange("language", String(value))}
//                             options={["Amharic", "Geez", "Afan Oromo", "Tigrinya", "Somali", "Afar", "Wolaytta", "English"]}
//                         />

//                         <InputField
//                             id="description"
//                             type="textarea"
//                             label="Description"
//                             required
//                             value={formData.description}
//                             onChange={(value) => handleInputChange(value, "description")}
//                             placeholder="Enter description"
//                         />

//                         <TimePicker
//                             label="Duration"
//                             name="duration"
//                             require
//                             value={formData.duration}
//                             onChange={(value) => handleInputChange(value, "duration")}
//                         />
//                         {formTouched.duration && errors.duration && (
//                             <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
//                         )}

//                         <InputField
//                             id="composer"
//                             type="text"
//                             label="Composer"
//                             value={formData.composer}
//                             onChange={(value) => handleInputChange(value, "composer")}
//                             placeholder="Enter composer's name"
//                         />

//                         <InputField
//                             id="musicProducer"
//                             type="text"
//                             label="Music Producer"
//                             value={formData.musicProducer}
//                             onChange={(value) => handleInputChange(value, "musicProducer")}
//                             placeholder="Enter music producer's name"
//                         />

//                         <CustomDropdown
//                             label="Music Type"
//                             required
//                             selectedOption={formData.musicType}
//                             onOptionSelect={(value) => handleDropdownChange("musicType", String(value))}
//                             options={["Traditional", "Religious", "Fusion & Modern", "Dance & Festival", "Instrumental"]}
//                         />
//                         {formTouched.musicType && errors.musicType && (
//                             <p className="text-red-500 text-sm mt-1">{errors.musicType}</p>
//                         )}

//                         {/* Singer and Authors */}
//                         <InputField
//                             id="singer"
//                             type="text"
//                             label="Singer"
//                             required
//                             value={formData.singer}
//                             onChange={(value) => handleInputChange(value, "singer")}
//                             placeholder="Enter singer's name"
//                         />
//                         {formTouched.singer && errors.singer && (
//                             <p className="text-red-500 text-sm mt-1">{errors.singer}</p>
//                         )}

//                         <DynamicFields
//                             fieldLabel="Additional Singers"
//                             placeholder="Enter additional singers"
//                             onChange={(values) => handleCastValuesChange(values, "additionalSinger")}
//                         />
//                         <DynamicFields
//                             fieldLabel="Melody Authors"
//                             required
//                             placeholder="Enter melody authors"
//                             onChange={(values) => handleCastValuesChange(values, "melodyAuthor")}
//                         />
//                         <DynamicFields
//                             fieldLabel="Poem Authors"
//                             required
//                             placeholder="Enter poem authors"
//                             onChange={(values) => handleCastValuesChange(values, "poemAuthor")}
//                         />
//                         <DynamicFields
//                             fieldLabel="Instruments"
//                             placeholder="Enter instruments used"
//                             onChange={(values) => handleCastValuesChange(values, "instrument")}
//                         />
//                         <DynamicFields
//                             fieldLabel="Instrument Players"
//                             placeholder="Enter instrument players"
//                             onChange={(values) => handleCastValuesChange(values, "instrumentPlayer")}
//                         />
//                     </div>

//                     {/* Column 2 */}
//                     <div className="flex flex-col space-y-4">
//                         {/* Audio Quality Dropdown */}
//                         <CustomDropdown
//                             label="Audio Quality"
//                             required
//                             selectedOption={formData.audioQuality}
//                             onOptionSelect={(value) => handleDropdownChange("audioQuality", String(value))}
//                             options={["320kbps", "256kbps", "128kbps", "64kbps"]}
//                         />
//                         {formTouched.audioQuality && errors.audioQuality && (
//                             <p className="text-red-500 text-sm mt-1">{errors.audioQuality}</p>
//                         )}

//                         <InputField
//                             id="musicAlbum"
//                             type="text"
//                             label="Music Album"
//                             value={formData.musicAlbum}
//                             onChange={(value) => handleInputChange(value, "musicAlbum")}
//                             placeholder="Enter music album name"
//                         />

//                         <InputField
//                             id="musicNumber"
//                             type="text"
//                             label="Music Number"
//                             value={formData.musicNumber}
//                             onChange={(value) => handleInputChange(value, "musicNumber")}
//                             placeholder="Enter music number in album"
//                         />

//                         <InputField
//                             id="recorder"
//                             type="text"
//                             label="Recorder"
//                             value={formData.recorder}
//                             onChange={(value) => handleInputChange(value, "recorder")}
//                             placeholder="Enter recording engineer's name"
//                         />

//                         <CustomDropdown
//                             label="Event Type"
//                             required
//                             selectedOption={formData.eventType}
//                             onOptionSelect={(value) => handleDropdownChange("eventType", String(value))}
//                             options={["War", "Politics", "Religion", "Culture", "Famine_Crisis", "Civil_Rights", "Economy", "Diplomacy", "Leadership", "Ethnic_Movements"]}
//                         />
//                         {formTouched.eventType && errors.eventType && (
//                             <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
//                         )}

//                         {/* Event Date Input */}
//                         <InputField
//                             id="eventDate"
//                             type="text"
//                             label="Event Date"
//                             required
//                             value={formData.eventDate}
//                             onChange={(value) => handleInputChange(value, "eventDate")}
//                             placeholder="YYYY-MM-DD"
//                         />
//                         {formTouched.eventDate && errors.eventDate && (
//                             <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
//                         )}

//                         <InputField
//                             id="significance"
//                             type="textarea"
//                             label="Significance"
//                             required
//                             value={formData.significance}
//                             onChange={(value) => handleInputChange(value, "significance")}
//                             placeholder="Enter significance"
//                         />
//                         {formTouched.significance && errors.significance && (
//                             <p className="text-red-500 text-sm mt-1">{errors.significance}</p>
//                         )}

//                         <InputField
//                             id="location"
//                             type="text"
//                             label="Location"
//                             value={formData.location}
//                             onChange={(value) => handleInputChange(value, "location")}
//                             placeholder="Enter location"
//                         />

//                         <CustomDropdown
//                             label="Access Level"
//                             required
//                             selectedOption={formData.accessLevel}
//                             onOptionSelect={(value) => handleDropdownChange("accessLevel", String(value))}
//                             options={["Public", "Premium", "Researcher"]}
//                         />
//                         {formTouched.accessLevel && errors.accessLevel && (
//                             <p className="text-red-500 text-sm mt-1">{errors.accessLevel}</p>
//                         )}

//                         {/* Publication Date Input */}
//                         <InputField
//                             id="publicationDate"
//                             type="text"
//                             label="Publication Date"
//                             required
//                             value={formData.publicationDate}
//                             onChange={(value) => handleInputChange(value, "publicationDate")}
//                             placeholder="YYYY-MM-DD"
//                         />
//                         {formTouched.publicationDate && errors.publicationDate && (
//                             <p className="text-red-500 text-sm mt-1">{errors.publicationDate}</p>
//                         )}

//                         <InputField
//                             id="copyrightHolder"
//                             type="text"
//                             label="Copyright Holder"
//                             required
//                             value={formData.copyrightHolder}
//                             onChange={(value) => handleInputChange(value, "copyrightHolder")}
//                             placeholder="Enter copyright holder's name"
//                         />
//                         {formTouched.copyrightHolder && errors.copyrightHolder && (
//                             <p className="text-red-500 text-sm mt-1">{errors.copyrightHolder}</p>
//                         )}

//                         <DynamicFields
//                             fieldLabel="Historical Figures"
//                             placeholder="Enter historical figures"
//                             onChange={(values) => handleCastValuesChange(values, "historicalFigures")}
//                             required
//                         />

//                         <div className="flex items-center">
//                             <div className="col-span-2">
//                                 <div className="flex items-center">
//                                     <label className="block text-md text-[#3e251c] font-medium mb-2 ml-1">Source</label>
//                                     <span className="text-red-700 text-2xl ml-1">*</span>
//                                 </div>
//                                 <CustomRadioButton
//                                     name="source"
//                                     label="Primary"
//                                     value="Primary"
//                                     checked={formData.source === "Primary"}
//                                     onChange={() => handleRadioChange("source", "Primary")}
//                                 />
//                                 <CustomRadioButton
//                                     name="source"
//                                     label="Secondary"
//                                     value="Secondary"
//                                     checked={formData.source === "Secondary"}
//                                     onChange={() => handleRadioChange("source", "Secondary")}
//                                 />
//                                 {formTouched.source && errors.source && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.source}</p>
//                                 )}
//                             </div>
//                         </div>

//                         <DynamicFields
//                             fieldLabel="Related Articles"
//                             placeholder="Enter related articles"
//                             onChange={(values) => handleCastValuesChange(values, "relatedArticles")}
//                         />

//                         <Button
//                             disabled={!isEnabled || isLoading}
//                             loading={isLoading}
//                             onClick={handleSubmit}
//                             className="mt-2"
//                             variant="view"
//                             size="md"
//                         >
//                             Submit
//                         </Button>
//                         <Button variant="border" onClick={() => router.push("/uploader-dashboard/music")} className="mt-4 mb-12">
//                             Cancel
//                         </Button>
//                     </div>
//                 </div>
//             </form>

//             {/* Notification Component */}
//             <Notification
//                 message={notification.message}
//                 type={notification.type}
//                 visible={notification.visible}
//                 onClose={closeNotification}
//             />
//         </div>
//     );
// };

// export default UploadMusicPage;



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

// Function to check if a year is a leap year in the Ethiopian calendar
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

// Music validation schema
const musicSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    alternativeTitle: Yup.string().optional(),
    coverImage: Yup.mixed()
        .required("Album image is required")
        .test("fileType", "Unsupported file type", (value) => value && (value as File).type.startsWith("image/"))
        .test("fileSize", "File size must be less than 5MB", (value) => value && (value as File).size <= 5 * 1024 * 1024),
    music: Yup.mixed()
        .required("Music file is required")
        .test("fileType", "Unsupported audio file type", (value) => value && (value as File).type.startsWith("audio/"))
        .test("fileSize", "File size must be less than 10MB", (value) => value && (value as File).size <= 10 * 1024 * 1024)
        .test("maxSize", "File size must be less than 50MB", (value) => value && (value as File).size <= 80 * 1024 * 1024),
    eventDate: ethiopianDateSchema,
    publicationDate: ethiopianDateSchema,
    language: Yup.string().required(),
    description: Yup.string().required("Description is required"),
    duration: Yup.string().required("Duration is required"),
    composer: Yup.string().optional(),
    musicProducer: Yup.string().optional(),
    musicType: Yup.string().required("Music Type is required"),
    singer: Yup.string().required("Singer information is required"),
    additionalSinger: Yup.array().of(Yup.string()).optional(),
    melodyAuthor: Yup.array().of(Yup.string()).required("Melody Author(s) is/are required"),
    poemAuthor: Yup.array().of(Yup.string()).required("Poem Author(s) is/are required"),
    accessLevel: Yup.string().required("Access Level is required"),
    instrument: Yup.array().of(Yup.string()).optional(),
    instrumentPlayer: Yup.array().of(Yup.string()).optional(),
    audioQuality: Yup.string().required("Audio Quality is required"),
    musicAlbum: Yup.string().optional(),
    musicNumber: Yup.string().optional(),
    recorder: Yup.string().optional(),
    eventType: Yup.string().required("Event Type is required"),
    historicalFigures: Yup.array().of(Yup.string()).required("Historical Figure(s) is/are required"),
    location: Yup.string().optional(),
    significance: Yup.string().required("Significance is required"),
    source: Yup.string().required("Source is required"),
    copyrightHolder: Yup.string().required("Copyright Holder is required"),
    relatedArticles: Yup.array().of(Yup.string()).optional(),
});

const UploadMusicPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        alternativeTitle: "",
        coverImage: null as File | null,
        music: null as File | null,
        language: "",
        description: "",
        duration: "",
        composer: "",
        musicProducer: "",
        musicType: "",
        singer: "",
        additionalSinger: [],
        melodyAuthor: [],
        accessLevel: "",
        poemAuthor: [],
        instrument: [],
        instrumentPlayer: [],
        audioQuality: "",
        musicAlbum: "",
        musicNumber: "",
        recorder: "",
        eventType: "",
        eventDate: "",
        historicalFigures: [],
        location: "",
        significance: "",
        source: "",
        publisher: "",
        copyrightHolder: "",
        relatedArticles: [],
        publicationDate: "",
    });

    const [errors, setFormErrors] = useState<Record<string, string>>({});
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Notification state for showing messages
    const [notification, setNotification] = useState({
        message: "",
        type: "success" as "success" | "error" | "warning",
        visible: false,
    });

    const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

    // Validate form data
    const validateFormData = async () => {
        console.log("Form Data Before Validation:", formData);
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

        const isAudio = file.type.startsWith("audio/");
        const isImage = file.type.startsWith("image/");

        // If the file type is not valid
        if ((fieldName === "music" && !isAudio) || (fieldName === "coverImage" && !isImage)) {
            setFormErrors((prev) => ({
                ...prev,
                [fieldName]: fieldName === "music" ? "Unsupported audio file type." : "Unsupported image file type.",
            }));
            return;
        }

        // Check if file size is greater than 50MB for music
        if (fieldName === "music" && file.size > 1 * 1024 * 1024) {
            setNotification({
                message: "The music file is too large. Maximum size is 50MB.",
                type: "error",
                visible: true,
            });
            return;
        }

        // Check if file size is greater than 5MB for cover image
        if (fieldName === "coverImage" && file.size > 1 * 1024 * 1024) {
            setFormErrors((prev) => ({
                ...prev,
                coverImage: "File size must be less than 5MB",
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
            [field]: values,
        }));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setFormErrors({});

            await musicSchema.validate(formData, { abortEarly: false });

            console.log("Form Submitted:", formData);

            const data = new FormData();
            data.append("title", formData.title);
            data.append("alternativeTitle", formData.alternativeTitle || "");
            data.append("language", formData.language || "");
            data.append("description", formData.description);
            data.append("duration", formData.duration);
            data.append("composer", formData.composer || "");
            data.append("musicProducer", formData.musicProducer || "");
            data.append("musicType", formData.musicType);
            data.append("singer", formData.singer);
            data.append("accessLevel", formData.accessLevel);
            data.append("additionalSinger", formData.additionalSinger.join(",") || "");
            data.append("melodyAuthor", formData.melodyAuthor.join(",") || "");
            data.append("poemAuthor", formData.poemAuthor.join(",") || "");
            data.append("instrument", formData.instrument.join(",") || "");
            data.append("instrumentPlayer", formData.instrumentPlayer.join(",") || "");
            data.append("audioQuality", formData.audioQuality);
            data.append("musicAlbum", formData.musicAlbum || "");
            data.append("musicNumber", formData.musicNumber || "");
            data.append("recorder", formData.recorder || "");
            data.append("eventType", formData.eventType);
            data.append("eventDate", formData.eventDate);
            data.append("historicalFigures", formData.historicalFigures.join(",") || "");
            data.append("location", formData.location || "");
            data.append("significance", formData.significance);
            data.append("source", formData.source);
            data.append("copyrightHolder", formData.copyrightHolder);
            data.append("relatedArticles", formData.relatedArticles.join(",") || "");
            data.append("publicationDate", formData.publicationDate);

            if (formData.music) {
                if (formData.music instanceof File) {
                    data.append("MusicUrl", formData.music);
                } else {
                    console.error("Invalid music file.");
                }
            }
            
            if (formData.coverImage) {
                if (formData.coverImage instanceof File) {
                    data.append("coverImage", formData.coverImage);
                } else {
                    console.error("Invalid cover image file.");
                }
            }

            const uploaderId = sessionStorage.getItem('userId');
            const institutionId = sessionStorage.getItem('institutionId');
            data.append("uploaderId", uploaderId || ""); 
            data.append("institutionId", institutionId || ""); 

            const response = await fetch("/api/content/music/upload-music", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                setNotification({
                    message: "Form submitted successfully!",
                    type: "success",
                    visible: true,
                });

                // Reset form data
                setFormData({
                    title: "",
                    alternativeTitle: "",
                    coverImage: null,
                    music: null,
                    language: "",
                    description: "",
                    duration: "",
                    composer: "",
                    musicProducer: "",
                    musicType: "",
                    singer: "",
                    additionalSinger: [],
                    melodyAuthor: [],
                    accessLevel: "",
                    poemAuthor: [],
                    instrument: [],
                    instrumentPlayer: [],
                    audioQuality: "",
                    musicAlbum: "",
                    musicNumber: "",
                    recorder: "",
                    eventType: "",
                    eventDate: "",
                    historicalFigures: [],
                    location: "",
                    significance: "",
                    source: "",
                    publisher: "",
                    copyrightHolder: "",
                    relatedArticles: [],
                    publicationDate: "",
                });
            } else {
                const error = await response.json();
                setNotification({
                    message: error.message || "An error occurred while submitting the form.",
                    type: "error",
                    visible: true,
                });
            }
        } catch (error) {
            console.error("Error during submission:", error);
            setNotification({
                message: "An error occurred while submitting the form.",
                type: "error",
                visible: true,
            });
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
                <Button onClick={() => router.push("/uploader-dashboard/musics")} variant="view" className="flex items-center">
                    <FontAwesomeIcon icon={faArrows} className="mr-1" />
                    Back to Music List
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
                        {/* File Uploads */}
                        <div>
                            <div className="flex items-center">
                                <label htmlFor="music" className="block mb-2">Upload Music</label>
                                <span className="text-red-700 text-2xl ml-1">*</span>
                            </div>
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={(e) => handleFileChange(e, "music")}
                            />
                            {formTouched.music && errors.music && (
                                <p className="text-red-500 text-sm mt-1">{errors.music}</p>
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

                        {/* Text Inputs */}
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

                        <CustomDropdown
                            label="Language"
                            required
                            selectedOption={formData.language}
                            onOptionSelect={(value) => handleDropdownChange("language", String(value))}
                            options={["Amharic", "Geez", "Afan Oromo", "Tigrinya", "Somali", "Afar", "Wolaytta", "English"]}
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

                        <TimePicker
                            label="Duration"
                            name="duration"
                            require
                            value={formData.duration}
                            onChange={(value) => handleInputChange(value, "duration")}
                        />
                        {formTouched.duration && errors.duration && (
                            <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                        )}

                        <InputField
                            id="composer"
                            type="text"
                            label="Composer"
                            value={formData.composer}
                            onChange={(value) => handleInputChange(value, "composer")}
                            placeholder="Enter composer's name"
                        />

                        <InputField
                            id="musicProducer"
                            type="text"
                            label="Music Producer"
                            value={formData.musicProducer}
                            onChange={(value) => handleInputChange(value, "musicProducer")}
                            placeholder="Enter music producer's name"
                        />

                        <CustomDropdown
                            label="Music Type"
                            required
                            selectedOption={formData.musicType}
                            onOptionSelect={(value) => handleDropdownChange("musicType", String(value))}
                            options={["Traditional", "Religious", "Fusion & Modern", "Dance & Festival", "Instrumental"]}
                        />
                        {formTouched.musicType && errors.musicType && (
                            <p className="text-red-500 text-sm mt-1">{errors.musicType}</p>
                        )}

                        {/* Singer and Authors */}
                        <InputField
                            id="singer"
                            type="text"
                            label="Singer"
                            required
                            value={formData.singer}
                            onChange={(value) => handleInputChange(value, "singer")}
                            placeholder="Enter singer's name"
                        />
                        {formTouched.singer && errors.singer && (
                            <p className="text-red-500 text-sm mt-1">{errors.singer}</p>
                        )}

                        <DynamicFields
                            fieldLabel="Additional Singers"
                            placeholder="Enter additional singers"
                            onChange={(values) => handleCastValuesChange(values, "additionalSinger")}
                        />
                        <DynamicFields
                            fieldLabel="Melody Authors"
                            required
                            placeholder="Enter melody authors"
                            onChange={(values) => handleCastValuesChange(values, "melodyAuthor")}
                        />
                        <DynamicFields
                            fieldLabel="Poem Authors"
                            required
                            placeholder="Enter poem authors"
                            onChange={(values) => handleCastValuesChange(values, "poemAuthor")}
                        />
                        <DynamicFields
                            fieldLabel="Instruments"
                            placeholder="Enter instruments used"
                            onChange={(values) => handleCastValuesChange(values, "instrument")}
                        />
                        <DynamicFields
                            fieldLabel="Instrument Players"
                            placeholder="Enter instrument players"
                            onChange={(values) => handleCastValuesChange(values, "instrumentPlayer")}
                        />
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col space-y-4">
                        {/* Audio Quality Dropdown */}
                        <CustomDropdown
                            label="Audio Quality"
                            required
                            selectedOption={formData.audioQuality}
                            onOptionSelect={(value) => handleDropdownChange("audioQuality", String(value))}
                            options={["320kbps", "256kbps", "128kbps", "64kbps"]}
                        />
                        {formTouched.audioQuality && errors.audioQuality && (
                            <p className="text-red-500 text-sm mt-1">{errors.audioQuality}</p>
                        )}

                        <InputField
                            id="musicAlbum"
                            type="text"
                            label="Music Album"
                            value={formData.musicAlbum}
                            onChange={(value) => handleInputChange(value, "musicAlbum")}
                            placeholder="Enter music album name"
                        />

                        <InputField
                            id="musicNumber"
                            type="text"
                            label="Music Number"
                            value={formData.musicNumber}
                            onChange={(value) => handleInputChange(value, "musicNumber")}
                            placeholder="Enter music number in album"
                        />

                        <InputField
                            id="recorder"
                            type="text"
                            label="Recorder"
                            value={formData.recorder}
                            onChange={(value) => handleInputChange(value, "recorder")}
                            placeholder="Enter recording engineer's name"
                        />

                        <CustomDropdown
                            label="Event Type"
                            required
                            selectedOption={formData.eventType}
                            onOptionSelect={(value) => handleDropdownChange("eventType", String(value))}
                            options={["War", "Politics", "Religion", "Culture", "Famine_Crisis", "Civil_Rights", "Economy", "Diplomacy", "Leadership", "Ethnic_Movements"]}
                        />
                        {formTouched.eventType && errors.eventType && (
                            <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
                        )}

                        {/* Event Date Input */}
                        <InputField
                            id="eventDate"
                            type="text"
                            label="Event Date"
                            required
                            value={formData.eventDate}
                            onChange={(value) => handleInputChange(value, "eventDate")}
                            placeholder="YYYY-MM-DD"
                        />
                        {formTouched.eventDate && errors.eventDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
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
                        {formTouched.significance && errors.significance && (
                            <p className="text-red-500 text-sm mt-1">{errors.significance}</p>
                        )}

                        <InputField
                            id="location"
                            type="text"
                            label="Location"
                            value={formData.location}
                            onChange={(value) => handleInputChange(value, "location")}
                            placeholder="Enter location"
                        />

                        <CustomDropdown
                            label="Access Level"
                            required
                            selectedOption={formData.accessLevel}
                            onOptionSelect={(value) => handleDropdownChange("accessLevel", String(value))}
                            options={["Public", "Premium", "Researcher"]}
                        />
                        {formTouched.accessLevel && errors.accessLevel && (
                            <p className="text-red-500 text-sm mt-1">{errors.accessLevel}</p>
                        )}

                        {/* Publication Date Input */}
                        <InputField
                            id="publicationDate"
                            type="text"
                            label="Publication Date"
                            required
                            value={formData.publicationDate}
                            onChange={(value) => handleInputChange(value, "publicationDate")}
                            placeholder="YYYY-MM-DD"
                        />
                        {formTouched.publicationDate && errors.publicationDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.publicationDate}</p>
                        )}

                        <InputField
                            id="copyrightHolder"
                            type="text"
                            label="Copyright Holder"
                            required
                            value={formData.copyrightHolder}
                            onChange={(value) => handleInputChange(value, "copyrightHolder")}
                            placeholder="Enter copyright holder's name"
                        />
                        {formTouched.copyrightHolder && errors.copyrightHolder && (
                            <p className="text-red-500 text-sm mt-1">{errors.copyrightHolder}</p>
                        )}

                        <DynamicFields
                            fieldLabel="Historical Figures"
                            placeholder="Enter historical figures"
                            onChange={(values) => handleCastValuesChange(values, "historicalFigures")}
                            required
                        />

                        <div className="flex items-center">
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
                        </div>

                        <DynamicFields
                            fieldLabel="Related Articles"
                            placeholder="Enter related articles"
                            onChange={(values) => handleCastValuesChange(values, "relatedArticles")}
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

export default UploadMusicPage;