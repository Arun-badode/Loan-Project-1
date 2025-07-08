import React, { useEffect, useState } from "react";
import { Container, Card, Table } from "react-bootstrap";
import axiosInstance from "../../../utils/axiosInstance";

const CreditUpgradeCustomer = () => {
  const [previousRequests, setPreviousRequests] = useState([]);
  const [customerId, setCustomerId] = useState("");

  // ✅ Get customerId from localStorage
  useEffect(() => {
    const storedLogin = JSON.parse(localStorage.getItem("login-detail"));
    if (storedLogin?.id) {
      setCustomerId(storedLogin.id);
    }
  }, []);

  // ✅ Fetch previous credit upgrade requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (customerId) {
          const res = await axiosInstance.get(`/CreditUpgardeRequest`, {
            params: { customerId },
          });
          if (res.data?.data) {
            setPreviousRequests(res.data.data);
          }
        }
      } catch (err) {
        console.error("❌ Failed to fetch requests", err);
      }
    };

    fetchRequests();
  }, [customerId]);

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h5 className="mb-3">Credit Upgrade Requests</h5>

          {previousRequests.length === 0 ? (
            <p className="text-muted">You are currently not eligible for a credit increase.</p>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requested Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {previousRequests.map((req,index) => {
                  const status = req.creditUpgradeStatus?.toLowerCase() || "pending";

                  return (
                    <tr key={req._id}>
                      <td>{index+1}</td>
                      <td>${Number(req.requestedAmount).toLocaleString()}</td>
                      <td>
                        {new Date(req.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <span
                          className={`badge text-uppercase ${
                            status === "approved"
                              ? "bg-success"
                              : status === "rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreditUpgradeCustomer;
