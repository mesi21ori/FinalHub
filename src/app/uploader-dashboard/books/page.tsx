"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Table from "../../../../components/Table";
import Pagination from "../../../../components/PaginationButton";
import SearchBar from "../../../../components/SearchBar";
import { HistoricalBook } from "../../type/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faUserCheck, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import ContentDetailModal from "../../../../components/ContentDetailModal";

// BookListPage Component
const BookListPage: React.FC = () => {
  const [data, setData] = useState<HistoricalBook[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedBook, setSelectedBook] = useState<HistoricalBook | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const headers = [
    "ID",
    "Title",
    "Author",
    "Publisher",
    "Language",
    "Publication Date",
    "Actions",
  ];

  // Fetch books from the API on component mount


  useEffect(() => { 
    const fetchBooks = async () => {
      try {
        const userId = sessionStorage.getItem("userId"); // Retrieve the uploader ID
        const response = await fetch(`/api/content/book?uploadedBy=${userId}`); // Pass it as a query parameter
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setData(data.books);
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

  const filteredData = data.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.bookDetails?.alternativeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.bookDetails?.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && book.isActive) ||
      (selectedFilter === "inactive" && !book.isActive);

    return matchesSearch && matchesFilter;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredData.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredData.length / booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewBook = (book: HistoricalBook) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleToggleActive = (id: number) => {
    setData((prevData) =>
      prevData.map((book) =>
        book.id === id ? { ...book, isActive: !book.isActive } : book
      )
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleUploadBook = () => {
    router.push("/uploader-dashboard/upload-book");
  };

  const handleSaveBook = (updatedBook: HistoricalBook) => {
    setData((prevData) =>
      prevData.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    closeModal();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} filters={["all", "active", "inactive"]} />
        <Button onClick={handleUploadBook} variant="view" className="flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Upload Book
        </Button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <Table
        headers={headers}
        data={currentBooks}
        renderRow={(row) => (
          <>
            <td className="p-2 border border-gray-300">{row.id}</td>
            <td className="p-2 border border-gray-300">{row.title}</td>
            <td className="p-2 border border-gray-300">{row.bookDetails?.author}</td>
            <td className="p-2 border border-gray-300">{row.bookDetails?.publisher}</td>
            <td className="p-2 border border-gray-300">{row.bookDetails?.language}</td>
            <td className="p-2 border border-gray-300">{row.bookDetails?.publicationDate}</td>
            <td className="p-2 border border-gray-300 flex space-x-2 justify-center">
              <Button
                onClick={() => handleViewBook(row)}
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

      {showModal && selectedBook && (
        <ContentDetailModal
          content={selectedBook}
          contentType="book"
          onClose={closeModal}
          onSave={handleSaveBook}
        />
      )}
    </div>
  );
};

export default BookListPage;
