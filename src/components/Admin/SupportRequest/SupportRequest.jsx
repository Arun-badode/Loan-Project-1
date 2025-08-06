import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { Button } from "react-bootstrap";

const SupportRequest = () => {
  const [requests, setRequests] = useState([]);

  const fetchSupportRequests = async () => {
    try {
      const res = await axiosInstance.get("/contact");
      setRequests(res.data.data || []);
    } catch (error) {
      console.error("❌ Error fetching support data:", error);
      setRequests([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axiosInstance.delete(`/contact/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete request:", error);
      alert("Error deleting the request.");
    }
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  return (
    <div className="p-4">
      <h3 className="mb-4">Merchant  Support Messages</h3>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>Account Number</th>
                  <th>Merchant  Name</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No support requests found.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.einNumber || "000"}</td>
                      <td>{req.customerName || "UNNAMED"}</td>
                      <td>{req.subject || "-"}</td>
                      <td>{req.message || "-"}</td>
                     <td>
  {req?.createdAt
    ? new Date(req.createdAt).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "N/A"}
</td>

                      <td>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger p-0 fs-5"
                          title="Delete Request"
                          onClick={() => handleDelete(req._id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportRequest;
