// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { useRouter } from "next/navigation";
// // import Layout from "./../layout";
// // import ContentCard from "../../../../components/ContentCard";
// // import ContentNavBar from "../../../../components/ContentNavBar";
// // import axios from "axios";

// // const ContentPage = () => {
// //   const [contentData, setContentData] = useState<any[]>([]);
// //   const [filteredContent, setFilteredContent] = useState<any[]>([]);
// //   const [category, setCategory] = useState<string>("all");
// //   const [searchTerm, setSearchTerm] = useState<string>("");
// //   const [userPreferences, setUserPreferences] = useState<string[]>([]);
// //   const [isLoading, setIsLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const historyMenuRef = useRef<HTMLDivElement | null>(null);
// //   const accountMenuRef = useRef<HTMLDivElement | null>(null);

// //   // Fetch content data
// //   useEffect(() => {
// //     const fetchAllContent = async () => {
// //       setIsLoading(true);
// //       try {
// //         const response = await axios.get("/api/content/all");
// //         setContentData(response.data);
// //         setFilteredContent(response.data);
// //       } catch (error) {
// //         console.error("Error fetching content:", error);
// //         setError("Failed to fetch content.");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchAllContent();
// //   }, []);

// //   // Fetch user preferences
// //   useEffect(() => {
// //     const fetchUserPreferences = async () => {
// //       if (typeof window !== "undefined") {
// //         // Ensure this runs only in the browser
// //         try {
// //           const userId = localStorage.getItem("userId");
// //           if (userId) {
// //             const response = await axios.get(`/api/users/${userId}/preferences`);
// //             setUserPreferences(response.data.preferences || []);
// //           }
// //         } catch (error) {
// //           console.error("Error fetching user preferences:", error);
// //         }
// //       }
// //     };

// //     fetchUserPreferences();
// //   }, []);

// //   // Filter content based on category, search term, and preferences
// //   const filterContents = () => {
// //     let newFilteredContent = [...contentData];

// //     if (category !== "all") {
// //       newFilteredContent = newFilteredContent.filter(
// //         (content) =>
// //           content.contentType.toLowerCase() === category.toLowerCase()
// //       );
// //     }

// //     if (searchTerm) {
// //       newFilteredContent = newFilteredContent.filter((content) =>
// //         content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         content.description.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }

// //     if (userPreferences.length > 0) {
// //       newFilteredContent = newFilteredContent.sort((a, b) => {
// //         const aIsPreferred = userPreferences.includes(a.contentType);
// //         const bIsPreferred = userPreferences.includes(b.contentType);
// //         return bIsPreferred ? 1 : aIsPreferred ? -1 : 0;
// //       });
// //     }

// //     setFilteredContent(newFilteredContent);
// //   };

// //   useEffect(() => {
// //     filterContents();
// //   }, [category, searchTerm, contentData, userPreferences]);

// //   // Handle filter change
// //   const handleFilterChange = (category: string, searchTerm: string) => {
// //     setCategory(category);
// //     setSearchTerm(searchTerm);
// //   };

// //   // Handle click outside to close menus
// //   const handleClickOutside = (event: MouseEvent) => {
// //     if (historyMenuRef.current && !historyMenuRef.current.contains(event.target as Node)) {
// //       // Close history menu
// //     }
// //     if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
// //       // Close account menu
// //     }
// //   };

// //   useEffect(() => {
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <Layout>
// //       <div className="mt-6">
// //         <ContentNavBar onFilterChange={handleFilterChange} />
// //         <div className="container mx-auto px-4 md:px-8 mt-2">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-24">
// //             {isLoading ? (
// //               <div className="col-span-full text-center">Loading...</div>
// //             ) : error ? (
// //               <div className="col-span-full text-center text-red-500">{error}</div>
// //             ) : (
// //               filteredContent.map((content) => (
// //                 <div key={content.id}>
// //                   <ContentCard
// //                     title={content.title}
// //                     description={content.description}
// //                     imageSrc={content.coverImage || "/images/p1.jpg"}
// //                     tag={content.accessLevel.toLowerCase()}
// //                     status={content.accessLevel.toLowerCase()}
// //                     contentId={content.id}
// //                   />
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default ContentPage;

// // "use client";

// // import React, { useState, useEffect } from "react";
// // import Layout from "../layout";
// // import ContentCard from "../../../../components/ContentCard";
// // import ContentNavBar from "../../../../components/ContentNavBar";

// // const ContentPage: React.FC = () => {
// //   const [contentData, setContentData] = useState<any[]>([]); // Store filtered content
// //   const [category, setCategory] = useState<string>("all"); // Default category
// //   const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
// //   const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
// //   const [error, setError] = useState<string | null>(null); // Error state

