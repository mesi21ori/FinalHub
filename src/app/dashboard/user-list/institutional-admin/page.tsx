// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Table from "../../../../../components/Table";
// import { tableHeadersConfig } from "../../../../config/tableConfig"; // Importing the table config
// import Pagination from "../../../../../components/PaginationButton";
// import SearchBar from "../../../../../components/SearchBar"; // Importing the updated SearchBar
// import { PageType } from "../../../type/index";
// import Button from "../../../../../components/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
// import UserDetailModal from "../../../../../components/UserDetailModal";

// // Define the user interface for institutional admin page
// interface InstitutionalAdmin {
//   id: number;
//   profilePicture: string;
//   firstName: string;
//   lastName: string;
//   username: string; // Authorized account username
//   email: string;
//   position: string; // Authorized person's position
//   gender: string;
//   enteringDate: string;
//   institution: string;
//   isActive: boolean;
//   type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer" | "institutional admin";
// }

// const InstitutionalAdminPage: React.FC = () => {
//   const [data, setData] = useState<InstitutionalAdmin[]>([]); // Initially empty data
//   const [currentPage, setCurrentPage] = useState(1); // Pagination state
//   const [usersPerPage] = useState(5); // Users per page
//   const [searchQuery, setSearchQuery] = useState(""); // Search input
//   const [activeFilter, setActiveFilter] = useState<string>(""); // Active/Inactive filter state
//   const [selectedFilter, setSelectedFilter] = useState<InstitutionalAdmin | null>(null); // Selected user object for modal
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

//   const router = useRouter(); // Access Next.js router
//   const pageType: PageType = "institutionAdminPage"; // Page type for institutional admin users
//   const headers = tableHeadersConfig[pageType]; // Get headers from the config
//   const filters = ["All", "Active", "Inactive"]; // Filters include Active/Inactive

//   // Fetch data from the API on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/platfromadmin/userlist/instituionadmin?role=INSTITUTION_ADMIN"); // Replace with the actual endpoint URL
//         const data = await response.json();

//         // Assuming the response contains an array of users
//         const users = data.map((user: any) => ({
//           ...user,
//           enteringDate: new Date(user.createdAt).toLocaleDateString(), // Convert to a readable date format
//           institution: user.institution.name, // Assuming institution name is in user.institution.name
//           position: user.role, // Assuming role is used as position
//         }));

//         setData(users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle search
//   const handleSearch = (searchTerm: string) => {
//     setSearchQuery(searchTerm);
//   };

//   // Handle Active/Inactive filter change
//   const handleActiveFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//   };

//   // Filtered data based on search and active/inactive filter
//   const filteredData = data.filter((user) => {
//     const matchesSearch =
//       user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesActiveFilter =
//       activeFilter === "" ||
//       (activeFilter === "Active" && user.isActive) ||
//       (activeFilter === "Inactive" && !user.isActive);

//     return matchesSearch && matchesActiveFilter;
//   });

//   // Pagination logic
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

//   // Toggle user's active status
//   const handleToggleActive = async (id: number) => {
//     try {
//       // Make a PUT request to toggle the active status of the user
//       const response = await fetch('/api/platfromadmin/userlist/instituionadmin/toggle-active', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: id }), // Send the userId to toggle
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update user status');
//       }
  
//       const data = await response.json();
//       console.log('User status updated:', data); // Log the response
  
//       // Update the local state to reflect the changed status
//       setData((prevData) =>
//         prevData.map((user) =>
//           user.id === id ? { ...user, isActive: !user.isActive } : user
//         )
//       );
//     } catch (error) {
//       console.error('Error toggling user status:', error);
//     }
//   };
  

//   // Handle viewing a user in the modal
//   const handleViewUser = (user: InstitutionalAdmin) => {
//     setSelectedFilter(user); // Store the selected user
//     setIsModalOpen(true); // Open modal
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close modal
//     setSelectedFilter(null); // Clear selected user
//   };

//   return (
//     <div className="p-4">
//         <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
//         <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Institutional Admin List</h1>
       
//           <SearchBar onSearch={handleSearch} filters={filters} />
//         </div>
      
//       <Table
//         headers={headers}
//         data={currentUsers}
//         renderRow={(row) => (
//           <>
//             <td className="p-2 border border-gray-300 break-words">{row.id}</td>
//             <td className="p-2 border border-gray-300 break-words">{row.username}</td>
//             <td className="p-2 border border-gray-300 break-words">{row.email}</td>
//             <td className="p-2 border border-gray-300 break-words">{row.enteringDate}</td>
//             <td className="p-2 border border-gray-300 break-words">{row.institution}</td>
//             <td className="p-2 border border-gray-300">
//               <Button
//                 onClick={() => handleToggleActive(row.id)}
//                 variant={row.isActive ? "active" : "inactive"}
//                 size="sm"
//                 className="w-32  min-w-[8rem] flex items-center justify-center "
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
//                 onClick={() => handleViewUser(row)} // View user details when clicked
//                 variant="view"
//                 size="sm"
//                 className="w-32  min-w-[8rem] flex items-center justify-center "
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

