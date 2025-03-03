"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "../../../../../components/Table";
import Pagination from "../../../../../components/PaginationButton";
import SearchBar from "../../../../../components/SearchBar";
import { HistoricalMusic } from "../../../type/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faUserCheck, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../components/Button";
import ContentView from "../../../../../components/ContentView";

const MusicListPage: React.FC = () => {
  const [data, setData] = useState<HistoricalMusic[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [musicPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMusic, setSelectedMusic] = useState<HistoricalMusic | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const headers = [
    "ID",
    "Title",
    "Publisher",
    "Language",
    "Publication Date",
    "Duration",
    "Actions",
  ];

  
  useEffect(() => {
    const fetchMusicData = async () => {
      const institutionId = sessionStorage.getItem("institutionId"); // Retrieve the uploader ID
      if (!institutionId) {
        setError("Institution ID is missing.");
        setLoading(false);  // Stop loading in case of error
        return;
      }
  
      try {
        const response = await fetch(`/api/reviewer/content/music?institutionId=${institutionId}`); // Pass institutionId as query parameter
        if (!response.ok) {
          throw new Error("Failed to fetch music");
        }
        const data = await response.json();
        setData(data.musics);
        setLoading(false);  // Stop loading when data is fetched
      } catch (error) {
        setError("Failed to load music");
        console.error(error);
        setLoading(false);  // Stop loading in case of error
      }
    };
  
    fetchMusicData();
  }, []);
  
  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter);
  };

  const filteredData = data.filter((music) => {
    const matchesSearch =
      (music.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (music.alternativeTitle?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (music.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
     
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && music.isActive) ||
      (selectedFilter === "inactive" && !music.isActive);

    return matchesSearch && matchesFilter;
  });

  const indexOfLastMusic = currentPage * musicPerPage;
  const indexOfFirstMusic = indexOfLastMusic - musicPerPage;
  const currentMusic = filteredData.slice(indexOfFirstMusic, indexOfLastMusic);
  const totalPages = Math.ceil(filteredData.length / musicPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewMusic = (music: HistoricalMusic) => {
    setSelectedMusic(music);
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
    setSelectedMusic(null);
  };

  const handleUploadMusic = () => {
    router.push("/uploader-dashboard/upload-music");
  };

  const handleSaveMusic = (updatedMusic: HistoricalMusic) => {
    setData((prevData) =>
      prevData.map((music) => (music.id === updatedMusic.id ? updatedMusic : music))
    );
    closeModal();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} filters={["all", "active", "inactive"]} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Table
            headers={headers}
            data={currentMusic}
            renderRow={(row) => (
              <>
                <td className="p-2 border border-gray-300">{row.id}</td>
                <td className="p-2 border border-gray-300">{row.title}</td>
                <td className="p-2 border border-gray-300">{row.musicDetails?.singer || "N/A"}</td>
                <td className="p-2 border border-gray-300">{row.musicDetails?.language || "N/A"}</td>
                <td className="p-2 border border-gray-300">{row.musicDetails?.publicationDate || "N/A"}</td>
                <td className="p-2 border border-gray-300">{row.musicDetails?.duration || "N/A"}</td>
                <td className="p-2 border border-gray-300 flex space-x-2 justify-center">
                  <Button
                    onClick={() => handleViewMusic(row)}
                    variant="view"
                    size="sm"
                    className="flex items-center"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                    View
                  </Button>
                  <Button
                onClick={() => handleToggleActive(row.id)}
                variant={row.isActive ? "active" : "inactive"}
                size="sm"
                className="flex items-center"
              >
                <FontAwesomeIcon
                  icon={row.isActive ? faUserCheck : faUserAltSlash}
                  className="mr-1"
                />
                {row.isActive ? "Active" : "Inactive"}
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

          {showModal && selectedMusic && (
            <ContentView
              content={selectedMusic}
              contentType="music"
              onClose={closeModal}
              onSave={handleSaveMusic}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MusicListPage;