// //   useEffect(() => {
// //     fetchContent(category, searchTerm); // Fetch content whenever category or search term changes
// //   }, [category, searchTerm]);

// //   const fetchContent = async (category: string, searchTerm: string) => {
// //     setIsLoading(true);
// //     setError(null);

// //     try {
// //       const response = await fetch(`/api/getContent?category=${category}&searchTerm=${searchTerm}`);
      
// //       if (!response.ok) {
// //         throw new Error("Failed to load content");
// //       }

// //       const data = await response.json();
// //       setContentData(data); // Update state with fetched content
// //     } catch (error) {
// //       setError("Failed to load content.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleFilterChange = (newCategory: string, newSearchTerm: string) => {
// //     setCategory(newCategory); // Update category
// //     setSearchTerm(newSearchTerm); // Update search term
// //   };

// //   return (
// //     <Layout>
// //       <div className="mt-6">
// //         {/* Navigation bar with search and category filter */}
// //         <ContentNavBar onFilterChange={handleFilterChange} />
// //         <div className="container mx-auto px-4 md:px-8 mt-4">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {isLoading ? (
// //               <div className="col-span-full text-center">Loading...</div>
// //             ) : error ? (
// //               <div className="col-span-full text-center text-red-500">{error}</div>
// //             ) : contentData.length === 0 ? (
// //               <div className="col-span-full text-center">No content found.</div>
// //             ) : (
// //               contentData.map((content) => (
// //                 <div key={content.id} className="flex justify-center">
// //                   <ContentCard
// //                     title={content.title}
// //                     secondaryInfo={content.uploader?.name || "Unknown"}
// //                     imageSrc={content.coverImage || "/images/default.jpg"}
// //                     tag={
// //                       content.isFree
// //                         ? "Free"
// //                         : content.isActive
// //                         ? "Premium"
// //                         : "Researcher"
// //                     }
// //                     eventType={content.eventType || "Unknown"}
// //                     category={content.bookDetails ? "book" :
// //                               content.articleDetails ? "article" :
// //                               content.musicDetails ? "music" :
// //                               content.videoDetails ? "video" : "photo"}
// //                   />
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default ContentPage;

// "use client";

// import React, { useState, useEffect } from "react";
// import Layout from "../layout";
// import ContentCard from "../../../../components/ContentCard";
// import ContentNavBar from "../../../../components/ContentNavBar";
// import Footer from "../../../../components/Footer";

// const ContentPage: React.FC = () => {
//   const [contentData, setContentData] = useState<any[]>([]); // Store filtered content
//   const [category, setCategory] = useState<string>("all"); // Default category
//   const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
//   const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state

//   useEffect(() => {
//     fetchContent(category, searchTerm); // Fetch content whenever category or search term changes
//   }, [category, searchTerm]);

//   const fetchContent = async (category: string, searchTerm: string) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`/api/content/getContent?category=${category}&searchTerm=${searchTerm}`);
      
//       if (!response.ok) {
//         throw new Error("Failed to load content");
//       }

//       const data = await response.json();
//       setContentData(data); // Update state with fetched content
//     } catch (error) {
//       setError("Failed to load content.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFilterChange = (newCategory: string, newSearchTerm: string) => {
//     setCategory(newCategory); // Update category
//     setSearchTerm(newSearchTerm); // Update search term
//   };

//   return (
//     <Layout>
//       <div className="mt-6">
//         {/* Navigation bar with search and category filter */}
//         <ContentNavBar onFilterChange={handleFilterChange} />
//         <div className="container mx-auto px-4 md:px-8 mt-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {isLoading ? (
//               <div className="col-span-full text-center">Loading...</div>
//             ) : error ? (
//               <div className="col-span-full text-center text-red-500">{error}</div>
//             ) : contentData.length === 0 ? (
//               <div className="col-span-full text-center">No content found.</div>
//             ) : (
//               contentData.map((content) => (
//                 <div key={content.id} className="flex justify-center">
//                   <ContentCard
//                     id={content.id} // Pass the id here
//                     title={content.title}
//                     secondaryInfo={content.uploader?.name || "Unknown"}
//                     imageSrc={content.coverImage || "/images/default.jpg"}
//                     tag={
//                       content.isFree
//                         ? "Free"
//                         : content.isActive
//                         ? "Premium"
//                         : "Researcher"
//                     }
//                     eventType={content.eventType || "Unknown"}
//                     category={content.bookDetails ? "book" :
//                               content.articleDetails ? "article" :
//                               content.musicDetails ? "music" :
//                               content.videoDetails ? "video" : "photo"}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//       <footer  id="feedback" className="mt-12">
//         <Footer />
//       </footer>
//     </Layout>
//   );
// };

// export default ContentPage;


// "use client";

