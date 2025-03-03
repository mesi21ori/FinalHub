// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import DisabledButton from "../../../../components/DisabledButton";
// import InputField from "../../../../components/InputField";
// import LoadingSpinner from "../../../../components/LoadingSpinner";

// export default function SignInPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isLoading, setIsLoading] = useState(true); // Initial loading state
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(''); // Error state
//   const router = useRouter();

//   // Simulate loading during the initial render
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false); // Stop loading after a delay
//     }, 1000); // Adjust the delay as needed

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   // Update isDisabled state based on form inputs
//   useEffect(() => {
//     if (username && password) {
//       setIsDisabled(false); // Enable button when both fields are filled
//     } else {
//       setIsDisabled(true); // Disable button if any field is empty
//     }
//   }, [username, password]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('Signing in with:', { username, password });

//     try {
//       const response = await axios.post('/api/auth/signin', { username, password });
//       console.log('Response from server:', response.data);

//       if (response.status === 200) {
//         const { token, role, institutionStatus, institutionId, fname, lname, id, email } = response.data;

//         // Check if the user account is deactivated
//         if (response.data.isActive === false) {
//           setError('Your account is deactivated. Please contact support.');
//           return; // Exit the function early
//         }

//         // Save user data in sessionStorage
//         sessionStorage.setItem('authToken', token);
//         sessionStorage.setItem('username', username);
//         sessionStorage.setItem('userRole', role);
//         sessionStorage.setItem('userFname', fname);
//         sessionStorage.setItem('userLname', lname);
//         sessionStorage.setItem('userId', id.toString());
//         sessionStorage.setItem('userEmail', email);
//         if (institutionId !== null) {
//           sessionStorage.setItem('institutionId', institutionId.toString());
//         }

//         // Redirect based on role immediately
//         console.log("Redirecting based on user role:", role);
//         if (role === 'PUBLIC_USER') {
//           router.push('/content/content-page'); // Redirect to content page for PUBLIC_USER
//         } else  if (role === 'RESEARCHER_USER') {
//           router.push('/content/content-page'); // Redirect to content page for PUBLIC_USER
//         } 
//         else if (role === 'INSTITUTION_ADMIN') {
//           router.push('/instituion-dashboard/add-staff');
//         } else if (role === 'PLATFORM_ADMIN') {
//           router.push('/dashboard/request');
//         } else if (role === 'UPLOADER') {
//           router.push('/uploader-dashboard');
//         } else if (role === 'REVIEWER') {
//           router.push('/reviwer-dashboard/content-list');
//         } else if (role === 'PREMIUM_USER') {
//           router.push('/content');
//         } else {
//           router.push('/home');
//         }
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         console.error('Error response:', error.response.data);
//         setError(error.response.data.message || 'Failed to sign in.');
//       } else {
//         setError('An unexpected error occurred. Please try again later.');
//       }
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-[#f7f4f0] flex items-center justify-center">
//       <div className="w-full max-w-md p-8 mt-16 bg-[#f7f4f0] shadow-md rounded-lg">
//         <header className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-[#3e251c]">Welcome back!</h1>
//           <p className="text-[#3a2f2c] font-thin">Enter your credentials to access your account</p>
//         </header>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <InputField
//             id="username"
//             label="Username"
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(value: string) => setUsername(value)}
//           />

//           <InputField
//             id="password"
//             label="Password"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(value: string) => setPassword(value)}
//           />

//           <div className="text-right">
//             <Link href="/auth/forgot-password" className="text-sm text-[#3a2f2c] hover:underline">
//               Forgot Password?
//             </Link>
//           </div>

//           {isDisabled ? (
//             <DisabledButton
//               isEnabled={false}
//               onClick={() => {}}
//               label="Sign In"
//             />
//           ) : (
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-[#3a2f2c] text-white rounded-md transition-colors"
//             >
//               Sign In
//             </button>
//           )}
//           {/* Display the error message here */}
//           {error && <p className="text-sm text-red-500">{error}</p>}
//           {/* Success Message */}
//           {message && <p className="text-sm text-green-500">{message}</p>}
//         </form>

//         <p className="mt-6 text-center text-sm text-[#3a2f2c]">
//           Don't have an account?{" "}
//           <Link href="/auth/sign-up" className="hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import DisabledButton from "../../../../components/DisabledButton";
// import InputField from "../../../../components/InputField";
// import LoadingSpinner from "../../../../components/LoadingSpinner";
// import Notification from "../../../../components/Notification";  // Import the Notification component

// export default function SignInPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isLoading, setIsLoading] = useState(true); // Initial loading state
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(''); // Error state
//   const [notificationMessage, setNotificationMessage] = useState(''); // Notification message
//   const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success'); // Notification type
//   const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // Notification visibility
//   const router = useRouter();

//   // Simulate loading during the initial render
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false); // Stop loading after a delay
//     }, 1000); // Adjust the delay as needed

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   // Update isDisabled state based on form inputs
//   useEffect(() => {
//     if (username && password) {
//       setIsDisabled(false); // Enable button when both fields are filled
//     } else {
//       setIsDisabled(true); // Disable button if any field is empty
//     }
//   }, [username, password]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('Signing in with:', { username, password });

