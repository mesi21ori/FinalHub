// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

// const Footer: React.FC = () => {
//   const [rating, setRating] = useState(4);
//   const [feedback, setFeedback] = useState("");
//   const [userId, setUserId] = useState<number | null>(null);
//   const navigationRef = useRef<HTMLDivElement | null>(null);

//   // Retrieve userId from sessionStorage when the component mounts
//   useEffect(() => {
//     const storedUserId = sessionStorage.getItem("userId");
//     if (storedUserId) {
//       setUserId(Number(storedUserId));
//     } else {
//       console.error("User ID not found in sessionStorage");
//     }
//   }, []);

//   const handleRating = (rate: number) => {
//     setRating(rate);
//   };

//   const handleSubmit = async () => {
//     if (rating === 0 || feedback.trim() === "") {
//       alert("Please provide a rating and feedback.");
//       return;
//     }

//     if (!userId) {
//       // Scroll to the navigation section if userId is missing
//       if (navigationRef.current) {
//         navigationRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//       alert("You must be logged in to submit feedback.");
//       return;
//     }

//     try {
//       const response = await fetch('/api/feedback/feedback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId,
//           rating,
//           content: feedback,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit feedback');
//       }

//       const result = await response.json();
//       alert('Feedback submitted successfully!');
//       setFeedback(""); // Reset feedback input field
//       setRating(0); // Reset rating
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//       alert('There was an error submitting your feedback.');
//     }
//   };

//   return (
//     <footer
//       className="bg-[#E5E5CB] bg-opacity-20 text-[#3a2f2c] border-t-2 border-[#f7f4f0] py-8 px-4"
//       style={{
//         boxShadow: "0 -10px 20px rgba(0, 0, 0, 0.15)", // Upper shadow added here
//       }}
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Rating Section */}
//         <div className="text-center mb-6">
//           <div className="flex justify-center items-center space-x-2 mb-4">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FaStar
//                 key={star}
//                 onClick={() => handleRating(star)}
//                 className={`cursor-pointer ${star <= rating ? "text-[#3a2f2c]" : "text-[#c8b4a3]"}`}
//                 size={20}
//               />
//             ))}
//             <span className="text-[#3a2f2c]">{rating}/5 stars</span>
//           </div>
//           <div className="flex justify-center items-center space-x-2">
//             <input
//               type="text"
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               placeholder="My feedback!!"
//               className="bg-[#f7f4f0] border border-[#3a2f2c] rounded-lg px-2 py-1 text-sm text-[#3a2f2c] w-full max-w-xs"
//             />
//             <button
//               onClick={handleSubmit}
//               className="bg-[#3a2f2c] text-[#f7f4f0] px-3 py-1 rounded-lg text-sm hover:bg-[#c8b4a3]"
//             >
//               Submit
//             </button>
//           </div>
//         </div>

//         <div className="border-t border-[#3a2f2c] my-6"></div>

//         {/* Footer Links & Icons */}
//         <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-8">
//           {/* Company Info */}
//           <div className="text-sm text-[#3a2f2c] text-center sm:text-left">
//             ©2023 Company Name
//           </div>

//           {/* Navigation Links */}
//           <div
//             ref={navigationRef} // Added reference here
//             className="flex flex-wrap justify-center sm:justify-start space-x-4 text-sm"
//           >
//             <a href="#" className="hover:text-gray-400">Home</a>
//             <a href="#" className="hover:text-gray-400">Our Services</a>
//             <a href="#" className="hover:text-gray-400">Testimonials</a>
//             <a href="#" className="hover:text-gray-400">About</a>
//             <a href="#" className="hover:text-gray-400">Contact</a>
//           </div>

//           {/* Social Icons */}
//           <div className="flex justify-center sm:justify-end space-x-6 mt-2 sm:mt-0 flex-wrap">
//             <a href="#" aria-label="Facebook" className="hover:text-gray-400">
//               <FaFacebookF size={24} />
//             </a>
//             <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
//               <FaLinkedinIn size={24} />
//             </a>
//             <a href="#" aria-label="Twitter" className="hover:text-gray-400">
//               <FaTwitter size={24} />
//             </a>
//             <a href="#" aria-label="YouTube" className="hover:text-gray-400">
//               <FaYoutube size={24} />
//             </a>
//             <a href="#" aria-label="Instagram" className="hover:text-gray-400">
//               <FaInstagram size={24} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Notification from './Notification'; // Import Notification component

const Footer: React.FC = () => {
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const navigationRef = useRef<HTMLDivElement | null>(null);

  // Notification state
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  // Retrieve userId from sessionStorage when the component mounts
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    } else {
      console.error("User ID not found in sessionStorage");
    }
  }, []);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (rating === 0 || feedback.trim() === "") {
      alert("Please provide a rating and feedback.");
      return;
    }

    if (!userId) {
      // Scroll to the navigation section if userId is missing
      if (navigationRef.current) {
        navigationRef.current.scrollIntoView({ behavior: "smooth" });
      }
      alert("You must be logged in to submit feedback.");
      return;
    }

    try {
      const response = await fetch('/api/feedback/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          rating,
          content: feedback,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const result = await response.json();
      // Show success notification
      setNotification({
        message: 'Feedback submitted successfully!',
        type: 'success',
        visible: true,
      });

      setFeedback(""); // Reset feedback input field
      setRating(0); // Reset rating
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Show error notification
      setNotification({
        message: 'There was an error submitting your feedback.',
        type: 'error',
        visible: true,
      });
    }
  };

  return (
    <footer
      className="bg-[#E5E5CB] bg-opacity-20 text-[#3a2f2c] border-t-2 border-[#f7f4f0] py-8 px-4"
      style={{
        boxShadow: "0 -10px 20px rgba(0, 0, 0, 0.15)", // Upper shadow added here
      }}
    >
      {/* Notification component */}
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
      />

      <div className="max-w-7xl mx-auto">
        {/* Rating Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRating(star)}
                className={`cursor-pointer ${star <= rating ? "text-[#3a2f2c]" : "text-[#c8b4a3]"}`}
                size={20}
              />
            ))}
            <span className="text-[#3a2f2c]">{rating}/5 stars</span>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="My feedback!!"
              className="bg-[#f7f4f0] border border-[#3a2f2c] rounded-lg px-2 py-1 text-sm text-[#3a2f2c] w-full max-w-xs"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#3a2f2c] text-[#f7f4f0] px-3 py-1 rounded-lg text-sm hover:bg-[#c8b4a3]"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="border-t border-[#3a2f2c] my-6"></div>

        {/* Footer Links & Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-8">
          {/* Company Info */}
          <div className="text-sm text-[#3a2f2c] text-center sm:text-left">
            ©2023 Company Name
          </div>

          {/* Navigation Links */}
          <div
            ref={navigationRef} // Added reference here
            className="flex flex-wrap justify-center sm:justify-start space-x-4 text-sm"
          >
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">Our Services</a>
            <a href="#" className="hover:text-gray-400">Testimonials</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-end space-x-6 mt-2 sm:mt-0 flex-wrap">
            <a href="#" aria-label="Facebook" className="hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
              <FaLinkedinIn size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-gray-400">
              <FaYoutube size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
