
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// //import { HistoricalVideo } from "../../../types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faPlay, faPause, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { HistoricalVideo } from "@/app/type";
// import Button from "../../../../components/Button";
// import ContentDetailModal from "../../../../components/ContentDetailModal";
// import Pagination from "../../../../components/PaginationButton";
// import SearchBar from "../../../../components/SearchBar";
// import CustomTable from "../../../../components/Table";


// // Sample video data
// const sampleData: HistoricalVideo[] = [
//   {
//     id: 1,
//     title: "Understanding the Industrial Revolution",
//     alternativeTitle: "",
//     description: "A documentary exploring the industrial revolution.",
//     language: "English",
//     subtitles: ["english", "ormoigna"],
//     copyrightHolder: "samson",
//     accessLevel:"permium",
//     significance: "Changed the course of history",
//     historicalFigures: ["James Watt", "Richard Arkwright"],
//     publisher: "History Channel",
//     director: "John Doe",
//     producer: "Jane Smith",
//     cameraman: ["Cameraman 1", "Cameraman 2"],
//     cinematographer: "John Cinematic",
//     cast: ["Actor 1", "Actor 2"],
//     eventType: "wars",
//     eventDate: "1760-1840",
//     preservationStatus: "Preserved",
//     source: "primary",
//     ageRating: "PG-13",
//     location: "wollo",
//     coverImage: "https://via.placeholder.com",
//     resolution: "480p",
//     videoUrl: "udp.mp4",
//     duration: "2:34:44",
//     relatedArticles: ["Artifact 1", "Artifact 2"],
//     publicationDate: "2023-10-01",
//     numberOfViews: "1500",
//     numberOfLikes: "100",
//     numberOfComments: "20",
//     uploadedBy: "Admin",
//     uploadDate: "2023-10-01",
//     lastEditBy: "Admin",
//     lastEditDate: "2023-11-01",
//     isActive: false,
//   },
//   {
//     id: 2,
//     title: "Understanding the Industrial Revolution",
//     alternativeTitle: "",
//     description: "A documentary exploring the industrial revolution.",
//     language: "English",
//     subtitles: ["english", "ormoigna"],
//     accessLevel:"public",
//     copyrightHolder: "samson",
//     significance: "Changed the course of history",
//     historicalFigures: ["James Watt", "Richard Arkwright"],
//     publisher: "History Channel",
//     director: "John Doe",
//     producer: "Jane Smith",
//     cameraman: ["Cameraman 1", "Cameraman 2"],
//     cinematographer: "John Cinematic",
//     cast: ["Actor 1", "Actor 2"],
//     eventType: "wars",
//     eventDate: "1760-1840",
//     preservationStatus: "Preserved",
//     source: "primary",
//     ageRating: "PG-13",
//     location: "wollo",
//     coverImage: "https://via.placeholder.com",
//     resolution: "480p",
//     videoUrl: "udp.mp4",
//     duration: "2:34:44",
//     relatedArticles: ["Artifact 1", "Artifact 2"],
//     publicationDate: "2023-10-01",
//     numberOfViews: "1500",
//     numberOfLikes: "100",
//     numberOfComments: "20",
//     uploadedBy: "Admin",
//     uploadDate: "2023-10-01",
//     lastEditBy: "Admin",
//     lastEditDate: "2023-11-01",
//     isActive: true,
//   },

// ];

// const VideoListPage: React.FC = () => {
//   const [data, setData] = useState<HistoricalVideo[]>(sampleData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [videosPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [selectedVideo, setSelectedVideo] = useState<HistoricalVideo | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   const router = useRouter();
//   const headers = [
//     "ID",
//     "Title",
//     "Publisher",
//     "Language",
//     "Event Type",
//     "Number of Views",
//     "Actions",
//   ];
//   const filters = [
//     "all",
//     "active",
//     "inactive",
//     "wars",
//     "politics",
//     "religion",
//     "culture",
//     "famine & crisis",
//     "civil rights",
//     "economy",
//     "diplomacy",
//     "leadership",
//     "ethnic movements",
//   ];

//   const handleSearch = (searchTerm: string, filter: string) => {
//     setSearchQuery(searchTerm);
//     setSelectedFilter(filter.toLowerCase());
//   };

