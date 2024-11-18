// "use client"; 
// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from 'next/router';
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import '../src/app/globals.css'; 

// export default function SignUpPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [institutionId, setInstitutionId] = useState<number | undefined>(undefined);
//   const [subscriptionId, setSubscriptionId] = useState<number | undefined>(undefined);
//   const [isChecked, setIsChecked] = useState(false);
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordStrength, setPasswordStrength] = useState('');
//   const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const checkPasswordStrength = (password: string) => {
//     const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     if (password.length === 0) {
//       setPasswordStrength("");
//     } else if (password.length < 8) {
//       setPasswordStrength("Too short");
//     } else if (strongPassword.test(password)) {
//       setPasswordStrength("Strong");
//     } else {
//       setPasswordStrength("Weak");
//     }
//   };

  
//   const checkUsernameAvailability = (username: string) => {
//     const unavailableUsernames = ["admin", "user", "test"];
//     return !unavailableUsernames.includes(username.toLowerCase());
//   };

//   const handleUsernameChange = (value: string) => {
//     setUsername(value);
//     if (value.length < 6) {
//       setUsernameError("Username must be at least 6 characters.");
//     } else if (!checkUsernameAvailability(value)) {
//       setUsernameError("Username is already in use.");
//       setIsUsernameAvailable(false);
//     } else {
//       setUsernameError("");
//       setIsUsernameAvailable(true);
//     }
//   };

  
//   const isSubmitDisabled = !isChecked || passwordStrength !== "Strong" || !isUsernameAvailable;

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
    
//     try {
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           password,
//           username,
//           institutionId,
//           subscriptionId,
//         }),
//       });

