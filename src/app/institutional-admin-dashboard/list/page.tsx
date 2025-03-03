"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { PageType } from "../../type/index";
import Button from "../../../../components/Button";
import Pagination from "../../../../components/PaginationButton";
import SearchBar from "../../../../components/SearchBar";
import UserDetailModal from "../../../../components/UserDetailModal";
import Table from "../../../../components/Table";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import Notification from "../../../../components/Notification"; // Assuming you have a Notification component

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  isActive: boolean;
  role: string;
}

const StaffListPage: React.FC = () => {
  const [data, setData] = useState<Staff[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [notificationMessage, setNotificationMessage] = useState<string>(''); // For notification message
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success'); // For notification type
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // For notification visibility
  const router = useRouter();
  const pageType: PageType = "staffListPage";
  const headers = ["ID", "Name", "Email", "Entering Date", "Role", "Action", "View"];

  // Client-side check for sessionStorage
  const [institutionId, setInstitutionId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedInstitutionId = sessionStorage.getItem("institutionId");
      setInstitutionId(storedInstitutionId);
    }
  }, []);

  // Fetch staff data if institutionId exists
  useEffect(() => {
    if (institutionId) {
      fetchStaffData(institutionId);
    }
  }, [institutionId]);

  const fetchStaffData = async (institutionId: string) => {
    setLoading(true); // Set loading true before fetching
    try {
      const response = await fetch(`/api/staff/list?institutionId=${institutionId}`);
      if (response.ok) {
        const staffData = await response.json();
        setData(staffData);
        setNotificationMessage("Staff data fetched successfully.");
        setNotificationType("success");
        setNotificationVisible(true); // Show success notification
      } else {
        setNotificationMessage("Failed to fetch staff data");
        setNotificationType("error");
        setNotificationVisible(true); // Show error notification
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setNotificationMessage("Error fetching staff data");
      setNotificationType("error");
      setNotificationVisible(true); // Show error notification
    } finally {
      setLoading(false); // Set loading false after fetching
    }
  };

  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter);
  };

  const filteredData = data.filter((staff) => {
    const matchesSearch =
      staff.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && staff.isActive) ||
      (selectedFilter === "inactive" && !staff.isActive);

    return matchesSearch && matchesFilter;
  });

  const indexOfLastStaff = currentPage * usersPerPage;
  const indexOfFirstStaff = indexOfLastStaff - usersPerPage;
  const currentStaff = filteredData.slice(indexOfFirstStaff, indexOfLastStaff);

  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
   // setLoading(true); // Show loading spinner while toggling
    try {
      if (!institutionId) {
        throw new Error("Institution ID not found in session storage");
      }

      const response = await fetch("/api/auth/toggle-active", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          institutionId: parseInt(institutionId, 10),
          newStatus: !currentStatus, // Toggle the status
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      const updatedUser = await response.json();
      setData((prevData) =>
        prevData.map((staff) =>
          staff.id === id ? { ...staff, isActive: updatedUser.isActive } : staff
        )
      );

      setNotificationMessage("User status updated successfully.");
      setNotificationType("success");
      setNotificationVisible(true); // Show success notification
    } catch (error) {
      console.error("Error toggling user status:", error);
      setNotificationMessage("Error toggling user status");
      setNotificationType("error");
      setNotificationVisible(true); // Show error notification
    } finally {
      setLoading(false); // Hide loading spinner after operation
    }
  };

  const handleViewStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStaff(null);
  };

  return (
    <div className="p-4">
      <Notification
        message={notificationMessage}
        type={notificationType}
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)} // Close notification
      />

      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Staff List</h1>
        <SearchBar onSearch={handleSearch} filters={["all", "active", "inactive"]} />
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table
            headers={headers}
            data={currentStaff}
            renderRow={(row) => (
              <>
                <td className="p-2 border border-gray-300">{row.id}</td>
                <td className="p-2 border border-gray-300">{`${row.firstName} ${row.lastName}`}</td>
                <td className="p-2 border border-gray-300">{row.email}</td>
                <td className="p-2 border border-gray-300">{row.createdAt}</td>
                <td className="p-2 border border-gray-300">{row.role}</td>
                <td className="p-2 border border-gray-300">
                  <Button
                    onClick={() => handleToggleActive(row.id, row.isActive)}
                    variant={row.isActive ? "active" : "inactive"}
                    size="sm"
                    className="w-32 min-w-[8rem] flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={row.isActive ? faUserCheck : faUserAltSlash} className="mr-1" />
                    {row.isActive ? "Active" : "Inactive"}
                  </Button>
                </td>
                <td className="p-2 border border-gray-300">
                  <Button
                    onClick={() => handleViewStaff(row)}
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
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {showModal && selectedStaff && (
        <UserDetailModal user={selectedStaff} onClose={closeModal} />
      )}
    </div>
  );
};

export default StaffListPage;
