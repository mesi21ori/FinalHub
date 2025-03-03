// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DocumentViewer from '../../../../components/DocumentViewer';
// import NotificationDetails from '../../../../components/NotificationDetails';
// import NotificationList from '../../../../components/NotificationList';
// import { useRouter } from 'next/navigation';
// import LoadingSpinner from '../../../../components/LoadingSpinner';

// const RequestsPage: React.FC = () => {
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [selectedNotification, setSelectedNotification] = useState<number | null>(null);
//   const [isDocumentVisible, setDocumentVisible] = useState<boolean>(false);
//   const [notificationDetails, setNotificationDetails] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('/api/institutions/notify-pending');
//         setNotifications(response.data);
//       } catch (err) {
//         setError('Failed to fetch notifications');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const fetchNotificationDetails = async (id: number) => {
//     try {
//       const response = await axios.get(`/api/institutions/${id}`);
//       setNotificationDetails(response.data);
//     } catch (err) {
//       console.error('Error fetching notification details:', err);
//       setError('Failed to fetch notification details');
//     }
//   };

//   const handleNotificationClick = (id: number) => {
//     setSelectedNotification(id);
//     fetchNotificationDetails(id);
//   };

//   const handleAccept = async () => {
//     try {
//       await axios.post('/api/institutions/accept', { id: selectedNotification });
//       router.push('/dashboard/request');
//     } catch (error) {
//       console.error('Error accepting institution:', error);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await axios.post('/api/institutions/reject', { id: selectedNotification });
//       router.push('/dashboard/request');
//     } catch (error) {
//       console.error('Error rejecting institution:', error);
//     }
//   };

//   const handleViewDocument = () => {
//     setDocumentVisible(true);
//   };

//   const handleCloseDocument = () => {
//     setDocumentVisible(false);
//   };

//   const handleBackToList = () => {
//     setSelectedNotification(null);
//     setNotificationDetails(null);
//   };

//   if (error) {
//     return <div className="p-4 bg-red-100 rounded shadow-md">Error: {error}</div>;
//   }

//   return ( 
//     <>
//     {loading ? (
//       <LoadingSpinner />
//     ) : (
//     <div className="p-4 bg-[#E5E5CB] rounded shadow-md">
//       {selectedNotification === null ? (
//         <NotificationList
//           notifications={notifications}
//           onNotificationClick={handleNotificationClick}
//         />
//       ) : (
//         <NotificationDetails
//           notification={notificationDetails}
//           onAccept={handleAccept}
//           onReject={handleReject}
//           onViewDocument={handleViewDocument}
//           onBackToList={handleBackToList}
//         />
//       )}

//       {isDocumentVisible && notificationDetails && (
//         <DocumentViewer
//           documentUrl={notificationDetails.document}
//           onClose={handleCloseDocument}
//         />
//       )}
//     </div>
//       )}
//       </>
//   );
  
// };

// export default RequestsPage;


// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DocumentViewer from '../../../../components/DocumentViewer';
// import NotificationDetails from '../../../../components/NotificationDetails';
// import NotificationList from '../../../../components/NotificationList';
// import { useRouter } from 'next/navigation';
// import LoadingSpinner from '../../../../components/LoadingSpinner';

// const RequestsPage: React.FC = () => {
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [selectedNotification, setSelectedNotification] = useState<number | null>(null);
//   const [isDocumentVisible, setDocumentVisible] = useState<boolean>(false);
//   const [notificationDetails, setNotificationDetails] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('/api/institutions/notify-pending');
//         setNotifications(response.data);
//       } catch (err) {
//         setError('Failed to fetch notifications');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const fetchNotificationDetails = async (id: number) => {
//     try {
//       const response = await axios.get(`/api/institutions/${id}`);
//       setNotificationDetails(response.data);
//     } catch (err) {
//       console.error('Error fetching notification details:', err);
//       setError('Failed to fetch notification details');
//     }
//   };

//   const handleNotificationClick = (id: number) => {
//     setSelectedNotification(id);
//     fetchNotificationDetails(id);
//   };

//   const handleAccept = async () => {
//     try {
//       await axios.post('/api/institutions/accept', { id: selectedNotification });
//       router.push('/dashboard/request');
//     } catch (error) {
//       console.error('Error accepting institution:', error);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await axios.post('/api/institutions/reject', { id: selectedNotification });
//       router.push('/dashboard/request');
//     } catch (error) {
//       console.error('Error rejecting institution:', error);
//     }
//   };

//   const handleViewDocument = () => {
//     setDocumentVisible(true);
//   };

//   const handleCloseDocument = () => {
//     setDocumentVisible(false);
//   };

