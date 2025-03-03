// import React, { useState } from "react";
// import DocumentViewer from "./DocumentViewer"; // Import DocumentViewer component

// interface UserDetailModalProps<T> {
//   user: T;
//   onClose: () => void;
//   fieldLabels?: Partial<Record<keyof T, string>>;
//   onAccept?: () => void;  // Add Accept and Reject callback props
//   onReject?: () => void;
// }

// const ResearcherDetailModal = <T extends Record<string, any>>({
//   user,
//   onClose,
//   fieldLabels = {},
//   onAccept,
//   onReject,
// }: UserDetailModalProps<T>) => {
//   const [isProfileModalOpen, setProfileModalOpen] = useState(false);
//   const [profileImageSrc, setProfileImageSrc] = useState<string | null>(null);
//   const [isDocumentViewerOpen, setDocumentViewerOpen] = useState(false);
//   const [documentUrl, setDocumentUrl] = useState<string | null>(null);

//   // Render fields dynamically
//   const renderDetailField = (field: keyof T) => {
//     const label = fieldLabels[field] || field.toString();
//     const value = user[field];

//     // Handle profilePicture field
//     if (field === "profilePicture" && value) {
//       return (
//         <div
//           key={field.toString()}
//           className="text-[#3a2f2c] mb-4 shadow-lg flex items-center gap-4"
//         >
//           <strong>{label}:</strong>
//           <div
//             className="w-16 h-16 rounded-full overflow-hidden cursor-pointer"
//             onClick={() => {
//               setProfileImageSrc(value as string);
//               setProfileModalOpen(true);
//             }}
//           >
//             <img
//               src={value as string}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       );
//     }

//     // Handle PDF URL field
//     if (typeof value === "string" && value.endsWith(".pdf")) {
//       return (
//         <div
//           key={field.toString()}
//           className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4"
//         >
//           <strong>{label}:</strong>
//           <a
//             href="#"
//             className="text-blue-600 hover:underline"
//             onClick={(e) => {
//               e.preventDefault(); // Prevent default link behavior
//               setDocumentUrl(value);
//               setDocumentViewerOpen(true); // Open DocumentViewer modal
//             }}
//           >
//             View PDF
//           </a>
//         </div>
//       );
//     }

//     // Default field rendering
//     return (
//       <div
//         key={field.toString()}
//         className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4"
//       >
//         <strong>{label}:</strong>
//         <p className="flex-1">{value?.toString() || "N/A"}</p>
//       </div>
//     );
//   };

//   // Don't render UserDetailModal content if DocumentViewer is open
//   if (isDocumentViewerOpen) {
//     return (
//       <DocumentViewer
//         documentUrl={documentUrl!}
//         onClose={() => setDocumentViewerOpen(false)}
//       />
//     );
//   }

//   return (
//     <div className="modal-overlay fixed inset-0 bg-[#000000] bg-opacity-70 flex justify-center items-center z-40">
//       <div className="modal-content bg-[#f7f4f0] p-8 rounded-lg shadow-xl w-full mt-16 max-w-4xl max-h-screen overflow-y-auto text-black custom-scrollbar z-40">
//         <h2 className="text-2xl text-[#3a2f2c] ml-6 font-semibold mb-4">
//           User Details
//         </h2>

//         <div className="user-details ml-6 space-y-4">
//           {Object.keys(user).map((key) => renderDetailField(key as keyof T))}
//         </div>

//         <div className="mt-8 flex justify-end space-x-4">
//           {/* Reject Button */}
//           <button
//             onClick={onReject}
//             className="bg-white text-[#3a2f2c] border-2 border-[#F2B4B4] px-4 py-2 rounded-md hover:bg-opacity-90"
//           >
//             Reject
//           </button>

//           {/* Accept Button */}
//           <button
//             onClick={onAccept}
//             className="bg-white text-[#3a2f2c] border-2 border-[#A7D7A7] px-4 py-2 rounded-md hover:bg-opacity-90"
//           >
//             Accept
//           </button>

//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="bg-[#3a2f2c] text-[#E5E5CB] px-4 py-2 rounded-md hover:bg-opacity-90"
//           >
//             Close
//           </button>
//         </div>
//       </div>

