"use client";

import React, { useState, useEffect } from "react";
import { tableHeadersConfig } from "../../../../config/tableConfig";
import Table from "../../../../../components/Table";
import Button from "../../../../../components/Button";
import Pagination from "../../../../../components/PaginationButton";
import SearchBar from "../../../../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import UserDetailModal from "../../../../../components/UserDetailModal";

interface Researcher {
  id: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  enteringDate: string;
  positionTitle?: string;
  proofAffilation?: string;
  roleExplanation?: string;
  proofOfIdentity?: string;
  researchTopic?: string;
  purposeOfResearch?: string;
  historicalContentRequested?: string[];
  intendedUse?: string;
  supportingDocuments?: string;
  academicLevel?: string;
  type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer";
  isActive: boolean;
}

const filters = ["All", "Professor", "Lecturer", "Ph.D", "Active", "Inactive"];

const ResearcherPage: React.FC = () => {
  const [data, setData] = useState<Researcher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Researcher | null>(null);

  const headers = tableHeadersConfig.researcherPage;

  useEffect(() => {
    const fetchResearcherUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/platfromadmin/userlist/resercher?role=RESEARCHER_USER');
        if (!response.ok) {
          throw new Error("Failed to fetch researchers.");
        }
        const users = await response.json();
        const formattedUsers = users.map((user: any) => ({
          id: user.id,
          profilePicture: user.profilePicture,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          enteringDate: user.createdAt, // Mapping 'createdAt' to 'enteringDate'
          positionTitle: user.researchRequests?.[0]?.positionTitle || "Not Provided",  // Mapping nested value and defaulting if empty
          proofAffilation: user.researchRequests?.[0]?.proofOfAffiliation || "Not Provided", // Default if not present
          roleExplanation: user.researchRequests?.[0]?.roleExplanation || "Not Provided", // Default if not present
          proofOfIdentity: user.researchRequests?.[0]?.proofOfIdentity || "Not Provided", // Default if null
          researchTopic: user.researchRequests?.[0]?.researcherType || "Not Provided", // Default if not present
          purposeOfResearch: user.researchRequests?.[0]?.purposeOfResearch || "Not Provided", // Default if not present
          historicalContentRequested: user.researchRequests?.[0]?.historicalContentRequested || "Not Provided", // Default if not present
          intendedUse: user.researchRequests?.[0]?.intendedUse || "Not Provided", // Default if not present
          supportingDocuments: user.researchRequests?.[0]?.supportingDocuments || "Not Provided", // Default if not present
          academicLevel: user.researchRequests?.[0]?.researcherType || "Not Provided", // Assuming 'academicLevel' comes from 'researcherType'
          type: "researcher", // Hardcoding type as "researcher"
          isActive: user.isActive,
        }));

        setData(formattedUsers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResearcherUsers();
  }, []);

  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setActiveFilter(filter);
  };

  const filteredData = data.filter((user) => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email} ${user.username}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesFilter = true;

    if (activeFilter === "All") {
      matchesFilter = true;
    } else if (["Active", "Inactive"].includes(activeFilter)) {
      matchesFilter =
        (activeFilter === "Active" && user.isActive) ||
        (activeFilter === "Inactive" && !user.isActive);
    } else {
      matchesFilter = user.academicLevel === activeFilter;
    }

    return matchesFilter && matchesSearch;
  });

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


  const handleViewUser = (user: Researcher) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Researchers</h1>
        <SearchBar onSearch={handleSearch} filters={filters} />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <>
          <Table
            headers={headers}
            data={currentUsers}
            renderRow={(row) => (
              <>
                <td className="p-2 border border-gray-300 break-words">{row.id}</td>
                <td className="p-2 border border-gray-300 break-words">{row.username}</td>
                <td className="p-2 border border-gray-300 break-words">{row.email}</td>
                <td className="p-2 border border-gray-300 break-words">{row.enteringDate}</td>
                <td className="p-2 border border-gray-300 break-words">{row.academicLevel || "Not Available"}</td>
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
                    onClick={() => handleViewUser(row)}
                    variant="view"
                    size="sm"
                    className="w-32 min-w-[8rem] flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                    Detail
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
        </>
      )}
      {isModalOpen && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ResearcherPage;
