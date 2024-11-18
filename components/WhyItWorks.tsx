import React from "react";

export default function WhyItWorks() {
  return (
    <div className="bg-[#E5E5CB] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-[#D5CEA3] bg-opacity-20 rounded-lg p-8 shadow-lg"> 
        {/* Section Title */}
        <h2 className="text-center text-3xl font-bold text-[#3C2A21] mb-4">
          Why it works
        </h2>
        <div className="flex justify-center mb-8">
          <div
            className="w-40 h-2 relative"
            style={{
              backgroundColor: "transparent",
              margin: "0 auto",
            }}
          >
            {/* Zigzag line with slight shadow */}
            <div
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#3C2A21",
                transform: "rotate(-5deg)",
                position: "absolute",
                top: "0",
                left: "0",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", 
              }}
            ></div>
            <div
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#3C2A21",
                transform: "rotate(5deg)",
                position: "absolute",
                top: "4px",
                left: "0",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", 
              }}
            ></div>
            <div
              style={{
                width: "70%",
                height: "2px",
                backgroundColor: "#3C2A21",
                position: "absolute",
                top: "8px",
                left: "15%",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", 
              }}
            ></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Personalized learning */}
          <div className="flex-1 shadow-md p-4 rounded-md"> 
            <h3 className="text-xl font-semibold text-[#3C2A21] mb-2">
              Personalized learning
            </h3>
            <p className="text-gray-700">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis tempora laboriosam mollitia.
            </p>
          </div>

          {/* Trusted content */}
          <div className="flex-1 shadow-md p-4 rounded-md"> 
            <h3 className="text-xl font-semibold text-[#3C2A21] mb-2">
              Trusted content
            </h3>
            <p className="text-gray-700">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis tempora laboriosam mollitia.
            </p>
          </div>

          {/* Tools to empower  */}
          <div className="flex-1 shadow-md p-4 rounded-md"> 
            <h3 className="text-xl font-semibold text-[#3C2A21] mb-2">
              Tools to empower 
            </h3>
            <p className="text-gray-700">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis tempora laboriosam mollitia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}