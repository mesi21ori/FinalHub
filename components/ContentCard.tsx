// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Button from "./Button"; // Import the custom Button component

// interface ContentCardProps {
//   title: string;
//   description: string;
//   imageSrc: string;
//   tag: "Free" | "Premium" | "Researcher"; // Dynamic tag with three options
// }

// const ContentCard: React.FC<ContentCardProps> = ({
//   title,
//   description,
//   imageSrc,
//   tag,
// }) => {
//   // Dynamically set the tag's color based on the type
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

//   return (
//     <div className="bg-[#E5E5CB] rounded-xl shadow-lg w-[300px] h-[350px] relative overflow-hidden">
//       {/* Cover Image */}
//       <div className="relative w-full h-[200px]">
//         <Image
//           src={imageSrc}
//           alt={title}
//           layout="fill"
//           className="object-cover rounded-t-xl"
//         />
//         {/* Zigzag-style Dynamic Tag */}
//         <div
//           className={`absolute text-xs font-bold rotate-45 transform origin-top-left px-4 py-1 -top-[2px] -right-[20px] ${getTagStyle(
//             tag
//           )}`}
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
//       <div className="p-4">
//         <h3 className="text-xl font-bold text-[#3C2A21] text-center">{title}</h3>
//         <p className="text-gray-700 mt-2 text-center">{description}</p>
//         <div className="flex justify-end mt-2">
//           {/* Only the "More" button should be clickable */}
//           <Link href="/content/view-content">
//             <Button variant="curved" size="xs">
//               More
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentCard;



// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Button from "./Button"; // Import the custom Button component

// interface ContentCardProps {
//   title: string;
//   description: string;
//   imageSrc: string;
//   tag: "public" | "private" | "restricted"; // Dynamic tag with three options
//   status: "public" | "private" | "restricted"; // New prop for content status
// }

// const ContentCard: React.FC<ContentCardProps> = ({
//   title,
//   description,
//   imageSrc,
//   tag,
//   status,
// }) => {
//   // Dynamically set the tag's color based on the type
//   const getTagStyle = (tag: string) => {
//     switch (tag) {
//       case "public":
//         return "bg-[#f3e9dc] text-[#3C2A21]";
//       case "private":
//         return "bg-[#d99c2b] text-[#3C2A21]";
//       case "restricted":
//         return "bg-[#7a5447] text-white";
//       default:
//         return "bg-[#3C2A21] text-white";
//     }
//   };

//   // Dynamically decide the link based on the content status
//   const getLinkHref = () => {
//     switch (status) {
//       case "public":
//         return "/content/view-content"; // Public content
//       case "private":
//         return "/upgrade"; // Private content, ask user to upgrade
//       case "restricted":
//         return "/RequestAccess"; // Restricted content, request access
//       default:
//         return "#"; // Default to public view
//     }
//   };

//   return (
//     <div className="bg-[#E5E5CB] rounded-xl shadow-lg w-[300px] h-[350px] relative overflow-hidden">
//       {/* Cover Image */}
//       <div className="relative w-full h-[200px]">
//         <Image
//           src={imageSrc}
//           alt={title}
//           layout="fill"
//           className="object-cover rounded-t-xl"
//         />
//         {/* Zigzag-style Dynamic Tag */}
//         <div
//           className={`absolute text-xs font-bold rotate-45 transform origin-top-left px-4 py-1 -top-[2px] -right-[20px] ${getTagStyle(
//             tag
//           )}`}
//           style={{
//             clipPath:
//               "polygon(0% 0%, 100% 0%, 90% 100%, 80% 90%, 70% 100%, 60% 90%, 50% 100%, 40% 90%, 30% 100%, 20% 90%, 10% 100%, 0% 0%)",
//             width: tag === "public" ? "60px" : tag === "private" ? "80px" : "90px", // Dynamically adjust width based on the text
//           }}
//         >
//           {tag}
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-4">
//         <h3 className="text-xl font-bold text-[#3C2A21] text-center">{title}</h3>
//         <p className="text-gray-700 mt-2 text-center">{description}</p>
//         <div className="flex justify-end mt-2">
//           {/* Use the dynamically determined link */}
//           <Link href={getLinkHref()}>
//             <Button variant="curved" size="xs">
//               More
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentCard;


