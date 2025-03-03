"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "../../../../components/Table";
import Pagination from "../../../../components/PaginationButton";
import SearchBar from "../../../../components/SearchBar";
import { HistoricalMusic } from "../../type/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faUserCheck, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import ContentDetailModal from "../../../../components/ContentDetailModal";

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
      try {
        const userId = sessionStorage.getItem("userId");
        console.log('User ID:', userId); // Log the user ID
        if (!userId) {
          setError("Uploader ID is not found.");
          setLoading(false); // Ensure loading is set to false in case of failure
          return;
        }
  
        const response = await fetch(`/api/content/music?uploadedBy=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch music");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setData(data.musics);  // Ensure the correct data is passed here
      } catch (error) {
        setError("Failed to load music");
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false here to stop the loading state
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

  const handleToggleActive = (id: number) => {
    setData((prevData) =>
      prevData.map((music) =>
        music.id === id ? { ...music, isActive: !music.isActive } : music
      )
    );
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
        <Button onClick={handleUploadMusic} variant="view" className="flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Upload Music
        </Button>
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
            <ContentDetailModal
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
