// "use client";

// import React, { ReactNode, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { PageType } from "../../../type/index";
// import CustomTable from "../../../../../components/Table";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle, faEye, faTimesCircle, faUserAltSlash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
// import { tableHeadersConfig } from "../../../../config/tableConfig";
// import SearchBar from "../../../../../components/SearchBar";
// import Table from "../../../../../components/Table";
// import Button from "../../../../../components/Button";
// import Pagination from "../../../../../components/PaginationButton";
// import UserDetailModal from "../../../../../components/UserDetailModal";

// // Data types for Institution
// interface Staffs {
//   title: string;
//   staffCount: number;
// }

// interface Institution {
//   enteringDate: ReactNode;
//   isActive: boolean;
//   id?: number;
//   institutionName: string;
//   institutionType?: string;
//   profilePicture?: string;
//   institutionDescription: string;
//   country: string;
//   city: string;
//   street: string;
//   Status:string;
//   postalCode: string;
//   website: string;
//   phone: string;
//   email: string;
//   establishedDate: string;
//   collaborationPurpose: string;
//   contentType: string[];
//   contentVolume: string;
//   proofOfInstitution: string;
//   Staffs: Staffs[];
// }

// const InstitutionPage: React.FC = () => {
//   const [data, setData] = useState<Institution[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [institutionsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState<string[]>(["All", "Active", "Inactive", "University", "Research", "Others"]);
//   const [selectedFilter, setSelectedFilter] = useState<string>("All");
//   const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   const headers = [
//     "ID", "Name", "Email", "Institution Type", "Entering Date", "Status", "View"
//   ];

//   // Fetch data from the API when the component mounts
//   useEffect(() => {
//     const fetchInstitutions = async () => {
//       try {
//         const response = await fetch('/api/platfromadmin/userlist/institution'); // Replace with your actual API route
//         const fetchedData = await response.json();
//         setData(fetchedData); // Set the fetched data into state
//       } catch (error) {
//         console.error("Error fetching institutions:", error);
//       }
//     };
//     fetchInstitutions();
//   }, []);

//   const handleSearch = (searchTerm: string, filter: string) => {
//     setSearchQuery(searchTerm);
//     setSelectedFilter(filter);
//   };

//   // Filter data based on search and selected filter
//   const filteredData = data.filter((institution) => {
//     const matchesSearch =
//       `${institution.institutionName} ${institution.city} ${institution.country} ${institution.phone}`
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//     const matchesFilter =
//       selectedFilter === "All" ||
//       (selectedFilter === "Active" && institution.isActive) ||
//       (selectedFilter === "Inactive" && !institution.isActive) ||
//       (selectedFilter === "University" && institution.institutionType === "University") ||
//       (selectedFilter === "Research" && institution.institutionType === "Research");

//     return matchesSearch && matchesFilter;
//   });

//   const indexOfLastInstitution = currentPage * institutionsPerPage;
//   const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
//   const currentInstitutions = filteredData.slice(indexOfFirstInstitution, indexOfLastInstitution);

//   const totalPages = Math.ceil(filteredData.length / institutionsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleToggleActive = (id: number) => {
//     setData((prevData) =>
//       prevData.map((institution) =>
//         institution.id === id
//           ? { ...institution, isActive: !institution.isActive }
//           : institution
//       )
//     );
//   };

//   const handleViewClick = (institution: Institution) => {
//     setSelectedInstitution(institution);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedInstitution(null);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
//         <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Institutions</h1>
//         <SearchBar onSearch={handleSearch} filters={filters} />
//       </div>
//       <Table
//         headers={headers}
//         data={currentInstitutions}
//         renderRow={(row) => (
//           <>
//             <td className="p-2 border border-gray-300 text-center">{row.id}</td>
//             <td className="p-2 border border-gray-300 text-left">{row.institutionName}</td>
//             <td className="p-2 border border-gray-300 text-left">{row.email}</td>
//             <td className="p-2 border border-gray-300 text-left">{row.institutionType}</td>
//             <td className="p-2 border border-gray-300 text-left">{row.enteringDate}</td>
//             <td className="p-2 border border-gray-300"> {row.Status}     </td>
//             <td className="p-2 border border-gray-300">
//               <Button
//                 onClick={() => handleViewClick(row)}
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

//       {showModal && selectedInstitution && (
//         <UserDetailModal user={selectedInstitution} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default InstitutionPage;


// "use client";

// import React, { ReactNode, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { PageType } from "../../../type/index";
// import CustomTable from "../../../../../components/Table";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle, faEye, faTimesCircle, faUserAltSlash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
// import { tableHeadersConfig } from "../../../../config/tableConfig";
// import SearchBar from "../../../../../components/SearchBar";
// import Table from "../../../../../components/Table";
// import Button from "../../../../../components/Button";
// import Pagination from "../../../../../components/PaginationButton";
// import UserDetailModal from "../../../../../components/UserDetailModal";
// import Notification from "../../../../../components/Notification";  // Import Notification component