//   const handleBackToList = () => {
//     setSelectedNotification(null);
//     setNotificationDetails(null);
//   };

//   if (error) {
//     return <div className="p-4 bg-red-100 rounded shadow-md">Error: {error}</div>;
//   }

//   return (
//     <>
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <div className="p-4 bg-[#E5E5CB] rounded shadow-md">
//           {notifications.length === 0 ? (
//             <div className="text-center text-lg font-semibold text-gray-500">
//               No available Request
//             </div>
//           ) : selectedNotification === null ? (
//             <NotificationList
//               notifications={notifications}
//               onNotificationClick={handleNotificationClick}
//             />
//           ) : (
//             <NotificationDetails
//               notification={notificationDetails}
//               onAccept={handleAccept}
//               onReject={handleReject}
//               onViewDocument={handleViewDocument}
//               onBackToList={handleBackToList}
//             />
//           )}

//           {isDocumentVisible && notificationDetails && (
//             <DocumentViewer
//               documentUrl={notificationDetails.document}
//               onClose={handleCloseDocument}
//             />
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default RequestsPage;


// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DocumentViewer from '../../../../components/DocumentViewer';
// import NotificationDetails from '../../../../components/NotificationDetails';
// import NotificationList from '../../../../components/NotificationList';
// import { useRouter } from 'next/navigation';
// import LoadingSpinner from '../../../../components/LoadingSpinner';
// import Notification from '../../../../components/Notification';  // Import the Notification component

