// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";  // Import useSearchParams for URL params
// import { useForm, Controller } from "react-hook-form";
// import InputField from "../../../../components/InputField";
// import CustomDropdown from "../../../../components/CustomDropdown";
// import CustomRadioButton from "../../../../components/CustomRadioButton";
// import DisabledButton from "../../../../components/DisabledButton";
// import { FiArrowLeft } from "react-icons/fi";

// type ResearcherFormValues = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   gender: string;
//   phoneNumber?: string; // Optional
//   researcherType: string;
//   institutionName?: string; // Optional
//   positionTitle?: string; // Optional
//   proofOfAffiliation: FileList | null; // Required (Using FileList for file inputs)
//   roleExplanation?: string; // Optional (Using FileList for file inputs)
//   proofOfIdentity?: FileList | null; // Optional (Using FileList for file inputs)
//   researchTopic: string;
//   purposeOfResearch: string;
//   historicalContentRequested: string;
//   intendedUse: string;
//   supportingDocuments: FileList | null; // Required (Using FileList for file inputs)
// };

// export default function ResearcherApplicationForm() {
//   const [researcherType, setResearcherType] = useState<string>("");
//   const router = useRouter();
 
//   const contentId = sessionStorage.getItem('contentId');  // or localStorage.getItem('contentId')
// console.log("contentId from sessionStorage:", contentId);  


//   const userId = sessionStorage.getItem('userId') || '';  

//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm<ResearcherFormValues>({
//     mode: "onBlur",
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       gender: "",
//       phoneNumber: "",
//       researcherType: "",
//       institutionName: "",
//       positionTitle: "",
//       proofOfAffiliation: null,
//       roleExplanation: "",
//       proofOfIdentity: null,
//       researchTopic: "",
//       purposeOfResearch: "",
//       historicalContentRequested: "",
//       intendedUse: "",
//       supportingDocuments: null,
//     },
//   });

//   const onSubmit = async (data: ResearcherFormValues) => {
//     const formData = new FormData();

//     // Append the form data to FormData
//     formData.append("firstName", data.firstName);
//     formData.append("lastName", data.lastName);
//     formData.append("email", data.email);
//     formData.append("gender", data.gender);
//     formData.append("phoneNumber", data.phoneNumber || "");
//     formData.append("researcherType", data.researcherType);
//     formData.append("institutionName", data.institutionName || "");
//     formData.append("positionTitle", data.positionTitle || "");
//     formData.append("roleExplanation", data.roleExplanation || "");
//     formData.append("researchTopic", data.researchTopic);
//     formData.append("purposeOfResearch", data.purposeOfResearch);
//     formData.append("historicalContentRequested", data.historicalContentRequested);
//     formData.append("intendedUse", data.intendedUse);
//     formData.append("userId", userId);  // Dynamic userId from storage
//     formData.append("contentId", contentId || ''); // Dynamic contentId from URL

//     // Append the files (if they exist)
//     if (data.proofOfAffiliation && data.proofOfAffiliation[0]) {
//       formData.append("proofOfAffiliation", data.proofOfAffiliation[0]);
//     }

//     if (data.proofOfIdentity && data.proofOfIdentity[0]) {
//       formData.append("proofOfIdentity", data.proofOfIdentity[0]);
//     }

//     if (data.supportingDocuments && data.supportingDocuments[0]) {
//       formData.append("supportingDocuments", data.supportingDocuments[0]);
//     }

//     try {
//       const response = await fetch("/api/reviewer/access-requests", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("the request is summtied.");
//         router.push("/content/content-page"); // Redirect to the content page
//       } else {
//         const result = await response.json();
//         console.error("Error:", result.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const isSubmitEnabled = !isSubmitting && isValid && researcherType !== "";

//   return (
//     <div className="flex items-center justify-center w-full p-6 bg-[#E5E5CB] overflow-hidden">
//       <div className="w-full max-w-5xl p-12 bg-[#f7f4f0] shadow-xl rounded-lg flex flex-col space-y-6 overflow-y-auto" style={{ maxHeight: '80vh' }}>
//         <header className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-[#3e251c]">Researcher Application Form</h1>
//         </header>
//               <button
//                 onClick={() => router.back()} 
//                 className="absolute top-14 left-8 text-[#3a2f2c] p-2 rounded-full hover:bg-[#F7F6E9]"
//               >
//                 <FiArrowLeft size={24} />
//               </button>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
//           {/* Form Elements */}
//           <Controller
//             name="firstName"
//             control={control}
//             render={({ field }) => (
//               <InputField
//                 {...field}
//                 id="firstName"
//                 type="text"
//                 required
//                 label="First Name"
//                 placeholder="Enter your first name"
//               />
//             )}
//           />
//           {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName?.message}</p>}

