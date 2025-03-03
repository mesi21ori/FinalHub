// components/NotificationList.tsx
import React from 'react';

interface Notification {
  id: number;
  institution: string;
  date: string;
  time: string;
  type: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (id: number) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onNotificationClick }) => {
  return (
    <ul>
      {notifications.map(notification => (
        <li
          key={notification.id}
          className="border-b py-3 pl-4 pr-4 rounded hover:bg-[#f7f4f0] cursor-pointer transition-colors"
          onClick={() => onNotificationClick(notification.id)}
          style={{ marginBottom: '0.5rem' }}
        >
          <div>
            <strong style={{ color: "#3C2A21" }}>{notification.institution}</strong>
            <span className="text-gray-500 ml-2">({notification.date} {notification.time})</span>
          </div>
          <div style={{ color: "#1A120B" }}>{notification.type} - Request to collaborate.</div>
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;