// const RequestsPage: React.FC = () => {
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [selectedNotification, setSelectedNotification] = useState<number | null>(null);
//   const [isDocumentVisible, setDocumentVisible] = useState<boolean>(false);
//   const [notificationDetails, setNotificationDetails] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [notificationMessage, setNotificationMessage] = useState<string>(''); // For notification message
//   const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success'); // For notification type
//   const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // For notification visibility
//   const router = useRouter();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('/api/institutions/notify-pending');
//         setNotifications(response.data);
//         setNotificationMessage('Notifications fetched successfully.');
//         setNotificationType('success');
//         setNotificationVisible(true); // Show success notification
//       } catch (err) {
//         setError('Failed to fetch notifications');
//         setNotificationMessage('Failed to fetch notifications');
//         setNotificationType('error');
//         setNotificationVisible(true); // Show error notification
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const fetchNotificationDetails = async (id: number) => {
//     try {
//       const response = await axios.get(`/api/institutions/${id}`);
//       setNotificationDetails(response.data);
//     } catch (err) {
//       console.error('Error fetching notification details:', err);
//       setError('Failed to fetch notification details');
//       setNotificationMessage('Failed to fetch notification details');
//       setNotificationType('error');
//       setNotificationVisible(true); // Show error notification
//     }
//   };

//   const handleNotificationClick = (id: number) => {
//     setSelectedNotification(id);
//     fetchNotificationDetails(id);
//   };

//   const handleAccept = async () => {
//     try {
//       await axios.post('/api/institutions/accept', { id: selectedNotification });
//       setNotificationMessage('Request accepted successfully.');
//       setNotificationType('success');
//       setNotificationVisible(true); // Show success notification
//       router.push('/dashboard/request');
//     } catch (error) {
//       console.error('Error accepting institution:', error);
//       setNotificationMessage('Error accepting request');
//       setNotificationType('error');
//       setNotificationVisible(true); // Show error notification
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await axios.post('/api/institutions/reject', { id: selectedNotification });
//       setNotificationMessage('Request rejected successfully.');
//       setNotificationType('success');
//       setNotificationVisible(true); // Show success notification
//       router.push('/dashboard/request');
//     } catch (error) {
//       console.error('Error rejecting institution:', error);
//       setNotificationMessage('Error rejecting request');
//       setNotificationType('error');
//       setNotificationVisible(true); // Show error notification
//     }
//   };

//   const handleViewDocument = () => {
//     setDocumentVisible(true);
//   };

//   const handleCloseDocument = () => {
//     setDocumentVisible(false);
//   };

//   const handleBackToList = () => {
//     setSelectedNotification(null);
//     setNotificationDetails(null);
//   };

//   if (error) {
//     return <div className="p-4 bg-red-100 rounded shadow-md">Error: {error}</div>;
//   }

//   return (
//     <>
//       <Notification
//         message={notificationMessage}
//         type={notificationType}
//         visible={notificationVisible}
//         onClose={() => setNotificationVisible(false)} // Close notification
//       />
      
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <div className="p-4 bg-[#E5E5CB] rounded shadow-md">
//           {notifications.length === 0 ? (
//             <div className="text-center text-lg font-semibold text-gray-500">
//               No available Request
//             </div>
//           ) : selectedNotification === null ? (
//             <NotificationList
//               notifications={notifications}
//               onNotificationClick={handleNotificationClick}
//             />
//           ) : (
//             <NotificationDetails
//               notification={notificationDetails}
//               onAccept={handleAccept}
//               onReject={handleReject}
//               onViewDocument={handleViewDocument}
//               onBackToList={handleBackToList}
//             />
//           )}

//           {isDocumentVisible && notificationDetails && (
//             <DocumentViewer
//               documentUrl={notificationDetails.document}
//               onClose={handleCloseDocument}
//             />
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default RequestsPage;


"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentViewer from '../../../../components/DocumentViewer';
import NotificationDetails from '../../../../components/NotificationDetails';
import NotificationList from '../../../../components/NotificationList';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import Notification from '../../../../components/Notification';  // Import the Notification component

const RequestsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null);
  const [isDocumentVisible, setDocumentVisible] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string>(''); // For notification message
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning'>('success'); // For notification type
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false); // For notification visibility
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/institutions/notify-pending');
        setNotifications(response.data);
        setNotificationMessage('Notifications fetched successfully.');
        setNotificationType('success');
        setNotificationVisible(true); // Show success notification
      } catch (err) {
        setError('Failed to fetch notifications');
        setNotificationMessage('Failed to fetch notifications');
        setNotificationType('error');
        setNotificationVisible(true); // Show error notification
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const fetchNotificationDetails = async (id: number) => {
    try {
      const response = await axios.get(`/api/institutions/${id}`);
      setNotificationDetails(response.data);
    } catch (err) {
      console.error('Error fetching notification details:', err);
      setError('Failed to fetch notification details');
      setNotificationMessage('Failed to fetch notification details');
      setNotificationType('error');
      setNotificationVisible(true); // Show error notification
    }
  };

  const handleNotificationClick = (id: number) => {
    setSelectedNotification(id);
    fetchNotificationDetails(id);
  };

  const handleAccept = async () => {
    try {
      await axios.post('/api/institutions/accept', { id: selectedNotification });
      setNotificationMessage('Request accepted successfully.');
      setNotificationType('success');
      setNotificationVisible(true); // Show success notification
      // Reload the page after acceptance to get the updated data
      setSelectedNotification(null); // Reset the selected notification
      setNotificationDetails(null); // Clear the details
      window.location.reload(); // This will reload the page and fetch fresh data
    } catch (error) {
      console.error('Error accepting institution:', error);
      setNotificationMessage('Error accepting request');
      setNotificationType('error');
      setNotificationVisible(true); // Show error notification
    }
  };

  const handleReject = async () => {
    try {
      await axios.post('/api/institutions/reject', { id: selectedNotification });
      setNotificationMessage('Request rejected successfully.');
      setNotificationType('success');
      setNotificationVisible(true); // Show success notification
      // Reload the page after rejection to get the updated data
      setSelectedNotification(null); // Reset the selected notification
      setNotificationDetails(null); // Clear the details
      window.location.reload(); // This will reload the page and fetch fresh data
    } catch (error) {
      console.error('Error rejecting institution:', error);
      setNotificationMessage('Error rejecting request');
      setNotificationType('error');
      setNotificationVisible(true); // Show error notification
    }
  };

  const handleViewDocument = () => {
    setDocumentVisible(true);
  };

  const handleCloseDocument = () => {
    setDocumentVisible(false);
  };

  const handleBackToList = () => {
    setSelectedNotification(null); // Reset the selected notification to show the list
    setNotificationDetails(null); // Clear the details of the notification
  };

  if (error) {
    return <div className="p-4 bg-red-100 rounded shadow-md">Error: {error}</div>;
  }

  return (
    <>
      <Notification
        message={notificationMessage}
        type={notificationType}
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)} // Close notification
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-4 bg-[#E5E5CB] rounded shadow-md">
          {notifications.length === 0 ? (
            <div className="text-center text-lg font-semibold text-gray-500">
              No available Request
            </div>
          ) : selectedNotification === null ? (
            <NotificationList
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          ) : (
            <NotificationDetails
              notification={notificationDetails}
              onAccept={handleAccept}
              onReject={handleReject}
              onViewDocument={handleViewDocument}
              onBackToList={handleBackToList}  // Back to list button
            />
          )}

          {isDocumentVisible && notificationDetails && (
            <DocumentViewer
              documentUrl={notificationDetails.document}
              onClose={handleCloseDocument}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RequestsPage;
