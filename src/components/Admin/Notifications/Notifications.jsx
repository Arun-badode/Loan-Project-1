import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import moment from "moment";

const Notifications = () => {
  const [emailOptOut, setEmailOptOut] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/adminnotification");
      setNotifications(res.data?.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error);
    }
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const handleEmailOptOut = () => {
    setEmailOptOut((prev) => !prev);
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Notifications & Alerts</h2>
      <p className="page-subheading">Stay updated on system announcements and updates.</p>

      {/* ✅ Email opt-out toggle */}
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

      {/* ✅ Notification List */}
      <div className="row g-3">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note._id} className="col-12">
              <div className="alert alert-success shadow-sm border-0 rounded px-4 py-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="mb-1">{note.message}</p>
                    <small className="text-muted">
                      🕒 {moment(note.createdAt).format("MMM DD, YYYY - hh:mm A")}
                      {(note.customerName && note.customerName !== "N/A") && (
                        <> | 👤 <strong>{note.customerName}</strong></>
                      )}
                      {(note.customerId && note.customerId !== "N/A") && (
                        <> (ID: <strong>{note.customerId.slice(-9).toUpperCase()}</strong>)</>
                      )}
                    </small>
                  </div>
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => handleDismiss(note._id)}
                    style={{ fontSize: "0.8rem" }}
                    title="Dismiss"
                  ></button>
                </div>
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

export default Notifications;
