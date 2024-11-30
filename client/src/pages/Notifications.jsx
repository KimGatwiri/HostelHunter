import React, { useEffect, useState } from "react";
import socket from "./socket"; // Import the socket instance

const NotificationBanner = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for notifications
    socket.on("notification", (message) => {
      setNotifications((prev) => [...prev, message]); // Add to notification list
    });

    // Cleanup to avoid duplicate listeners
    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div className="notification-banner">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="notification-item bg-green-200 p-3 my-2 rounded shadow"
        >
          {notification}
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;