// // Data types for Institution
// interface Staffs {
//   title: string;
//   staffCount: number;
// }

// interface Institution {
//   enteringDate: ReactNode;
//   isActive: boolean;
//   id?: number;
//   institutionName: string;
//   institutionType?: string;
//   profilePicture?: string;
//   institutionDescription: string;
//   country: string;
//   city: string;
//   street: string;
//   Status:string;
//   postalCode: string;
//   website: string;
//   phone: string;
//   email: string;
//   establishedDate: string;
//   collaborationPurpose: string;
//   contentType: string[];
//   contentVolume: string;
//   proofOfInstitution: string;
//   Staffs: Staffs[];
// }

// const InstitutionPage: React.FC = () => {
//   const [data, setData] = useState<Institution[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [institutionsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState<string[]>(["All", "Active", "Inactive", "University", "Research", "Others"]);
//   const [selectedFilter, setSelectedFilter] = useState<string>("All");
//   const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   // Notification states
//   const [notificationMessage, setNotificationMessage] = useState<string>('');  // For notification message
//   const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success');  // For notification type
//   const [notificationVisible, setNotificationVisible] = useState<boolean>(false);  // For notification visibility

//   const headers = [
//     "ID", "Name", "Email", "Institution Type", "Entering Date", "Status", "View"
//   ];

//   // Fetch data from the API when the component mounts
//   useEffect(() => {
//     const fetchInstitutions = async () => {
//       try {
//         const response = await fetch('/api/platfromadmin/userlist/institution');  // Replace with your actual API route
//         const fetchedData = await response.json();
//         setData(fetchedData);  // Set the fetched data into state
//         setNotificationMessage('Institutions fetched successfully.');
//         setNotificationType('success');
//         setNotificationVisible(true);  // Show success notification
//       } catch (error) {
//         console.error("Error fetching institutions:", error);
//         setNotificationMessage('Failed to fetch institutions.');
//         setNotificationType('error');
//         setNotificationVisible(true);  // Show error notification
//       }
//     };
//     fetchInstitutions();
//   }, []);

//   const handleSearch = (searchTerm: string, filter: string) => {
//     setSearchQuery(searchTerm);
//     setSelectedFilter(filter);
//   };

//   // Filter data based on search and selected filter
//   const filteredData = data.filter((institution) => {
//     const matchesSearch =
//       `${institution.institutionName} ${institution.city} ${institution.country} ${institution.phone}`
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//     const matchesFilter =
//       selectedFilter === "All" ||
//       (selectedFilter === "Active" && institution.isActive) ||
//       (selectedFilter === "Inactive" && !institution.isActive) ||
//       (selectedFilter === "University" && institution.institutionType === "University") ||
//       (selectedFilter === "Research" && institution.institutionType === "Research");

//     return matchesSearch && matchesFilter;
//   });

//   const indexOfLastInstitution = currentPage * institutionsPerPage;
//   const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
//   const currentInstitutions = filteredData.slice(indexOfFirstInstitution, indexOfLastInstitution);

//   const totalPages = Math.ceil(filteredData.length / institutionsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleToggleActive = (id: number) => {
//     setData((prevData) =>
//       prevData.map((institution) =>
//         institution.id === id
//           ? { ...institution, isActive: !institution.isActive }
//           : institution
//       )
//     );
//     setNotificationMessage('Institution status updated successfully.');
//     setNotificationType('success');
//     setNotificationVisible(true);  // Show success notification
//   };

//   const handleViewClick = (institution: Institution) => {
//     setSelectedInstitution(institution);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedInstitution(null);
//   };

//   return (
//     <div className="p-4">
//       <Notification
//         message={notificationMessage}
//         type={notificationType}
//         visible={notificationVisible}
//         onClose={() => setNotificationVisible(false)}  // Close notification
//       />
      
//       <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
//         <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Institutions</h1>
//         <SearchBar onSearch={handleSearch} filters={filters} />
//       </div>
//       <Table
//         headers={headers}
//         data={currentInstitutions}
//         renderRow={(row) => (
//           <>
//             <td className="p-2 border border-gray-300 text-center">{row.id}</td>
//             <td className="p-2 border border-gray-300 text-left">{row.institutionName}</td>
//             <td className="p-2 border border-gray-300 text-left">{row.email}</td>
//             <td className="p-2 border border-gray-300 text-left">{row.institutionType}</td>
//             <td className="p-2 border border-gray-300 text-left">{row.enteringDate}</td>
//             <td className="p-2 border border-gray-300"> {row.Status}     </td>
//             <td className="p-2 border border-gray-300">
//               <Button
//                 onClick={() => handleViewClick(row)}
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

//       {showModal && selectedInstitution && (
//         <UserDetailModal user={selectedInstitution} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default InstitutionPage;

