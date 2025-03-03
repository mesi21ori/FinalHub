// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { PageType } from "@/app/type";
// import { tableHeadersConfig } from "@/config/tableConfig";
// import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Button from "../../../../../components/Button";
// import Pagination from "../../../../../components/PaginationButton";
// import CustomTable from "../../../../../components/Table";
// import SearchBar from "../../../../../components/SearchBar";
// import UserDetailModal from "../../../../../components/UserDetailModal";

// interface User {
//   id: number;
//   profilePicture: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   Gender: string;
//   DateOfBirth: string;
//   enteringDate: string; // Added field
//   subscriptionType: string; // Added field
//   type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer";
//   isActive: boolean;
//   isPremium: boolean;
// }

// const PremiumUserPage: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState<string>("All");
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   const router = useRouter();
//   const pageType: PageType = "premiumUserPage";
//   const headers = tableHeadersConfig[pageType];

//   const filters = ["All", "Gold", "Silver", "Platinum", "Active", "Inactive"];

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch('/api/platfromadmin/userlist/permiumuser?role=PREMIUM_USER');

//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSearch = (searchTerm: string, filter: string) => {
//     setSearchQuery(searchTerm);
//     setSelectedFilter(filter);
//   };

//   const filteredData = users.filter((user) => {
//     const matchesSearch =
//       user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.username.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesFilter =
//       selectedFilter === "All" ||
//       (selectedFilter === "Gold" && user.subscriptionType === "Gold") ||
//       (selectedFilter === "Silver" && user.subscriptionType === "Silver") ||
//       (selectedFilter === "Platinum" && user.subscriptionType === "Platinum") ||
//       (selectedFilter === "Active" && user.isActive) ||
//       (selectedFilter === "Inactive" && !user.isActive);

//     return matchesSearch && matchesFilter;
//   });

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(filteredData.length / usersPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleToggleStatus = async (id: number, currentStatus: boolean) => {
//     const newStatus = !currentStatus;
//     try {
//       const response = await fetch(`/api/users/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ isActive: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update user status');
//       }

//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user.id === id ? { ...user, isActive: newStatus } : user
//         )
//       );
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   const handleViewUser = (user: User) => {
//     setSelectedUser(user);
//   };

//   const handleCloseModal = () => {
//     setSelectedUser(null);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
//         <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">
//           Premium User List
//         </h1>
//         <SearchBar onSearch={handleSearch} filters={filters} />
//       </div>

//       <CustomTable
//         headers={headers}
//         data={currentUsers}
//         renderRow={(row) => (
//           <>
//             <td className="p-2 border border-gray-300">{row.id}</td>
//             <td className="p-2 border border-gray-300">{row.username}</td>
//             <td className="p-2 border border-gray-300">{row.email}</td>
//             <td className="p-2 border border-gray-300">{row.enteringDate}</td>
//             <td className="p-2 border border-gray-300">{row.subscriptionType}</td>
//             <td className="p-2 border border-gray-300">
//               <Button
//                 onClick={() => handleToggleStatus(row.id, row.isActive)}
//                 variant={row.isActive ? "active" : "inactive"}
//                 size="sm"
//                 className="w-32 min-w-[8rem] flex items-center justify-center"
//               >
//                 <FontAwesomeIcon
//                   icon={row.isActive ? faUserCheck : faUserAltSlash}
//                   className="mr-1"
//                 />
//                 {row.isActive ? "Active" : "Inactive"}
//               </Button>
//             </td>
//             <td className="p-2 border border-gray-300">
//               <Button
//                 onClick={() => handleViewUser(row)}
//                 variant="view"
//                 size="sm"
//                 className="w-32 min-w-[8rem] flex items-center justify-center"
//               >
//                 <FontAwesomeIcon icon={faEye} className="mr-1" />
//                 Detail
//               </Button>
//             </td>
//           </>
//         )}
//       />

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         handleNextPage={handleNextPage}
//         handlePreviousPage={handlePreviousPage}
//       />

//       {selectedUser && (
//         <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
//       )}

//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}
//     </div>
//   );
// };

// export default PremiumUserPage;


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageType } from "@/app/type";
import { tableHeadersConfig } from "@/config/tableConfig";
import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../../../../../components/Button";
import Pagination from "../../../../../components/PaginationButton";
import CustomTable from "../../../../../components/Table";
import SearchBar from "../../../../../components/SearchBar";
import UserDetailModal from "../../../../../components/UserDetailModal";
import Notification from "../../../../../components/Notification"; // Import Notification component

interface User {
  id: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  Gender: string;
  DateOfBirth: string;
  enteringDate: string; // Added field
  subscriptionType: string; // Added field
  type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer";
  isActive: boolean;
  isPremium: boolean;
}

const PremiumUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [notificationMessage, setNotificationMessage] = useState<string>(""); // Notification message
  const [notificationType, setNotificationType] = useState<"success" | "error" | "warning">("success"); // Notification type
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // Notification visibility

  const router = useRouter();
  const pageType: PageType = "premiumUserPage";
  const headers = tableHeadersConfig[pageType];

  const filters = ["All", "Gold", "Silver", "Platinum", "Active", "Inactive"];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/platfromadmin/userlist/permiumuser?role=PREMIUM_USER');

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setNotificationMessage("Users fetched successfully");
        setNotificationType("success");
        setNotificationVisible(true);
      } catch (err: any) {
        setError(err.message);
        setNotificationMessage(err.message || "Failed to fetch users");
        setNotificationType("error");
        setNotificationVisible(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter);
  };

  const filteredData = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Gold" && user.subscriptionType === "Gold") ||
      (selectedFilter === "Silver" && user.subscriptionType === "Silver") ||
      (selectedFilter === "Platinum" && user.subscriptionType === "Platinum") ||
      (selectedFilter === "Active" && user.isActive) ||
      (selectedFilter === "Inactive" && !user.isActive);

    return matchesSearch && matchesFilter;
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

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: newStatus } : user
        )
      );

      setNotificationMessage(`User status updated to ${newStatus ? "Active" : "Inactive"}`);
      setNotificationType("success");
      setNotificationVisible(true);
    } catch (err: any) {
      setError(err.message);
      setNotificationMessage("Failed to update user status");
      setNotificationType("error");
      setNotificationVisible(true);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="p-4">
      <Notification
        message={notificationMessage}
        type={notificationType}
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />

      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">
          Premium User List
        </h1>
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
            <td className="p-2 border border-gray-300">{row.enteringDate}</td>
            <td className="p-2 border border-gray-300">{row.subscriptionType}</td>
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

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default PremiumUserPage;
