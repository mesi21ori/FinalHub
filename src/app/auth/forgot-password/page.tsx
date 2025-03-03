
// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import DisabledButton from "../../../../components/DisabledButton";
// import InputField from "../../../../components/InputField";
// import LoadingSpinner from "../../../../components/LoadingSpinner";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isLoading, setIsLoading] = useState(true); // Initial loading state
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   // Simulate loading during the initial render
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false); // Stop loading after a delay
//     }, 1000); // Adjust the delay as needed

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   // Update the button's disabled state based on the email input
//   const handleEmailChange = (value: string) => {
//     setEmail(value);
//     setIsDisabled(value === ""); // Disable button if email is empty
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevents the default form submission behavior
//     try {
//       const response = await axios.post('/api/auth/forgot-password', { email });
//       setMessage(response.data.message);
//       setError(''); // Clear any previous errors
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//       setMessage(''); // Clear any previous messages
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-[#f7f4f0] flex flex-col items-center justify-center pt-20">
//       <div className="w-full max-w-md p-8 bg-[#f7f4f0] rounded-lg shadow-lg">
//         <header className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-[#3a2f2c]">Forgot Password</h1>
//           <p className="text-[#3e251c] font-thin">
//             Enter your email to reset your password.
//           </p>
//         </header>

//         <form className="space-y-2" onSubmit={handleSubmit}>
//           <InputField
//             id="email"
//             label="Email Address"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={handleEmailChange}
//           />

//           {isDisabled ? (
//             <DisabledButton
//               isEnabled={false}
//               onClick={() => {}}
//               label="Reset Password"
//             />
//           ) : (
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-[#3a2f2c] text-white rounded-md hover:bg-[#2d1a14] transition-colors mt-2"
//             >
//               Reset Password
//             </button>
//           )}
//         </form>

//         <p className="mt-6 text-center text-sm text-[#3a2f2c]">
//           Remembered your password?{" "}
//           <Link href="/auth/sign-in" className="hover:underline">
//             Sign In
//           </Link>
//         </p>
        
//       </div>
//     </div>
//   );
// }

"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import DisabledButton from "../../../../components/DisabledButton";
import InputField from "../../../../components/InputField";
import LoadingSpinner from "../../../../components/LoadingSpinner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Error state for capturing server-side errors

  // Simulate loading during the initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after a delay
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Update the button's disabled state based on the email input
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsDisabled(value === ""); // Disable button if email is empty
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setError(''); // Clear any previous errors
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again later.';
      setError(errorMessage); // Capture and display the server-side error message
      setMessage(''); // Clear any previous success message
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#f7f4f0] flex flex-col items-center justify-center pt-20">
      <div className="w-full max-w-md p-8 bg-[#f7f4f0] rounded-lg shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3a2f2c]">Forgot Password</h1>
          <p className="text-[#3e251c] font-thin">
            Enter your email to reset your password.
          </p>
        </header>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />

          {isDisabled ? (
            <DisabledButton
              isEnabled={false}
              onClick={() => {}}
              label="Reset Password"
            />
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#3a2f2c] text-white rounded-md hover:bg-[#2d1a14] transition-colors mt-2"
            >
              Reset Password
            </button>
          )}
        </form>

        {message && (
          <p className="mt-6 text-center text-sm text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-[#3a2f2c]">
          Remembered your password?{" "}
          <Link href="/auth/sign-in" className="hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
