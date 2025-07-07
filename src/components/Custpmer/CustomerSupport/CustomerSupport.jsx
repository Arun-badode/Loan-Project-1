import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const CustomerSupport = () => {
  const [user_subject, setSubject] = useState("");
  const [user_message, setMessage] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_name, setName] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("login-detail"));
    if (data) {
      setEmail(data.email || "");
      setName(data.customerName || "");
    }
  }, []);

  const handleSend = (e) => {
    e.preventDefault();

    if (!user_subject || !user_message) {
      alert("⚠️ Please enter both subject and message.");
      return;
    }

    const templateParams = {
      user_name,
      user_email,
      user_subject,
      user_message,
    };

    emailjs
      .send(
        "service_vvp6mfh",
        "template_k9h6nqi",
        templateParams,
        "B78PsxsVYoIyekT6g"
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          setSubject("");
          setMessage("");
        },
        (err) => {
          console.error(err);
          alert("❌ Failed to send message.");
        }
      );
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">📬 Customer Support</h4>
          <form onSubmit={handleSend}>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="user_subject"
                className="form-control"
                placeholder="Enter your subject"
                value={user_subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="user_message"
                className="form-control"
                rows="5"
                placeholder="Type your message here..."
                value={user_message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              🚀 Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
