// "use client";

// import React from "react";
// import Image from "next/image";
// import Button from "./Button"; // Import the custom Button component
// import { useRouter } from "next/navigation"; // For programmatic navigation
// import axios from 'axios'; // Make sure to import axios if you're going to make API calls

// interface ContentCardProps {
//   id: number; // Content ID for dynamic routing
//   title: string; // Name of the content
//   secondaryInfo: string; // Author, Singer, Photographer, or Director
//   imageSrc: string; // Image URL
//   tag: "Free" | "Premium" | "Researcher"; // Dynamic tag
//   eventType: string; // Event Type: war, politics, economics, etc.
//   category: "book" | "article" | "music" | "video" | "photo"; // Category of content
// }

// const ContentCard: React.FC<ContentCardProps> = ({
//   id,
//   title,
//   secondaryInfo,
//   imageSrc,
//   tag,
//   eventType,
//   category,
// }) => {
//   const router = useRouter();

//   const getTagStyle = (tag: string) => {
//     switch (tag) {
//       case "Free":
//         return "bg-[#f3e9dc] text-[#3C2A21]";
//       case "Premium":
//         return "bg-[#d99c2b] text-[#3C2A21]";
//       case "Researcher":
//         return "bg-[#7a5447] text-white";
//       default:
//         return "bg-[#3C2A21] text-white";
//     }
//   };

//   const handleMoreDetails = async (content: any) => {
//     const userRole = sessionStorage.getItem('userRole');
//     const userId = sessionStorage.getItem('userId');
//     console.log('User ID:', userId, 'User Role:', userRole); // Debug log for userId and userRole
  
//     if (!userId || !userRole) {
//       alert("User is not authenticated.");
//       return;
//     }
  
//     try {
//       const accessLevel = content.accessLevel.toUpperCase();
//       console.log('Access Level:', accessLevel); // Debug log for accessLevel
  
//       if (accessLevel === 'PUBLIC') {
//         console.log('Public content, navigating to detail page...');
//         routeToDetailPage(content);
//       } else if (accessLevel === 'PREMIUM') {
//         // If the user role is 'premium', allow them to see the content
//         if (userRole === 'premium') {
          
//           console.log('User has premium role, navigating to detail page...');
//           routeToDetailPage(content); // Navigate to the content detail page
//         } else {
//           alert("Access restricted to premium users. Please upgrade your plan.");
//           router.push('/upgrade'); // Redirect to the upgrade page
//         }
//       } else  if (accessLevel === 'RESEARCHER') {  
//         sessionStorage.setItem('contentId', content.id); // Store the content ID in sessionStorage
//         console.log('contentId:', content.id);
//         console.log('Researcher content, checking researcher access request status...');
//         const response = await axios.get('/api/users/check-request-status', {
//           params: { userId: userId, contentId: content.id },
//         });
      
//         console.log('Researcher Status Response:', response.data);
      
//         const researcherStatus = response.data.status.toUpperCase();
      
//         switch (researcherStatus) {
//           case 'PENDING':
//             alert(response.data.message); // Show the waiting message
//             break;
//           case 'APPROVED':
//             console.log('Access granted, navigating to detail page...');
//             routeToDetailPage(content); // Navigate to the content detail page
//             break;
//           case 'NONE':
//             sessionStorage.setItem('contentId', content.id); // Store the content ID in sessionStorage
//             console.log('No access request found. Redirecting to researcher request page...');
//             router.push('/auth/researchers-request'); // Redirect to researcher request form
//             break;   
//           case 'REJECTED':
//             alert(response.data.message); // Show the rejection message
//             break;
//           default:
//             alert("Unknown researcher status.");
//         }
//       }
      
//     } catch (error) {
//       console.error("Error processing request:", error);
//       alert("An error occurred while processing your request.");
//     }
//   };
  

//   const routeToDetailPage = (content: any) => {
//     router.push(`/content/view-content/${id}`);
//   };

//   const handleMoreClick = () => {
//     const content = {
//       accessLevel: tag.toLowerCase(), // 'free', 'premium', 'researcher'
//       id,
//     };
//     handleMoreDetails(content);
//   };

