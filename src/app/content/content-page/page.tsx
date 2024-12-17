
// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Layout from "./../layout";
// import ContentCard from "../../../../components/ContentCard";
// import ContentNavBar from "../../../../components/ContentNavBar";

// const ContentPage = () => {
//   const [contentData, setContentData] = useState<any[]>([]); // Store all content
//   const [category, setCategory] = useState<string>("all"); // Default to 'all' category
//   const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
//   const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state
//   const router = useRouter();

//   useEffect(() => {
//     fetchContent(category, searchTerm); // Fetch content based on category and search term
//   }, [category, searchTerm]);

//   const fetchContent = async (category: string, searchTerm: string) => {
//     setIsLoading(true); // Start loading
//     setError(null); // Reset error state

//     try {
//       const response = await fetch(`/api/content/all?category=${category}&searchTerm=${searchTerm}`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch content');
//       }

//       const data = await response.json();

//       // Filter content based on category and search term
//       const filteredContent = data.filter(
//         (item: any) =>
//           (category === "all" || item.category === category) &&
//           (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Fixed the logic here for searchTerm filtering
//             item.description.toLowerCase().includes(searchTerm.toLowerCase()))
//       );

//       setContentData(filteredContent); // Set all filtered content
//     } catch (error) {
//       setError("Failed to load content.");
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

// const handleFilterChange = (category: string, searchTerm: string) => {
//   setCategory(category);
//   setSearchTerm(searchTerm); // Update both category and search term
// };

//   return (
//     <Layout>
//       <div className="mt-6">
//         {/* Pass handleFilterChange to Navbar component */}
//         <ContentNavBar onFilterChange={handleFilterChange} />

//         {/* Use container and mx-auto for equal left/right spacing */}
//         <div className="container mx-auto px-4 md:px-8 mt-2">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-24">
//             {isLoading ? (
//               <div className="col-span-full text-center">Loading...</div>
//             ) : error ? (
//               <div className="col-span-full text-center text-red-500">{error}</div>
//             ) : (
//               contentData.map((content) => (
//                 <div key={content.id}>
//                   <ContentCard
//                     title={content.title}
//                     description={content.description}
//                     imageSrc={content.imageSrc}
//                     tag={
//                       content.category === "music"
//                         ? "Free"
//                         : content.category === "book"
//                         ? "Premium"
//                         : "Researcher"
//                     }
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };
// export default ContentPage;



// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Layout from "./../layout";
// import ContentCard from "../../../../components/ContentCard";
// import ContentNavBar from "../../../../components/ContentNavBar";
// import axios from "axios";

// const ContentPage = () => {
//   const [contentData, setContentData] = useState<any[]>([]); // Store all content
//   const [filteredContent, setFilteredContent] = useState<any[]>([]); // Store filtered content
//   const [category, setCategory] = useState<string>("all"); // Default to 'all' category
//   const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
//   const [userPreferences, setUserPreferences] = useState<string[]>([]); // User preferences
//   const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state
//   const historyMenuRef = useRef<HTMLDivElement | null>(null); // Ref for menu handling
//   const accountMenuRef = useRef<HTMLDivElement | null>(null); // Ref for account menu handling

//   // Fetch content data and user preferences
//   useEffect(() => {
//     const fetchAllContent = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('/api/content/all');
//         setContentData(response.data);
//         setFilteredContent(response.data); // Initially show all content
//       } catch (error) {
//         console.error("Error fetching content:", error);
//         setError("Failed to fetch content.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchUserPreferences = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (userId) {
//           const response = await axios.get(`/api/users/${userId}/preferences`);
//           setUserPreferences(response.data.preferences || []);
//         }
//       } catch (error) {
//         console.error("Error fetching user preferences:", error);
//       }
//     };

//     fetchAllContent();
//     fetchUserPreferences();
//   }, []);

//   // Filter content based on selected category, search term, and preferences
//   const filterContents = () => {
//     let newFilteredContent = [...contentData]; // Create a copy of contentData

//     // Filter by selected category
//     if (category !== 'all') {
//       newFilteredContent = newFilteredContent.filter(
//         (content) => content.contentType.toLowerCase() === category.toLowerCase()
//       );
//     }

//     // Filter by search term (case-insensitive search)
//     if (searchTerm) {
//       newFilteredContent = newFilteredContent.filter((content) =>
//         content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         content.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Prioritize content based on user preferences
//     if (userPreferences.length > 0) {
//       newFilteredContent = newFilteredContent.sort((a, b) => {
//         const aIsPreferred = userPreferences.includes(a.contentType);
//         const bIsPreferred = userPreferences.includes(b.contentType);
//         return bIsPreferred ? 1 : aIsPreferred ? -1 : 0;
//       });
//     }

//     setFilteredContent(newFilteredContent);
//   };

//   // Re-run filter whenever category, search term, or user preferences change
//   useEffect(() => {
//     filterContents();
//   }, [category, searchTerm, contentData, userPreferences]);