//   const filteredData = data.filter((video) => {
//     const matchesSearch =
//       (video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         video.alternativeTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         video.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         video.eventType?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false;

//     const matchesFilter =
//       selectedFilter === "all" ||
//       (selectedFilter === "active" && video.isActive) ||
//       (selectedFilter === "inactive" && !video.isActive) ||
//       video.eventType?.toLowerCase() === selectedFilter;

//     return matchesSearch && matchesFilter;
//   });


//   const indexOfLastVideo = currentPage * videosPerPage;
//   const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
//   const currentVideos = filteredData.slice(indexOfFirstVideo, indexOfLastVideo);
//   const totalPages = Math.ceil(filteredData.length / videosPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleViewVideo = (video: HistoricalVideo) => {
//     setSelectedVideo(video);
//     setShowModal(true);
//   };

//   const handleToggleActive = (id: number) => {
//     setData((prevData) =>
//       prevData.map((video) =>
//         video.id === id ? { ...video, isActive: !video.isActive } : video
//       )
//     );
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedVideo(null);
//   };

//   const handleUploadVideo = () => {
//     router.push("/uploader-dashboard/upload-video");
//   };

//   const handleSaveVideo = (updatedVideo: HistoricalVideo) => {
//     setData((prevData) =>
//       prevData.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
//     );
//     closeModal();
//   };

//   return (
//     <div className="p-4">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
//         <SearchBar onSearch={handleSearch} filters={filters} />

//         {/* Single Upload Video Button for all screens */}
//         <Button
//           onClick={handleUploadVideo}
//           variant="view"
//           className="flex items-center justify-center p-2 space-x-2 md:px-4"
//         >
//           <FontAwesomeIcon icon={faPlus} />
//           <span>Upload Video</span>
//         </Button>
//       </div>

//       <CustomTable
//         headers={headers}
//         data={currentVideos}
//         renderRow={(row) => (
//           <>
//             <td >{row.id}</td>
//             <td >{row.title}</td>
//             <td >{row.publisher}</td>
//             <td >{row.language}</td>
//             <td >{row.eventType}</td>
//             <td >{row.numberOfViews}</td>
//             <td className="p-2 flex space-x-2 justify-center">
//               <Button
//                 onClick={() => handleViewVideo(row)}
//                 variant="view"
//                 size="sm"
//                 className="w-32  min-w-[8rem] flex items-center justify-center" // Updated fixed width
//               >
//                 <FontAwesomeIcon icon={faEye} className="mr-1" />
//                 View
//               </Button>
//               <Button
//                 onClick={() => handleToggleActive(row.id)}
//                 variant={row.isActive ? "active" : "inactive"}
//                 size="sm"
//                 className="w-32  min-w-[8rem] flex items-center justify-center " // Consistent width
//               >
//                 <FontAwesomeIcon
//                   icon={row.isActive ? faPlay : faPause}
//                   className="mr-1"
//                 />
//                 {row.isActive ? "Active" : "Inactive"}
//               </Button>
//             </td>
//           </>
//         )}
//       />

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         handleNextPage={handleNextPage}
//         handlePreviousPage={handlePreviousPage}
//       />

// {showModal && selectedVideo && (
//         <ContentDetailModal
//           content={selectedVideo}
//           contentType="video"
//           onClose={closeModal}
//           onSave={(updatedContent) => handleSaveVideo(updatedContent as HistoricalVideo)}
//         />
//       )}
//     </div>
//   );
// };

// export default VideoListPage;


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlay, faPause, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Content } from "@/app/type"; // Update to use Content interface
import Button from "../../../../components/Button";
import ContentDetailModal from "../../../../components/ContentDetailModal";
import Pagination from "../../../../components/PaginationButton";
import SearchBar from "../../../../components/SearchBar";
import CustomTable from "../../../../components/Table";

