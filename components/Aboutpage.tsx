import Image from "next/image";
import React from "react";
import p1 from "/public/images/p1.jpg";
import p2 from "/public/images/p2.jpg";

export default function AboutPage() {
  return (
    <div className="bg-[#f7f4f0] py-12 w-full">
      <div className="w-full px-8 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-[#3e251c] mb-4">
          About Us
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

        {/* Section 1 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-32 mb-32 mx-4">
          <div className="max-w-lg pr-xl text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-[#3a2f2c] mb-4">
              Mission Statement
            </h3>
            <div className="h-px bg-[#E5E5CB] mb-4"></div>
            <p className="text-gray-700 mb-6">
              Our mission is to preserve and celebrate Ethiopia's rich history by providing a platform for institutions and individuals to share and collaborate on the nation's historical stories, culture, and heritage.
            </p>
          </div>
          <div className="relative w-60 h-60 hidden sm:block">
            <Image
              src={p1}
              alt="Developing Confident and Successful Learners"
              className="rounded-lg object-cover w-full h-full"
              layout="fill"
              style={{
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                transform: "rotate(15deg)",
              }}
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-32 mt-32 mb-24 mx-4">
          <div className="relative w-60 h-60 hidden sm:block">
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
          <div className="max-w-xl pl-8 mt-6 text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-[#3a2f2c] mb-4">
              Our Goals
            </h3>
            <div className="h-px bg-[#E5E5CB] mb-4"></div>
            <p className="text-gray-700 mb-6">
              "Empower institutions to upload and share historical content."
              "Create a community that values and protects Ethiopia's heritage."
              "Provide a space for future generations to learn about and engage with Ethiopian history."
            </p>
          </div>
        </div>
{/* Section 3 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-32 mb-32 mx-4">
          <div className="max-w-xl pr-8 text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-[#3a2f2c] mb-4">
              Why It Matters
            </h3>
            <div className="h-px bg-[#E5E5CB] mb-4"></div>
            <p className="text-gray-700 mb-6">
              Ethiopian history is rich and diverse, but it faces threats from time and neglect. Our platform works to ensure that the stories, cultural practices, and traditions of Ethiopia are preserved for future generations, empowering a global community to engage with Ethiopia's legacy.
            </p>
          </div>
          <div className="relative w-60 h-60 hidden sm:block">
            <Image
              src={p1}
              alt="Developing Confident and Successful Learners"
              className="rounded-lg object-cover w-full h-full"
              layout="fill"
              style={{
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                transform: "rotate(15deg)",
              }}
            />
          </div>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-32 mt-32 mx-4">
          <div className="relative w-60 h-60 hidden sm:block">
            <Image
              src={p2}
              alt="Enjoy Learning with a Unique Classroom Experience"
              className="rounded-lg object-cover w-full h-full"
              layout="fill"
              style={{
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                transform: "rotate(-18deg)",
              }}
            />
          </div>
          <div className="max-w-xl pl-8 mt-6 text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-[#3a2f2c] mb-4">
              Contents from different institutions
            </h3>
            <div className="h-px bg-[#E5E5CB] mb-4"></div>
            <p className="text-gray-700 mb-6">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}