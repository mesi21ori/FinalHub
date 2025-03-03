import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "warning";
  visible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(); // Close the notification after 3 seconds
      }, 30000);
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [visible, onClose]);

  return (
    visible && (
      <div
        className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          type === "success"
            ? "bg-[#f7f4f0] border-2 border-green-500 text-black"
            : type === "error"
            ? "bg-[#f7f4f0] border-2 border-yellow-500 text-black"
            : "bg-yellow-500 text-black"
        }`}
        style={{ zIndex: 9999 }}
      >
        <span>{message}</span>
        <button
          className="absolute top-0 right-0 p-1 text-black"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    )
  );
};

export default Notification;