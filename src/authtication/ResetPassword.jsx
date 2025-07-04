import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance"; // ✅ Adjust path if needed

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      Swal.fire("Error", "Please fill in both fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post(`/reset-password/${token}`, {
        newPassword: password, // ✅ KEY MUST BE `newPassword`
      });

      if (
        res.data.success ||
        res.data.message?.toLowerCase().includes("success")
      ) {
        Swal.fire("Success", "Password reset successful!", "success");
        navigate("/");
      } else {
        Swal.fire("Error", res.data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error("❌ Reset error:", err);
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Server error",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-12 col-md-6 col-lg-4 p-4 border rounded shadow bg-light">
        <h4 className="text-center mb-4">Reset Your Password</h4>

        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
