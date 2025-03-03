// "use client"; 

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { tableHeadersConfig } from "../../../../config/tableConfig"; // Importing the table config
// import { PageType } from "../../../type/index";
// import CustomTable from "../../../../../components/Table";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCheck, faUserAltSlash, faEye } from "@fortawesome/free-solid-svg-icons";
// import SearchBar from "../../../../../components/SearchBar";
// import Button from "../../../../../components/Button";
// import Pagination from "../../../../../components/PaginationButton";
// import UserDetailModal from "../../../../../components/UserDetailModal";

// // Define the user interface for uploader page
// interface Uploader {
//   id: number;
//   profilePicture: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   createdAt: string;
//   TotalUploadedFile: number; // Change to a number representing the total files
//   isActive: boolean;
//   name:string;
//   type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer";

// }

// const UploaderPage: React.FC = () => {
//   const [data, setData] = useState<Uploader[]>([]); // Uploader user data, initially empty
//   const [currentPage, setCurrentPage] = useState(1); // Pagination state
//   const [usersPerPage] = useState(5); // Users per page
//   const [searchQuery, setSearchQuery] = useState(""); // Search input
//   const [activeFilter, setActiveFilter] = useState<string>(""); // Active/Inactive filter state
//   const [selectedFilter, setSelectedFilter] = useState<Uploader | null>(null); // Selected user object for modal
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

//   const router = useRouter(); // Access Next.js router
//   const pageType: PageType = "uploaderPage"; // Page type for uploader users
//   const headers = tableHeadersConfig[pageType]; // Get headers from the config
//   const filters = ["All", "Active", "Inactive"]; // Filters include Active/Inactive

//   useEffect(() => {
//     // Fetch the uploader data from API on component mount
//     const fetchUploaderData = async () => {
//       try {
//         const response = await fetch(`/api/platfromadmin/userlist/uploader?role=UPLOADER`);
//         const usersData = await response.json();
//         setData(usersData); // Set the fetched data into the state
//       } catch (error) {
//         console.error("Error fetching uploader data:", error);
//       }
//     };

//     fetchUploaderData(); // Call the fetch function
//   }, []); // Empty dependency array to run once on mount

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
//       user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.username.toLowerCase().includes(searchQuery.toLowerCase());

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
//   const handleToggleActive = (id: number) => {
//     setData((prevData) =>
//       prevData.map((user) =>
//         user.id === id ? { ...user, isActive: !user.isActive } : user
//       )
//     );
//   };

//   // Handle viewing a user in the modal
//   const handleViewUser = (user: Uploader) => {
//     setSelectedFilter(user); // Store the selected user
//     setIsModalOpen(true); // Open modal
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close modal
//     setSelectedFilter(null); // Clear selected user
//   };

//   return (
//     <div className="p-4">
//       <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
//         <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Uploader List</h1>
//         <SearchBar onSearch={handleSearch} filters={filters} />
//       </div>

//       <CustomTable
//         headers={headers}
//         data={currentUsers}
//         renderRow={(row) => (
//           <>
//             <td className="p-2 border border-gray-300 break-words">{row.id}</td>
//             <td className="p-2 border border-gray-300 break-words">{row.username}</td>
//             <td className="p-2 border border-gray-300 break-words">{row.email}</td>
//             <td className="p-2 border border-gray-300 break-words">{row.createdAt}</td>
//             <td className="p-2 border border-gray-300 break-words">{row.name}</td>
//             <td className="p-2 border border-gray-300">
//               <Button
//                 onClick={() => handleToggleActive(row.id)}
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
//                 onClick={() => handleViewUser(row)} // View user details when clicked
//                 variant="view"
//                 size="sm"
//                 className="w-32 min-w-[8rem] flex items-center justify-center"
//               >
//                 <FontAwesomeIcon icon={faEye} className="mr-1" />
//                 View
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

// export default UploaderPage;

"use client"

import React, { useState, useEffect } from "react";
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

// Define the user interface for uploader page
interface Uploader {
  id: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  TotalUploadedFile: number; // Change to a number representing the total files
  isActive: boolean;
  institution: { name: string } | null; // Institution should be an object with a name
  type: "premium" | "institution" | "public" | "researcher" | "uploader" | "reviewer";
}

const UploaderPage: React.FC = () => {
  const [data, setData] = useState<Uploader[]>([]); // Uploader user data, initially empty
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [usersPerPage] = useState(5); // Users per page
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [activeFilter, setActiveFilter] = useState<string>(""); // Active/Inactive filter state
  const [selectedFilter, setSelectedFilter] = useState<Uploader | null>(null); // Selected user object for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  const router = useRouter(); // Access Next.js router
  const pageType: PageType = "uploaderPage"; // Page type for uploader users
  const headers = tableHeadersConfig[pageType]; // Get headers from the config
  const filters = ["All", "Active", "Inactive"]; // Filters include Active/Inactive

  useEffect(() => {
    // Fetch the uploader data from API on component mount
    const fetchUploaderData = async () => {
      try {
        const response = await fetch(`/api/platfromadmin/userlist/uploader?role=UPLOADER`);
        const usersData = await response.json();


        setData(usersData); // Set the fetched data into the state
      } catch (error) {
        console.error("Error fetching uploader data:", error);
      }
    };

    fetchUploaderData(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

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
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

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


  // Handle viewing a user in the modal
  const handleViewUser = (user: Uploader) => {
    setSelectedFilter(user); // Store the selected user
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedFilter(null); // Clear selected user
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Uploader List</h1>
        <SearchBar onSearch={handleSearch} filters={filters} />
      </div>

      <CustomTable
        headers={headers}
        data={currentUsers}
        renderRow={(row) => (
          <>
            <td className="p-2 border border-gray-300 break-words">{row.id}</td>
            <td className="p-2 border border-gray-300 break-words">{row.username}</td>
            <td className="p-2 border border-gray-300 break-words">{row.email}</td>
            <td className="p-2 border border-gray-300 break-words">{row.createdAt}</td>
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
                onClick={() => handleViewUser(row)} // View user details when clicked
                variant="view"
                size="sm"
                className="w-32 min-w-[8rem] flex items-center justify-center"
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

      {/* User Detail Modal */}
      {isModalOpen && selectedFilter && (
        <UserDetailModal
          user={{
            ...selectedFilter,
            institution: selectedFilter.institution ? selectedFilter.institution.name : 'No Institution', // Only include institution name
            uploadedContent: undefined
          }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UploaderPage;