//     try {
//       const response = await axios.post('/api/auth/signin', { username, password });
//       console.log('Response from server:', response.data);

//       if (response.status === 200) {
//         const { token, role, institutionStatus, institutionId, fname, lname, id, email } = response.data;

//         // Check if the user account is deactivated
//         if (response.data.isActive === false) {
//           setError('Your account is deactivated. Please contact support.');
//           return; // Exit the function early
//         }

//         // Save user data in sessionStorage
//         sessionStorage.setItem('authToken', token);
//         sessionStorage.setItem('username', username);
//         sessionStorage.setItem('userRole', role);
//         sessionStorage.setItem('userFname', fname);
//         sessionStorage.setItem('userLname', lname);
//         sessionStorage.setItem('userId', id.toString());
//         sessionStorage.setItem('userEmail', email);
//         if (institutionId !== null) {
//           sessionStorage.setItem('institutionId', institutionId.toString());
//         }

//         // Redirect based on role immediately
//         console.log("Redirecting based on user role:", role);
//         if (role === 'PUBLIC_USER') {
//           router.push('/content/content-page'); // Redirect to content page for PUBLIC_USER
//         } else if (role === 'RESEARCHER_USER') {
//           router.push('/content/content-page'); // Redirect to content page for PUBLIC_USER
//         } else if (role === 'INSTITUTION_ADMIN') {
//           router.push('/institutional-admin-dashboard/add');
//         } else if (role === 'PLATFORM_ADMIN') {
//           router.push('/dashboard/request');
//         } else if (role === 'UPLOADER') {
//           router.push('/uploader-dashboard');
//         } else if (role === 'REVIEWER') {
//           router.push('/reviwer-dashboard/content-list');
//         } else if (role === 'PREMIUM_USER') {
//           router.push('/content');
//         } else {
//           router.push('/home');
//         }

//         // Show success notification
//         setNotificationMessage('Sign-in successful!');
//         setNotificationType('success');
//         setNotificationVisible(true);
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         console.error('Error response:', error.response.data);
//         setNotificationMessage(error.response.data.message || 'Failed to sign in.');  // Show error in notification
//         setNotificationType('error');
//         setNotificationVisible(true);  // Show notification
//       } else {
//         setNotificationMessage('An unexpected error occurred. Please try again later.');
//         setNotificationType('error');
//         setNotificationVisible(true);  // Show notification
//       }
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen bg-[#f7f4f0] flex items-center justify-center">
//       {/* Notification Component */}
//       <Notification
//         message={notificationMessage}
//         type={notificationType}
//         visible={notificationVisible}
//         onClose={() => setNotificationVisible(false)} // Close notification
//       />
      
//       <div className="w-full max-w-md p-8 mt-16 bg-[#f7f4f0] shadow-md rounded-lg">
//         <header className="text-center mb-6">
//           <h1 className="text-2xl font-bold text-[#3e251c]">Welcome back!</h1>
//           <p className="text-[#3a2f2c] font-thin">Enter your credentials to access your account</p>
//         </header>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <InputField
//             id="username"
//             label="Username"
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(value: string) => setUsername(value)}
//           />

//           <InputField
//             id="password"
//             label="Password"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(value: string) => setPassword(value)}
//           />

//           <div className="text-right">
//             <Link href="/auth/forgot-password" className="text-sm text-[#3a2f2c] hover:underline">
//               Forgot Password?
//             </Link>
//           </div>