//           <Controller
//             name="lastName"
//             control={control}
//             render={({ field }) => (
//               <InputField
//                 {...field}
//                 id="lastName"
//                 type="text"
//                 required
//                 label="Last Name"
//                 placeholder="Enter your last name"
//               />
//             )}
//           />
//           {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName?.message}</p>}

//           <Controller
//             name="email"
//             control={control}
//             render={({ field }) => (
//               <InputField
//                 {...field}
//                 id="email"
//                 type="email"
//                 required
//                 label="Email Address"
//                 placeholder="johndoe@example.com"
//               />
//             )}
//           />
//           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}

//           <Controller
//             name="phoneNumber"
//             control={control}
//             render={({ field }) => (
//               <InputField
//                 {...field}
//                 id="phoneNumber"
//                 type="text"
//                 label="Phone Number (Optional)"
//                 placeholder="+251134 567 8900"
//                 value={field.value || ""}
//               />
//             )}
//           />

//           <Controller
//             name="gender"
//             control={control}
//             render={({ field }) => (
//               <CustomDropdown
//                 {...field}
//                 label="Gender"
//                 required
//                 options={["MALE", "FEMALE"]}
//                 selectedOption={field.value}
//                 onOptionSelect={field.onChange}
//                 error={errors.gender?.message}
//               />
//             )}
//           />
//           {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender?.message}</p>}

//           <Controller
//             name="researchTopic"
//             control={control}
//             render={({ field }) => (
//               <InputField
//                 {...field}
//                 id="researchTopic"
//                 type="text"
//                 required
//                 label="Research Topic/Title"
//                 placeholder="Enter your research topic"
//               />
//             )}
//           />
//           {errors.researchTopic && <p className="text-red-500 text-xs mt-1">{errors.researchTopic?.message}</p>}

//           <Controller
//             name="purposeOfResearch"
//             control={control}
//             render={({ field }) => (
//               <InputField
//                 {...field}
//                 id="purposeOfResearch"
//                 type="textarea"
//                 required
//                 label="Purpose of Research"
//                 placeholder="Explain your research purpose"
//               />
//             )}
//           />
//           {errors.purposeOfResearch && <p className="text-red-500 text-xs mt-1">{errors.purposeOfResearch?.message}</p>}

//           <Controller
//             name="historicalContentRequested"
//             control={control}
//             render={({ field }) => (
//               <InputField
//                 {...field}
//                 id="historicalContentRequested"
//                 type="textarea"
//                 required
//                 label="Specific Historical Content Requested"
//                 placeholder="What content do you need?"
//               />
//             )}
//           />
//           {errors.historicalContentRequested && <p className="text-red-500 text-xs mt-1">{errors.historicalContentRequested?.message}</p>}

//           <Controller
//             name="intendedUse"
//             control={control}
//             render={({ field }) => (
//               <CustomDropdown
//                 {...field}
//                 label="Intended Use of the Content"
//                 required
//                 options={['Academic Research', 'Publication', 'Educational Purpose', 'Cultural Preservation', 'Other']}
//                 selectedOption={field.value}
//                 onOptionSelect={field.onChange}
//                 error={errors.intendedUse?.message}
//               />
//             )}
//           />
//           {errors.intendedUse && <p className="text-red-500 text-xs mt-1">{errors.intendedUse?.message}</p>}

//           <Controller
//             name="researcherType"
//             control={control}
//             render={({ field: { onChange, value } }) => (
//               <div className="mb-4">
//                 <label className="block font-medium label-color">Are you affiliated with an institution?</label>
//                 <div className="flex gap-4 mt-2 mb-4">
//                   <CustomRadioButton
//                     name="researcherType"
//                     label="Yes (Institutional Researcher)"
//                     value="Yes"
//                     checked={value === "Yes"}
//                     onChange={() => {
//                       setResearcherType("Yes");
//                       onChange("Yes");
//                     }}
//                   />
//                   <CustomRadioButton
//                     name="researcherType"
//                     label="No (Independent/Other Researcher)"
//                     value="No"
//                     checked={value === "No"}
//                     onChange={() => {
//                       setResearcherType("No");
//                       onChange("No");
//                     }}
//                   />
//                 </div>
//                 {errors.researcherType && <p className="text-red-500 text-xs mt-1">{errors.researcherType?.message}</p>}
//               </div>
//             )}
//           />

