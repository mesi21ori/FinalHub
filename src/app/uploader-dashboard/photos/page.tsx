


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "../../../../components/Table";
import Pagination from "../../../../components/PaginationButton";
import SearchBar from "../../../../components/SearchBar";
import { HistoricalPhoto } from "../../type/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faUserCheck, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import ContentDetailModal from "../../../../components/ContentDetailModal";


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
    const fetchBooks = async () => {
      try {
        const userId = sessionStorage.getItem("userId"); // Retrieve the uploader ID
        const response = await fetch(`/api/content/photo?uploadedBy=${userId}`); // Pass it as a query parameter
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setData(data.photos);
      } catch (error) {
        setError("Failed to load books");
        console.error(error);
      }
    };
    fetchBooks();
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

  const handleToggleActive = (id: number) => {
    setData((prevData) =>
      prevData.map((photo) =>
        photo.id === id ? { ...photo, isActive: !photo.isActive } : photo
      )
    );
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
        <Button onClick={handleUploadPhoto} variant="view" className="flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Upload Photo
        </Button>
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
        <ContentDetailModal
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