"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../../../../../components/SearchBar";
import Table from "../../../../../components/Table";
import Button from "../../../../../components/Button";
import { PageType } from "../../../type/index";
import { useTableHeaders } from "../../../../hooks/useTableHeaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUserAltSlash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../../../components/PaginationButton";
import UserDetailModal from "../../../../../components/UserDetailModal";
import Notification from "../../../../../components/Notification"; // Import Notification component

interface User {
  id: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  username: string;
  Gender: string;
  DateOfBirth: string;
  email: string;
  createdAt: string;
  isActive: boolean;
  preferences?: string[];
  type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer";
}

const PublicUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Replace static data with fetched users
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [usersPerPage] = useState(5); // Users per page
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [selectedFilter, setSelectedFilter] = useState("all"); // Active/Inactive filter
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Selected user for modal
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [notificationMessage, setNotificationMessage] = useState<string>(''); // For notification message
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success'); // For notification type
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // For notification visibility

  const router = useRouter(); // Access Next.js router
  const pageType: PageType = "publicUserPage";
  const headers = useTableHeaders(pageType); // Fetch table headers dynamically

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/platfromadmin/userlist/publicuser?role=PUBLIC_USER");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data); // Set the fetched users to state
        setNotificationMessage('Users fetched successfully');
        setNotificationType('success');
        setNotificationVisible(true); // Show success notification
      } catch (err: any) {
        setError(err.message); // Set error message if the fetch fails
        setNotificationMessage('Failed to fetch users');
        setNotificationType('error');
        setNotificationVisible(true); // Show error notification
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search and filter
  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter); // Update the selected filter
  };

  // Filtered data based on search and filter
  const filteredData = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && user.isActive) ||
      (selectedFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesFilter;
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

  // Toggle user's active status
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      // Update the local state after successful update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: newStatus } : user
        )
      );
      
      setNotificationMessage('User status updated successfully');
      setNotificationType('success');
      setNotificationVisible(true); // Show success notification
    } catch (err: any) {
      setError(err.message); // Handle any errors
      setNotificationMessage('Error updating user status');
      setNotificationType('error');
      setNotificationVisible(true); // Show error notification
    }
  };

  // View user details
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4">
      {/* Notification */}
      <Notification
        message={notificationMessage}
        type={notificationType}
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)} // Close notification
      />

      {/* Heading and SearchBar */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">
          Public User List
        </h1>
        <SearchBar onSearch={handleSearch} filters={["all", "active", "inactive"]} />
      </div>

      {/* Loading and Error */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          headers={headers}
          data={currentUsers}
          renderRow={(row) => (
            <>
              <td className="p-2 border border-gray-300">{row.id}</td>
              <td className="p-2 border border-gray-300">{row.username}</td>
              <td className="p-2 border border-gray-300">{row.email}</td>
              <td className="p-2 border border-gray-300">{row.createdAt}</td>
              <td className="p-2 border border-gray-300">
                <Button
                  onClick={() => handleToggleStatus(row.id, row.isActive)}
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
                  onClick={() => handleViewUser(row)} // View user details when clicked
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
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {/* Modal for user details */}
      {showModal && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

export default PublicUserPage;
