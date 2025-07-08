import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Loader from "../../../utils/Loader";

const FundingBalanceTracker = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFundingBalance = async () => {
      try {
        const response = await axiosInstance.get("/getfundingbalance");
      // console.log(response.data.data)
        if (response?.data?.success) {
          setBalanceData(response.data.data);
        } else {
          setError("No balance data available.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch funding balance.");
      } finally {
        setLoading(false);
      }
    };

    fetchFundingBalance();
  }, []);

  if (loading) return <Loader/>;
  if (error) return <p className="p-3 text-danger">{error}</p>;

  // Default fallbacks if any data is missing
  const {
    totalDrawn = 0,
    totalRepayments = 0,
    remainingBalance = 0,
  } = balanceData || {};

  return (
    <div className="container mt-3 p-3">
      <h2 className="page-heading">Funding & Balance Tracker</h2>
      <p className="page-subheading">
        Overview of total draws, remaining balance, and transaction history.
      </p>

      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Amount Drawn</h6>
              <h3 className="fw-bold text-success">${totalDrawn.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Repayments</h6>
              <h3 className="fw-bold text-success">${totalRepayments.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card card-green shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Remaining Balance</h6>
              <h3 className="fw-bold text-success">${remainingBalance.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default FundingBalanceTracker;
