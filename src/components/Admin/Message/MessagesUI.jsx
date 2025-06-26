import React, { useState } from "react";


const messages = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.thompson@email.com",
    time: "10:30 AM",
    date: "Today",
    unread: true,
    subject: "I have a question about my recent order...",
    body:
      "I have a question about my recent order #12345. The package arrived today but I noticed that one item seems to be missing from the delivery. Could you please help me check the status?",
  },
  {
    id: 2,
    name: "James Wilson",
    time: "9:15 AM",
    date: "Today",
    unread: false,
    subject: "Thank you for your quick response...",
    body: "Thanks for your quick help with my last issue. Everything's working fine now.",
  },
  {
    id: 3,
    name: "Sarah Miller",
    time: "",
    date: "Yesterday",
    unread: true,
    subject: "Regarding my refund request...",
    body: "I'd like to follow up on my refund request submitted earlier this week.",
  },
];

const MessagesUI = () => {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  return (
    <div className="" style={{ minHeight: "100vh", padding: "2rem" }} >
       <h3 className="page-heading mb-3">Message</h3>
      <div className="row bg-white shadow rounded-3 overflow-hidden" style={{ minHeight: "75vh" }}>
        {/* Message List */}
        <div className="col-md-4 border-end p-3 card-green " >
          <h6 className="fw-bold mb-3">Messages</h6>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded mb-1  ${selectedMessage.id === msg.id ? "bg-white" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">{msg.name}</span>
                <small className="text-muted">{msg.time || msg.date}</small>
              </div>
              <div className="text-muted small">{msg.subject}</div>
         
            </div>
          ))}
        </div>

        {/* Message Details */}
        <div className="col-md-8 d-flex flex-column p-4 card-green">
          <div>
            <h6 className="fw-bold">{selectedMessage.name}</h6>
            <p className="text-muted mb-1 small">{selectedMessage.email || "—"}</p>
            <p className="text-muted small">{selectedMessage.time} – {selectedMessage.date}</p>
            <div className="bg-light p-3 rounded mb-4">
              {selectedMessage.body}
            </div>
          </div>

          {/* Reply Box */}
          <div className="mt-auto">
            <div className="mb-2">
              <button className="btn btn-sm btn-outline-secondary me-2">
                <i className="fas fa-bold"></i>
              </button>
              <button className="btn btn-sm btn-outline-secondary me-2">
                <i className="fas fa-italic"></i>
              </button>
              <button className="btn btn-sm btn-outline-secondary me-2">
                <i className="fas fa-paperclip"></i>
              </button>
            </div>
            <textarea
              className="form-control mb-3 textarea-green"
              rows="4"
              placeholder="Type your reply here..."
            ></textarea>
            <div className="text-end">
              <button className="btn btn-success">Send Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesUI;
