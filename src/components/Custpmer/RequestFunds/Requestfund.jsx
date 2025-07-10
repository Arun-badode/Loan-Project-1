import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const Requestfund = () => {
  const [customer, setCustomer] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
// Fetch customer data 
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const loginId = JSON.parse(localStorage.getItem("login_id"));
        if (!loginId) return;
        const response = await axiosInstance.get(`/custumers`, {
          params: { customerId: loginId }
        });

        if (response.data && Array.isArray(response.data.customers)) {
          setCustomer(response.data.customers[0]);
        }
      } catch (error) {
        console.error("❌ Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const withdrawAmt = parseFloat(withdrawAmount);
    const availableAmt = parseFloat(customer?.availBalance || 0);
    if (!withdrawAmt || withdrawAmt <= 0) {
      setError("⚠️ Enter a valid withdrawal amount.");
      setSuccess("");
      return;
    }

    if (withdrawAmt > availableAmt) {
      setError("❌ Withdrawal amount exceeds available balance.");
      setSuccess("");
      return;
    }

    try {
      const payload = {
        customerId: customer._id,
        approvedCreditLine: customer.approvedAmount,
        availableAmount: customer.availBalance,
        withdrawAmount: withdrawAmount
      };

      const response = await axiosInstance.post("/withdrawpayment", payload);
      setSuccess("✅ Withdrawal request submitted successfully!");
      setError("");
      setWithdrawAmount("");

      // Optional: Refresh customer balance
    } catch (err) {
      console.error("❌ Error in withdrawal:", err);
      setError("❌ Failed to submit withdrawal request.");
      setSuccess("");
    }
  };

  return (
    <div className="mt-3 p-3">
      <div className="col-12">
        <h2 className="page-heading">Request Funds</h2>
        <p className="page-subheading">
        Please allow 1-2 business days to receive funds.
        </p>

        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="card-body card-green">
            <div className="mb-4">
              <p className="mb-2">
                <strong>Approved Limit:</strong> ${customer?.approvedAmount || "0"}
              </p>
              <p className="mb-2">
                <strong>Available Balance:</strong> ${customer?.availBalance || "0"}
              </p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

         <form onSubmit={handleWithdraw}>
  <div className="row g-4">
    <div className="col-12 col-md-6">
      <label className="form-label fw-medium">Amount to Withdraw</label>
      <div className="input-group">
        <span className="input-group-text">$</span>
        <input
          type="number"
          className="form-control input-green"
          placeholder="0.00"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          required
        />
      </div>
    </div>

    {/* Show remaining balance calculation */}
    {withdrawAmount && (
      <div className="col-12 mt-3">
        <div className="bg-light p-3 rounded">
          {/* <p><strong>Withdraw Amount:</strong> ${parseFloat(withdrawAmount).toFixed(2)}</p> */}
          <p><strong>Remaining Balance:</strong> $
            {(
              (parseFloat(customer?.availBalance || 0) - parseFloat(withdrawAmount || 0)) >= 0
                ? (parseFloat(customer?.availBalance || 0) - parseFloat(withdrawAmount || 0)).toFixed(2)
                : 0
            )}
          </p>
        </div>
      </div>
    )}

    <div className="col-12">
      <button type="submit" className="btn btn-success py-2 px-4">
        Submit Request
      </button>
    </div>
  </div>
</form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Requestfund;