//   // Handle filter change from ContentNavBar
//   const handleFilterChange = (category: string, searchTerm: string) => {
//     setCategory(category);
//     setSearchTerm(searchTerm); // Update both category and search term
//   };

//   // Handle click outside event for closing menus
//   const handleClickOutside = (event: MouseEvent) => {
//     if (historyMenuRef.current && !historyMenuRef.current.contains(event.target as Node)) {
//       // Close history menu if clicked outside
//     }
//     if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
//       // Close account menu if clicked outside
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <Layout>
//       <div className="mt-6">
//         {/* Pass handleFilterChange to Navbar component */}
//         <ContentNavBar onFilterChange={handleFilterChange} />

//         {/* Use container and mx-auto for equal left/right spacing */}
//         <div className="container mx-auto px-4 md:px-8 mt-2">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-24">
//             {isLoading ? (
//               <div className="col-span-full text-center">Loading...</div>
//             ) : error ? (
//               <div className="col-span-full text-center text-red-500">{error}</div>
//             ) : (
//               filteredContent.map((content) => (
//                 <div key={content.id}>
//                   <ContentCard
//                     title={content.title}
//                     description={content.description}
//                     imageSrc={content.coverImage}
//                     tag={
//                       content.contentType === "MUSIC"
//                         ? "Free"
//                         : content.contentType === "BOOK"
//                         ? "Premium"
//                         : "Researcher"
//                     }
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ContentPage;





"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Layout from "./../layout";
import ContentCard from "../../../../components/ContentCard";
import ContentNavBar from "../../../../components/ContentNavBar";
import axios from "axios";

const ContentPage = () => {
  const [contentData, setContentData] = useState<any[]>([]); // Store all content
  const [filteredContent, setFilteredContent] = useState<any[]>([]); // Store filtered content
  const [category, setCategory] = useState<string>("all"); // Default to 'all' category
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const [userPreferences, setUserPreferences] = useState<string[]>([]); // User preferences
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const historyMenuRef = useRef<HTMLDivElement | null>(null); // Ref for menu handling
  const accountMenuRef = useRef<HTMLDivElement | null>(null); // Ref for account menu handling

  // Fetch content data and user preferences
  useEffect(() => {
    const fetchAllContent = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/content/all');
        setContentData(response.data);
        setFilteredContent(response.data); // Initially show all content
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("Failed to fetch content.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserPreferences = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`/api/users/${userId}/preferences`);
          setUserPreferences(response.data.preferences || []);
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };

    fetchAllContent();
    fetchUserPreferences();
  }, []);

  // Filter content based on selected category, search term, and preferences
  const filterContents = () => {
    let newFilteredContent = [...contentData]; // Create a copy of contentData

    // Filter by selected category
    if (category !== 'all') {
      newFilteredContent = newFilteredContent.filter(
        (content) => content.contentType.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term (case-insensitive search)
    if (searchTerm) {
      newFilteredContent = newFilteredContent.filter((content) =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Prioritize content based on user preferences
    if (userPreferences.length > 0) {
      newFilteredContent = newFilteredContent.sort((a, b) => {
        const aIsPreferred = userPreferences.includes(a.contentType);
        const bIsPreferred = userPreferences.includes(b.contentType);
        return bIsPreferred ? 1 : aIsPreferred ? -1 : 0;
      });
    }

    setFilteredContent(newFilteredContent);
  };

  // Re-run filter whenever category, search term, or user preferences change
  useEffect(() => {
    filterContents();
  }, [category, searchTerm, contentData, userPreferences]);

  // Handle filter change from ContentNavBar
  const handleFilterChange = (category: string, searchTerm: string) => {
    setCategory(category);
    setSearchTerm(searchTerm); // Update both category and search term
  };

  // Handle click outside event for closing menus
  const handleClickOutside = (event: MouseEvent) => {
    if (historyMenuRef.current && !historyMenuRef.current.contains(event.target as Node)) {
      // Close history menu if clicked outside
    }
    if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
      // Close account menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Layout>
      <div className="mt-6">
        {/* Pass handleFilterChange to Navbar component */}
        <ContentNavBar onFilterChange={handleFilterChange} />

        {/* Use container and mx-auto for equal left/right spacing */}
        <div className="container mx-auto px-4 md:px-8 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-24">
            {isLoading ? (
              <div className="col-span-full text-center">Loading...</div>
            ) : error ? (
              <div className="col-span-full text-center text-red-500">{error}</div>
            ) : (
              filteredContent.map((content) => (
                <div key={content.id}>
                  <ContentCard
                    title={content.title}
                    description={content.description}
                    imageSrc={content.coverImage || '/images/p1.jpg'} // Fallback to default image
                    tag={content.accessLevel.toLowerCase()}
                    status={content.accessLevel.toLowerCase()} // Assuming `status` is a field in the `content` object that holds "public", "private", or "restricted"
                //    userId={userId} // Pass the userId here (ensure userId is available in this context)
                    contentId={content.id} // Pass the contentId here (ensure content.id is available)
                  />


                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContentPage;