//           {researcherType === "Yes" && (
//             <>
//               <Controller
//                 name="institutionName"
//                 control={control}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     id="institutionName"
//                     type="text"
//                     required
//                     label="Institution/Organization Name"
//                     placeholder="Enter institution name"
//                     value={field.value || ""}
//                   />
//                 )}
//               />
//               {errors.institutionName && <p className="text-red-500 text-xs mt-1">{errors.institutionName?.message}</p>}

//               <Controller
//                 name="positionTitle"
//                 control={control}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     id="positionTitle"
//                     type="text"
//                     required
//                     label="Position/Title"
//                     placeholder="Enter your position/title"
//                     value={field.value || ""}
//                   />
//                 )}
//               />
//               {errors.positionTitle && <p className="text-red-500 text-xs mt-1">{errors.positionTitle?.message}</p>}
//             </>
//           )}

//           {researcherType === "No" && (
//             <>
//               <Controller
//                 name="roleExplanation"
//                 control={control}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     id="roleExplanation"
//                     type="textarea"
//                     required
//                     label="Explain Your Role as a Researcher"
//                     placeholder="Describe your role"
//                     value={field.value || ""}
//                   />
//                 )}
//               />
//               {errors.roleExplanation && <p className="text-red-500 text-xs mt-1">{errors.roleExplanation?.message}</p>}
//             </>
//           )}

//           <label htmlFor="proofOfAffiliation" className="block font-medium label-color">Proof of Affiliation</label>
//           <Controller
//             name="proofOfAffiliation"
//             control={control}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <div>
//                 <input
//                   id="proofOfAffiliation"
//                   type="file"
//                   required
//                   accept=".pdf, .doc, .png, .jpg, .jpeg"
//                   onChange={(event) => {
//                     const files = event.target.files;
//                     onChange(files);
//                   }}
//                   onBlur={onBlur}
//                 />
//                 {value && value.length > 0 && <p className="text-green-500 text-xs">File selected: {value[0].name}</p>}
//               </div>
//             )}
//           />
//           {errors.proofOfAffiliation && <p className="text-red-500 text-xs mt-1">{errors.proofOfAffiliation?.message}</p>}

//           <label htmlFor="supportingDocuments" className="block font-medium label-color">Supporting Documents</label>
//           <Controller
//             name="supportingDocuments"
//             control={control}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <div>
//                 <input
//                   id="supportingDocuments"
//                   type="file"
//                   required
//                   accept=".pdf,.docx"
//                   onChange={(event) => {
//                     const files = event.target.files;
//                     onChange(files);
//                   }}
//                   onBlur={onBlur}
//                 />
//                 {value && value.length > 0 && <p className="text-green-500 text-xs">File selected: {value[0].name}</p>}
//               </div>
//             )}
//           />
//           {errors.supportingDocuments && <p className="text-red-500 text-xs mt-1">{errors.supportingDocuments?.message}</p>}

//           {/* Submit Button */}
//           <div className="flex justify-center mt-4">
//             <DisabledButton 
//               isEnabled={isSubmitEnabled} 
//               label="Submit" 
//               onClick={handleSubmit(onSubmit)} 
//             />
//           </div>

//           <p className="mt-6 text-center text-sm text-[#3e251c]">
//             Thank you for your request. Our team will review your application and contact you within [X] days.
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import InputField from "../../../../components/InputField";
import CustomDropdown from "../../../../components/CustomDropdown";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import DisabledButton from "../../../../components/DisabledButton";
import { FiArrowLeft } from "react-icons/fi";
import Notification from "../../../../components/Notification"; // Import Notification

type ResearcherFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber?: string; // Optional
  researcherType: string;
  institutionName?: string; // Optional
  positionTitle?: string; // Optional
  proofOfAffiliation: FileList | null; // Required (Using FileList for file inputs)
  roleExplanation?: string; // Optional (Using FileList for file inputs)
  proofOfIdentity?: FileList | null; // Optional (Using FileList for file inputs)
  researchTopic: string;
  purposeOfResearch: string;
  historicalContentRequested: string;
  intendedUse: string;
  supportingDocuments: FileList | null; // Required (Using FileList for file inputs)
};