// Sample data was removed, now we will fetch from the API
const VideoListPage: React.FC = () => {
  const [data, setData] = useState<Content[]>([]); // Use Content interface for data
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedContent, setSelectedContent] = useState<Content | null>(null); // Changed to Content
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const router = useRouter();
  const headers = [
    "ID",
    "Title",
    "Publisher", // Now from videoDetails in Content
    "Language", // Now from videoDetails in Content
    "Event Type",
    "Number of Views", // From videoDetails in Content
    "Actions",
  ];
  const filters = [
    "all",
    "active",
    "inactive",
    "wars",
    "politics",
    "religion",
    "culture",
    "famine & crisis",
    "civil rights",
    "economy",
    "diplomacy",
    "leadership",
    "ethnic movements",
  ];

  // Fetch video data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/content/Video/video"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }
        const contentData: Content[] = await response.json(); // Fetch Content data
        setData(contentData);
      } catch (err) {
        setError("Error fetching video data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter.toLowerCase());
  };

  const filteredData = data.filter((content) => {
    const video = content.videoDetails; // Access videoDetails inside Content

    const matchesSearch =
      (content.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.alternativeTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.eventType?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false; // Access eventType from content

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && video.isActive) ||
      (selectedFilter === "inactive" && !video.isActive) ||
      content.eventType?.toLowerCase() === selectedFilter; // Access eventType from content

    return matchesSearch && matchesFilter;
  });


  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredData.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredData.length / videosPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewVideo = (content: Content) => {
    setSelectedContent(content); // Set the whole content object, not just videoDetails
    setShowModal(true);
  };

  // const handleToggleActive = (id: number) => {
  //   setData((prevData) =>
  //     prevData.map((content) =>
  //       content.id === id
  //         ? { ...content, videoDetails: { ...content.videoDetails, isActive: !content.videoDetails.isActive } }
  //         : content
  //     )
  //   );
  // };

  const handleToggleActive = async (id: number) => {
    const updatedContent = data.find((content) => content.id === id);
    if (!updatedContent) return;

    // Toggle the isActive status locally first
    const newIsActive = !updatedContent.videoDetails.isActive;
    setData((prevData) =>
      prevData.map((content) =>
        content.id === id
          ? { ...content, videoDetails: { ...content.videoDetails, isActive: newIsActive } }
          : content
      )
    );

    try {
      // Send the update to the backend
      const response = await fetch(`/api/content/Video/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: newIsActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to update video status');
      }
    } catch (err) {
      console.error('Error updating video status:', err);
      // Optionally revert the change if the request fails
      setData((prevData) =>
        prevData.map((content) =>
          content.id === id
            ? { ...content, videoDetails: { ...content.videoDetails, isActive: !newIsActive } }
            : content
        )
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContent(null);
  };

  const handleUploadVideo = () => {
    router.push("/uploader-dashboard/upload-video");
  };

  const handleSaveVideo = (updatedContent: Content) => {
    setData((prevData) =>
      prevData.map((content) => (content.id === updatedContent.id ? updatedContent : content))
    );
    closeModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <SearchBar onSearch={handleSearch} filters={filters} />

        {/* Single Upload Video Button for all screens */}
        <Button
          onClick={handleUploadVideo}
          variant="view"
          className="flex items-center justify-center p-2 space-x-2 md:px-4"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Upload Video</span>
        </Button>
      </div>

      <CustomTable
        headers={headers}
        data={currentVideos}
        renderRow={(row) => (
          <>
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td>{row.videoDetails?.publisher}</td>
            <td>{row.videoDetails?.language}</td>
            <td>{row.eventType}</td>
            <td>{row.videoDetails?.numberOfViews}</td>
            <td className="p-2 flex space-x-2 justify-center">
              <Button
                onClick={() => handleViewVideo(row)}
                variant="view"
                size="sm"
                className="w-32  min-w-[8rem] flex items-center justify-center" // Updated fixed width
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                View
              </Button>
              <Button
                onClick={() => handleToggleActive(row.id)}
                variant={row.videoDetails.isActive ? "active" : "inactive"}
                size="sm"
                className="w-32  min-w-[8rem] flex items-center justify-center " // Consistent width
              >
                <FontAwesomeIcon
                  icon={row.videoDetails.isActive ? faPlay : faPause}
                  className="mr-1"
                />
                {row.videoDetails.isActive ? "Active" : "Inactive"}
              </Button>
            </td>
          </>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {showModal && selectedContent && (
        <ContentDetailModal
          content={selectedContent} // Pass the entire content (including videoDetails)
          contentType="video"
          onClose={closeModal}
          onSave={(updatedContent) => handleSaveVideo(updatedContent as Content)} // Cast as Content
        />
      )}
    </div>
  );
};

export default VideoListPage;