// import React, { useState, useEffect } from "react";
// import Layout from "../layout";
// import ContentCard from "../../../../components/ContentCard";
// import ContentNavBar from "../../../../components/ContentNavBar";
// import Footer from "../../../../components/Footer";

// const ContentPage: React.FC = () => {
//   const [contentData, setContentData] = useState<any[]>([]);
//   const [category, setCategory] = useState<string>("all");
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchContent(category, searchTerm);
//   }, [category, searchTerm]);

//   const fetchContent = async (category: string, searchTerm: string) => {
//     console.log("Fetching with:", { category, searchTerm }); // Debug log
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`/api/content/getContent?category=${category}&searchTerm=${searchTerm}`);
//       if (!response.ok) throw new Error("Failed to load content");

//       const data = await response.json();
//       setContentData(data);
//     } catch (error) {
//       setError("Failed to load content.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFilterChange = (newCategory: string, newSearchTerm: string) => {
//     console.log("Filter updated:", { newCategory, newSearchTerm }); // Debug log
//     setCategory(newCategory);
//     setSearchTerm(newSearchTerm);
//   };

//   return (
//     <Layout>
//       <div className="mt-6">
//         <ContentNavBar onFilterChange={handleFilterChange} />
//         <div className="container mx-auto px-4 md:px-8 mt-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {isLoading ? (
//               <div className="col-span-full text-center">Loading...</div>
//             ) : error ? (
//               <div className="col-span-full text-center text-red-500">{error}</div>
//             ) : contentData.length === 0 ? (
//               <div className="col-span-full text-center">No content found.</div>
//             ) : (
//               contentData.map((content) => (
//                 <div key={content.id} className="flex justify-center">
//                   <ContentCard
//                     id={content.id}
//                     title={content.title}
//                     secondaryInfo={content.uploader?.name || "Unknown"}
//                     imageSrc={content.coverImage || "/images/default.jpg"}
//                     tag={content.isFree ? "Free" : content.isActive ? "Premium" : "Researcher"}
//                     eventType={content.eventType || "Unknown"}
//                     category={
//                       content.bookDetails
//                         ? "book"
//                         : content.articleDetails
//                         ? "article"
//                         : content.musicDetails
//                         ? "music"
//                         : content.videoDetails
//                         ? "video"
//                         : "photo"
//                     }
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//       <footer id="feedback" className="mt-12">
//         <Footer />
//       </footer>
//     </Layout>
//   );
// };

// export default ContentPage;


"use client";

import React, { useState, useEffect } from "react";
import Layout from "../layout";
import ContentCard from "../../../../components/ContentCard";
import ContentNavBar from "../../../../components/ContentNavBar";
import Footer from "../../../../components/Footer";

const ContentPage: React.FC = () => {
  const [contentData, setContentData] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent(category, searchTerm);
  }, [category, searchTerm]);

  const fetchContent = async (category: string, searchTerm: string) => {
    console.log("Fetching with:", { category, searchTerm }); // Debug log
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/content/getContent?category=${category}&searchTerm=${searchTerm}`);
      if (!response.ok) throw new Error("Failed to load content");

      const data = await response.json();
      setContentData(data);
    } catch (error) {
      setError("Failed to load content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newCategory: string, newSearchTerm: string) => {
    console.log("Filter updated:", { newCategory, newSearchTerm }); // Debug log
    setCategory(newCategory);
    setSearchTerm(newSearchTerm);
  };

  return (
    <Layout>
      <div className="mt-6">
        <ContentNavBar onFilterChange={handleFilterChange} />
        <div className="container mx-auto px-4 md:px-8 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center">Loading...</div>
            ) : error ? (
              <div className="col-span-full text-center text-red-500">{error}</div>
            ) : contentData.length === 0 ? (
              <div className="col-span-full text-center">No content found.</div>
            ) : (
              contentData.map((content) => (
                <div key={content.id} className="flex justify-center">
                  <ContentCard
                    id={content.id}
                    title={content.title}
                    secondaryInfo={
                      content.musicDetails?.singer ||
                      content.bookDetails?.author ||
                      content.articleDetails?.author ||
                      content.videoDetails?.director ||
                      content.artifactDetails?.photographer ||
                      "Unknown"
                    }
                    imageSrc={content.coverImage || "/images/default.jpg"}
                    tag={content.isFree ? "Free" : content.isActive ? "Premium" : "Researcher"}
                    eventType={content.eventType || "Unknown"}
                    category={
                      content.bookDetails
                        ? "book"
                        : content.articleDetails
                        ? "article"
                        : content.musicDetails
                        ? "music"
                        : content.videoDetails
                        ? "video"
                        : "photo"
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <footer id="feedback" className="mt-12">
        <Footer />
      </footer>
    </Layout>
  );
};

export default ContentPage;