export default function ResearcherApplicationForm() {
  const [researcherType, setResearcherType] = useState<string>("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success",
    visible: false,
  });
  const router = useRouter();
  const contentId = sessionStorage.getItem('contentId');
  const userId = sessionStorage.getItem('userId') || '';

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResearcherFormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phoneNumber: "",
      researcherType: "",
      institutionName: "",
      positionTitle: "",
      proofOfAffiliation: null,
      roleExplanation: "",
      proofOfIdentity: null,
      researchTopic: "",
      purposeOfResearch: "",
      historicalContentRequested: "",
      intendedUse: "",
      supportingDocuments: null,
    },
  });

  const onSubmit = async (data: ResearcherFormValues) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("phoneNumber", data.phoneNumber || "");
    formData.append("researcherType", data.researcherType);
    formData.append("institutionName", data.institutionName || "");
    formData.append("positionTitle", data.positionTitle || "");
    formData.append("roleExplanation", data.roleExplanation || "");
    formData.append("researchTopic", data.researchTopic);
    formData.append("purposeOfResearch", data.purposeOfResearch);
    formData.append("historicalContentRequested", data.historicalContentRequested);
    formData.append("intendedUse", data.intendedUse);
    formData.append("userId", userId);
    formData.append("contentId", contentId || '');

    if (data.proofOfAffiliation && data.proofOfAffiliation[0]) {
      formData.append("proofOfAffiliation", data.proofOfAffiliation[0]);
    }

    if (data.proofOfIdentity && data.proofOfIdentity[0]) {
      formData.append("proofOfIdentity", data.proofOfIdentity[0]);
    }

    if (data.supportingDocuments && data.supportingDocuments[0]) {
      formData.append("supportingDocuments", data.supportingDocuments[0]);
    }

    try {
      const response = await fetch("/api/reviewer/access-requests", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setNotification({ message: "The request is submitted successfully!", type: "success", visible: true });
        router.push("/content/content-page");
      } else {
        const result = await response.json();
        console.error("Error:", result.error);
        setNotification({ message: result.error || "Submission failed.", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: "An error occurred. Please try again.", type: "error", visible: true });
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  const isSubmitEnabled = !isSubmitting && isValid && researcherType !== "";

  return (
    <div className="flex items-center justify-center w-full p-6 bg-[#E5E5CB] overflow-hidden">
      <Notification 
        message={notification.message} 
        type={notification.type} 
        visible={notification.visible} 
        onClose={handleCloseNotification} 
      />
      <div className="w-full max-w-5xl p-12 bg-[#f7f4f0] shadow-xl rounded-lg flex flex-col space-y-6 overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3e251c]">Researcher Application Form</h1>
        </header>
        <button
          onClick={() => router.back()} 
          className="absolute top-14 left-8 text-[#3a2f2c] p-2 rounded-full hover:bg-[#F7F6E9]"
        >
          <FiArrowLeft size={24} />
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          {/* Form Elements */}
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="firstName"
                type="text"
                required
                label="First Name"
                placeholder="Enter your first name"
              />
            )}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName?.message}</p>}

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="lastName"
                type="text"
                required
                label="Last Name"
                placeholder="Enter your last name"
              />
            )}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName?.message}</p>}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="email"
                type="email"
                required
                label="Email Address"
                placeholder="johndoe@example.com"
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="phoneNumber"
                type="text"
                label="Phone Number (Optional)"
                placeholder="+251134 567 8900"
                value={field.value || ""}
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <CustomDropdown
                {...field}
                label="Gender"
                required
                options={["MALE", "FEMALE"]}
                selectedOption={field.value}
                onOptionSelect={field.onChange}
                error={errors.gender?.message}
              />
            )}
          />
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender?.message}</p>}

          <Controller
            name="researchTopic"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="researchTopic"
                type="text"
                required
                label="Research Topic/Title"
                placeholder="Enter your research topic"
              />
            )}
          />
          {errors.researchTopic && <p className="text-red-500 text-xs mt-1">{errors.researchTopic?.message}</p>}

          <Controller
            name="purposeOfResearch"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="purposeOfResearch"
                type="textarea"
                required
                label="Purpose of Research"
                placeholder="Explain your research purpose"
              />
            )}
          />
          {errors.purposeOfResearch && <p className="text-red-500 text-xs mt-1">{errors.purposeOfResearch?.message}</p>}

          <Controller
            name="historicalContentRequested"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                id="historicalContentRequested"
                type="textarea"
                required
                label="Specific Historical Content Requested"
                placeholder="What content do you need?"
              />
            )}
          />
          {errors.historicalContentRequested && <p className="text-red-500 text-xs mt-1">{errors.historicalContentRequested?.message}</p>}

          <Controller
            name="intendedUse"
            control={control}
            render={({ field }) => (
              <CustomDropdown
                {...field}
                label="Intended Use of the Content"
                required
                options={['Academic Research', 'Publication', 'Educational Purpose', 'Cultural Preservation', 'Other']}
                selectedOption={field.value}
                onOptionSelect={field.onChange}
                error={errors.intendedUse?.message}
              />
            )}
          />
          {errors.intendedUse && <p className="text-red-500 text-xs mt-1">{errors.intendedUse?.message}</p>}

          <Controller
            name="researcherType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="mb-4">
                <label className="block font-medium label-color">Are you affiliated with an institution?</label>
                <div className="flex gap-4 mt-2 mb-4">
                  <CustomRadioButton
                    name="researcherType"
                    label="Yes (Institutional Researcher)"
                    value="Yes"
                    checked={value === "Yes"}
                    onChange={() => {
                      setResearcherType("Yes");
                      onChange("Yes");
                    }}
                  />
                  <CustomRadioButton
                    name="researcherType"
                    label="No (Independent/Other Researcher)"
                    value="No"
                    checked={value === "No"}
                    onChange={() => {
                      setResearcherType("No");
                      onChange("No");
                    }}
                  />
                </div>
                {errors.researcherType && <p className="text-red-500 text-xs mt-1">{errors.researcherType?.message}</p>}
              </div>
            )}
          />

          {researcherType === "Yes" && (
            <>
              <Controller
                name="institutionName"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    id="institutionName"
                    type="text"
                    required
                    label="Institution/Organization Name"
                    placeholder="Enter institution name"
                    value={field.value || ""}
                  />
                )}
              />
              {errors.institutionName && <p className="text-red-500 text-xs mt-1">{errors.institutionName?.message}</p>}

              <Controller
                name="positionTitle"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    id="positionTitle"
                    type="text"
                    required
                    label="Position/Title"
                    placeholder="Enter your position/title"
                    value={field.value || ""}
                  />
                )}
              />
              {errors.positionTitle && <p className="text-red-500 text-xs mt-1">{errors.positionTitle?.message}</p>}
            </>
          )}

          {researcherType === "No" && (
            <>
              <Controller
                name="roleExplanation"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    id="roleExplanation"
                    type="textarea"
                    required
                    label="Explain Your Role as a Researcher"
                    placeholder="Describe your role"
                    value={field.value || ""}
                  />
                )}
              />
              {errors.roleExplanation && <p className="text-red-500 text-xs mt-1">{errors.roleExplanation?.message}</p>}
            </>
          )}

          <label htmlFor="proofOfAffiliation" className="block font-medium label-color">Proof of Affiliation</label>
          <Controller
            name="proofOfAffiliation"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <div>
                <input
                  id="proofOfAffiliation"
                  type="file"
                  required
                  accept=".pdf, .doc, .png, .jpg, .jpeg"
                  onChange={(event) => {
                    const files = event.target.files;
                    onChange(files);
                  }}
                  onBlur={onBlur}
                />
                {value && value.length > 0 && <p className="text-green-500 text-xs">File selected: {value[0].name}</p>}
              </div>
            )}
          />
          {errors.proofOfAffiliation && <p className="text-red-500 text-xs mt-1">{errors.proofOfAffiliation?.message}</p>}

          <label htmlFor="supportingDocuments" className="block font-medium label-color">Supporting Documents</label>
          <Controller
            name="supportingDocuments"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <div>
                <input
                  id="supportingDocuments"
                  type="file"
                  required
                  accept=".pdf,.docx"
                  onChange={(event) => {
                    const files = event.target.files;
                    onChange(files);
                  }}
                  onBlur={onBlur}
                />
                {value && value.length > 0 && <p className="text-green-500 text-xs">File selected: {value[0].name}</p>}
              </div>
            )}
          />
          {errors.supportingDocuments && <p className="text-red-500 text-xs mt-1">{errors.supportingDocuments?.message}</p>}

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <DisabledButton 
              isEnabled={isSubmitEnabled} 
              label="Submit" 
              onClick={handleSubmit(onSubmit)} 
            />
          </div>

          <p className="mt-6 text-center text-sm text-[#3e251c]">
            Thank you for your request. Our team will review your application and Check your email .
          </p>
        </form>
      </div>
    </div>
  );
}