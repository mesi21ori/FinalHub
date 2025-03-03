"use client";

import React, { useState, useEffect } from "react";
import { tableHeadersConfig } from "../../../config/tableConfig";
import Table from "../../../../components/Table";
import Button from "../../../../components/Button";
import SearchBar from "../../../../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import ResearcherDetailModal from "../../../../components/ResearcherDetailsModal";
import Pagination from "../../../../components/PaginationButton";

interface Researcher {
  researcher:{
    profilePicture: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    Gender: string;
    DateOfBirth: string;
 
  } ,
  id: number;
  createdAt:string;
  phoneNumber?: string;
  positionTitle?: string;
  proofAffilation?: string;
  roleExplanation?: string;
  proofOfIdentity?: string;
  researchTopic?: string;
  purposeOfResearch?: string;
  HistricalContentRequested?: string[];
  intentedUse?: string;
  supportingDocuments?: string;
  intendedUse?: string;
  type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer";
  isActive: boolean;
}

const filters = ["All", "Active", "Inactive"];

const ResearcherPage: React.FC = () => {
  const [data, setData] = useState<Researcher[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Researcher | null>(null);

  const headers = tableHeadersConfig.researcherPage;

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const institutionIdFromSession = sessionStorage.getItem("institutionId");

        if (!institutionIdFromSession) {
          console.error("Institution ID is missing in sessionStorage");
          return;
        }

        const response = await fetch("/api/reviewer/request/list-of-researcher", {
          method: "POST",   
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            institutionId: institutionIdFromSession,
          }),
        });

        const result = await response.json();

        if (result.accessRequests && Array.isArray(result.accessRequests)) {
          setData(result.accessRequests); 
        } else {
          console.error("Failed to fetch access requests.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setActiveFilter(filter);
  };

  const filteredData = data.filter((user) => {
    const matchesSearch = `${user.researcher?.firstName} ${user.researcher?.lastName} ${user.researcher?.email} ${user.researcher?.username}`
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
      matchesFilter = user.intendedUse === activeFilter;
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

  const handleToggleActive = (id: number) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
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
      <Table
        headers={headers}
        data={currentUsers}
        renderRow={(row) => (
          <>
            <td className="p-2 border border-gray-300 break-words">{row.id}</td>
            <td className="p-2 border border-gray-300 break-words">{row.researcher?.username}</td>
            <td className="p-2 border border-gray-300 break-words">{row.researcher?.email}</td>
            <td className="p-2 border border-gray-300 break-words">{row.createdAt}</td>
            <td className="p-2 border border-gray-300 break-words">{row.intendedUse}</td>
            <td className="p-2 border border-gray-300">
              <Button
                onClick={() => handleToggleActive(row.id)}
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
      {isModalOpen && selectedUser && (
        <ResearcherDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ResearcherPage;
