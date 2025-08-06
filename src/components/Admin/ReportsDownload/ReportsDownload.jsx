import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import autoTable from "jspdf-autotable"; 
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactSelect from "react-select";

const ReportsDownload = () => {
  const [reportType, setReportType] = useState("draw");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axiosInstance.get("/custumers");
        setCustomersList(res?.data?.customers || []);
      } catch (error) {
        console.error("Failed to fetch customers", error);
      }
    };
    fetchCustomers();
  }, []);

  // ✅ PDF Export Function
  const exportPDF = (data) => {
    const doc = new jsPDF();
    doc.text("Generated Report", 14, 15);

    const tableData = data.map((item, index) => [
      index + 1,
      `$${item.withdrawAmount}`,
      item.withdrawStatus,
      new Date(item.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      startY: 20,
      head: [["#", "Requested Amount", "Status", "Date"]],
      body: tableData,
    });

    doc.save("Report.pdf");
  };

  // ✅ Generate + Auto Download
  const handleDownload = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const reportTypeMap = {
      draw: "DrawHistory",
      repayment: "RepaymentLogs",
      funding: "FundingRequest",
    };

    setLoading(true);
    try {
      const response = await axiosInstance.get("/report", {
        params: {
          reportType: reportTypeMap[reportType],
          startDate,
          endDate,
          customerId: customer || undefined,
        },
      });

      const data = response.data.data || [];
      setReportData(data);

      if (data.length > 0) {
        exportPDF(data); // 🔥 Generate ke saath hi PDF download
      } else {
        alert("No records found for selected filters.");
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      alert("Failed to fetch report.");
    } finally {
      setLoading(false);
    }
  };

  const customerOptions = customersList.map((cust) => ({
    value: cust._id,
    label: `${cust.customerName} (${cust.einNumber})`,
  }));

  const handleCustomerChange = (selectedOption) => {
    setCustomer(selectedOption?.value || "");
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
              <input  type="date"  className="form-control"  value={endDate}  onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Merchant </label>
              <ReactSelect
                options={[{ value: "", label: "All Merchant " }, ...customerOptions]}
                onChange={handleCustomerChange}
                isSearchable
                placeholder="Select or search customer"
                value={
                  customerOptions.find((opt) => opt.value === customer) ||
                  { value: "", label: "All Merchant " }
                }
              />
            </div>
          </div>

          <div className="text-end">
            <button className="btn btn-success" onClick={handleDownload} disabled={loading}>
              {loading ? "Fetching..." : "Generate & Download Report"}
              <i className="fas fa-download ms-2"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Report Table */}
      {reportData && (
        <div className="mt-5">
          <h5 className="mb-3">Report Preview</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Requested Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {reportData?.length > 0 ? (
                  reportData?.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>${item.withdrawAmount}</td>
                      <td>{item.withdrawStatus}</td>
                    <td>
  {item?.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "N/A"}
</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No data available for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsDownload;
