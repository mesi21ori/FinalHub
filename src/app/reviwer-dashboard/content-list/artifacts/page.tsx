"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "../../../../../components/Table";
import Pagination from "../../../../../components/PaginationButton";
import SearchBar from "../../../../../components/SearchBar";
import { HistoricalPhoto } from "../../../type/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faUserCheck, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../components/Button";
import ContentView from "../../../../../components/ContentView";

const HistoricalPhotoListPage: React.FC = () => {
  const [data, setData] = useState<HistoricalPhoto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<HistoricalPhoto | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const headers = [
    "ID",
    "Title",
    "Photographer",
    "Captured Date",
    "Location",
    "Actions",
  ];

  useEffect(() => {
    const fetchPhotos = async () => {
      const institutionId = sessionStorage.getItem("institutionId"); // Retrieve the uploader ID
      if (!institutionId) {
        setError("Institution ID is missing.");
        return;
      }

      try {
        const response = await fetch(`/api/reviewer/content/photo?institutionId=${institutionId}`); // Pass institutionId as query parameter
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setData(data.photos);
      } catch (error) {
        setError("Failed to load photos");
        console.error(error);
      }
    };
    
    fetchPhotos();
  }, []);

  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter);
  };

  const filteredData = data.filter((photo) => {
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.artifactDetails?.photographer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && photo.isActive) ||
      (selectedFilter === "inactive" && !photo.isActive);

    return matchesSearch && matchesFilter;
  });

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredData.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(filteredData.length / photosPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewPhoto = (photo: HistoricalPhoto) => {
    setSelectedPhoto(photo);
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
    setSelectedPhoto(null);
  };

  const handleUploadPhoto = () => {
    router.push("/uploader-dashboard/upload-photo"); // Change to correct route
  };

  const handleSavePhoto = (updatedPhoto: HistoricalPhoto) => {
    setData((prevData) =>
      prevData.map((photo) => (photo.id === updatedPhoto.id ? updatedPhoto : photo))
    );
    closeModal();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} filters={["all", "active", "inactive"]} />
      </div>

      <Table
        headers={headers}
        data={currentPhotos}
        renderRow={(row) => (
          <>
            <td className="p-2 border border-gray-300">{row.id}</td>
            <td className="p-2 border border-gray-300">{row.title}</td>
            <td className="p-2 border border-gray-300">{row.artifactDetails?.photographer}</td>
            <td className="p-2 border border-gray-300">{row.artifactDetails?.capturedDate}</td>
            <td className="p-2 border border-gray-300">{row.artifactDetails?.photoLocation}</td>
            <td className="p-2 border border-gray-300 flex space-x-2 justify-center">
              <Button
                onClick={() => handleViewPhoto(row)}
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

      {showModal && selectedPhoto && (
        <ContentView
          content={selectedPhoto}
          contentType="photo"
          onClose={closeModal}
          onSave={handleSavePhoto}
        />
      )}
    </div>
  );
};

export default HistoricalPhotoListPage;
