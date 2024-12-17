// "use client";
// import { useState } from "react";
// import JoinRequestPage from "./JoinRequestPage";
// import RegisterPage from "./RegisterPage";

// export default function MultiStepForm() {
//   const [step, setStep] = useState(1);

//   // State to hold data from both steps
//   const [institutionData, setInstitutionData] = useState({
//     name: "",
//     address: "",
//     email: "",
//     phone: "",
//     photo: null,
//     type: "",
//     establishDate: "",
//     registrationNumber: "",
//     website: "",
//     description: "",
//     numberOfEmployees: "",
//     document: null,
//   });
//   const [adminData, setAdminData] = useState({
//     adminUsername: "",
//     adminPassword: "",
//     adminEmail: "",
//     adminFirstName:"",
//     adminLastName:"",
//     phoneNumber:"",
//     gender:"",
//     agreed:"",
//   });

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   const handleInstitutionSubmit = (data: any) => {
//     setInstitutionData(data);
//     nextStep();
//   };


//   const handleAdminSubmit = async (data: any) => {
//     setAdminData(data);
//     const payload = { ...institutionData, ...data };

//     try {
//       const response = await fetch("/api/institutions/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Institution created successfully:", result);
//         // Optionally redirect or show success message here
//       } else {
//         const error = await response.json();
//         console.error("Error:", error.message);
//       }
//     } catch (error) {
//       console.error("Failed to submit data:", error);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-[#E5E5CB] flex items-center justify-center p-4 overflow-hidden">
//       <div
//         className={`absolute inset-0 transition-transform duration-500 ease-in-out ${step === 1 ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         <JoinRequestPage onSubmit={handleInstitutionSubmit} />
//       </div>
//       <div
//         className={`absolute inset-0 transition-transform duration-500 ease-in-out ${step === 2 ? "translate-x-0" : "translate-x-full"
//           }`}
//       >
//         <RegisterPage onSubmit={handleAdminSubmit} onBack={prevStep} />
//       </div>
//     </div>
//   );
// }



// import { useState } from 'react';

// const InstitutionCreatePage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     registrationNumber: '',
//     address: '',
//     website: '',
//     emailDomain: '',
//     collaborationPurpose: '',
//     establishDate: '',
//     numberOfEmploy: 0,
//     Phone: '',
//     adminEmail: '',
//     adminFirstName: '',
//     adminLastName: '',
//     adminGender: 'MALE',
//     adminPhoneNumber: '',
//     adminUsername: '',
//     adminPassword: '',
//   });

//   const [photoFile, setPhotoFile] = useState<File | null>(null);
//   const [documentFile, setDocumentFile] = useState<File | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'document') => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file) {
//       if (type === 'photo') {
//         setPhotoFile(file);
//       } else if (type === 'document') {
//         setDocumentFile(file);
//       }
//     }
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   // Check if files are selected
//   if (photoFile && documentFile) {
//     const formDataToSend = new FormData();
    
//     formDataToSend.append('photo', photoFile);
//     formDataToSend.append('document', documentFile);

//     // Add form data to FormData object
//     for (const key in formData) {
//       formDataToSend.append(key, String(formData[key as keyof typeof formData]));
//     }

//     try {
//       const response = await fetch('/api/institutions/create', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       // Check if the response is ok
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the raw error message
//         console.error('Server error:', errorText); // Log the error to the console
//         alert(`Error: ${errorText}`);
//         return;
//       }

//       const data = await response.json(); // Parse as JSON if the response is OK
//       alert('Institution and admin created successfully!');
//     } catch (error) {
//       console.error('Request failed:', error);
//       alert('An error occurred while creating the institution.');
//     }
//   } else {
//     alert('Please upload both photo and document.');
//   }
// };

  

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Institution Name</label>
//         <input type="text" name="name" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Registration Number</label>
//         <input type="text" name="registrationNumber" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Address</label>
//         <input type="text" name="address" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Website</label>
//         <input type="text" name="website" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Email Domain</label>
//         <input type="text" name="emailDomain" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Collaboration Purpose</label>
//         <input type="text" name="collaborationPurpose" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Establish Date</label>
//         <input type="date" name="establishDate" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Number of Employees</label>
//         <input type="number" name="numberOfEmploy" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Contact Phone</label>
//         <input type="text" name="Phone" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Admin Email</label>
//         <input type="email" name="adminEmail" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Admin First Name</label>
//         <input type="text" name="adminFirstName" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Admin Last Name</label>
//         <input type="text" name="adminLastName" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Admin Gender</label>
//         <select name="adminGender" onChange={handleChange}>
//           <option value="MALE">Male</option>
//           <option value="FEMALE">Female</option>
//         </select>
//       </div>
//       <div>
//         <label>Admin Phone</label>
//         <input type="text" name="adminPhoneNumber" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Admin Username</label>
//         <input type="text" name="adminUsername" onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Admin Password</label>
//         <input type="password" name="adminPassword" onChange={handleChange} required />
//       </div>

//       {/* File upload */}
//       <div>
//         <label>Institution Photo</label>
//         <input type="file" onChange={(e) => handleFileChange(e, 'photo')} required />
//       </div>

//       <div>
//         <label>Institution Document</label>
//         <input type="file" onChange={(e) => handleFileChange(e, 'document')} required />
//       </div>

//       <button type="submit">Create Institution</button>
//     </form>
//   );
// };

// export default InstitutionCreatePage;



import router from 'next/router';
import { useState } from 'react';

const InstitutionCreatePage = () => {
  const [formData, setFormData] = useState<{
    name: string;
    registrationNumber: string;
    address: string;
    website: string;
    emailDomain: string;
    collaborationPurpose: string;
    establishDate: string;
    numberOfEmploy: string; // Initially set as string, we'll convert it to an int later
    Phone: string;
    type: 'MUSEUM';
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
    numberOfEmploy: '', // Keeping it as a string to handle form input easily
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

    // Ensure that numberOfEmploy is treated as an integer
    const numberOfEmploy = parseInt(formData.numberOfEmploy, 10); // Explicitly convert to number

    if (isNaN(numberOfEmploy)) {
      alert("Invalid value for 'numberOfEmploy'. It must be a number.");
      return;
    }

    // Ensure the address is a valid JSON if needed
    const formattedData = {
      ...formData,
      establishDate: new Date(formData.establishDate).toISOString(), // Ensure valid DateTime format
      numberOfEmploy, // Correctly passing it as a number
      address: JSON.stringify({ address: formData.address }), // If you need a simple address JSON
    };

    // Ensure all required files are selected
    if (!photoFile || !documentFile) {
      alert('Please upload both photo and document.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('photo', photoFile);
    formDataToSend.append('document', documentFile);

    // Append the rest of the form data
    for (const key in formattedData) {
      formDataToSend.append(key, String(formattedData[key as keyof typeof formattedData])); // Ensure each value is a string
    }

    try {
      const response = await fetch('/api/institutions/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the raw error message
        console.error('Server error:', errorText); // Log the error
        alert(`Error: ${errorText}`);
        return;
      }

      const data = await response.json(); // Parse the JSON if the response is OK
      alert('Institution and admin created successfully!');
      router.push('/signin');
    } catch (error) {
      console.error('Request failed:', error);
      alert('An error occurred while creating the institution.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Institution Name</label>
        <input type="text" name="name" onChange={handleChange} required />
      </div>
      <div>
        <label>Registration Number</label>
        <input type="text" name="registrationNumber" onChange={handleChange} required />
      </div>
      <div>
        <label>Address</label>
        <input type="text" name="address" onChange={handleChange} required />
      </div>
      <div>
        <label>Website</label>
        <input type="text" name="website" onChange={handleChange} required />
      </div>
      <div>
        <label>Email Domain</label>
        <input type="text" name="emailDomain" onChange={handleChange} required />
      </div>
      <div>
        <label>Collaboration Purpose</label>
        <input type="text" name="collaborationPurpose" onChange={handleChange} required />
      </div>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      >
        <option value="MUSEUM">Museum</option>
        <option value="CHURCH">Church</option>
        <option value="LIBRARY">Library</option>
        <option value="SCHOOL">School</option>
        <option value="OTHER">Other</option>
      </select>
      <div>
        <label>Establish Date</label>
        <input type="date" name="establishDate" onChange={handleChange} required />
      </div>
      <div>
        <label>Number of Employees</label>
        <input type="number" name="numberOfEmploy" onChange={handleChange} required />
      </div>
      <div>
        <label>Contact Phone</label>
        <input type="text" name="Phone" onChange={handleChange} required />
      </div>
      <div>
        <label>Admin Email</label>
        <input type="email" name="adminEmail" onChange={handleChange} required />
      </div>
      <div>
        <label>Admin First Name</label>
        <input type="text" name="adminFirstName" onChange={handleChange} required />
      </div>
      <div>
        <label>Admin Last Name</label>
        <input type="text" name="adminLastName" onChange={handleChange} required />
      </div>
      <div>
        <label>Admin Gender</label>
        <select name="adminGender" onChange={handleChange}>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>
      {/* <div>
        <label>Admin Phone</label>
        <input type="text" name="adminPhoneNumber" onChange={handleChange} required />
      </div> */}
      <div>
        <label>Admin Username</label>
        <input type="text" name="adminUsername" onChange={handleChange} required />
      </div>
      <div>
        <label>Admin Password</label>
        <input type="password" name="adminPassword" onChange={handleChange} required />
      </div>

      {/* File upload */}
      <div>
        <label>Institution Photo</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'photo')} required />
      </div>

      <div>
        <label>Institution Document</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'document')} required />
      </div>

      <button type="submit">Create Institution</button>
    </form>
  );
};

export default InstitutionCreatePage;
