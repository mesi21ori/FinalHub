
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

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
    <footer className="bg-[#E5E5CB] text-[#3a2f2c] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Rating Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRating(star)}
                className={`cursor-pointer ${star <= rating ? "text-[#3a2f2c]" : "text-[#a58866]"}`}
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
              className="bg-[#E5E5CB] border border-[#3a2f2c] rounded-lg px-2 py-1 text-sm text-[#3a2f2c] w-full max-w-xs"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#3a2f2c] text-[#E5E5CB] px-3 py-1 rounded-lg text-sm hover:bg-[#c8b4a3]"
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
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4 text-sm">
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


