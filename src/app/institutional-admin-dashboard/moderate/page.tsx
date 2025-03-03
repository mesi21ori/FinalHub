// "use client";

// import React, { useState } from "react";

// import { FaTrash, FaUserTimes, FaEyeSlash } from "react-icons/fa";
// import Button from "../../../../components/Button";
// import ConfirmationModal from "../../../../components/ConfirmationModal";


// const ReportedCommentsPage = () => {
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       content: "This is a spam comment.",
//       reportedBy: "JaneDoe",
//       reportedOn: "2025-01-01",
//       reason: "Spam content",
//       user: { name: "JohnDoe", profile: "/profile/JohnDoe", history: 5 },
//       context: { postTitle: "Sample Post", threadDetails: "Reply to Main Thread" },
//     },
//     {
//       id: 2,
//       content: "Inappropriate language in this comment.",
//       reportedBy: "AdminUser",
//       reportedOn: "2025-01-02",
//       reason: "Inappropriate language",
//       user: { name: "AlexSmith", profile: "/profile/AlexSmith", history: 3 },
//       context: { postTitle: "Another Post", threadDetails: "First Reply" },
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [confirmationAction, setConfirmationAction] = useState<"delete" | "deactivate" | "dismiss" | null>(null);
//   const [commentToActOn, setCommentToActOn] = useState<number | null>(null);

//   const handleDeleteComment = (id: number) => {
//     setComments(comments.filter((comment) => comment.id !== id));
//     closeModal(); // Close the modal after performing the action
//   };

//   const handleDeactivateUser = (name: string, id: number) => {
//     setComments(comments.filter((comment) => comment.id !== id)); // Remove the user's comment
//     closeModal(); // Close the modal after deactivating
//     // Additional deactivation logic can go here (e.g., disabling user account)
//   };

//   const handleDismissReport = (id: number) => {
//     setComments(comments.filter((comment) => comment.id !== id));
//     closeModal(); // Close the modal after dismissing the report
//   };