//       {/* User Detail Modal */}
//       {isModalOpen && selectedFilter && (
//         <UserDetailModal
//           user={selectedFilter}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// export default InstitutionalAdminPage;


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "../../../../../components/Table";
import { tableHeadersConfig } from "../../../../config/tableConfig"; // Importing the table config
import Pagination from "../../../../../components/PaginationButton";
import SearchBar from "../../../../../components/SearchBar"; // Importing the updated SearchBar
import { PageType } from "../../../type/index";
import Button from "../../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import UserDetailModal from "../../../../../components/UserDetailModal";
import Notification from "../../../../../components/Notification"; // Import the Notification component

// Define the user interface for institutional admin page
interface InstitutionalAdmin {
  id: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  username: string; // Authorized account username
  email: string;
  position: string; // Authorized person's position
  gender: string;
  enteringDate: string;
  institution: string;
  isActive: boolean;
  type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer" | "institutional admin";
}

const InstitutionalAdminPage: React.FC = () => {
  const [data, setData] = useState<InstitutionalAdmin[]>([]); // Initially empty data
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [usersPerPage] = useState(5); // Users per page
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [activeFilter, setActiveFilter] = useState<string>(""); // Active/Inactive filter state
  const [selectedFilter, setSelectedFilter] = useState<InstitutionalAdmin | null>(null); // Selected user object for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  const [notificationMessage, setNotificationMessage] = useState<string>(''); // For notification message
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success'); // For notification type
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // For notification visibility
  
  const router = useRouter(); // Access Next.js router
  const pageType: PageType = "institutionAdminPage"; // Page type for institutional admin users
  const headers = tableHeadersConfig[pageType]; // Get headers from the config
  const filters = ["All", "Active", "Inactive"]; // Filters include Active/Inactive

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/platfromadmin/userlist/instituionadmin?role=INSTITUTION_ADMIN"); // Replace with the actual endpoint URL
        const data = await response.json();

        // Assuming the response contains an array of users
        const users = data.map((user: any) => ({
          ...user,
          enteringDate: new Date(user.createdAt).toLocaleDateString(), // Convert to a readable date format
          institution: user.institution.name, // Assuming institution name is in user.institution.name
          position: user.role, // Assuming role is used as position
        }));

        setData(users);
        setNotificationMessage('Data loaded successfully.');
        setNotificationType('success');
        setNotificationVisible(true); // Show success notification after loading data
      } catch (error) {
        console.error("Error fetching users:", error);
        setNotificationMessage('Failed to load data.');
        setNotificationType('error');
        setNotificationVisible(true); // Show error notification
      }
    };

    fetchData();
  }, []);

  // Handle search
  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  // Handle Active/Inactive filter change
  const handleActiveFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Filtered data based on search and active/inactive filter
  const filteredData = data.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesActiveFilter =
      activeFilter === "" ||
      (activeFilter === "Active" && user.isActive) ||
      (activeFilter === "Inactive" && !user.isActive);

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

  // Toggle user's active status
  const handleToggleActive = async (id: number) => {
    try {
      // Make a PUT request to toggle the active status of the user
      const response = await fetch('/api/platfromadmin/userlist/instituionadmin/toggle-active', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id }), // Send the userId to toggle
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      const data = await response.json();
      console.log('User status updated:', data); // Log the response

      // Update the local state to reflect the changed status
      setData((prevData) =>
        prevData.map((user) =>
          user.id === id ? { ...user, isActive: !user.isActive } : user
        )
      );

      setNotificationMessage('User status updated successfully.');
      setNotificationType('success');
      setNotificationVisible(true); // Show success notification after updating status
    } catch (error) {
      console.error('Error toggling user status:', error);
      setNotificationMessage('Error toggling user status.');
      setNotificationType('error');
      setNotificationVisible(true); // Show error notification if update fails
    }
  };

  // Handle viewing a user in the modal
  const handleViewUser = (user: InstitutionalAdmin) => {
    setSelectedFilter(user); // Store the selected user
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedFilter(null); // Clear selected user
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
        <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Institutional Admin List</h1>
        <SearchBar onSearch={handleSearch} filters={filters} />
      </div>
      
      <Table
        headers={headers}
        data={currentUsers}
        renderRow={(row) => (
          <>
            <td className="p-2 border border-gray-300 break-words">{row.id}</td>
            <td className="p-2 border border-gray-300 break-words">{row.username}</td>
            <td className="p-2 border border-gray-300 break-words">{row.email}</td>
            <td className="p-2 border border-gray-300 break-words">{row.enteringDate}</td>
            <td className="p-2 border border-gray-300 break-words">{row.institution}</td>
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
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {/* User Detail Modal */}
      {isModalOpen && selectedFilter && (
        <UserDetailModal
          user={selectedFilter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default InstitutionalAdminPage;
