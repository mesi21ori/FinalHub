import React from 'react';
import Button from './Button';

interface NotificationDetailsProps {
  notification: any | null; // Allow null
  onAccept: () => void;
  onReject: () => void;
  onViewDocument: () => void;
  onBackToList: () => void;
}

const NotificationDetails: React.FC<NotificationDetailsProps> = ({
  notification,
  onAccept,
  onReject,
  onViewDocument,
  onBackToList
}) => {
  if (!notification) {
    return <div>No notification details available.</div>;
  }

  return (
    <div className="mt-4">
      <Button
        onClick={onBackToList}
        variant="view"
        className="mb-4"
      >
        &larr; Back to Requests
      </Button>

      <h2 className="text-xl font-bold mb-4" style={{ color: "#1A120B" }}>Request Details</h2>
      <div className="border p-4 rounded shadow-md">
        <p><strong style={{ color: "#3a2f2c" }}>Institution:</strong> {notification.registrationNumber ?? 'N/A'}</p>
        <p style={{ color: "#1A120B" }}><strong>Registration Number:</strong> {notification.registrationNumber ?? 'N/A'}</p>
        <p style={{ color: "#1A120B" }}><strong>Email Address:</strong> {notification.email ?? 'N/A'}</p>
        <p style={{ color: "#1A120B" }}><strong>Website:</strong>{" "}{notification.website ? (
         <a href={notification.website} target="_blank" rel="noopener noreferrer"className="text-blue-500 underline">{notification.website}
            </a>
          ) : (
            'N/A'
          )}
        </p>

        <p style={{ color: "#1A120B" }}><strong>Phone:</strong> {notification.phone ?? 'N/A'}</p>
        <p style={{ color: "#1A120B" }}><strong>Location:</strong> {notification.address ?? 'N/A'}</p>
        <p style={{ color: "#1A120B" }}><strong>Type:</strong> {notification.type ?? 'N/A'}</p>
        <p style={{ color: "#1A120B" }}><strong>Number of Employees:</strong> {notification.numberOfEmploy ?? 'N/A'}</p>
        <p style={{ color: "#1A120B" }}><strong>Established On:</strong> {notification.establishDate ?? 'N/A'}</p>
        <p style={{ color: "#1A120B" }}>
          <strong>Document:</strong>{" "}
          <button onClick={onViewDocument} className="text-blue-500 underline">
            View Document
          </button>
        </p>
        <div className="mt-4">
          <p style={{ color: "#1A120B" }}><strong>Admin Details:</strong></p>
          <p style={{ color: "#1A120B" }}><strong>First Name:</strong> {notification.admin?.firstName ?? 'N/A'}</p>
          <p style={{ color: "#1A120B" }}><strong>Last Name:</strong> {notification.admin?.lastName ?? 'N/A'}</p>
          <p style={{ color: "#1A120B" }}><strong>Username:</strong> {notification.admin?.username ?? 'N/A'}</p>
        </div>
        <div className="flex mt-4 space-x-2">
          <Button onClick={onAccept} variant="view">
            Accept
          </Button>
          <Button onClick={onReject} variant="border">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