//       if (response.ok) {
//         router.push('/signin'); 
//       } else {
//         const data = await response.json();
//         setError(data.message);
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       setError('An unexpected error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#E5E5CB] flex items-center justify-center">
//       {/* Header with Logo and Back to Home */}
//       <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-[#3C2A21] p-4">
//         <div className="text-[#D5CEA3] font-bold text-lg">Logo</div>
//         <Link href="/" className="text-[#D5CEA3] hover:underline">
//           Back to home
//         </Link>
//       </div>

//       {/* Main Box for Sign Up */}
//       <div className="w-full max-w-md p-8 mt-16 bg-[#E5E5CB] shadow-lg rounded-lg">
//         <header className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-[#3e251c]">Create an account</h1>
//           <p className="text-[#3e251c]">Fill in the details below to sign up</p>
//         </header>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="block text-[#3e251c]">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="username" className="block text-[#3e251c]">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => handleUsernameChange(e.target.value)}
//               className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
//               placeholder="Enter your username"
//               required
//             />
//             {usernameError && <p className="text-sm text-red-600 mt-1">{usernameError}</p>}
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-[#3e251c]">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 checkPasswordStrength(e.target.value);
//               }}
//               className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
//               placeholder="Enter your password"
//               required
//             />
//             {password && (
//               <p className={`text-sm mt-1 ${passwordStrength === "Strong" ? "text-green-600" : "text-red-600"}`}>
//                 {passwordStrength === "Strong" ? "Strong password" : passwordStrength === "Too short" ? "Password must be at least 8 characters" : "Password must include uppercase, lowercase, number, and special character"}
//               </p>
//             )}
//           </div>
         
         
//           <div className="flex items-center space-x-2">
//             <div className="relative">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 checked={isChecked}
//                 onChange={() => setIsChecked(!isChecked)}
//                 className="opacity-0 absolute h-4 w-4"
//               />
//               <div
//                 className={`h-4 w-4 border-2 rounded-sm ${isChecked ? "bg-[#3C2A21]" : "bg-transparent"} border-[#3C2A21] flex items-center justify-center`}
//               >
//                 {isChecked && (
//                   <svg
//                     className="h-3 w-3 text-[#D5CEA3]"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                   </svg>
//                 )}
//               </div>
//             </div>
//             <label htmlFor="terms" className="text-[#3e251c]">
//               I agree with the{" "}
//               <Link href="/terms" className="text-[#3C2A21] hover:underline">
//                 terms and policy
//               </Link>
//             </label>
//           </div>
//           {!isChecked && (
//             <p className="text-sm text-[#3e251c]">
//               Please agree to the terms and policy to proceed.
//             </p>
//           )}
//           <button
//             type="submit"
//             disabled={isSubmitDisabled}
//             className={`w-full py-2 px-4 rounded-md transition-colors ${isSubmitDisabled ? "bg-[#D5CEA3] text-gray-500 cursor-not-allowed" : "bg-[#3C2A21] text-white hover:bg-[#2d1a14]"}`}
//           >
//             Sign Up
//           </button>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//         </form>
        // <p className="mt-6 text-center text-sm text-[#3e251c]">
        //   Already have an account?{" "}
        //   <Link href="/signin" className="hover:underline">
        //     Sign In
        //   </Link>
        // </p>
//       </div>
//     </div>
//   );
// }





"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import '../src/app/globals.css'; 

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [institutionId, setInstitutionId] = useState<number | undefined>(undefined);
  const [subscriptionId, setSubscriptionId] = useState<number | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const checkPasswordStrength = (password: string) => {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 8) {
      setPasswordStrength("Too short");
    } else if (strongPassword.test(password)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const checkUsernameAvailability = (username: string) => {
    const unavailableUsernames = ["admin", "user", "test"];
    return !unavailableUsernames.includes(username.toLowerCase());
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value.length < 6) {
      setUsernameError("Username must be at least 6 characters.");
    } else if (!checkUsernameAvailability(value)) {
      setUsernameError("Username is already in use.");
      setIsUsernameAvailable(false);
    } else {
      setUsernameError("");
      setIsUsernameAvailable(true);
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setProfilePicture(file);
  };

  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isSubmitDisabled = !isChecked || passwordStrength !== "Strong" || !isUsernameAvailable;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('institutionId', institutionId ? institutionId.toString() : '');
    formData.append('subscriptionId', subscriptionId ? subscriptionId.toString() : '');
    
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);  // Append the file
    }
  
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,  // Send FormData
      });
  
      if (response.ok) {
        router.push('/signin'); 
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred');
    }
  };
  
  
  // Function to get the first letter of the email if a profile picture is not selected
  const getEmailInitial = () => {
    return email.charAt(0).toUpperCase() || "?";
  };

  return (
    <div className="min-h-screen bg-[#E5E5CB] flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-[#3C2A21] p-2">
        <div className="text-[#D5CEA3] font-bold text-lg">Logo</div>
        <Link href="/" className="text-[#D5CEA3] hover:underline">
          Back to home
        </Link>
      </div>

      <div className="w-full max-w-2xl p-8 bg-[#E5E5CB] shadow-lg rounded-lg flex flex-col mt-16">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3e251c]">Create an account</h1>
        </header>

        <form className="flex flex-wrap -mx-2 space-y-4" onSubmit={handleSubmit}>
          <div className="w-full md:w-1/2 px-2">
            <div className="flex flex-col items-center mb-4">
              <label className="block text-[#3e251c] mb-2">Profile Picture</label>
              <div
                className="w-24 h-24 border-4 border-dotted border-[#3C2A21] rounded-full flex items-center justify-center overflow-hidden mb-4 cursor-pointer bg-[#D5CEA3]"
                onClick={handleProfilePictureClick}
              >
                {profilePicture ? (
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile Picture"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-[#3C2A21] font-bold text-3xl">
                    {getEmailInitial()}
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
            {/* Remaining form fields for username, email, etc. */}
            <div className="flex flex-col mb-4">
              <label htmlFor="username" className="block text-[#3e251c]">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                placeholder="Enter your username"
              />
              {usernameError && (
                <p className="text-sm text-red-600 mt-1">{usernameError}</p>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="block text-[#3e251c]">Email</label>
              <input
                 type="email"
                 id="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                 placeholder="Enter your email"
                 required
              />
            </div>
          </div>

         
          <div className="w-full md:w-1/2 px-2">
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="block text-[#3e251c]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                  }}
                  className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-[#3C2A21]"
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {password && (
                <p className={`text-sm mt-1 ${passwordStrength === "Strong" ? "text-green-600" : "text-red-600"}`}>
                  {passwordStrength === "Strong"
                    ? "Strong password"
                    : passwordStrength === "Too short"
                    ? "Password must be at least 8 characters"
                    : "Password must include uppercase, lowercase, number, and special character"}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="confirmPassword" className="block text-[#3e251c]">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 text-[#3C2A21]"
                >
                  {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-sm text-red-600 mt-1">Passwords do not match.</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-[#3e251c]">
                I agree with the{" "}
                <Link href="/terms-policy" className="text-[#3C2A21] hover:underline">
                  terms and policy
                </Link>
              </label>
            </div>
            {!isChecked && (
              <p className="text-sm text-red-600 mt-2">Please agree to terms and policy to proceed.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full py-2 px-4 rounded-md transition-colors ${
              isChecked && passwordStrength === "Strong" && isUsernameAvailable 
                ? "bg-[#3C2A21] text-white hover:bg-[#2d1a14]"
                : "bg-[#D5CEA3] text-gray-500 cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-6 text-center text-sm text-[#3e251c]">
          Already have an account?{" "}
          <Link href="/signin" className="hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}