"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button"; // Import the custom Button component
import { useRouter } from "next/navigation";
import axios from "axios";

interface ContentCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tag: "public" | "private" | "restricted"; // Dynamic tag with three options
  status: "public" | "private" | "restricted"; // New prop for content status // Added userId to check user subscription status
  contentId: string; // Added contentId to check restricted content access
}

const userId = localStorage.getItem('userId');

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  imageSrc,
  tag,
  status,
  contentId,
}) => {
  const router = useRouter();

  // Dynamically set the tag's color based on the type
  const getTagStyle = (tag: string) => {
    switch (tag) {
      case "public":
        return "bg-[#f3e9dc] text-[#3C2A21]";
      case "private":
        return "bg-[#d99c2b] text-[#3C2A21]";
      case "restricted":
        return "bg-[#7a5447] text-white";
      default:
        return "bg-[#3C2A21] text-white";
    }
  };

  // Route to the content detail page after validation
  const routeToDetailPage = (content: any) => {
    router.push(`/content/view-content/${content.id}`);
  };

  // Handle the logic when clicking "More"
  const handleMoreClick = async () => {
    try {
      if (tag.toLowerCase() === "public") {
        // Handle public content as before
        routeToDetailPage({ id: contentId, accessLevel: tag });
      } else if (tag.toLowerCase() === "private") {
        // Check for active subscription
        const response = await axios.get(`/api/users/check-subscription`, {
          params: { userId },
        });

        if (response.data.hasActiveSubscription) {
          // User has an active subscription, proceed to content detail
          routeToDetailPage({ id: contentId, accessLevel: tag });
        } else {
          // User doesn't have a subscription, redirect to upgrade
          alert("Access restricted to subscribed users. Please upgrade your plan.");
          router.push("/upgrade");
        }
      } else if (tag.toLowerCase() === "restricted") {
        // Check the request status for restricted content
        const response = await axios.get(`/api/users/check-request-status`, {
          params: { userId: userId, contentId: contentId },
        });

        localStorage.setItem('contentId', contentId);

        const requestStatus = response.data.status.toLowerCase();

        switch (requestStatus) {
          case "pending":
            alert("Your request is still pending. Please wait for approval.");
            break;
          case "rejected":
            alert("Your request was rejected. Please add more details and submit again.");
            router.push(`/RequestAccess?contentId=${contentId}`);
            break;
          case "approved":
            // Approved users can access the content details
            routeToDetailPage({ id: contentId, accessLevel: tag });
            break;
          case "none":
            // No request exists, redirect to request access page
            router.push(`/RequestAccess?contentId=${contentId}`);
            break;
          default:
            alert("Unknown request status.");
        }
      } else {
        console.warn("Unknown access level:", tag);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className="bg-[#E5E5CB] rounded-xl shadow-lg w-[300px] h-[350px] relative overflow-hidden">
      {/* Cover Image */}
      <div className="relative w-full h-[200px]">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          className="object-cover rounded-t-xl"
        />
        {/* Zigzag-style Dynamic Tag */}
        <div
          className={`absolute text-xs font-bold rotate-45 transform origin-top-left px-4 py-1 -top-[2px] -right-[20px] ${getTagStyle(
            tag
          )}`}
          style={{
            clipPath:
              "polygon(0% 0%, 100% 0%, 90% 100%, 80% 90%, 70% 100%, 60% 90%, 50% 100%, 40% 90%, 30% 100%, 20% 90%, 10% 100%, 0% 0%)",
            width: tag === "public" ? "60px" : tag === "private" ? "80px" : "90px", // Dynamically adjust width based on the text
          }}
        >
          {tag}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#3C2A21] text-center">{title}</h3>
        <p className="text-gray-700 mt-2 text-center">{description}</p>
        <div className="flex justify-end mt-2">
          {/* Call handleMoreClick when the button is clicked */}
          <Button variant="curved" size="xs" onClick={handleMoreClick}>
            More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