//   return (
//     <div className="relative group bg-gradient-to-br from-[#E5E5CB] via-[#f4f2ec] to-[#E5E5CB] rounded-lg shadow-md hover:shadow-xl hover:scale-105 w-[320px] h-[380px] overflow-hidden transition-all duration-300 ease-in-out">
//       {/* Cover Image */}
//       <div className="relative w-full h-[200px] overflow-hidden">
//         <Image
//           src={imageSrc}
//           alt={title}
//           layout="fill"
//           className="object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-500 ease-in-out"
//         />
//         {/* Zigzag-style Dynamic Tag */}
//         <div
//           className={`absolute text-xs font-bold rotate-45 transform origin-top-left px-4 py-1 -top-[2px] -right-[20px] ${getTagStyle(tag)}`}
//           style={{
//             clipPath:
//               "polygon(0% 0%, 100% 0%, 90% 100%, 80% 90%, 70% 100%, 60% 90%, 50% 100%, 40% 90%, 30% 100%, 20% 90%, 10% 100%, 0% 0%)",
//             width: tag === "Free" ? "60px" : tag === "Premium" ? "80px" : "90px", // Dynamically adjust width based on the text
//           }}
//         >
//           {tag}
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-3 flex flex-col justify-between min-h-[180px]">
//         <div className="flex justify-between items-center">
//           <div className="text-sm font-bold uppercase text-gray-600">{category}</div>
//           <div className="text-sm font-normal text-gray-500">{eventType}</div>
//         </div>
//         <h3 className="text-base font-semibold text-[#3C2A21] text-center mt-0.5">{title}</h3>
//         <p className="text-xs text-gray-700 text-center mt-0.5">
//           {category === "music" && `Singer: ${secondaryInfo}`}
//           {category === "book" && `Author: ${secondaryInfo}`}
//           {category === "article" && `Author: ${secondaryInfo}`}
//           {category === "video" && `Director: ${secondaryInfo}`}
//           {category === "photo" && `Photographer: ${secondaryInfo}`}
//         </p>
//         <div className="flex justify-center mt-2">
//           <Button
//             onClick={handleMoreClick} // Trigger the access level check on click
//             variant="curved"
//             size="sm"
//             className="transition-colors hover:bg-[#d99c2b] hover:text-white"
//           >
//             More
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentCard;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Button from "./Button"; // Import the custom Button component
// import { useRouter } from "next/navigation"; // For programmatic navigation
// import axios from 'axios'; // Make sure to import axios if you're going to make API calls
// import Notification from "../components/Notification"; // Import Notification

// interface ContentCardProps {
//   id: number; // Content ID for dynamic routing
//   title: string; // Name of the content
//   secondaryInfo: string; // Author, Singer, Photographer, or Director
//   imageSrc: string; // Image URL
//   tag: "Free" | "Premium" | "Researcher"; // Dynamic tag
//   eventType: string; // Event Type: war, politics, economics, etc.
//   category: "book" | "article" | "music" | "video" | "photo"; // Category of content
// }

// const ContentCard: React.FC<ContentCardProps> = ({
//   id,
//   title,
//   secondaryInfo,
//   imageSrc,
//   tag,
//   eventType,
//   category,
// }) => {
//   const router = useRouter();
//   const [notification, setNotification] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
//     message: "",
//     type: "success",
//     visible: false,
//   });

//   const getTagStyle = (tag: string) => {
//     switch (tag) {
//       case "Free":
//         return "bg-[#f3e9dc] text-[#3C2A21]";
//       case "Premium":
//         return "bg-[#d99c2b] text-[#3C2A21]";
//       case "Researcher":
//         return "bg-[#7a5447] text-white";
//       default:
//         return "bg-[#3C2A21] text-white";
//     }
//   };

//   const handleMoreDetails = async (content: any) => {
//     const userRole = sessionStorage.getItem('userRole');
//     const userId = sessionStorage.getItem('userId');
//     console.log('User ID:', userId, 'User Role:', userRole); // Debug log for User ID and Role
  
//     if (!userId || !userRole) {
//       setNotification({ message: "User is not authenticated.", type: "error", visible: true });
//       return;
//     }
  
//     try {
//       const accessLevel = content.accessLevel.toUpperCase();
//       console.log('Access Level:', accessLevel); // Debug log for Access Level
  
//       if (accessLevel === 'PUBLIC') {
//         console.log('Public content, navigating to detail page...');
//         routeToDetailPage(content);
//       } else if (accessLevel === 'PREMIUM') {
//         if (userRole === 'premium') {
//           console.log('User has premium role, navigating to detail page...');
//           routeToDetailPage(content); // Navigate to the content detail page
//         } else {
//           setNotification({ message: "Access restricted to premium users. Please upgrade your plan.", type: "error", visible: true });
//           router.push('/upgrade'); // Redirect to the upgrade page
//         }
//       } else if (accessLevel === 'RESEARCHER') {  
//         sessionStorage.setItem('contentId', content.id); // Store the content ID in sessionStorage
//         console.log('contentId:', content.id);
//         console.log('Researcher content, checking researcher access request status...');
//         const response = await axios.get('/api/users/check-request-status', {
//           params: { userId: userId, contentId: content.id },
//         });
      
