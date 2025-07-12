import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const WithdrawHistory = () => {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchWithdrawData = async () => {
      try {
        const res = await axiosInstance.get(`/getfundingbalance`);
        console.log(res.data)
        setRecords(res.data.records || []);
        setSummary(res.data.summary || {});
      } catch (error) {
        console.error("❌ Error fetching withdraw history:", error);
      }
    };

    fetchWithdrawData();
  }, []);

  return (
    <div className="p-4">
    <h2 className="page-heading">Funding & Balance Tracker</h2>
      <p className="page-subheading">
        Overview of total draws, remaining balance, and transaction history.
      </p>
      {/* ✅ Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6>Total Drawn</h6>
              <h4 className="text-success">${summary?.totalDrawn || "0"}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6>Total Repayments</h6>
              <h4 className="text-success">${summary?.totalRepayments || "0"}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6>Remaining Balance</h6>
              <h4 className="text-success">${summary?.remainingBalance || "0"}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Withdrawal Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="mb-2">Transaction log</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>Merchant  Id</th>
                  <th>Merchant  Name</th>
                  <th>Type</th>
                  <th>Requested Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No withdrawal history found.
                    </td>
                  </tr>
                ) : (
                  records.map((item) => (
                    <tr key={item._id}>
                    
                     <td className="text-uppercase">{item.customerId?.slice(-9).toUpperCase() || "UNKNOWN"}</td>
                      <td className="text-capitalize">{item.customerName}</td>
                      <td className="text-capitalize">{item.type}</td>
                      <td>${item.withdrawAmount}</td>
                        <td>
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <span className={`badge ${
                            item.withdrawStatus === "Approved"
                              ? "bg-success"
                              : item.withdrawStatus === "Rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark" }`}>
                          {item.withdrawStatus}
                        </span>
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

export default WithdrawHistory;
