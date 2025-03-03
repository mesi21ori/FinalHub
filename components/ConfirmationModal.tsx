import React from "react";
import Button from "../components/Button"; // Assuming you're using a custom Button component

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Close the modal when clicking outside
      aria-labelledby="confirmation-modal-title"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div
        className="bg-[#E5E5CB] opacity-95 rounded-lg p-16 w-100 max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
      >
        <h3
          id="confirmation-modal-title"
          className="text-md font-bold text-center text-[#3C2A21]"
        >
          {message}
        </h3>
        <div className="mt-4 flex justify-center space-x-4">
          {/* Confirm Button */}
          <Button
            variant="view"
            size="sm"
            onClick={onConfirm}
            aria-label="Confirm the action"
          >
            Confirm
          </Button>
          {/* Cancel Button */}
          <Button
            variant="border"
            size="sm"
            onClick={onClose}
            aria-label="Cancel the action"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;