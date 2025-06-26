import React from "react";


const notifications = {
  newRequests: [
    {
      title: "New Project Request",
      message: "John Smith has requested a new web development project",
      time: "2 hours ago",
      unread: true,
    },
    {
      title: "Collaboration Invitation",
      message: "Sarah Johnson wants to collaborate on Design System",
      time: "4 hours ago",
      unread: true,
    },
    {
      title: "Project Review Request",
      message: "Marketing team requested a review for the new campaign",
      time: "6 hours ago",
      unread: true,
    },
  ],
  customerMessages: [
    {
      title: "Emma Wilson",
      message: "Thank you for the quick response on my previous inquiry",
      time: "1 hour ago",
      unread: true,
    },
    {
      title: "Michael Brown",
      message: "Could you provide an update on the project timeline?",
      time: "3 hours ago",
      unread: true,
    },
    {
      title: "Lisa Anderson",
      message: "The latest design changes look great!",
      time: "5 hours ago",
      unread: true,
    },
  ],
};

// ✅ Reusable single notification item
const NotificationItem = ({ title, message, time, unread }) => (
  <div
    className={`d-flex justify-content-between align-items-start p-3 border-bottom ${
      unread ? "bg-light" : ""
    }`}
  >
    <div>
      <div className="fw-semibold">{title}</div>
      <div className="text-muted small">{message}</div>
      <div className="text-muted small">{time}</div>
    </div>
    {unread && (
      <div className="ms-2 mt-1">
        <span
          className="rounded-circle"
          style={{ width: 8, height: 8, backgroundColor: "#0d6efd", display: "inline-block" }}
        ></span>
      </div>
    )}
  </div>
);

// ✅ Main notifications component
const NotificationsCard = () => {
  return (
    <div className="p-2 mt-4" style={{ minHeight: "100vh" }}>
      <h3 className="page-heading">Notifications</h3>

      <div className="mb-5 mt-3">
        <h6 className=" mb-3">New Requests</h6>
        <div className="border rounded overflow-hidden">
          {notifications.newRequests.map((item, idx) => (
            <NotificationItem key={idx} {...item} />
          ))}
        </div>
      </div>

      <div>
        <h6 className="mb-3">Messages from Customers</h6>
        <div className="border rounded overflow-hidden">
          {notifications.customerMessages.map((item, idx) => (
            <NotificationItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsCard;
