"use client"; // Ensure this is marked as a client component

import { useRouter } from "next/navigation";

import Image from "next/image";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import Slider from "../../components/Slider";
import AboutPage from "../../components/Aboutpage";
import TestimonialSlider from "../../components/TestimonialSlider";
import WhyItWorks from "../../components/WhyItWorks";
import Footer from "../../components/Footer";


export default function HomePage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  // Smoothly scroll to the section by ID
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Close the menu after navigation
    }
  };

  // Simulate loading and navigate to another page after a delay
  const handleButtonClick = (url: string) => {
    setIsLoading(true); // Set loading to true
    setTimeout(() => {
      router.push(url); // Navigate after 1 second
      setIsLoading(false); // Set loading to false after navigation
    }, 1000); // Simulated delay
  };

  return (
    <div className="min-h-screen flex flex-col  bg-[#f7f4f0]">
      {/* Navigation Bar */}
      <nav className="bg-[#3a2f2c] text-[#ffffff] py-2 px-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <Image
            src="/images/logo.png" // Path to your logo
            alt="Ethiopian Shield Logo"
            width={30} // Logo size
            height={30}
            className="mr-2"
          />
          <span className="text-xs font-bold">Heritage Hub</span>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <span>&#x2715;</span> // Close icon
            ) : (
              <span>&#9776;</span> // Hamburger icon
            )}
          </button>
        </div>
{/* Navigation Links */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-4 text-sm absolute md:relative top-16 left-0 w-full md:w-auto bg-[#3a2f2c] md:bg-transparent md:top-auto`}
        >
          <li className="text-center md:text-left py-2 md:py-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="block md:inline-block w-full md:w-auto hover:text-[#E5E5CB] cursor-pointer px-4"
            >
              Home
            </button>
          </li>
          <li className="text-center md:text-left py-2 md:py-0">
            <button
              onClick={() => scrollToSection("services")}
              className="block md:inline-block w-full md:w-auto hover:text-[#E5E5CB] cursor-pointer px-4"
            >
              Services
            </button>
          </li>
          <li className="text-center md:text-left py-2 md:py-0">
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block md:inline-block w-full md:w-auto hover:text-[#E5E5CB] cursor-pointer px-4"
            >
              Testimonials
            </button>
          </li>
          
          <li className="text-center md:text-left py-2 md:py-0">
            <button
              onClick={() => scrollToSection("why-it-works")}
              className="block md:inline-block w-full md:w-auto hover:text-[#E5E5CB] cursor-pointer px-4"
            >
              Why It Works
            </button>
          </li>
          <li className="text-center md:text-left py-2 md:py-0">
            <button
              onClick={() => scrollToSection("feedback")}
              className="block md:inline-block w-full md:w-auto hover:text-[#E5E5CB] cursor-pointer px-4"
            >
              Feedback
            </button>
          </li>
        </ul>

        {/* Action Buttons */}
        <div
          className={`flex items-center space-x-2 ${
            menuOpen ? "mt-4" : "hidden md:flex"
          } text-sm`}
        >
          <button
            onClick={() => handleButtonClick("auth/sign-in")}
            className="bg-[#f7f4f0] text-[#3a2f2c] py-1 px-3 rounded hover:bg-[#c8b4a3]"
          >
            {isLoading ? <LoadingSpinner /> : "Sign In"}
          </button>
          <button
            onClick={() => handleButtonClick("auth/sign-up")}
            className="bg-[#f7f4f0] text-[#3a2f2c] py-1 px-3 rounded hover:bg-[#c8b4a3]"
          >
            {isLoading ? <LoadingSpinner /> : "Sign Up"}
          </button>
        </div>
      </nav>
{/* Hero Section */}
      <header
        id="hero"
        className="flex-grow flex flex-col justify-center items-center text-center px-4 py-10 mt-28 bg-[#f7f4f0]"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#3a2f2c]">
          <span className="block relative">
            <span className="absolute inset-0 text-[#E5E5CB]">Heritage Hub</span>
            <span className="block text-stroke text-[#3a2f2c]">
              Heritage Hub
            </span>
          </span>
          <span className="inline relative">
            <span className="absolute inset-0 text-[#E5E5CB]">
              History Awaits,
            </span>
            <span className="inline text-stroke text-[#3a2f2c] mr-2">
              History Awaits,
            </span>
          </span>
          <span className="inline text-[#3a2f2c]"> Ethiopia Speaks!</span>
        </h1>
        <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-2xl">
          Heritage Hub is dedicated to preserving and sharing the rich history
          of Ethiopia, connecting the past with the present. Explore the
          stories, culture, and heritage that have shaped Ethiopia, ensuring
          that its legacy is celebrated and remembered for generations to come.
        </p>
        <div className="relative mt-8">
          <button
            onClick={() => handleButtonClick("/register/why-contribute")}
            className="relative bg-[#3a2f2c] text-white py-3 px-10 rounded-full overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#3a2f2c] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E5E5CB] focus:ring-offset-2"
          >
            {isLoading ? <LoadingSpinner /> : "Become a Contributor..."}
            <span className="absolute -right-4 -bottom-4 bg-[#FFFFE9] h-12 w-12 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Other Components */}
      <section id="services" className="mt-24">
        <Slider />
      </section>
      <section id="about" className="mt-12">
        <AboutPage />
      </section>
      <section id="testimonials" className="mt-12">
        <TestimonialSlider />
      </section>
      <section id="why-it-works" className="mt-12">
        <WhyItWorks />
      </section>
      <footer  id="feedback" className="mt-12">
        <Footer />
      </footer>
    </div>
  );
}