//       {/* Profile Picture Modal */}
//       {isProfileModalOpen && profileImageSrc && (
//         <div
//           className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//           onClick={() => setProfileModalOpen(false)}
//         >
//           <div className="modal-content p-4 bg-white rounded-lg z-50">
//             <img
//               src={profileImageSrc}
//               alt="Profile"
//               className="w-96 h-96 object-cover rounded-md"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResearcherDetailModal;
//  ;


import React, { useState } from "react";
import DocumentViewer from "./DocumentViewer"; // Import DocumentViewer component

interface UserDetailModalProps<T> {
  user: T;
  onClose: () => void;
  fieldLabels?: Partial<Record<keyof T, string>>;
}

const ResearcherDetailModal = <T extends Record<string, any>>({
  user,
  onClose,
  fieldLabels = {},
}: UserDetailModalProps<T>) => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState<string | null>(null);
  const [isDocumentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  const handleAccept = async () => {
    try {
      const response = await fetch("/api/reviewer/accept-request", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: user.id, // Pass the request ID
          reviewerId: 1, // Replace with the actual reviewer ID
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Request Accepted:", data);
      onClose(); // Close the modal after successful accept
    } catch (error) {
      console.error("Failed to accept the request:", error);
    }
  };
 
  const handleReject = async () => {
    try {
      const response = await fetch("/api/reviewer/reject-request?reject=true", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: user.id, // Pass the request ID
          reviewerId: 1, // Replace with the actual reviewer ID
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Request Rejected:", data);
      onClose(); // Close the modal after successful reject
    } catch (error) {
      console.error("Failed to reject the request:", error);
    }
  };

  // Render fields dynamically
  const renderDetailField = (field: keyof T) => {
    const label = fieldLabels[field] || field.toString();
    const value = user[field];

    // Handle profilePicture field
    if (field === "profilePicture" && value) {
      return (
        <div
          key={field.toString()}
          className="text-[#3a2f2c] mb-4 shadow-lg flex items-center gap-4"
        >
          <strong>{label}:</strong>
          <div
            className="w-16 h-16 rounded-full overflow-hidden cursor-pointer"
            onClick={() => {
              setProfileImageSrc(value as string);
              setProfileModalOpen(true);
            }}
          >
            <img
              src={value as string}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }

    // Handle PDF URL field
    if (typeof value === "string" && value.endsWith(".pdf")) {
      return (
        <div
          key={field.toString()}
          className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4"
        >
          <strong>{label}:</strong>
          <a
            href="#"
            className="text-blue-600 hover:underline"
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              setDocumentUrl(value);
              setDocumentViewerOpen(true); // Open DocumentViewer modal
            }}
          >
            View PDF
          </a>
        </div>
      );
    }

    // Default field rendering
    return (
      <div
        key={field.toString()}
        className="text-[#3C2A21] mb-4 shadow-lg flex items-center gap-4"
      >
        <strong>{label}:</strong>
        <p className="flex-1">{value?.toString() || "N/A"}</p>
      </div>
    );
  };

  // Don't render UserDetailModal content if DocumentViewer is open
  if (isDocumentViewerOpen) {
    return (
      <DocumentViewer
        documentUrl={documentUrl!}
        onClose={() => setDocumentViewerOpen(false)}
      />
    );
  }

  return (
    <div className="modal-overlay fixed inset-0 bg-[#000000] bg-opacity-70 flex justify-center items-center z-40">
      <div className="modal-content bg-[#f7f4f0] p-8 rounded-lg shadow-xl w-full mt-16 max-w-4xl max-h-screen overflow-y-auto text-black custom-scrollbar z-40">
        <h2 className="text-2xl text-[#3a2f2c] ml-6 font-semibold mb-4">
          User Details
        </h2>

        <div className="user-details ml-6 space-y-4">
          {Object.keys(user).map((key) => renderDetailField(key as keyof T))}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          {/* Reject Button */}
          <button
            onClick={handleReject}
            className="bg-white text-[#3a2f2c] border-2 border-[#F2B4B4] px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            Reject
          </button>

          {/* Accept Button */}
          <button
            onClick={handleAccept}
            className="bg-white text-[#3a2f2c] border-2 border-[#A7D7A7] px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            Accept
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="bg-[#3a2f2c] text-[#E5E5CB] px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearcherDetailModal;
