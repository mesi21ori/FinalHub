
// import React, { useEffect, useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// import '../src/app/globals.css';
// import axios from 'axios';
// import Layout from "../components/PadminMenu";

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   password?: string; // Optional for updates
//   profilePicture?: string | null;
// }

// const ViewAccountPage: React.FC = () => {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [photoUrl, setPhotoUrl] = useState<string | null>(null);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const userId = typeof window !== 'undefined' && localStorage.getItem('userId') 
//                  ? parseInt(localStorage.getItem('userId') as string) 
//                  : null;

//   // Fetch user data
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (userId) {
//         console.log('Fetching user with ID:', userId);
//         try {
//           const response = await axios.get(`/api/users/${userId}`); // Make sure this API endpoint is correct
//           setUser(response.data);
//           setPhotoUrl(response.data.profilePicture ?? null); // Safely handle potential null
//         } catch (error) {
//           console.error('Failed to fetch user data:', error);
//         }
//       } else {
//         console.error('User ID not found in local storage');
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUser((prevUser: User | null) => {
//       if (prevUser) {
//         return {
//           ...prevUser,
//           [name]: value,
//         };
//       }
//       return prevUser; 
//     });
//   };
// const handleSave = async () => {
//   if (!userId) {
//       console.error('User ID is missing');
//       return;
//   }

//   console.log({
//       email: user?.email,
//       username: user?.username,
//       password: user?.password,
//       userId: userId
//   });

//   try {
//       const response = await axios.put(`/api/users/update`, {
//           email: user?.email,
//           username: user?.username,
//           password: user?.password ? user.password : undefined, // Only send if password is not undefined
//           userId: userId
//       });

//       if (response.status === 200) {
//           const updatedUser = response.data;
//           setUser(updatedUser);
//           setPhotoUrl(updatedUser.profilePicture ?? null);
//           setIsEditMode(false);
//       } else {
//           console.error('Failed to save user data');
//       }
//   } catch (error) {
//       console.error('Error updating user:', error);
//   }
// };
//   const handleCancel = () => {
//     console.log("Changes cancelled");
//     setIsEditMode(false);
//   };

//   const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && userId) {
//         const formData = new FormData();
//         formData.append("profile", file);
//         formData.append("userId", String(userId));

//         try {
//             const response = await axios.post("/api/users/uploadProfilePicture", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             if (response.status === 200) {
//                 setPhotoUrl(response.data.profilePictureUrl);
//             }
//         } catch (error) {
//             console.error("Error uploading profile picture:", error);
//         }
//     }
// };

//   if (!user) return <div>Loading...</div>;

//   const renderProfilePicture = () => {
//     if (photoUrl) {
//         return (
//             <img
//                 src={photoUrl.startsWith('/profile/') ? photoUrl : `/profile/${photoUrl}`} // Check if path is already correct
//                 alt="Profile"
//                 className="w-full h-full object-cover rounded-full"
//                 onError={(e) => {
//                     e.currentTarget.src = '/images/p2.jpg'; // Fallback image
//                 }}
//             />
//         );
//     } else if (user.email) {
//         return (
//             <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#3C2A21] bg-gray-300 rounded-full">
//                 {user.email.charAt(0).toUpperCase()}
//             </div>
//         );
//     }
//     return null;
// };

  
//   return (
//     <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
//       <div className="flex items-center mb-6">
//         <div className="w-32 h-32 border-2 border-dashed border-[#3C2A21] rounded-full flex items-center justify-center overflow-hidden relative cursor-pointer">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handlePhotoChange}
//             className={`opacity-0 absolute inset-0 cursor-pointer ${isEditMode ? "" : "hidden"}`}
//           />
//           {renderProfilePicture()}
//         </div>
//         <div className="ml-6">
//           <h2 className="text-2xl font-bold">Welcome!</h2>
//           <span className="text-xl font-semibold">{user.username}</span>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <div className="flex items-center ml-40">
//           <span className="font-medium w-32">Username:</span>
//           {isEditMode ? (
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={user.username}
//               onChange={handleChange}
//               className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
//               placeholder="Enter your username"
//             />
//           ) : (
//             <span className="ml-2">{user.username}</span>
//           )}
//         </div>

//         <div className="flex items-center ml-40">
//           <span className="font-medium w-32">Email:</span>
//           {isEditMode ? (
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//               className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
//               placeholder="Enter your email"
//             />
//           ) : (
//             <span className="ml-2">{user.email}</span>
//           )}
//         </div>

//         <div className="flex items-center ml-40">
//           <span className="font-medium w-32">Password:</span>
//           {isEditMode ? (
//             <div className="relative">
//               <input
//                 type={isPasswordVisible ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={user.password || ""}
//                 onChange={handleChange}
//                 className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setIsPasswordVisible(!isPasswordVisible)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#3C2A21]"
//               >
//                 {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           ) : (
//             <span className="ml-2">******</span> 
//           )}
//         </div>
//       </div>

//       <div className="flex justify-center mt-6">
//         {isEditMode ? (
//           <>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-[#3C2A21] text-white rounded-md hover:bg-[#2c1c1a]"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={handleCancel}
//               className="ml-4 px-4 py-2 border border-[#3C2A21] rounded-md hover:bg-[#3C2A21] hover:text-white"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => setIsEditMode(true)}
//             className="px-4 py-2 bg-[#3C2A21] text-white rounded-md hover:bg-[#2c1c1a]"
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ViewAccountPage;



import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../src/app/globals.css';
import axios from 'axios';
import Layout from "../components/PadminMenu";

interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Optional for updates
  profilePicture?: string | null;
}

const ViewAccountPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState<string>('');  // Temporary password field for editing
  const userId = typeof window !== 'undefined' && localStorage.getItem('userId') 
                 ? parseInt(localStorage.getItem('userId') as string) 
                 : null;

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        console.log('Fetching user with ID:', userId);
        try {
          const response = await axios.get(`/api/users/${userId}`);
          setUser(response.data);
          setPhotoUrl(response.data.profilePicture ?? null);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      } else {
        console.error('User ID not found in local storage');
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser: User | null) => {
      if (prevUser) {
        return {
          ...prevUser,
          [name]: value,
        };
      }
      return prevUser; 
    });

    if (name === 'password') {
      setPassword(value);  // Update the temporary password state during edit
    }
  };

  const handleSave = async () => {
    if (!userId) {
        console.error('User ID is missing');
        return;
    }

    // Prepare user data
    const updatedData = {
        email: user?.email,
        username: user?.username,
        password: password ? password : undefined, // Only send if password is provided
        userId: userId
    };

    try {
        const response = await axios.put(`/api/users/update`, updatedData);

        if (response.status === 200) {
            const updatedUser = response.data;
            setUser(updatedUser);
            setPhotoUrl(updatedUser.profilePicture ?? null);
            setIsEditMode(false);
        } else {
            console.error('Failed to save user data');
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    console.log("Changes cancelled");
    setIsEditMode(false);
    setPassword('');  // Clear the password state when cancelling
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && userId) {
        const formData = new FormData();
        formData.append("profile", file);
        formData.append("userId", String(userId));

        try {
            const response = await axios.post("/api/users/uploadProfilePicture", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                setPhotoUrl(response.data.profilePictureUrl);
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    }
  };

  if (!user) return <div>Loading...</div>;

  const renderProfilePicture = () => {
    if (photoUrl) {
        return (
            <img
                src={photoUrl.startsWith('/profile/') ? photoUrl : `/profile/${photoUrl}`} // Check if path is already correct
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                    e.currentTarget.src = '/images/p2.jpg'; // Fallback image
                }}
            />
        );
    } else if (user.email) {
        return (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#3C2A21] bg-gray-300 rounded-full">
                {user.email.charAt(0).toUpperCase()}
            </div>
        );
    }
    return null;
  };

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <div className="flex items-center mb-6">
        <div className="w-32 h-32 border-2 border-dashed border-[#3C2A21] rounded-full flex items-center justify-center overflow-hidden relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className={`opacity-0 absolute inset-0 cursor-pointer ${isEditMode ? "" : "hidden"}`}
          />
          {renderProfilePicture()}
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <span className="text-xl font-semibold">{user.username}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center ml-40">
          <span className="font-medium w-32">Username:</span>
          {isEditMode ? (
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
              placeholder="Enter your username"
            />
          ) : (
            <span className="ml-2">{user.username}</span>
          )}
        </div>

        <div className="flex items-center ml-40">
          <span className="font-medium w-32">Email:</span>
          {isEditMode ? (
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
              placeholder="Enter your email"
            />
          ) : (
            <span className="ml-2">{user.email}</span>
          )}
        </div>

        <div className="flex items-center ml-40">
          <span className="font-medium w-32">Password:</span>
          {isEditMode ? (
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#3C2A21]"
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          ) : (
            <span className="ml-2">******</span> // Mask password in non-edit mode
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {isEditMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#3C2A21] text-white rounded-md hover:bg-[#2c1c1a]"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="ml-4 px-4 py-2 border border-[#3C2A21] rounded-md hover:bg-[#3C2A21] hover:text-white"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditMode(true)}
            className="px-4 py-2 bg-[#3C2A21] text-white rounded-md hover:bg-[#2c1c1a]"
          >
            Edit
          </button>
        )}
      </div>
    </Layout>
  );
};

export default ViewAccountPage;
