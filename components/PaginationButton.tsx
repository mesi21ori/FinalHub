import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <div className="bg-[#f7f4f0] p-2 mt-4 flex justify-between items-center rounded">
      {/* Previous Button */}
      <button
        onClick={handlePreviousPage}
        className="bg-[#3C2A21] text-white px-3 py-1 rounded disabled:opacity-50 mr-1 sm:mr-4"
        disabled={currentPage === 1}
      >
        <FaArrowLeft />
      </button>
      
      {/* Page Info */}
      <span className="text-[#3C2A21] text-sm sm:text-base">
        Page {currentPage} of {totalPages}
      </span>
      
      {/* Next Button */}
      <button
        onClick={handleNextPage}
        className="bg-[#3C2A21] text-white px-3 py-1 rounded disabled:opacity-50 ml-1 sm:ml-4"
        disabled={currentPage === totalPages}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;