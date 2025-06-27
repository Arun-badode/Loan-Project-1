import React, { useState } from "react";

const NotificationsAlerts = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      message: "💸 Payment Reminder: Your next payment is due on June 30, 2025.",
    },
    {
      id: 2,
      type: "approved",
      message: "✅ New Draw Approved: $5,000 has been added to your account.",
    },
    {
      id: 3,
      type: "missed",
      message: "⚠️ Payment Missed: You missed your payment due on June 15, 2025.",
    },
    {
      id: 4,
      type: "credit",
      message: "📈 You're eligible for a credit limit increase. 50% of your credit has been paid.",
    },
  ]);

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Notifications & Alerts</h2>
      <p className="page-subheading">Stay updated on your account activity</p>

      <div className="row g-3">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note.id} className="col-12">
              <div className="alert alert-success d-flex justify-content-between align-items-center shadow-sm border-0 rounded-pill px-4 py-3">
                <span className="me-3">{note.message}</span>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => handleDismiss(note.id)}
                  style={{ fontSize: "0.8rem" }}
                ></button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-light text-muted text-center border-0 shadow-sm rounded-pill">
              No new notifications at the moment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsAlerts;
