// "use client";

// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import '../../../app/globals.css';

// export default function ResetPasswordPage() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const { token } = router.query; 

//   const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/auth/reset-password', { token, password });
//       setMessage('Password reset successful. You can now sign in.');
//       setError(''); 
//       router.push('/signin');
//     } catch (error) {
//       setError('Failed to reset password. Please try again.');
//       setMessage(''); 
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

//       {/* Main Box for Reset Password */}
//       <div className="w-full max-w-md p-8 bg-[#E5E5CB] rounded-lg shadow-lg">
//         <header className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-[#3e251c]">Reset Password</h1>
//           <p className="text-[#3e251c]">
//             Enter and confirm your new password.
//           </p>
//         </header>

//         {/* Form for resetting password */}
//         <form className="space-y-4" onSubmit={handleResetPassword}>
//           <div>
//             <label htmlFor="password" className="block text-[#3e251c]">New Password</label>
//             <input
//               type="password"
//               id="password"
//               className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter new password"
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="block text-[#3e251c]">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               className="mt-1 block w-full p-2 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               placeholder="Confirm new password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-[#3e251c] text-white rounded-md hover:bg-[#2d1a14] transition-colors"
//           >
//             Reset Password
//           </button>
//         </form>

//         {/* Message and Error display */}
        // {message && <p className="mt-4 text-green-600">{message}</p>}
        // {error && <p className="mt-4 text-red-600">{error}</p>}

//         {/* Link to sign in */}
//         <p className="mt-6 text-center text-sm text-[#3e251c]">
//           Remembered your password?{" "}
//           <Link href="/signin" className="hover:underline">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import DisabledButton from "../../../../components/DisabledButton";
// import InputField from "../../../../components/InputField";
// import LoadingSpinner from "../../../../components/LoadingSpinner";

// export default function ResetPasswordPage() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isLoading, setIsLoading] = useState(true); // Initial loading state
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [token, setToken] = useState<string | null>(null); // To store the token
//   const router = useRouter();
//   // Simulate loading during the initial render
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false); // Stop loading after a delay
//     }, 1000); // Adjust the delay as needed

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   // Update the button's disabled state based on input fields
//   useEffect(() => {
//     if (newPassword && confirmPassword && newPassword === confirmPassword) {
//       setIsDisabled(false); // Enable button if passwords are valid
//     } else {
//       setIsDisabled(true); // Disable button if validation fails
//     }
//   }, [newPassword, confirmPassword]);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const queryToken = searchParams.get('token'); // Get token from URL search params
//     if (queryToken) {
//       setToken(queryToken);
//     }
//   }, []); // Empty dependency array to ensure this runs only once when the component mounts

//   const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/auth/reset-password', { token, password });
//       setMessage('Password reset successful. You can now sign in.');
//       setError('');
//       router.push('/auth/sign-in');
//     } catch (error) {
//       setError('Failed to reset password. Please try again.');
//       setMessage('');
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-[#f7f4f0] flex flex-col items-center justify-center pt-20">
//       <div className="w-full max-w-md p-8 bg-[#f7f4f0] rounded-lg shadow-lg">
//         <header className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-[#3a2f2c]">Reset Password</h1>
//           <p className="text-[#3e251c] font-thin">
//             Enter your new password below.
//           </p>
//         </header>

//         <form className="space-y-4" onSubmit={handleResetPassword}>
//           {/* New Password Input */}
//           <InputField
//             id="newPassword"
//             label="New Password"
//             type="password"
//             placeholder="Enter your new password"
//             value={newPassword}
//             onChange={(value: string) => setNewPassword(value)}
//           />

//           {/* Confirm Password Input */}
//           <InputField
//             id="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             placeholder="Confirm your new password"
//             value={confirmPassword}
//             onChange={(value: string) => setConfirmPassword(value)}
//           />

//           {/* Error Message */}
//           {newPassword && confirmPassword && newPassword !== confirmPassword && (
//             <p className="text-sm text-red-500">Passwords do not match.</p>
//           )}

//           {/* Conditionally render the button */}
//           {isDisabled ? (
//             <DisabledButton
//               isEnabled={false}
//               onClick={() => {}}
//               label="Reset Password"
//             />
//           ) : (
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-[#3a2f2c] text-white rounded-md hover:bg-[#2d1a14] transition-colors"
//             >
//               Reset Password
//             </button>
//           )}
//         </form>
//         <p className="mt-6 text-center text-sm text-[#3a2f2c]">
//           Remembered your password?{" "}
//           <a href="/auth/sign-in" className="hover:underline">
//             Sign In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
''
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DisabledButton from "../../../../components/DisabledButton";
import InputField from "../../../../components/InputField";
import LoadingSpinner from "../../../../components/LoadingSpinner";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null); // To store the token
  const router = useRouter();

  // Simulate loading during the initial render
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryToken = searchParams.get('token'); // Get token from URL search params
    if (queryToken) {
      setToken(queryToken);
    }
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after a delay
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Empty dependency array to ensure this runs only once when the component mounts

  // Update the button's disabled state based on input fields
  useEffect(() => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setIsDisabled(false); // Enable button if passwords are valid
    } else {
      setIsDisabled(true); // Disable button if validation fails
    }
  }, [newPassword, confirmPassword]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or expired token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', { token, password: newPassword });
      setMessage('Password reset successful. You can now sign in.');
      setError('');
      router.push('/auth/sign-in'); // Redirect to sign in page
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      setMessage('');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#f7f4f0] flex flex-col items-center justify-center pt-20">
      <div className="w-full max-w-md p-8 bg-[#f7f4f0] rounded-lg shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3a2f2c]">Reset Password</h1>
          <p className="text-[#3e251c] font-thin">
            Enter your new password below.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleResetPassword}>
          {/* New Password Input */}
          <InputField
            id="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(value: string) => setNewPassword(value)}
          />

          {/* Confirm Password Input */}
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(value: string) => setConfirmPassword(value)}
          />

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Success Message */}
          {message && <p className="text-sm text-green-500">{message}</p>}

          {/* Conditionally render the button */}
          {isDisabled ? (
            <DisabledButton
              isEnabled={false}
              onClick={() => {}}
              label="Reset Password"
            />
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#3a2f2c] text-white rounded-md hover:bg-[#2d1a14] transition-colors"
            >
              Reset Password
            </button>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-[#3a2f2c]">
          Remembered your password?{" "}
          <a href="/auth/sign-in" className="hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