//           {isDisabled ? (
//             <DisabledButton
//               isEnabled={false}
//               onClick={() => {}}
//               label="Sign In"
//             />
//           ) : (
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-[#3a2f2c] text-white rounded-md transition-colors"
//             >
//               Sign In
//             </button>
//           )}
//         </form>

//         <p className="mt-6 text-center text-sm text-[#3a2f2c]">
//           Don't have an account?{" "}
//           <Link href="/auth/sign-up" className="hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DisabledButton from "../../../../components/DisabledButton";
import InputField from "../../../../components/InputField";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import Notification from "../../../../components/Notification";  // Import the Notification component
import jwt from "jsonwebtoken";  // Import the jsonwebtoken library

// Type for the decoded JWT token
interface DecodedToken {
  username: string;
  role: string;
  fname: string;
  lname: string;
  id: number;
  userEmail: string;
  institutionAdmin?: number;
  institutionId?:number
}

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Error state
  const [notificationMessage, setNotificationMessage] = useState(''); // Notification message
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success'); // Notification type
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // Notification visibility
  const router = useRouter();

  // Simulate loading during the initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after a delay
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Update isDisabled state based on form inputs
  useEffect(() => {
    if (username && password) {
      setIsDisabled(false); // Enable button when both fields are filled
    } else {
      setIsDisabled(true); // Disable button if any field is empty
    }
  }, [username, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Signing in with:', { username, password });
  
    try {
      const response = await axios.post('/api/auth/signin', { username, password });
      console.log('Response from server:', response.data);
  
      if (response.status === 200 && response.data.token) {
        const { token } = response.data;
  

        if (response.data.isActive === false) {
          setError('Your account is deactivated. Please contact support.');
          return; 
        }
  
       
        try {
          const decodedToken = jwt.decode(token) as DecodedToken;
          console.log('Decoded token:', decodedToken);  
  
          if (decodedToken) {
           
            sessionStorage.setItem('authToken', token);
            sessionStorage.setItem('username', decodedToken.username);
            sessionStorage.setItem('userRole', decodedToken.role);
            sessionStorage.setItem('userFname', decodedToken.fname);
            sessionStorage.setItem('userLname', decodedToken.lname);
  
           

            if (decodedToken.id) {
              sessionStorage.setItem('userId', decodedToken.id.toString());
            } else {
              console.error('User ID is missing in decoded token');
            }
  
            if (decodedToken.institutionId) {
              sessionStorage.setItem('institutionId', decodedToken.institutionId.toString());
            } else {
              console.error('User ID is missing in decoded token');
            }
            if (decodedToken.userEmail) {
              sessionStorage.setItem('userEmail', decodedToken.userEmail);
            }
  
          
            if (decodedToken.institutionAdmin) {
              sessionStorage.setItem('institutionId', decodedToken.institutionAdmin.toString());
            }
  
           
            console.log('Redirecting user based on role:', decodedToken.role);
  
          
            if (decodedToken.role === 'PUBLIC_USER') {
              console.log("Redirecting to content page for PUBLIC_USER");
              router.push('/content/content-page'); 
            } else if (decodedToken.role === 'RESEARCHER_USER') {
              router.push('/content/content-page'); 
            } else if (decodedToken.role === 'INSTITUTION_ADMIN') {
              router.push('/institutional-admin-dashboard/overview');
            } else if (decodedToken.role === 'PLATFORM_ADMIN') {
              router.push('/dashboard/overview');
            } else if (decodedToken.role === 'UPLOADER') {
              router.push('/uploader-dashboard/overview');
            } else if (decodedToken.role === 'REVIEWER') {
              router.push('/reviwer-dashboard/overview');
            } else if (decodedToken.role === 'PREMIUM_USER') {
              router.push('/content/content-page');
            } else {
              router.push('/');
            }
  
            setNotificationMessage('Sign-in successful!');
            setNotificationType('success');
            setNotificationVisible(true);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          setNotificationMessage('Failed to decode the token. Please try again later.');
          setNotificationType('error');
          setNotificationVisible(true);
        }
      } else {
        
        setNotificationMessage('Unexpected response from the server.');
        setNotificationType('error');
        setNotificationVisible(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
        setNotificationMessage(error.response.data.message || 'Failed to sign in.');
        setNotificationType('error');
        setNotificationVisible(true); 
      } else {
        console.error('Unexpected error:', error);
        setNotificationMessage('An unexpected error occurred. Please try again later.');
        setNotificationType('error');
        setNotificationVisible(true);  
      }
    } finally {
      setIsLoading(false); 
    }
  };
  
  
  

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#f7f4f0] flex items-center justify-center">
      {/* Notification Component */}
      <Notification
        message={notificationMessage}
        type={notificationType}
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)} // Close notification
      />
      
      <div className="w-full max-w-md p-8 mt-16 bg-[#f7f4f0] shadow-md rounded-lg">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#3e251c]">Welcome back!</h1>
          <p className="text-[#3a2f2c] font-thin">Enter your credentials to access your account</p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(value: string) => setUsername(value)}
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(value: string) => setPassword(value)}
          />

          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-[#3a2f2c] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {isDisabled ? (
            <DisabledButton
              isEnabled={false}
              onClick={() => {}}
              label="Sign In"
            />
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#3a2f2c] text-white rounded-md transition-colors"
            >
              Sign In
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-[#3a2f2c]">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
