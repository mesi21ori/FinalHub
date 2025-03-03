"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Pagination from "../../../../../components/PaginationButton";
import SearchBar from "../../../../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlay, faPause, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../components/Button";
import ContentDetailModal from "../../../../../components/ContentDetailModal";
import Table from "../../../../../components/Table";
import ContentView from "../../../../../components/ContentView";

// Define the HistoricalVideo type directly in the file
export interface HistoricalVideo {
    id: number;
    title: string;
    alternativeTitle: string;
    description: string;
    eventType?: string;
    coverImage?: string;
    videoUrl?: string;
    accessLevel: string;
    uploadedBy: string;
    uploadDate: string;
    lastEditBy: string;
    lastEditDate: string;
    isActive: boolean;
    videoDetails?: {
        language: string;
        subtitles?: string[];
        copyrightHolder?: string;
        significance?: string;
        historicalFigures?: string[];
        publisher: string;
        releasedDate?: string;
        director?: string;
        producer?: string;
        cameraman?: string[];
        cinematographer?: string;
        cast?: string[];
        eventDate?: string;
        preservationStatus?: string;
        source?: string;
        ageRating?: string;
        location?: string;
        resolution?: string;
        duration?: string;
        relatedArticles?: string[];
        publicationDate: string;
        numberOfViews: string;
        numberOfLikes: string;
        numberOfComments: string;
        [key: string]: any;
    };
}

// Fetching video data from the API
const fetchVideos = async () => {
    const institutionId = sessionStorage.getItem("institutionId"); 
    try {
        const response = await fetch(`/api/reviewer/content/video?institutionId=${institutionId}`);
        const data = await response.json();
        return data.videos || [];
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};




const VideoListPage: React.FC = () => {
    const [data, setData] = useState<HistoricalVideo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedVideo, setSelectedVideo] = useState<HistoricalVideo | null>(null);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();
    const headers = [
        "ID",
        "Title",
        "Publisher",
        "Language",
        "Event Type",
        "Number of Views",
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

    // Fetch videos when the component mounts
    useEffect(() => {
        const loadVideos = async () => {
            const fetchedVideos = await fetchVideos();
            console.log("Fetched Videos:", fetchedVideos);
            setData(fetchedVideos);
        };
        loadVideos();
    }, []);

    const handleSearch = (searchTerm: string, filter: string) => {
        setSearchQuery(searchTerm);
        setSelectedFilter(filter.toLowerCase());
    };

    const filteredData = data.filter((video) => {
        const matchesSearch =
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.alternativeTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.eventType?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter =
            selectedFilter === "all" ||
            (selectedFilter === "active" && video.isActive) ||
            (selectedFilter === "inactive" && !video.isActive) ||
            video.eventType?.toLowerCase() === selectedFilter;

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

    const handleViewVideo = (video: HistoricalVideo) => {
        setSelectedVideo(video);
        setShowModal(true);
    };

    const handleToggleActive = async (id: number) => {
        // Optimistically update the UI
        setData((prevData) =>
          prevData.map((book) =>
            book.id === id ? { ...book, isActive: !book.isActive } : book
          )
        );
      
        // Retrieve the reviewerId from sessionStorage
        const reviewerId = sessionStorage.getItem("userId"); // Ensure this is set in sessionStorage before
      
        // If reviewerId is not available, show an error and return
        if (!reviewerId) {
          alert("Reviewer ID is missing.");
          return;
        }
      
        // Determine the new active status
        const newIsActiveStatus = !data.find(book => book.id === id)?.isActive;
      
        // Send PATCH request to update the active status and reviewerId in the database
        try {
          const response = await fetch(`/api/reviewer/activate/${id}`, {
            method: 'PATCH',  
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              isActive: newIsActiveStatus, // Pass the new active status
              reviewerId, // Pass the reviewerId to the backend
            }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update content status');
          }
      
          // Optionally handle successful status update here
        } catch (error) {
          console.error('Error during content activation toggle:', error);
          // Optionally revert the optimistic update if an error occurs
          setData((prevData) =>
            prevData.map((book) =>
              book.id === id ? { ...book, isActive: !book.isActive } : book
            )
          );
          alert('Failed to toggle active status. Please try again.');
        }
      };

    const closeModal = () => {
        setShowModal(false);
        setSelectedVideo(null);
    };

    const handleUploadVideo = () => {
        router.push("/uploader-dashboard/upload-video");
    };

    const handleSaveVideo = (updatedVideo: HistoricalVideo) => {
        setData((prevData) =>
            prevData.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
        );
        closeModal();
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <SearchBar onSearch={handleSearch} filters={filters} />
            </div>

            <Table
                headers={headers}
                data={currentVideos}
                renderRow={(row) => {
                    // Default empty object for videoDetails if undefined
                    const videoDetails = row.videoDetails || {
                        publisher: "N/A",
                        language: "N/A",
                        numberOfViews: "0",
                        // Add any other default values here if needed
                    };

                    return (
                        <>
                            <td>{row.id}</td>
                            <td>{row.title}</td>
                            <td>{videoDetails.publisher}</td>  {/* Safe access to publisher */}
                            <td>{videoDetails.language}</td>  {/* Safe access to language */}
                            <td>{row.eventType || "N/A"}</td>
                            <td>{videoDetails.numberOfViews}</td>  {/* Safe access to numberOfViews */}
                            <td className="p-2 flex space-x-2 justify-center">
                                <Button
                                    onClick={() => handleViewVideo(row)}
                                    variant="view"
                                    size="sm"
                                    className="w-32 min-w-[8rem] flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                                    View
                                </Button>
                                <Button
                                    onClick={() => handleToggleActive(row.id)}
                                    variant={row.isActive ? "active" : "inactive"}
                                    size="sm"
                                    className="w-32 min-w-[8rem] flex items-center justify-center"
                                >
                                    <FontAwesomeIcon
                                        icon={row.isActive ? faPlay : faPause}
                                        className="mr-1"
                                    />
                                    {row.isActive ? "Active" : "Inactive"}
                                </Button>
                            </td>
                        </>
                    );
                }}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
            />

            {showModal && selectedVideo && (
                <ContentView
                    content={selectedVideo}
                    contentType="video"
                    onClose={closeModal}
                    onSave={handleSaveVideo}
                />
            )}
        </div>
    );
};

export default VideoListPage;

