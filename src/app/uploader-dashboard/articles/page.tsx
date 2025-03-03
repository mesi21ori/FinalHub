
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Table from "../../../../components/Table";
import Pagination from "../../../../components/PaginationButton";
import SearchBar from "../../../../components/SearchBar";
import { Article } from "../../type/index"; // Adjust the import based on your file structure
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faUserCheck, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import ContentDetailModal from "../../../../components/ContentDetailModal";

// Sample article data
const sampleData: Article[] = [
  {
    id: 1,
    title: "The Rise of Historical Photography",
    alternativeTitle: "Photography through the Ages",
    article: "Some content about historical photography...",
    coverImage: "https://via.placeholder.com/150",
    description: "An overview of the evolution of photography.",
    language: "English",
    author: "Jane Doe",
    coAuthors: "John Smith",
    editor: "Alice Johnson",
    publisher: "History Press",
    publicationtDate: "2023-10-15",
    eventType: "Publication",
    historicalFigures: ["George Eastman", "Ansel Adams"],
    source: "Historical Archives",
    accessLevel: "Public",
    relatedArticles: ["Article 2", "Article 3"],
    numberOfViews: 1200,
    numberOfLikes: 450,
    numberOfComments: 75,
    uploadedBy: "Admin",
    uploadDate: "2023-10-01",
    lastEditBy: "Admin",
    lastEditDate: "2023-10-20",
    isActive: true,
  },
  // Add more article data here as needed
];

const ArticleListPage: React.FC = () => {
  const [data, setData] = useState<Article[]>(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const headers = [
    "ID",
    "Title",
    "Author",
    "Publication Date",
    "Publisher",
    "Actions",
  ];

  const handleSearch = (searchTerm: string, filter: string) => {
    setSearchQuery(searchTerm);
    setSelectedFilter(filter);
  };

  const filteredData = data.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      article.alternativeTitle.toLowerCase().includes(searchQuery.toLowerCase()) 
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) 
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && article.isActive) ||
      (selectedFilter === "inactive" && !article.isActive);
      
    return matchesSearch && matchesFilter;
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredData.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredData.length / articlesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleToggleActive = (id: number) => {
    setData((prevData) =>
      prevData.map((article) =>
        article.id === id ? { ...article, isActive: !article.isActive } : article
      )
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  const handleUploadArticle = () => {
    router.push("/uploader-dashboard/upload-article"); // Change to correct route
  };

const handleSaveArticle = (updatedArticle: Article) => {
    setData((prevData) =>
      prevData.map((article) => (article.id === updatedArticle.id ? updatedArticle : article))
    );
    closeModal();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} filters={["all", "active", "inactive"]} />
        <Button onClick={handleUploadArticle} variant="view" className="flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Upload Article
        </Button>
      </div>

      <Table
        headers={headers}
        data={currentArticles}
        renderRow={(row) => (
          <>
            <td className="p-2 border border-gray-300">{row.id}</td>
            <td className="p-2 border border-gray-300">{row.title}</td>
            <td className="p-2 border border-gray-300">{row.author}</td>
            <td className="p-2 border border-gray-300">{row.publicationtDate}</td>
            <td className="p-2 border border-gray-300">{row.publisher}</td>
            <td className="p-2 border border-gray-300 flex space-x-2 justify-center">
              <Button
                onClick={() => handleViewArticle(row)}
                variant="view"
                size="sm"
                className="flex items-center"
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                View
              </Button>
              <Button
                onClick={() => handleToggleActive(row.id)}
                variant={row.isActive ? "active" : "inactive"}
                size="sm"
                className="flex items-center"
              >
                <FontAwesomeIcon
                  icon={row.isActive ? faUserCheck : faUserAltSlash}
                  className="mr-1"
                />
                {row.isActive ? "Active" : "Inactive"}
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

      {showModal && selectedArticle && (
        <ContentDetailModal
          content={selectedArticle}
          contentType="article"
          onClose={closeModal}
          onSave={handleSaveArticle}
        />
      )}
    </div>
  );
};

export default ArticleListPage;