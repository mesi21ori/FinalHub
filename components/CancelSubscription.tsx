// "use client";

// import React, { useState } from "react";
// import CustomDropdown from "./CustomDropdown"; // Import the CustomDropdown component
// import Button from "./Button"; // Import the Button component
// import Notification from "./Notification"; // Import the Notification component
// import ConfirmationModal from "./ConfirmationModal"; // Import the ConfirmationModal component

// interface CancelSubscriptionProps {
//   subscription: {
//     plan: string;
//     nextBillingDate: string;
//     features: string[];
//   };
// }

// const CancelSubscription: React.FC<CancelSubscriptionProps> = ({
//   subscription,
// }) => {
//   const [cancelReason, setCancelReason] = useState<string | number>("");
//   const [error, setError] = useState<string>("");
//   const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
//   const [notificationMessage, setNotificationMessage] = useState<string>("");
//   const [notificationType, setNotificationType] = useState<"success" | "error" | "warning">("success");
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

//   const handleCancel = () => {
//     if (!cancelReason) {
//       setError("Please select a reason for cancellation.");
//       return;
//     }

//     // Show the confirmation modal
//     setIsModalOpen(true);
//   };

//   const handleModalConfirm = () => {
//     // Simulate cancellation logic and set the notification
//     setNotificationType("success");
//     setNotificationMessage(`Your subscription has been canceled for the reason: ${cancelReason}`); // Correctly using template literals with backticks
//     setNotificationVisible(true);
//     setIsModalOpen(false); // Close the modal after confirmation
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false); // Close the modal without taking action
//   };

//   const handleCloseNotification = () => {
//     setNotificationVisible(false);
//   };

//   const options = [
//     "Too expensive",
//     "No longer need the service",
//     "Poor customer support",
//     "Found a better alternative"
//   ];

//   return (
//     <div className="bg-[#f7f4f0] shadow-lg rounded-lg p-6 mt-6 glow-effect max-w-4xl mx-auto sm:max-w-full">
//       <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
//         Cancel Subscription
//       </h2>
//       <p className="text-gray-600 mb-4 text-center sm:text-left">
//         If you no longer wish to use the <strong>{subscription.plan}</strong>{" "}
//         plan, you can cancel your subscription. Once you cancel, your access to
//         the <strong>{subscription.plan}</strong> plan will end today, and you
//         will not be billed again unless you choose to resubscribe in the future.
//       </p>

//       {/* CustomDropdown for selecting cancellation reason */}
//       <CustomDropdown
//         label="Reason for cancellation"
//         options={options}
//         selectedOption={cancelReason}
//         onOptionSelect={(option) => {
//           setCancelReason(option);
//           setError(""); // Reset any previous error
//         }}
//         error={error}
//       />

//       {/* Button to cancel the subscription */}
//       <Button
//         onClick={handleCancel}
//         variant="inactive" // Using the "inactive" variant for the button
//         className="w-full mt-4" // Making it full width, with margin top for spacing
//       >
//         Cancel Subscription
//       </Button>

//       {/* Notification Component */}
//       <Notification
//         message={notificationMessage}
//         type={notificationType}
//         visible={notificationVisible}
//         onClose={handleCloseNotification}
//       />

//       {/* Confirmation Modal Component */}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         onConfirm={handleModalConfirm}
//         message={`Are you sure you want to cancel your subscription to the ${subscription.plan} plan?`} // Correctly using template literals with backticks
//       />
//     </div>
//   );
// };

// export default CancelSubscription;


"use client";

import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown"; // Import the CustomDropdown component
import Button from "./Button"; // Import the Button component
import Notification from "./Notification"; // Import the Notification component
import ConfirmationModal from "./ConfirmationModal"; // Import the ConfirmationModal component

interface CancelSubscriptionProps {
  subscription: {
    plan: string;
    nextBillingDate: string;
    features: string[];
  };
}

const CancelSubscription: React.FC<CancelSubscriptionProps> = ({
  subscription,
}) => {
  const [cancelReason, setCancelReason] = useState<string | number>("");
  const [error, setError] = useState<string>("");
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error" | "warning">("success");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

  const handleCancel = () => {
    if (!cancelReason) {
      setError("Please select a reason for cancellation.");
      return;
    }

    // Show the confirmation modal
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    console.log("Sending cancellation request...");
    console.log({
      userId: sessionStorage.getItem("userId"),
      cancellationReason: cancelReason,
    });
  
    try {
      const response = await fetch("/api/users/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: sessionStorage.getItem("userId"),
          cancellationReason: cancelReason,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(errorData.message || "An unknown error occurred.");
      }
  
      const data = await response.json();
      console.log("Cancellation successful:", data);
  
      setNotificationType("success");
      setNotificationMessage(data.message);
      setNotificationVisible(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error in handleModalConfirm:", error);
      setNotificationType("error");
      setNotificationMessage("Failed to cancel subscription.");
      setNotificationVisible(true);
    }
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal without taking action
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  const options = [
    "Too expensive",
    "No longer need the service",
    "Poor customer support",
    "Found a better alternative"
  ];

  return (
    <div className="bg-[#f7f4f0] shadow-lg rounded-lg p-6 mt-6 glow-effect max-w-4xl mx-auto sm:max-w-full">
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
        Cancel Subscription
      </h2>
      <p className="text-gray-600 mb-4 text-center sm:text-left">
        If you no longer wish to use the <strong>{subscription.plan}</strong>{" "}
        plan, you can cancel your subscription. Once you cancel, your access to
        the <strong>{subscription.plan}</strong> plan will end today, and you
        will not be billed again unless you choose to resubscribe in the future.
      </p>

      {/* CustomDropdown for selecting cancellation reason */}
      <CustomDropdown
        label="Reason for cancellation"
        options={options}
        selectedOption={cancelReason}
        onOptionSelect={(option) => {
          setCancelReason(option);
          setError(""); // Reset any previous error
        }}
        error={error}
      />

      {/* Button to cancel the subscription */}
      <Button
        onClick={handleCancel}
        variant="inactive" // Using the "inactive" variant for the button
        className="w-full mt-4" // Making it full width, with margin top for spacing
      >
        Cancel Subscription
      </Button>

      {/* Notification Component */}
      <Notification
        message={notificationMessage}
        type={notificationType}
        visible={notificationVisible}
        onClose={handleCloseNotification}
      />

      {/* Confirmation Modal Component */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        message={`Are you sure you want to cancel your subscription to the ${subscription.plan} plan?`} // Correctly using template literals with backticks
      />
    </div>
  );
};

export default CancelSubscription;
