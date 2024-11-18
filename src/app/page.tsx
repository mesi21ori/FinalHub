"use client"; 

import { useRouter } from "next/navigation";
import Slider from "../../components/Slider";
import TestimonialSlider from "../../components/TestimonialSlider";
import AboutPage from "../../components/Aboutpage";
import WhyItWorks from "../../components/WhyItWorks";
import Footer from "../../components/Footer";


export default function HomePage() {
  
  const router = useRouter();
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-[#3C2A21] text-[#D5CEA3]  py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-gray-400 cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-white-400 cursor-pointer"
            >
              Our Services
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="hover:text-white-400 cursor-pointer"
            >
              Testimonials
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-white-400 cursor-pointer"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-white-400 cursor-pointer"
            >
              Contact
            </button>
          </li>
        </ul>
        <div className="space-x-4">
          <button
            onClick={() => router.push("/signin")}
            className="bg-[#E5E5CB] text-[#3C2A21] py-2 px-4 rounded hover:bg-[#c8b4a3]"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-[#E5E5CB] text-[#3C2A21] py-2 px-4 rounded hover:bg-[#c8b4a3]"
          >
            Sign Up
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <header
        id="hero"
        className="flex-grow flex flex-col justify-center items-center text-center px-4 py-10 mt-28 bg-[#E5E5CB]"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-[#3e251c]">
          <span className="block relative">
            <span className="absolute inset-0 text-[#D5CEA3]">Heritage Hub</span>
            <span className="block text-stroke text-[#3e251c]">
              Heritage Hub
            </span>
          </span>
          <span className="inline relative">
            <span className="absolute inset-0 text-[#D5CEA3]">
              Keep Ethiopia’s
            </span>
            <span className="inline text-stroke text-[#3e251c]">
              Keep Ethiopia’s
            </span>
          </span>
          <span className="inline text-[#3e251c]"> History Alive</span>
        </h1>
        <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-2xl">
          Heritage Hub is dedicated to preserving and sharing the rich history
          of Ethiopia, connecting the past with the present. Explore the stories,
          culture, and heritage that have shaped Ethiopia, ensuring that its
          legacy is celebrated and remembered for generations to come.
        </p>
        <div className="relative mt-8">
          <button
            onClick={() => router.push("/institution-admin/multislider")}
className="relative bg-[#3e251c] text-white py-3 px-10 rounded-full overflow-hidden">
            <span className="relative z-10">Request for Apply</span>
            <span className="absolute -right-4 -bottom-4 bg-[#FFFFE9] h-12 w-12 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Slider Component */}
      <section id="services" className="mt-24">
        <Slider />
      </section>

      {/* Testimonial Slider Component */}
      <section id="testimonials" className="mt-12">
        <TestimonialSlider />
      </section>

      {/* About Page Section */}
      <section id="about" className="mt-12">
        <AboutPage />
      </section>

      {/* Why It Works Section */}
      <section id="contact" className="mt-12">
        <WhyItWorks />
      </section>

      {/* Footer Section */}
      <footer className="mt-12">
        <Footer />
      </footer>
    </div>
  );
}


