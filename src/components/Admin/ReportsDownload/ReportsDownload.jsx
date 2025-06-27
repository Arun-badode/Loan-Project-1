import React, { useState } from "react";

const ReportsDownload = () => {
  const [reportType, setReportType] = useState("draw");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customer, setCustomer] = useState("");

  const handleDownload = () => {
    alert(`Exporting ${reportType} report for ${customer || "all customers"} from ${startDate} to ${endDate}`);
  };

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Reports & Downloads</h2>
      <p className="page-subheading">
        Export draw history, repayment logs, or funding requests below.
      </p>

      <div className="card card-green shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-3">Generate Report</h5>

          <div className="row g-4 mb-3">
            {/* Report Type */}
            <div className="col-md-4">
              <label className="form-label">Report Type</label>
              <select
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="draw">Draw History</option>
                <option value="repayment">Repayment Logs</option>
                <option value="funding">Funding Requests</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="col-md-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Customer Filter */}
            <div className="col-md-4">
              <label className="form-label">Customer (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer name"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
            </div>
          </div>

          <div className="text-end">
            <button className="btn btn-success" onClick={handleDownload}>
              Download Report <i className="fas fa-download ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDownload;
