"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tableHeadersConfig } from "../../../../config/tableConfig"; // Importing the table config

import { PageType } from "../../../type/index";
import CustomTable from "../../../../../components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../../../components/SearchBar";
import Button from "../../../../../components/Button";
import Pagination from "../../../../../components/PaginationButton";
import UserDetailModal from "../../../../../components/UserDetailModal";

interface Reviewer {
  id: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  resumesReviewed: number;
  institution: { name: string } | null;// Changed this to ensure that institution is an object with name field
  type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer";
  isActive: boolean;
}

const ReviewerPage: React.FC = () => {
  const [data, setData] = useState<Reviewer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [showModal, setShowModal] = useState<boolean>(false); // State to manage modal visibility
  const [selectedReviewer, setSelectedReviewer] = useState<Reviewer | null>(null); // State to store selected reviewer
  const router = useRouter();
  const pageType: PageType = "reviewerPage";
  const headers = tableHeadersConfig[pageType];
  const filters = ["All", "Active", "Inactive"];

  useEffect(() => {
    // Fetch the reviewer data from API on component mount
    const fetchUploaderData = async () => {
      try {
        const response = await fetch(`/api/platfromadmin/userlist/reviwer?role=REVIEWER`);
        const usersData = await response.json();
        setData(usersData); // Set the fetched data into the state
      } catch (error) {
        console.error("Error fetching reviewer data:", error);
      }
    };

    fetchUploaderData(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  // Handle search and filter
  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter);
  };

  // Filter data
  const filteredData = data.filter((reviewer) => {
    const matchesSearch =
      reviewer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reviewer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reviewer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reviewer.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesActiveFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Active" && reviewer.isActive) ||
      (selectedFilter === "Inactive" && !reviewer.isActive);

    return matchesSearch && matchesActiveFilter;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Toggle active status
  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      // Send PUT request to the API to update the user's active status
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !currentStatus, // Toggle the status
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json(); // Get updated user data from the response

      // Update the local state with the updated user data
      setData((prevData) =>
        prevData.map((user) =>
          user.id === id ? { ...user, isActive: updatedUser.isActive } : user
        )
      );
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  // Show modal with detailed information
  const handleShowModal = (reviewer: Reviewer) => {
    setSelectedReviewer(reviewer);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReviewer(null);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Reviewer List</h1>
        <SearchBar onSearch={handleSearch} filters={filters} />
      </div>
      <CustomTable
        headers={headers}
        data={currentUsers}
        renderRow={(row) => (
          <>
            <td className="p-2 border border-gray-300">{row.id}</td>
            <td className="p-2 border border-gray-300">{row.username}</td>
            <td className="p-2 border border-gray-300">{row.email}</td>
            <td className="p-2 border border-gray-300">{row.createdAt}</td>
            <td className="p-2 border border-gray-300 break-words">
              {row.institution ? row.institution.name : "No Institution"}
            </td>
            <td className="p-2 border border-gray-300">
              <Button
                onClick={() => handleToggleActive(row.id, row.isActive)}
                variant={row.isActive ? "active" : "inactive"}
                size="sm"
                className="w-32 min-w-[8rem] flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={row.isActive ? faUserCheck : faUserAltSlash}
                  className="mr-1"
                />
                {row.isActive ? "Active" : "Inactive"}
              </Button>
            </td>
            <td className="p-2 border border-gray-300">
              <Button
                onClick={() => handleShowModal(row)} // View user details when clicked
                variant="view"
                size="sm"
                className="w-32  min-w-[8rem] flex items-center justify-center "
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
      {/* Modal to view user details */}
      {showModal && selectedReviewer && (
        <UserDetailModal 
        user={{
          ...selectedReviewer,
          institution: selectedReviewer.institution ? selectedReviewer.institution.name : 'No Institution', // Only include institution name
          reviewedContent: undefined
        }
        } 

        onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ReviewerPage;
