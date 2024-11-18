import Image from "next/image";
import React from "react";
import p1 from "/public/images/p1.jpg";
import p2 from "/public/images/p2.jpg";

export default function AboutPage() {
  return (
    <div className="bg-[#E5E5CB] py-12">
      {/* Section Title */}
      <h2 className="text-center text-3xl font-bold text-[#3e251c] mb-4">
       Here you can get
      </h2>
      <div className="text-center mb-8">
        {/* Custom Zigzag Line */}
        <svg
          width="20%" 
          height="30"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
          className="mx-auto" 
        >
          <path
            d="M0,15 L10,10 L20,15 L30,10 L40,15 L50,5 L60,15 L70,10 L80,15 L90,10 L100,15" // Adjusted path for length
            stroke="#D5CEA3"
            strokeWidth="3" 
            fill="none"
          />
        </svg>
      </div>

      {/* First Section - Image on the Right */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-24 mx-4">
        {/* Text Section */}
        <div className="max-w-md">
          <h3 className="text-2xl font-semibold text-[#3e251c] mb-4">
            Get free unlimited Histories
          </h3>
          <div className="h-px bg-[#D5CEA3] mb-4"></div>
          <p className="text-gray-700 mb-6">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut al Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            al.
          </p>
        </div>
        {/* Image Section */}
        <div className="relative w-60 h-60 mb-6">
          <Image
            src={p1}
            alt="Developing Confident and Successful Learners"
            className="rounded-lg object-cover w-full h-full"
            layout="fill"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              transform: "rotate(-15deg)", 
            }}
          />
        </div>
      </div>

      {/* Second Section - Image on the Left */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-24 mb-24 mx-4">
        {/* Image Section */}
        <div className="relative w-60 h-60 mb-6">
          <Image
            src={p2}
            alt="Enjoy Learning with a Unique Classroom Experience"
            className="rounded-lg object-cover w-full h-full"
            layout="fill"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              transform: "rotate(-15deg)", 
            }}
          />
        </div>
        {/* Text Section */}
        <div className="max-w-md">
          <h3 className="text-2xl font-semibold text-[#3e251c] mb-4">
           Download histories on your device
          </h3>
          <div className="h-px bg-[#D5CEA3] mb-4"></div>
          <p className="text-gray-700 mb-6">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut al Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            al.
          </p>
        </div>
      </div>
{/* Duplicated Section */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-24 mx-4">
        {/* Text Section */}
        <div className="max-w-md">
          <h3 className="text-2xl font-semibold text-[#3e251c] mb-4">
            Perimum Special
          </h3>
          <div className="h-px bg-[#D5CEA3] mb-4"></div>
          <p className="text-gray-700 mb-6">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut al Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            al.
          </p>
        </div>
        {/* Image Section */}
        <div className="relative w-60 h-60 mb-6">
          <Image
            src={p1}
            alt="Developing Confident and Successful Learners"
            className="rounded-lg object-cover w-full h-full"
            layout="fill"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              transform: "rotate(-15deg)", 
            }}
          />
        </div>
      </div>

      {/* Second Duplicated Section - Image on the Left */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-24 mx-4">
        {/* Image Section */}
        <div className="relative w-60 h-60 mb-6">
          <Image
            src={p2}
            alt="Enjoy Learning with a Unique Classroom Experience"
            className="rounded-lg object-cover w-full h-full"
            layout="fill"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              transform: "rotate(-15deg)", 
            }}
          />
        </div>
        {/* Text Section */}
        <div className="max-w-md mt-6">
          <h3 className="text-2xl font-semibold text-[#3e251c] mb-4">
            contents from different institutions
          </h3>
          <div className="h-px bg-[#D5CEA3] mb-4"></div>
          <p className="text-gray-700 mb-6">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut al Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            al.
          </p>
        </div>
      </div>
    </div>
  );
}