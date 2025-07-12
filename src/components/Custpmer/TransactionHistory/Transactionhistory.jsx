import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // Adjust path if needed
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import autoTable from "jspdf-autotable"; // ✅ correct import

const TransactionHistory = () => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const loginId = JSON.parse(localStorage.getItem("login_id"));
      if (!loginId) return;

      try {
        const res = await axiosInstance.get(`/getWithdrwBycustomerId/${loginId}`);
        console.log(res.data)
        if (res.data?.result) {
          setTransactions(res.data.result);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error("Error fetching transaction history:", err);
        setError("Failed to fetch transaction history.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "badge-success-soft";
      case "pending":
        return "badge-warning-soft";
      case "declined":
      case "rejected":
        return "badge-danger-soft";
      default:
        return "badge-secondary";
    }
  };
// Export to PDF
const exportToPDF = () => {
  const doc = new jsPDF();

  doc.text("Transaction History", 14, 15);

  const tableColumn = ["#", "Date", "Withdraw Amount", "Available Amount", "Status"];
  const tableRows = transactions.map((txn, index) => [
    index + 1,
    new Date(txn.createdAt).toLocaleDateString(),
    `$${txn.withdrawAmount?.toLocaleString()}`,
    `$${txn.availableAmount?.toLocaleString()}`,
    txn.withdrawStatus,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("Transaction_History.pdf");
};


// Export to Excel
const exportToExcel = () => {
  const wsData = transactions.map((txn, index) => ({
    "#": index + 1,
    Date: new Date(txn.createdAt).toLocaleDateString(),
    "Withdraw Amount": txn.withdrawAmount,
    "Available Amount": txn.availableAmount,
    Status: txn.withdrawStatus,
  }));

  const worksheet = XLSX.utils.json_to_sheet(wsData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction History");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "Transaction_History.xlsx");
};
  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">My Draws / History</h2>
      <p className="page-subheading">Complete breakdown of all fund draws and status</p>
<div className="d-flex justify-content-end mb-3 gap-2">
  <button className="btn btn-sm btn-danger" onClick={exportToPDF}>
    <i className="fas fa-file-pdf me-1"></i> Export PDF
  </button>
  <button className="btn btn-sm btn-success" onClick={exportToExcel}>
    <i className="fas fa-file-excel me-1"></i> Export Excel
  </button>
</div>

      <div className="card shadow-sm border-0 card-green">
        <div className="card-body">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-success text-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th className="text-end">Requested Amount </th>
                    <th className="text-end">available Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((txn,index) => {
                      return (
                        <tr key={txn._id}>
                           <td > {index+1} </td>
                          <td>
                            <i className="fas fa-calendar-alt text-secondary me-2"></i>
                            {new Date(txn.createdAt).toLocaleDateString()}
                          </td>
                          <td className="text-end fw-semibold text-success">
                            ${txn.withdrawAmount?.toLocaleString()}
                          </td>
                          <td className="text-end">${txn.availableAmount}</td>
                 
                          <td>
                            <span className={`badge rounded-pill ${getStatusClass(txn.withdrawStatus)}`}>
                              {txn.withdrawStatus}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <i className="fas fa-info-circle fs-2 text-muted mb-2"></i>
                        <p className="text-muted mb-0">No draw history found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer (Optional or Static) */}
          {transactions.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">
                Showing <strong>1</strong> to <strong>{transactions.length}</strong> of <strong>{transactions.length}</strong> entries
              </small>
              <div>
                <button className="btn btn-outline-success btn-sm me-2" disabled>
                  <i className="fas fa-chevron-left"></i> Prev
                </button>
                <button className="btn btn-outline-success btn-sm" disabled>
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
