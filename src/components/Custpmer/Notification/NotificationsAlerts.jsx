import React, { useState } from "react";

const NotificationsAlerts = () => {
  // Example: next payment date (should come from backend)
  const nextPaymentDate = "June 30, 2025";
  const missedPaymentDate = "June 15, 2025";

  // Email opt-out state (simulate, in real app this would be saved in backend)
  const [emailOptOut, setEmailOptOut] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      message: `💸 Payment Reminder: Your next payment will auto debit on ${nextPaymentDate}.`,
    },
    {
      id: 2,
      type: "approved",
      message: "✅ New Draw Approved: $5,000 has been added to your account.",
    },
    {
      id: 3,
      type: "missed",
      message:
        `⚠️ Payment Missed: Your payment on ${missedPaymentDate} was uncollectable. Your line of credit is currently suspended. Please contact Underwriting at (646) 886-9499 to restore your account.`,
    },
    {
      id: 4,
      type: "credit",
      message:
        "📈 You may be eligible for a credit increase once 50% of your credit line has been paid.",
    },
  ]);

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Email opt-out toggle
  const handleEmailOptOut = () => {
    setEmailOptOut((prev) => !prev);
    // In real app, call API to update user preference
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Notifications & Alerts</h2>
      <p className="page-subheading">Stay updated on your account activity</p>

      {/* Email opt-out toggle */}
      <div className="mb-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailOptOut"
            checked={!emailOptOut}
            onChange={handleEmailOptOut}
          />
          <label className="form-check-label" htmlFor="emailOptOut">
            {emailOptOut
              ? "You have opted out of email notifications."
              : "Also send notifications to my email"}
          </label>
        </div>
        <small className="text-muted">
          {emailOptOut
            ? "You will only receive notifications in the app."
            : "You will receive notifications both in the app and by email."}
        </small>
      </div>

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

      {/* 🔧 FUTURE FEATURE SUGGESTION:
        Add an Admin configuration panel that lets admins:
        - Set recurring ACH Debit reminder date
        - Customize message format
        - Warn users to keep sufficient funds
        - Remind users not to block/stop ACH debit
        This will help users avoid contract violations.
      */}
    </div>
  );
};

export default NotificationsAlerts;