//         console.log('Researcher Status Response:', response.data);
      
//         const researcherStatus = response.data.status.toUpperCase();
      
//         switch (researcherStatus) {
//           case 'PENDING':
//             setNotification({ message: response.data.message, type: "error", visible: true });
//             break;
//           case 'APPROVED':
//             console.log('Access granted, navigating to detail page...');
//             routeToDetailPage(content); // Navigate to the content detail page
//             break;
//           case 'NONE':
//             sessionStorage.setItem('contentId', content.id); // Store the content ID in sessionStorage
//             console.log('No access request found. Redirecting to researcher request page...');
//             router.push('/auth/researchers-request'); // Redirect to researcher request form
//             break;   
//           case 'REJECTED':
//             setNotification({ message: response.data.message, type: "error", visible: true });
//             break;
//           default:
//             setNotification({ message: "Unknown researcher status.", type: "error", visible: true });
//         }
//       }
      
//     } catch (error) {
//       console.error("Error processing request:", error);
//       setNotification({ message: "An error occurred while processing your request.", type: "error", visible: true });
//     }
//   };

//   const routeToDetailPage = (content: any) => {
//     router.push(`/content/view-content/${id}`);
//   };

//   const handleMoreClick = () => {
//     const content = {
//       accessLevel: tag.toLowerCase(), // 'free', 'premium', 'researcher'
//       id,
//     };
//     handleMoreDetails(content);
//   };

//   const handleCloseNotification = () => {
//     setNotification((prev) => ({ ...prev, visible: false }));
//   };

//   return (
//     <div className="relative group bg-gradient-to-br from-[#E5E5CB] via-[#f4f2ec] to-[#E5E5CB] rounded-lg shadow-md hover:shadow-xl hover:scale-105 w-[320px] h-[380px] overflow-hidden transition-all duration-300 ease-in-out">
//       {/* Notification Component */}
//       <Notification 
//         message={notification.message} 
//         type={notification.type} 
//         visible={notification.visible} 
//         onClose={handleCloseNotification} 
//       />
      
//       {/* Cover Image */}
//       <div className="relative w-full h-[200px] overflow-hidden">
//         <Image
//           src={imageSrc}
//           alt={title}
//           layout="fill"
//           className="object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-500 ease-in-out"
//         />
//         {/* Zigzag-style Dynamic Tag */}
//         <div
//           className={`absolute text-xs font-bold rotate-45 transform origin-top-left px-4 py-1 -top-[2px] -right-[20px] ${getTagStyle(tag)}`}
//           style={{
//             clipPath:
//               "polygon(0% 0%, 100% 0%, 90% 100%, 80% 90%, 70% 100%, 60% 90%, 50% 100%, 40% 90%, 30% 100%, 20% 90%, 10% 100%, 0% 0%)",
//             width: tag === "Free" ? "60px" : tag === "Premium" ? "80px" : "90px", // Dynamically adjust width based on the text
//           }}
//         >
//           {tag}
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-3 flex flex-col justify-between min-h-[180px]">
//         <div className="flex justify-between items-center">
//           <div className="text-sm font-bold uppercase text-gray-600">{category}</div>
//           <div className="text-sm font-normal text-gray-500">{eventType}</div>
//         </div>
//         <h3 className="text-base font-semibold text-[#3C2A21] text-center mt-0.5">{title}</h3>
//         <p className="text-xs text-gray-700 text-center mt-0.5">
//           {category === "music" && `Singer: ${secondaryInfo}`}
//           {category === "book" && `Author: ${secondaryInfo}`}
//           {category === "article" && `Author: ${secondaryInfo}`}
//           {category === "video" && `Director: ${secondaryInfo}`}
//           {category === "photo" && `Photographer: ${secondaryInfo}`}
//         </p>
//         <div className="flex justify-center mt-2">
//           <Button
//             onClick={handleMoreClick} // Trigger the access level check on click
//             variant="curved"
//             size="sm"
//             className="transition-colors hover:bg-[#d99c2b] hover:text-white"
//           >
//             More
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentCard;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button"; // Import the custom Button component
import { useRouter } from "next/navigation"; // For programmatic navigation
import axios from "axios"; // Ensure axios is installed
import Notification from "../components/Notification"; // Import Notification

