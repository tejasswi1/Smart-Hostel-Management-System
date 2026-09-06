import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Mark notification error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Refresh notifications every 5 seconds
    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <h3>🔔 Notifications</h3>

      {notifications.length === 0 ? (
        <p style={{ color: "gray" }}>
          No notifications
        </p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            style={{
              padding: "10px",
              marginTop: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              background: n.read ? "#f5f5f5" : "#eaf4ff",
            }}
          >
            <p style={{ margin: 0 }}>
              {n.read ? "📩" : "🔔"} {n.message}
            </p>

            {!n.read && (
              <button
                onClick={() => markAsRead(n._id)}
                style={{
                  marginTop: "8px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Mark as read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}