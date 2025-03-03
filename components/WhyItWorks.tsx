import React from "react";

export default function WhyItWorks() {
  return (
    <div className="bg-[#f7f4f0] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-[#E5E5CB] bg-opacity-20 rounded-lg p-8 shadow-lg"> 
        
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

        <div className="flex flex-col md:flex-row justify-between gap-8">
       
          <div className="flex-1 shadow-md p-4 rounded-md"> 
            <h3 className="text-xl font-semibold text-[#3C2A21] mb-2">
            Preserving Historys
            </h3>
            <p className="text-gray-700 test-md">
            Our platform is dedicated to preserving Ethiopia’s rich and diverse history, ensuring that its culture and stories are safeguarded for future generations.
            </p>
          </div>

          <div className="flex-1 shadow-md p-4 rounded-md"> 
            <h3 className="text-xl font-semibold text-[#3C2A21] mb-2">
            Easy Content Sharing
            </h3>
            <p className="text-gray-700 text-md">
            Institutions can effortlessly upload and share historical documents, photos, and videos, contributing to a global archive of Ethiopian heritage.
            </p>
          </div>

         
          <div className="flex-1 shadow-md p-4 rounded-md"> 
            <h3 className="text-xl font-semibold text-[#3C2A21] mb-2">
            Global Access
            </h3>
            <p className="text-gray-700 test-md">
            Accessible to users worldwide, our platform allows anyone to explore, learn, and engage with Ethiopia’s history, fostering a community that celebrates its legacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}