interface ContentCardProps {
  id: number; // Content ID for dynamic routing
  title: string; // Name of the content
  secondaryInfo: string; // Author, Singer, Photographer, or Director
  imageSrc: string; // Image URL
  tag: "Free" | "Premium" | "Researcher"; // Dynamic tag
  eventType: string; // Event Type: war, politics, economics, etc.
  category: "book" | "article" | "music" | "video" | "photo"; // Category of content
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  secondaryInfo = "N/A", // Default value for secondaryInfo if not provided
  imageSrc,
  tag,
  eventType,
  category,
}) => {
  const router = useRouter();
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success",
    visible: false,
  });

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case "Free":
        return "bg-[#f3e9dc] text-[#3C2A21]";
      case "Premium":
        return "bg-[#d99c2b] text-[#3C2A21]";
      case "Researcher":
        return "bg-[#7a5447] text-white";
      default:
        return "bg-[#3C2A21] text-white";
    }
  };

  // Handle the "More Details" button click logic
  const handleMoreDetails = async (content: any) => {
    const userRole = sessionStorage.getItem("userRole");
    const userId = sessionStorage.getItem("userId");

    if (!userId || !userRole) {
      setNotification({ message: "User is not authenticated.", type: "error", visible: true });
      return;
    }

    try {
      const accessLevel = content.accessLevel.toUpperCase();

      if (accessLevel === "PUBLIC") {
        routeToDetailPage(content);
      } else if (accessLevel === "PREMIUM") {
        if (userRole === "premium") {
          routeToDetailPage(content);
        } else {
          setNotification({ message: "Access restricted to premium users. Please upgrade your plan.", type: "error", visible: true });
          router.push("/upgrade");
        }
      } else if (accessLevel === "RESEARCHER") {
        sessionStorage.setItem("contentId", content.id);
        const response = await axios.get("/api/users/check-request-status", {
          params: { userId: userId, contentId: content.id },
        });

        const researcherStatus = response.data.status.toUpperCase();

        switch (researcherStatus) {
          case "PENDING":
            setNotification({ message: response.data.message, type: "error", visible: true });
            break;
          case "APPROVED":
            routeToDetailPage(content);
            break;
          case "NONE":
            sessionStorage.setItem("contentId", content.id);
            router.push("/auth/researchers-request");
            break;
          case "REJECTED":
            setNotification({ message: response.data.message, type: "error", visible: true });
            break;
          default:
            setNotification({ message: "Unknown researcher status.", type: "error", visible: true });
        }
      }
    } catch (error) {
      console.error("Error processing request:", error);
      setNotification({ message: "An error occurred while processing your request.", type: "error", visible: true });
    }
  };

  const routeToDetailPage = (content: any) => {
    router.push(`/content/view-content/${id}`);
  };

  const handleMoreClick = () => {
    const content = {
      accessLevel: tag.toLowerCase(),
      id,
    };
    handleMoreDetails(content);
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="relative group bg-gradient-to-br from-[#E5E5CB] via-[#f4f2ec] to-[#E5E5CB] rounded-lg shadow-md hover:shadow-xl hover:scale-105 w-[320px] h-[380px] overflow-hidden transition-all duration-300 ease-in-out">
      {/* Notification Component */}
      <Notification message={notification.message} type={notification.type} visible={notification.visible} onClose={handleCloseNotification} />

      {/* Cover Image */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          className="object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        {/* Zigzag-style Dynamic Tag */}
        <div
          className={`absolute text-xs font-bold rotate-45 transform origin-top-left px-4 py-1 -top-[2px] -right-[20px] ${getTagStyle(tag)}`}
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 80% 90%, 70% 100%, 60% 90%, 50% 100%, 40% 90%, 30% 100%, 20% 90%, 10% 100%, 0% 0%)",
            width: tag === "Free" ? "60px" : tag === "Premium" ? "80px" : "90px", // Dynamically adjust width based on the text
          }}
        >
          {tag}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col justify-between min-h-[180px]">
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold uppercase text-gray-600">{category}</div>
          <div className="text-sm font-normal text-gray-500">{eventType}</div>
        </div>
        <h3 className="text-base font-semibold text-[#3C2A21] text-center mt-0.5">{title}</h3>
        <p className="text-xs text-gray-700 text-center mt-0.5">
          {category === "music" && `Singer: ${secondaryInfo}`}
          {category === "book" && `Author: ${secondaryInfo}`}
          {category === "article" && `Author: ${secondaryInfo}`}
          {category === "video" && `Director: ${secondaryInfo}`}
          {category === "photo" && `Photographer: ${secondaryInfo}`}
        </p>
        <div className="flex justify-center mt-2">
          <Button onClick={handleMoreClick} variant="curved" size="sm" className="transition-colors hover:bg-[#d99c2b] hover:text-white">
            More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;



