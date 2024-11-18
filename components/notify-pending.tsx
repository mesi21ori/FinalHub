// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';

// interface Notification {
//   id: number;
//   institutionId: number;
//   message: string;
// }

// const NotifyPendingPage = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     axios.get('/api/institutions/notify-pending')
//       .then((response) => setNotifications(response.data))
//       .catch((error) => console.error('Error fetching notifications:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Pending Notifications</h1>
//       <ul>
//         {notifications.map((notification) => (
//           <li key={notification.id}>
//             <Link href={`/institution/${notification.institutionId}`}>
//               {notification.message}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotifyPendingPage;




import { useEffect, useState } from 'react'; 
import axios from 'axios';
import Link from 'next/link';

interface Notification {
  id: number;
  institutionId: number;
  message: string;
}

const NotifyPendingPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios.get('/api/institutions/notify-pending')
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []);

  return (
    <div className="min-h-screen bg-[#e5e5cb] p-6">
      <div className="max-w-xl mx-auto bg-[#fff] border border-[#3C2A21] shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-[#3C2A21] mb-4">Pending Notifications</h1>
        {notifications.length === 0 ? (
          <p className="text-center text-[#3C2A21]">No pending notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification.id} className="p-4 border border-[#3C2A21] rounded-lg hover:bg-[#f0f0f0] transition">
                <Link href={`/institution/${notification.institutionId}`} className="text-[#3C2A21] font-medium hover:text-[#4B3B31]">
                  {notification.message}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotifyPendingPage;
