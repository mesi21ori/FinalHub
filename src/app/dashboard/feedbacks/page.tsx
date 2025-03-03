"use client";

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

// Define the structure of feedback data
interface Feedback {
  user: string;
  avatar: string;
  rating: number;
  comment: string;
}

const FeedbackPage: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]); // State to hold feedback data
  const [filter, setFilter] = useState<number | null>(null); // Filter by star rating
  const [search, setSearch] = useState<string>("");

  // State to track expanded comments
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  // Fetch feedback data from the API when the component mounts
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("/api/feedback/getfeedback");
        const data: Feedback[] = await response.json();
        setFeedbackData(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  // Toggle expanded state for a comment
  const toggleExpand = (index: number) => {
    setExpandedComments((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Filter feedback based on search and star rating
  const filteredFeedback = feedbackData.filter(
    (feedback) =>
      (!filter || feedback.rating === filter) &&
      feedback.user.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate average rating
  const averageRating =
    feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackData.length;

  return (
    <div className="min-h-screen bg-[#f7f4f0] text-[#3C2A21] p-6">
      {/* Header with Insights */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">User Feedback</h1>
        <div className="flex flex-wrap justify-between items-center bg-[#f7f4f0] p-4 rounded-lg shadow-lg glow-effect">
          <div>
            <p className="text-xl font-semibold">Average Rating: {averageRating.toFixed(1)} ⭐️</p>
            <p>Total Feedback: {feedbackData.length}</p>
          </div>
          <input
            type="text"
            placeholder="Search by user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-[#3C2A21] rounded-lg"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter(null)} // Clear filter for "All"
              className={`p-2 rounded-lg ${
                filter === null ? "bg-[#3C2A21] text-[#f7f4f0]" : "bg-[#f7f4f0] text-[#3C2A21]"
              }`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => setFilter(filter === star ? null : star)}
                className={`p-2 rounded-lg ${
                  filter === star ? "bg-[#3C2A21] text-[#f7f4f0]" : "bg-[#f7f4f0] text-[#3C2A21]"
                }`}
              >
                {star} ⭐️
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeedback.map((feedback, index) => (
          <div
            key={index}
            className="bg-[#f7f4f0] p-4 rounded-lg shadow-lg flex flex-col items-center glow-effect"
          >
            <img
              src={feedback.avatar}
              alt={feedback.user}
              className="w-16 h-16 rounded-full mb-4 border-2 border-[#3C2A21]"
            />
            <h2 className="text-lg font-semibold">{feedback.user}</h2>
            <div className="flex mb-2">
              {[...Array(feedback.rating)].map((_, i) => (
                <FaStar key={i} className="text-[#D5A021]" />
              ))}
              {[...Array(5 - feedback.rating)].map((_, i) => (
                <FaStar key={i} className="text-[#C8B4A3]" />
              ))}
            </div>
            <p className="text-sm text-center text-[#3C2A21]">
              {expandedComments.includes(index)
                ? feedback.comment
                : feedback.comment.slice(0, 100) + (feedback.comment.length > 100 ? "..." : "")}
            </p>
            {feedback.comment.length > 100 && (
              <button
                onClick={() => toggleExpand(index)}
                className="text-sm text-[#3C2A21] underline mt-2 hover:text-[#D5A021]"
              >
                {expandedComments.includes(index) ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
