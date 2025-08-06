import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import moment from "moment";

const Notifications = () => {
  const [emailOptOut, setEmailOptOut] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    fetchNotifications();
    fetchCustomers();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/adminnotification");
      setNotifications(res.data?.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/custumers");
      // console.log(res.data.customers)
      setCustomers(res.data?.customers || []);
    } catch (error) {
      console.error("❌ Failed to fetch customers:", error);
    }
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const handleEmailOptOut = () => {
    setEmailOptOut((prev) => !prev);
  };

  const handleCustomNotificationSubmit = async () => {
    if (!selectedCustomer || !customMessage.trim()) {
      alert("Please select a customer and write a message.");
      return;
    }

    try {
      await axiosInstance.post("/notification", {
        customerId: selectedCustomer,
        message: customMessage,
      });

      setShowModal(false);
      setSelectedCustomer("");
      setCustomMessage("");
      fetchNotifications(); // Refresh list
    } catch (error) {
      console.error("❌ Failed to send notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div className="container mt-3 p-3">
     <h2 className="page-heading">Notifications & Alerts</h2>
<p className="page-subheading">Stay updated on system announcements and updates.</p>

<div className="mb-3">
  <button className="btn btn-success" onClick={() => setShowModal(true)}>
    ➕ Add Custom Message
  </button>
</div>


      {/* Email Opt-Out Toggle */}
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

      {/* Notifications List */}
      <div className="row g-3">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note._id} className="col-12">
              <div className="alert alert-success shadow-sm border-0 rounded px-4 py-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="mb-1">{note.message}</p>
                  <small className="text-muted">
  🕒 {moment(note.createdAt).format("MM/DD/YYYY - hh:mm A")}
  <br />
  {note.customerId && note.customerId !== "N/A" && (
    <> Account Number : <strong>{note.einNumber}</strong></>
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

      {/* Modal for Custom Message */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Custom Notification</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Customer Select */}
                <div className="mb-3">
                  <label className="form-label">Select Merchant </label>
                  <select
                    className="form-select"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {customers.map((cust) => (
                      <option key={cust._id} value={cust._id}>
                        {cust.customerName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Input */}
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Type your custom message here..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleCustomNotificationSubmit}>
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