"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageType } from "../../../type/index";
import CustomTable from "../../../../../components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEye, faTimesCircle, faUserAltSlash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { tableHeadersConfig } from "../../../../config/tableConfig";
import SearchBar from "../../../../../components/SearchBar";
import Table from "../../../../../components/Table";
import Button from "../../../../../components/Button";
import Pagination from "../../../../../components/PaginationButton";
import UserDetailModal from "../../../../../components/UserDetailModal";
import Notification from "../../../../../components/Notification";  // Import Notification component
import LoadingSpinner from "../../../../../components/LoadingSpinner";  // Import LoadingSpinner component

// Data types for Institution
interface Staffs {
  title: string;
  staffCount: number;
}

interface Institution {
  enteringDate: ReactNode;
  isActive: boolean;
  id?: number;
  institutionName: string;
  institutionType?: string;
  profilePicture?: string;
  institutionDescription: string;
  country: string;
  city: string;
  street: string;
  Status: string;
  postalCode: string;
  website: string;
  phone: string;
  email: string;
  establishedDate: string;
  collaborationPurpose: string;
  contentType: string[];
  contentVolume: string;
  proofOfInstitution: string;
  Staffs: Staffs[];
}

const InstitutionPage: React.FC = () => {
  const [data, setData] = useState<Institution[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [institutionsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<string[]>(["All", "Active", "Inactive", "University", "Research", "Others"]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Loading state
  const [loading, setLoading] = useState<boolean>(true);

  // Notification states
  const [notificationMessage, setNotificationMessage] = useState<string>('');  // For notification message
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success');  // For notification type
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);  // For notification visibility

  const headers = [
    "ID", "Name", "Email", "Institution Type", "Entering Date", "Status", "View"
  ];

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        setLoading(true);  // Start loading
        const response = await fetch('/api/platfromadmin/userlist/institution');  // Replace with your actual API route
        const fetchedData = await response.json();
        setData(fetchedData);  // Set the fetched data into state
        setNotificationMessage('Institutions fetched successfully.');
        setNotificationType('success');
        setNotificationVisible(true);  // Show success notification
      } catch (error) {
        console.error("Error fetching institutions:", error);
        setNotificationMessage('Failed to fetch institutions.');
        setNotificationType('error');
        setNotificationVisible(true);  // Show error notification
      } finally {
        setLoading(false);  // End loading
      }
    };
    fetchInstitutions();
  }, []);

  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter);
  };

  // Filter data based on search and selected filter
  const filteredData = data.filter((institution) => {
    const matchesSearch =
      `${institution.institutionName} ${institution.city} ${institution.country} ${institution.phone}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Active" && institution.isActive) ||
      (selectedFilter === "Inactive" && !institution.isActive) ||
      (selectedFilter === "University" && institution.institutionType === "University") ||
      (selectedFilter === "Research" && institution.institutionType === "Research");

    return matchesSearch && matchesFilter;
  });

  const indexOfLastInstitution = currentPage * institutionsPerPage;
  const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
  const currentInstitutions = filteredData.slice(indexOfFirstInstitution, indexOfLastInstitution);

  const totalPages = Math.ceil(filteredData.length / institutionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleToggleActive = (id: number) => {
    setData((prevData) =>
      prevData.map((institution) =>
        institution.id === id
          ? { ...institution, isActive: !institution.isActive }
          : institution
      )
    );
    setNotificationMessage('Institution status updated successfully.');
    setNotificationType('success');
    setNotificationVisible(true);  // Show success notification
  };

  const handleViewClick = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInstitution(null);
  };

  return (
    <div className="p-4">
      <Notification
        message={notificationMessage}
        type={notificationType}
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}  // Close notification
      />
      
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#3C2A21]">Institutions</h1>
        <SearchBar onSearch={handleSearch} filters={filters} />
      </div>

      {loading ? (
        <LoadingSpinner /> // Show loading spinner while data is being fetched
      ) : (
        <>
          <Table
            headers={headers}
            data={currentInstitutions}
            renderRow={(row) => (
              <>
                <td className="p-2 border border-gray-300 text-center">{row.id}</td>
                <td className="p-2 border border-gray-300 text-left">{row.institutionName}</td>
                <td className="p-2 border border-gray-300 text-left">{row.email}</td>
                <td className="p-2 border border-gray-300 text-left">{row.institutionType}</td>
                <td className="p-2 border border-gray-300 text-left">{row.enteringDate}</td>
                <td className="p-2 border border-gray-300"> {row.Status}     </td>
                <td className="p-2 border border-gray-300">
                  <Button
                    onClick={() => handleViewClick(row)}
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

      {showModal && selectedInstitution && (
        <UserDetailModal user={selectedInstitution} onClose={closeModal} />
      )}
    </div>
  );
};

export default InstitutionPage;
