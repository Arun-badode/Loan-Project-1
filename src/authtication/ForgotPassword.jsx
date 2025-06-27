import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter your email address",
      });
      return;
    }

    // Simulate password reset process
    setIsSubmitted(true);
    Swal.fire({
      icon: "success",
      title: "Password Reset Sent",
      text: "If an account exists with this email, you'll receive a password reset link.",
      timer: 3000,
      timerProgressBar: true,
    });

    // Navigate back to login after 3 seconds
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <main>
      <div className="login-container" style={{ backgroundColor: "#ccf8db" }}>
        <img
          src="https://i.ibb.co/KxdfWFTv/3db2775f70a199b26bc47425ca16af18-1-removebg-preview.png"
          alt="Logo"
          className="mb-1"
          style={{ height: "100px", objectFit: "contain" }}
        />
        <h4 className="mb-4 fw-bold" style={{ color: "#4d4d4d" }}>
          Reset Your Password
        </h4>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <p style={{ color: "#4d4d4d" }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <input
                type="email"
                className="form-control rounded-pill py-2 px-3"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderColor: "#4d4d4d",
                  color: "#4d4d4d",
                  fontWeight: "500",
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success rounded-pill w-100 py-2 fw-semibold"
            >
              Send Reset Link
            </button>

            <p className="mt-3" style={{ color: "#4d4d4d" }}>
              Remember your password?{" "}
              <Link
                to="/"
                className="text-success fw-semibold text-decoration-none"
              >
                Sign in
              </Link>
            </p>
          </form>
        ) : (
          <div className="text-center">
            <p style={{ color: "#4d4d4d" }}>
              Password reset link sent to {email}. Please check your email.
            </p>
            <p style={{ color: "#4d4d4d" }}>
              Didn't receive the email?{" "}
              <Link to="/">
              <button
               
                className="text-success fw-semibold text-decoration-none border-0 bg-transparent"
              >
                Try again
              </button>
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;