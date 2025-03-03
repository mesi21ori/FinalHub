// "use client";

// import React, { useEffect, useState } from "react";

// // Define a structure for your content data
// interface ContentItem {
//   title: string;
//   institution: string;
// }

// const AnalyticsPage: React.FC = () => {
//   const [contentData, setContentData] = useState<ContentItem[]>([]);

//   useEffect(() => {
//     // Simulating an API call to fetch the researcher's content access data
//     const fetchedData: ContentItem[] = [
//       { title: "History of Ethiopia", institution: "NALa" },
//       { title: "Quantum Computing Advances", institution: "Global Research Center" },
//       { title: "AI and Machine Learning", institution: "Tech Institute" },
//       // Add more content as per your data
//     ];

//     setContentData(fetchedData); // Set the content data (this should be fetched from your API)
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto">
//     {/* Heading for the Subscription Page */}
//     <h1 className="text-2xl font-bold text-[#3C2A21] mb-4">
//     Researcher Analytics
//     </h1>
//     <div className="bg-[#f7f4f0] shadow-lg rounded-lg p-6 mt-6 glow-effect">
   

//       {/* Total Content Accessed */}
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-[#3C2A21]">Total Content Accessed</h2>
//         <p>{contentData.length} items</p>
//       </div>

//       {/* Accessed Content Titles and Institutions */}
//       <div>
//         <h2 className="text-xl font-semibold text-[#3C2A21] mb-2">Accessed Content</h2>
//         <ul>
//           {contentData.map((content, index) => (
//             <li key={index} className="mb-2">
//               <span className="font-medium">{content.title}</span> <span className="text-gray-600">by</span> <span className="font-semibold text-[#996515]">{content.institution}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default AnalyticsPage;


"use client";

import React, { useEffect, useState } from "react";

// Define a structure for the content data
interface ContentItem {
  title: string;
  institution: string;
}

const AnalyticsPage: React.FC = () => {
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchContentAccessData = async () => {
      const userId = sessionStorage.getItem("userId"); // Retrieve the userId from sessionStorage
      if (!userId) {
        setError("User ID not found in session storage.");
        setLoading(false);
        return;
      }

      try {
       
        const response = await fetch(`/api/users/acessrequest/content-access?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch content access data.");
        }
        const data = await response.json();
        setContentData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContentAccessData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading content access data...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f4f0] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-[#3C2A21] mb-4 text-center md:text-left">
          Researcher Analytics
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 glow-effect">
          {/* Total Content Accessed */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-[#3C2A21]">Total Content Accessed</h2>
            <p>{contentData.length} items</p>
          </div>

          {/* List of Accessed Content */}
          <div>
            <h2 className="text-xl font-semibold text-[#3C2A21] mb-2">Accessed Content</h2>
            {contentData.length > 0 ? (
              <ul>
                {contentData.map((content, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-medium">{content.title}</span>{" "}
                    <span className="text-gray-600">by</span>{" "}
                    <span className="font-semibold text-[#996515]">{content.institution}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No content accessed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
