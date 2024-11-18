// "use client"; 

// import React, { useState } from "react";
// import { FaStar, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

// const Footer: React.FC = () => {
//   const [rating, setRating] = useState(4);
//   const [feedback, setFeedback] = useState("");

//   const handleRating = (rate: number) => {
//     setRating(rate);
//   };

//   const handleSubmit = () => {
//     console.log("Feedback submitted:", feedback, "Rating:", rating);
//     setFeedback("");
//   };

//   const scrollToSection = (id: string) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <footer className="bg-[#3C2A21] text-[#D5CEA3] py-8 px-4">
//       {/* Feedback Section */}
//       <div className="max-w-4xl mx-auto text-center mb-6">
//         <div className="flex justify-center items-center space-x-2 mb-4">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <FaStar
//               key={star}
//               onClick={() => handleRating(star)}
//               className={`cursor-pointer ${star <= rating ? "text-[#D5CEA3]" : "text-[#5a3f36]"}`}
//               size={24}
//             />
//           ))}
//           <span className="text-[#D5CEA3]">{rating}/5 stars</span>
//         </div>
//         <div className="flex justify-center items-center mb-4">
//           <input
//             type="text"
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             placeholder="My feedback!!"
//             className="bg-[#3C2A21] border border-[#D5CEA3] rounded-lg px-4 py-2 text-[#D5CEA3] w-full max-w-md"
//           />
//           <button
//             onClick={handleSubmit}
//             className="bg-[#D5CEA3] text-[#3C2A21] px-4 py-2 rounded-lg hover:bg-[#c8b4a3] ml-2"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* Separator Line */}
//       <div className="border-t border-[#D5CEA3] my-6"></div>

//       {/* Footer Content */}
//       <div className="flex justify-between items-center">
//         {/* Company Name on the Bottom Left */}
//         <div className="text-sm text-[#D5CEA3]">
//           ©2023 Company Name
//         </div>

//         {/* Navigation Links Centered */}
//         <div className="flex space-x-8">

//           <button
//             onClick={() => scrollToSection("hero")}
//             className="hover:text-gray-400"
//           >
//             Home
//           </button>

//           <button
//             onClick={() => scrollToSection("services")}
//             className="hover:text-gray-400"
//           >
//             Our Services
//           </button>

//           <button
//             onClick={() => scrollToSection("testimonials")}
//             className="hover:text-gray-400"
//           >
//             Testimonials
//           </button>

//           <button
//             onClick={() => scrollToSection("about")}
//             className="hover:text-gray-400"
//           >
//             About
//           </button>

//           <button
//             onClick={() => scrollToSection("contact")}
//             className="hover:text-gray-400"
//           >
//             Contact
//           </button>
//         </div>

//         {/* Social Media Icons on the Bottom Right */}
//         <div className="flex space-x-4">
//           <a href="#" aria-label="Facebook" className="hover:text-gray-400">
//             <FaFacebookF size={20} />
//           </a>
//           <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
//             <FaLinkedinIn size={20} />
//           </a>
//           <a href="#" aria-label="Twitter" className="hover:text-gray-400">
//             <FaTwitter size={20} />
//           </a>
//           <a href="#" aria-label="YouTube" className="hover:text-gray-400">
//             <FaYoutube size={20} />
//           </a>
//           <a href="#" aria-label="Instagram" className="hover:text-gray-400">
//             <FaInstagram size={20} />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




"use client";

import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import axios from "axios";

const Footer: React.FC = () => {
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load user ID from local storage only in the browser
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (!feedback || !userId) {
      setMessage("Feedback and user ID are required.");
      return;
    }

    try {
      // Send feedback to API
      const response = await axios.post("/api/users/feedback", {
        content: feedback,
        userId,
      });

      setMessage(response.data.message); // Display success message
      setFeedback(""); // Clear the feedback input

      // Hide the success message after 2 seconds
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage("Error submitting feedback.");
      console.error("Error submitting feedback:", error);
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#3C2A21] text-[#D5CEA3] py-8 px-4">
      {/* Feedback Section */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <div className="flex justify-center items-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => handleRating(star)}
              className={`cursor-pointer ${
                star <= rating ? "text-[#D5CEA3]" : "text-[#5a3f36]"
              }`}
              size={24}
            />
          ))}
          <span className="text-[#D5CEA3]">{rating}/5 stars</span>
        </div>
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="My feedback!!"
            className="bg-[#3C2A21] border border-[#D5CEA3] rounded-lg px-4 py-2 text-[#D5CEA3] w-full max-w-md"
          />
          <button
            onClick={handleSubmit}
            className="bg-[#D5CEA3] text-[#3C2A21] px-4 py-2 rounded-lg hover:bg-[#c8b4a3] ml-2"
          >
            Submit
          </button>
        </div>
        {message && <p className="text-[#D5CEA3]">{message}</p>}
      </div>

      {/* Separator Line */}
      <div className="border-t border-[#D5CEA3] my-6"></div>

      {/* Footer Content */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-[#D5CEA3]">©2023 Company Name</div>

        {/* Navigation Links Centered */}
        <div className="flex space-x-8">
          <button onClick={() => scrollToSection("hero")} className="hover:text-gray-400">Home</button>
          <button onClick={() => scrollToSection("services")} className="hover:text-gray-400">Our Services</button>
          <button onClick={() => scrollToSection("testimonials")} className="hover:text-gray-400">Testimonials</button>
          <button onClick={() => scrollToSection("about")} className="hover:text-gray-400">About</button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-gray-400">Contact</button>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="hover:text-gray-400">
            <FaFacebookF size={20} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
            <FaLinkedinIn size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-400">
            <FaTwitter size={20} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-gray-400">
            <FaYoutube size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-gray-400">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
