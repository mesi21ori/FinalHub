"use client";

import { useState } from "react";

const slides = [
  {
    title: "Collaboration",
    description:
      "At Heritage Hub, we collaborate with organizations to preserve and promote Ethiopia's rich history. Through partnerships, we document cultural artifacts, share traditional stories, and create educational programs. Together, we ensure that Ethiopia’s diverse narratives are celebrated and passed on to future generations.",
    image: "/images/p3.jpg",
  },
  {
    title: "Preserving Our Legacy",
    description:
      "Learn about the efforts to preserve Ethiopia’s cultural artifacts, languages, and traditions for future generations.",
    image: "/images/p2.jpg",
  },
  {
    title: "Cultural Treasures",
    description:
      "Discover the unique cultural heritage and landmarks that define Ethiopia’s identity and history.",
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
    }, 300);
  };

  const prevSlide = () => {
    setSlideTransition("slide-out");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setSlideTransition("slide-in");
    }, 300);
  };

  return (
    <div className="bg-[#E5E5CB] py-12">
      <div className="max-w-5xl mx-auto flex items-center justify-center">
        {/* <button onClick={prevSlide} className="mr-4">◀️</button> */}
        <button onClick={prevSlide} className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row items-center justify-between space-x-6">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-[#3e251c] mb-2">
              {slides[currentSlide].title}
            </h2>
            <p className="mt-2 text-gray-700">{slides[currentSlide].description}</p>
          </div>
          <div className="md:w-1/3">
            <div className={`transition-transform duration-300 ${slideTransition === "slide-in" ? "translate-x-0" : "translate-x-full"}`}>
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="rounded-lg shadow-md w-full h-auto object-cover md:w-64 md:h-48" // Responsive sizing
              />
            </div>
          </div>
        </div>
        <button onClick={nextSlide} className="ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
            <path d="M9 19l7-7-7-7" />
          </svg>
        </button>

      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#3e251c]" : "bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
}