//   const openConfirmationModal = (action: "delete" | "deactivate" | "dismiss", id: number) => {
//     setConfirmationAction(action);
//     setCommentToActOn(id);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCommentToActOn(null);
//     setConfirmationAction(null);
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-extrabold text-[#3a2f2c] mb-8">Reported Comments</h1>
//       <div className="space-y-6">
//         {comments.map((comment) => (
//           <div
//             key={comment.id}
//             className="bg-[#f7f4f0] shadow-lg p-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300"
//           >
//             {/* Comment Details */}
//             <p className="text-lg text-gray-700">
//               <span className="font-semibold">Comment:</span> "{comment.content}"
//             </p>
//             <p className="text-base text-gray-600">
//               <span className="font-semibold">Reported By:</span> {comment.reportedBy} on{" "}
//               {comment.reportedOn}
//             </p>
//             <p className="text-base text-gray-500 italic">
//               <span className="font-semibold">Reason:</span> {comment.reason}
//             </p>

//             {/* User Details */}
//             <p className="text-base text-gray-700 mt-2">
//               <span className="font-semibold">User:</span>{" "}
//               <a
//                 href={comment.user.profile}
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 {comment.user.name}
//               </a>{" "}
//               ({comment.user.history} past reports)
//             </p>

//             {/* Context */}
//             <p className="text-base text-gray-600 mt-2">
//               <span className="font-semibold">Context:</span> {comment.context.postTitle} -{" "}
//               {comment.context.threadDetails}
//             </p>


// {/* Action Buttons */}
//             <div className="mt-6 flex space-x-4">
//               <Button
//                 variant="inactive"
//                 onClick={() => openConfirmationModal("delete", comment.id)} // Open delete confirmation modal
//               >
//                 <FaTrash className="mr-2" /> Delete Comment
//               </Button>
//               <Button
//                 variant="active"
//                 onClick={() => openConfirmationModal("deactivate", comment.id)} // Open deactivate confirmation modal
//               >
//                 <FaUserTimes className="mr-2" /> Deactivate User
//               </Button>
//               <Button
//                 variant="border"
//                 onClick={() => openConfirmationModal("dismiss", comment.id)} // Open dismiss confirmation modal
//               >
//                 <FaEyeSlash className="mr-2" /> Dismiss Report
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onConfirm={() => {
//           if (commentToActOn) {
//             if (confirmationAction === "delete") {
//               handleDeleteComment(commentToActOn);
//             } else if (confirmationAction === "deactivate") {
//               handleDeactivateUser("User", commentToActOn); // Pass the username if needed
//             } else if (confirmationAction === "dismiss") {
//               handleDismissReport(commentToActOn);
//             }
//           }
//         }}
//         message={
//           confirmationAction === "delete"
//             ? "Are you sure you want to delete this comment?"
//             : confirmationAction === "deactivate"
//             ? "Are you sure you want to deactivate this user and delete their comment?"
//             : "Are you sure you want to dismiss this report?"
//         }
//       />
//     </div>
//   );
// };

// export default ReportedCommentsPage;


// "use client";

// import React, { useEffect, useState } from "react";
// import { FaTrash, FaUserTimes, FaEyeSlash } from "react-icons/fa";
// import Button from "../../../../components/Button";
// import ConfirmationModal from "../../../../components/ConfirmationModal";

// const ReportedCommentsPage = () => {
//   const [comments, setComments] = useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [confirmationAction, setConfirmationAction] = useState<"delete" | "deactivate" | "dismiss" | null>(null);
//   const [commentToActOn, setCommentToActOn] = useState<number | null>(null);

//   useEffect(() => {
//     // Fetch the reported comments from the backend API
//     const fetchReportedComments = async () => {
//       const res = await fetch("/api/comments/reported-comments");
//       if (res.ok) {
//         const data = await res.json();
//         setComments(data);
//       } else {
//         console.error("Failed to fetch reported comments.");
//       }
//     };

//     fetchReportedComments();
//   }, []);

//   const handleDeleteComment = (id: number) => {
//     setComments(comments.filter((comment) => comment.id !== id));
//     closeModal(); // Close the modal after performing the action
//   };

//   const handleDeactivateUser = (name: string, id: number) => {
//     setComments(comments.filter((comment) => comment.id !== id)); // Remove the user's comment
//     closeModal(); // Close the modal after deactivating
//     // Additional deactivation logic can go here (e.g., disabling user account)
//   };

//   const handleDismissReport = (id: number) => {
//     setComments(comments.filter((comment) => comment.id !== id));
//     closeModal(); // Close the modal after dismissing the report
//   };

//   const openConfirmationModal = (action: "delete" | "deactivate" | "dismiss", id: number) => {
//     setConfirmationAction(action);
//     setCommentToActOn(id);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCommentToActOn(null);
//     setConfirmationAction(null);
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-extrabold text-[#3a2f2c] mb-8">Reported Comments</h1>
//       <div className="space-y-6">
//         {comments.map((comment) => (
//           <div
//             key={comment.id}
//             className="bg-[#f7f4f0] shadow-lg p-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300"
//           >
//             {/* Comment Details */}
//             <p className="text-lg text-gray-700">
//               <span className="font-semibold">Comment:</span> "{comment.comment.content}"
//             </p>
//             <p className="text-base text-gray-600">
//               <span className="font-semibold">Reported By:</span> {comment.comment.reportedBy} on{" "}
//               {comment.comment.reportedOn}
//             </p>
//             <p className="text-base text-gray-500 italic">
//               <span className="font-semibold">Reason:</span> {comment.comment.reason}
//             </p>

//             {/* User Details */}
//             <p className="text-base text-gray-700 mt-2">
//               <span className="font-semibold">User:</span>{" "}
//               <a
//                 href={comment.comment.user.profile}
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 {comment.comment.user.name}
//               </a>{" "}
//               ({comment.comment.user.history} past reports)
//             </p>

//             {/* Context */}
//             <p className="text-base text-gray-600 mt-2">
//               <span className="font-semibold">Context:</span> {comment.comment.context.postTitle} -{" "}
//               {comment.comment.context.threadDetails}
//             </p>

//             {/* Original Comment Content */}
//             <p className="text-base text-gray-600 mt-2">
//               <span className="font-semibold">Original Comment Content:</span> {comment.comment.originalContent}
//             </p>

//             {/* Action Buttons */}
//             <div className="mt-6 flex space-x-4">
//               <Button
//                 variant="inactive"
//                 onClick={() => openConfirmationModal("delete", comment.id)} // Open delete confirmation modal
//               >
//                 <FaTrash className="mr-2" /> Delete Comment
//               </Button>
//               <Button
//                 variant="active"
//                 onClick={() => openConfirmationModal("deactivate", comment.id)} // Open deactivate confirmation modal
//               >
//                 <FaUserTimes className="mr-2" /> Deactivate User
//               </Button>
//               <Button
//                 variant="border"
//                 onClick={() => openConfirmationModal("dismiss", comment.id)} // Open dismiss confirmation modal
//               >
//                 <FaEyeSlash className="mr-2" /> Dismiss Report
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onConfirm={() => {
//           if (commentToActOn) {
//             if (confirmationAction === "delete") {
//               handleDeleteComment(commentToActOn);
//             } else if (confirmationAction === "deactivate") {
//               handleDeactivateUser("User", commentToActOn); // Pass the username if needed
//             } else if (confirmationAction === "dismiss") {
//               handleDismissReport(commentToActOn);
//             }
//           }
//         }}
//         message={
//           confirmationAction === "delete"
//             ? "Are you sure you want to delete this comment?"
//             : confirmationAction === "deactivate"
//             ? "Are you sure you want to deactivate this user and delete their comment?"
//             : "Are you sure you want to dismiss this report?"
//         }
//       />
//     </div>
//   );
// };

// export default ReportedCommentsPage;


// "use client";

// import React, { useEffect, useState } from "react";
// import { FaTrash, FaUserTimes, FaEyeSlash } from "react-icons/fa";
// import Button from "../../../../components/Button";
// import ConfirmationModal from "../../../../components/ConfirmationModal";

// const ReportedCommentsPage = () => {
//   const [comments, setComments] = useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [confirmationAction, setConfirmationAction] = useState<"delete" | "deactivate" | "dismiss" | null>(null);
//   const [commentToActOn, setCommentToActOn] = useState<number | null>(null);

//   useEffect(() => {
//     // Fetch the reported comments from the backend API
//     const fetchReportedComments = async () => {
//       const res = await fetch("/api/comments/reported-comments");
//       if (res.ok) {
//         const data = await res.json();
//         setComments(data);
//       } else {
//         console.error("Failed to fetch reported comments.");
//       }
//     };

//     fetchReportedComments();
//   }, []);

//   const handleDeleteComment = (id: number) => {
//     setComments(comments.filter((comment) => comment.id !== id));
//     closeModal(); // Close the modal after performing the action
//   };

//   const handleDeactivateUser = async (name: string, id: number) => {
//     try {
//       // Send the comment ID to the backend to deactivate the user
//       const res = await fetch('/api/comments/deactivate-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ commentId: id }),
//       });
  
//       if (res.ok) {
//         // Successfully deactivated the user, remove the comment from the frontend
//         setComments(comments.filter((comment) => comment.id !== id));
//         closeModal(); // Close the modal after deactivating
//       } else {
//         console.error('Failed to deactivate the user');
//       }
//     } catch (error) {
//       console.error('Error while deactivating the user:', error);
//     }
//   };
  

//   const handleDismissReport = (id: number) => {
//     setComments(comments.filter((comment) => comment.id !== id));
//     closeModal(); // Close the modal after dismissing the report
//   };

//   const openConfirmationModal = (action: "delete" | "deactivate" | "dismiss", id: number) => {
//     setConfirmationAction(action);
//     setCommentToActOn(id);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCommentToActOn(null);
//     setConfirmationAction(null);
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-extrabold text-[#3a2f2c] mb-8">Reported Comments</h1>
//       <div className="space-y-6">
//         {comments.map((comment) => (
//           <div
//             key={comment.id}
//             className="bg-[#f7f4f0] shadow-lg p-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300"
//           >
//             {/* Comment Details */}
//             <p className="text-lg text-gray-700">
//               <span className="font-semibold">Comment:</span> "{comment.comment.content}"
//             </p>
//             <p className="text-base text-gray-600">
//               <span className="font-semibold">Reported By:</span> {comment.comment.reportedBy} on{" "}
//               {comment.comment.reportedOn}
//             </p>
//             <p className="text-base text-gray-500 italic">
//               <span className="font-semibold">Reason:</span> {comment.comment.reason}
//             </p>

//             {/* User Details */}
//             <p className="text-base text-gray-700 mt-2">
//               <span className="font-semibold">User:</span>{" "}
//               <a
//                 href={comment.comment.user.profile}
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 {comment.comment.user.name}
//               </a>{" "}
//               ({comment.comment.user.history} past reports)
//             </p>

//             {/* Context */}
//             <p className="text-base text-gray-600 mt-2">
//               <span className="font-semibold">Context:</span> {comment.comment.context.postTitle} -{" "}
//               {comment.comment.context.threadDetails}
//             </p>

//             {/* Original Comment Content */}
//             <p className="text-base text-gray-600 mt-2">
//               <span className="font-semibold">Original Comment Content:</span> {comment.comment.originalContent}
//             </p>

//             {/* Action Buttons */}
//             <div className="mt-6 flex space-x-4">
//               <Button
//                 variant="inactive"
//                 onClick={() => openConfirmationModal("delete", comment.id)} // Open delete confirmation modal
//               >
//                 <FaTrash className="mr-2" /> Delete Comment
//               </Button>
//               <Button
//                 variant="active"
//                 onClick={() => openConfirmationModal("deactivate", comment.id)} // Open deactivate confirmation modal
//               >
//                 <FaUserTimes className="mr-2" /> Deactivate User
//               </Button>
//               <Button
//                 variant="border"
//                 onClick={() => openConfirmationModal("dismiss", comment.id)} // Open dismiss confirmation modal
//               >
//                 <FaEyeSlash className="mr-2" /> Dismiss Report
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onConfirm={() => {
//           if (commentToActOn) {
//             if (confirmationAction === "delete") {
//               handleDeleteComment(commentToActOn);
//             } else if (confirmationAction === "deactivate") {
//               handleDeactivateUser("User", commentToActOn); // Pass the username if needed
//             } else if (confirmationAction === "dismiss") {
//               handleDismissReport(commentToActOn);
//             }
//           }
//         }}
//         message={
//           confirmationAction === "delete"
//             ? "Are you sure you want to delete this comment?"
//             : confirmationAction === "deactivate"
//             ? "Are you sure you want to deactivate this user and delete their comment?"
//             : "Are you sure you want to dismiss this report?"
//         }
//       />
//     </div>
//   );
// };

// export default ReportedCommentsPage;


// "use client";

// import React, { useEffect, useState } from "react";
// import { FaTrash, FaUserTimes, FaEyeSlash } from "react-icons/fa";
// import Button from "../../../../components/Button";
// import ConfirmationModal from "../../../../components/ConfirmationModal";

// const ReportedCommentsPage = () => {
//   const [comments, setComments] = useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [confirmationAction, setConfirmationAction] = useState<"delete" | "deactivate" | "dismiss" | null>(null);
//   const [commentToActOn, setCommentToActOn] = useState<number | null>(null);

//   // Fetch reported comments when the component mounts
//   const fetchReportedComments = async () => {
//     const res = await fetch("/api/comments/reported-comments");
//     if (res.ok) {
//       const data = await res.json();
//       setComments(data);
//     } else {
//       console.error("Failed to fetch reported comments.");
//     }
//   };

//   useEffect(() => {
//     fetchReportedComments(); // Initial fetch on page load
//   }, []);

//   const handleDeleteComment = async (id: number) => {
//     // Optimistically remove the comment from the UI
//     setComments(comments.filter((comment) => comment.id !== id));

//     try {
//       const res = await fetch('/api/comments/delete-comment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ commentId: id })
//       });

//       if (!res.ok) {
//         console.error('Failed to delete the comment');
//         // If the request fails, add the comment back to the list
//         fetchReportedComments();
//       }
//     } catch (error) {
//       console.error('Error deleting the comment:', error);
//       // If an error occurs, add the comment back to the list
//       fetchReportedComments();
//     }
//     closeModal(); // Close the modal
//   };

//   const handleDeactivateUser = async (name: string, id: number) => {
//     try {
//       const res = await fetch('/api/comments/deactivate-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ commentId: id }),
//       });
  
//       if (res.ok) {
//         setComments(comments.filter((comment) => comment.id !== id)); // Remove the comment from the UI
//         closeModal();
//       } else {
//         console.error('Failed to deactivate the user');
//       }
//     } catch (error) {
//       console.error('Error while deactivating the user:', error);
//     }
//   };
  

//   const handleDismissReport = async (id: number) => {
//     // Optimistically remove the comment from the UI
//     setComments(comments.filter((comment) => comment.id !== id));

//     try {
//       const res = await fetch('/api/comments/dismiss-report', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ commentId: id })
//       });

//       if (!res.ok) {
//         console.error('Failed to dismiss the report');
//         // If the request fails, add the comment back to the list
//         fetchReportedComments();
//       }
//     } catch (error) {
//       console.error('Error dismissing the report:', error);
//       // If an error occurs, add the comment back to the list
//       fetchReportedComments();
//     }
//     closeModal(); // Close the modal
//   };

//   const openConfirmationModal = (action: "delete" | "deactivate" | "dismiss", id: number) => {
//     setConfirmationAction(action);
//     setCommentToActOn(id);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCommentToActOn(null);
//     setConfirmationAction(null);
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-extrabold text-[#3a2f2c] mb-8">Reported Comments</h1>
//       <div className="space-y-6">
//         {comments.map((comment) => (
//           <div
//             key={comment.id}
//             className="bg-[#f7f4f0] shadow-lg p-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300"
//           >
//             {/* Comment Details */}
//             <p className="text-lg text-gray-700">
//               <span className="font-semibold">Comment:</span> "{comment.comment.content}"
//             </p>
//             <p className="text-base text-gray-600">
//               <span className="font-semibold">Reported By:</span> {comment.comment.reportedBy} on{" "}
//               {comment.comment.reportedOn}
//             </p>
//             <p className="text-base text-gray-500 italic">
//               <span className="font-semibold">Reason:</span> {comment.comment.reason}
//             </p>

//             {/* User Details */}
//             <p className="text-base text-gray-700 mt-2">
//               <span className="font-semibold">User:</span>{" "}
//               <a
//                 href={comment.comment.user.profile}
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 {comment.comment.user.name}
//               </a>{" "}
//               ({comment.comment.user.history} past reports)
//             </p>

//             {/* Context */}
//             <p className="text-base text-gray-600 mt-2">
//               <span className="font-semibold">Context:</span> {comment.comment.context.postTitle} -{" "}
//               {comment.comment.context.threadDetails}
//             </p>

//             {/* Original Comment Content */}
//             <p className="text-base text-gray-600 mt-2">
//               <span className="font-semibold">Original Comment Content:</span> {comment.comment.originalContent}
//             </p>

//             {/* Action Buttons */}
//             <div className="mt-6 flex space-x-4">
//               <Button
//                 variant="inactive"
//                 onClick={() => openConfirmationModal("delete", comment.id)} // Open delete confirmation modal
//               >
//                 <FaTrash className="mr-2" /> Delete Comment
//               </Button>
//               <Button
//                 variant="active"
//                 onClick={() => openConfirmationModal("deactivate", comment.id)} // Open deactivate confirmation modal
//               >
//                 <FaUserTimes className="mr-2" /> Deactivate User
//               </Button>
//               <Button
//                 variant="border"
//                 onClick={() => openConfirmationModal("dismiss", comment.id)} // Open dismiss confirmation modal
//               >
//                 <FaEyeSlash className="mr-2" /> Dismiss Report
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Confirmation Modal */}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onConfirm={() => {
//           if (commentToActOn) {
//             if (confirmationAction === "delete") {
//               handleDeleteComment(commentToActOn);
//             } else if (confirmationAction === "deactivate") {
//               handleDeactivateUser("User", commentToActOn);
//             } else if (confirmationAction === "dismiss") {
//               handleDismissReport(commentToActOn);
//             }
//           }
//         }}
//         message={
//           confirmationAction === "delete"
//             ? "Are you sure you want to delete this comment?"
//             : confirmationAction === "deactivate"
//             ? "Are you sure you want to deactivate this user and delete their comment?"
//             : "Are you sure you want to dismiss this report?"
//         }
//       />
//     </div>
//   );
// };

// export default ReportedCommentsPage;
"use client";

import React, { useEffect, useState } from "react";
import { FaTrash, FaUserTimes, FaEyeSlash } from "react-icons/fa";
import Button from "../../../../components/Button";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import Notification from "../../../../components/Notification";  // Import the Notification component

const ReportedCommentsPage = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<"delete" | "deactivate" | "dismiss" | null>(null);
  const [commentToActOn, setCommentToActOn] = useState<number | null>(null);

  const [notificationMessage, setNotificationMessage] = useState<string>(''); // For notification message
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success'); // For notification type
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // For notification visibility

  // Fetch reported comments when the component mounts
  const fetchReportedComments = async () => {
    const res = await fetch("/api/comments/reported-comments");
    if (res.ok) {
      const data = await res.json();
      setComments(data);
    } else {
      console.error("Failed to fetch reported comments.");
    }
  };

  useEffect(() => {
    fetchReportedComments(); // Initial fetch on page load
  }, []);

  const handleDeleteComment = async (reportId: number) => {
    // Optimistically remove the reported comment from the UI (assuming `comments` includes the reported comment)
    setComments(comments.filter((comment) => comment.reportId !== reportId));
  
    try {
      const res = await fetch('/api/comments/delete-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId: reportId }), // Send the reportId to the backend
      });
  
      if (res.ok) {
        setNotificationMessage('Comment deactivated successfully.');
        setNotificationType('success');
        setNotificationVisible(true);
        closeModal();  // Close modal immediately after successful action
      } else {
        setNotificationMessage('Failed to deactivate the comment');
        setNotificationType('error');
        setNotificationVisible(true);
        console.error('Failed to deactivate the comment');
        // If the request fails, reload the reported comments
        fetchReportedComments();
      }
    } catch (error) {
      setNotificationMessage('Error deactivating the comment.');
      setNotificationType('error');
      setNotificationVisible(true);
      console.error('Error deactivating the comment:', error);
      // If an error occurs, reload the reported comments
      fetchReportedComments();
      closeModal();  // Close modal on error as well
    }
  };
  
  const handleDeactivateUser = async (reportId: number) => {
    try {
      const res = await fetch('/api/comments/deactivate-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId: reportId }), // Send the reportId to the backend
      });
  
      if (res.ok) {
        setComments(comments.filter((comment) => comment.reportId !== reportId)); // Remove the reported comment from the UI
        setNotificationMessage('User and comment deactivated successfully.');
        setNotificationType('success');
        setNotificationVisible(true);
        closeModal(); // Close modal immediately after successful action
      } else {
        setNotificationMessage('Failed to deactivate the user');
        setNotificationType('error');
        setNotificationVisible(true);
        console.error('Failed to deactivate the user');
      }
    } catch (error) {
      setNotificationMessage('Error deactivating the user.');
      setNotificationType('error');
      setNotificationVisible(true);
      console.error('Error while deactivating the user:', error);
      closeModal(); // Close modal on error as well
    }
  };
  
  


  const handleDismissReport = async (id: number) => {
    // Optimistically remove the comment from the UI
    setComments(comments.filter((comment) => comment.id !== id));

    try {
      const res = await fetch('/api/comments/dismiss-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId: id })
      });

      if (res.ok) {
        setNotificationMessage('Report dismissed successfully.');
        setNotificationType('success');
        setNotificationVisible(true);
        closeModal();  // Close modal immediately after successful action
      } else {
        setNotificationMessage('Failed to dismiss the report');
        setNotificationType('error');
        setNotificationVisible(true);
        console.error('Failed to dismiss the report');
        // If the request fails, add the comment back to the list
        fetchReportedComments();
      }
    } catch (error) {
      setNotificationMessage('Error dismissing the report.');
      setNotificationType('error');
      setNotificationVisible(true);
      console.error('Error dismissing the report:', error);
      // If an error occurs, add the comment back to the list
      fetchReportedComments();
      closeModal();  // Close modal on error as well
    }
  };

  const openConfirmationModal = (action: "delete" | "deactivate" | "dismiss", id: number) => {
    setConfirmationAction(action);
    setCommentToActOn(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCommentToActOn(null);
    setConfirmationAction(null);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-extrabold text-[#3a2f2c] mb-8">Reported Comments</h1>

      {/* Notification Component */}
      <Notification
        message={notificationMessage}
        type={notificationType}
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)} // Close notification
      />

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-lg text-gray-700 font-semibold">There are no reported comments at the moment.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#f7f4f0] shadow-lg p-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              {/* Comment Details */}
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Comment:</span> "{comment.comment.content}"
              </p>
              <p className="text-base text-gray-600">
                <span className="font-semibold">Reported By:</span> {comment.comment.reportedBy} on{" "}
                {comment.comment.reportedOn}
              </p>
              <p className="text-base text-gray-500 italic">
                <span className="font-semibold">Reason:</span> {comment.comment.reason}
              </p>

              {/* User Details */}
              <p className="text-base text-gray-700 mt-2">
                <span className="font-semibold">User:</span>{" "}
                <a
                  href={comment.comment.user.profile}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {comment.comment.user.name}
                </a>{" "}
                ({comment.comment.user.history} past reports)
              </p>

              {/* Context */}
              <p className="text-base text-gray-600 mt-2">
                <span className="font-semibold">Context:</span> {comment.comment.context.postTitle} -{" "}
                {comment.comment.context.threadDetails}
              </p>

              {/* Original Comment Content */}
              <p className="text-base text-gray-600 mt-2">
                <span className="font-semibold">Original Comment Content:</span> {comment.comment.originalContent}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-4">
                <Button
                  variant="inactive"
                  onClick={() => openConfirmationModal("delete", comment.id)} // Open delete confirmation modal
                >
                  <FaTrash className="mr-2" /> Delete Comment
                </Button>
                <Button
                  variant="active"
                  onClick={() => openConfirmationModal("deactivate", comment.id)} // Open deactivate confirmation modal
                >
                  <FaUserTimes className="mr-2" /> Deactivate User
                </Button>
                <Button
                  variant="border"
                  onClick={() => openConfirmationModal("dismiss", comment.id)} // Open dismiss confirmation modal
                >
                  <FaEyeSlash className="mr-2" /> Dismiss Report
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          if (commentToActOn) {
            if (confirmationAction === "delete") {
              handleDeleteComment(commentToActOn);
            } else if (confirmationAction === "deactivate") {
              handleDeactivateUser(commentToActOn);
            } else if (confirmationAction === "dismiss") {
              handleDismissReport(commentToActOn);
            }
          }
        }}
        message={
          confirmationAction === "delete"
            ? "Are you sure you want to delete this comment?"
            : confirmationAction === "deactivate"
            ? "Are you sure you want to deactivate this user and delete their comment?"
            : "Are you sure you want to dismiss this report?"
        }
      />
    </div>
  );
};

export default ReportedCommentsPage;
