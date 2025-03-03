"use client";

import { useState } from "react";

const slides = [
  {
    title: "Historical Content Repository",
    description:
      "Access a rich collection of Ethiopian history in diverse formats, including videos, music, books, photos, and articles. Explore the stories and cultural treasures that define Ethiopia's past and present.",
    image: "/images/p3.jpg",
  },
  {
    title: "Institutional Collaboration",
    description:
      "Partner with us! Institutions can upload, share, and preserve their historical archives on our platform, reaching a wider audience while contributing to Ethiopia's collective memory.",
    image: "/images/p2.jpg",
  },
  {
    title: "Premium Membership",
    description:
      "Access premium content with our Weekly, Monthly, or Yearly Plans, tailored to your needs. Explore Ethiopia's rich history while supporting preservation efforts. Your subscription also benefits contributing institutions.",
    image: "/images/p1.jpg",
  },
  {
    title: "Researcher Access",
    description:
      "Eligible researchers can apply for access to specialized content through our platform, connecting with institutions for in-depth studies and academic pursuits.",
    image: "/images/p1.jpg",
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideTransition, setSlideTransition] = useState("slide-in");

  const nextSlide = () => {
    setSlideTransition("slide-out");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setSlideTransition("slide-in");
    }, 300); // transition duration
  };

  const prevSlide = () => {
    setSlideTransition("slide-out");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setSlideTransition("slide-in");
    }, 300); // transition duration
  };

  return (
    <div className="bg-[#f7f4f0] py-12 relative overflow-hidden">
      <h2 className="text-center text-3xl font-bold text-[#3e251c] mb-4">
      Our Services
        </h2>

        <div className="text-center mb-8">
          <svg
            width="20%"
            height="30"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            className="mx-auto"
          >
            <path
              d="M0,15 L10,10 L20,15 L30,10 L40,15 L50,5 L60,15 L70,10 L80,15 L90,10 L100,15"
              stroke="#E5E5CB"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>

      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between space-x-6">
        {/* Text Content with Left Button */}
        <div className="md:w-2/3 text-center md:text-left relative">
          <h2 className="text-xl font-bold text-[#3e251c] mb-2 transition-transform duration-500 transform hover:scale-105">
            {slides[currentSlide].title}
          </h2>
          <p className="mt-2 text-gray-700">{slides[currentSlide].description}</p>
          <button
            onClick={prevSlide}
            className="absolute -left-24 top-1/2 transform -translate-y-1/2 text-[#3e251c] transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
{/* Image Content with Right Button */}
        <div className="w-full md:w-1/3 relative">
          <div
            className={`transition-transform duration-500 ${
              slideTransition === "slide-in" ? "translate-x-0 scale-100" : "translate-x-full scale-90"
            }`}
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="rounded-lg shadow-lg w-full h-auto object-cover sm:w-32 sm:h-24 md:w-64 md:h-48"
            />
          </div>
          <button
            onClick={nextSlide}
            className="absolute -right-24 top-1/2 transform -translate-y-1/2 text-[#3e251c] transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition duration-300 ${
              index === currentSlide ? "bg-[#3e251c]" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}