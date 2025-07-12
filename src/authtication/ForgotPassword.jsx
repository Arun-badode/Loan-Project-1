import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";
import emailjs from "emailjs-com";
import logo from "../assets/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    Swal.fire("Error", "Please enter your email address", "error");
    return;
  }

  try {
    const response = await axiosInstance.post("/forgot-password", { email });
    const resetToken = response?.data?.resetToken;

    if (!resetToken) {
      throw new Error("Reset token not provided by API.");
    }

    // 👇 Construct the full reset link manually

    const emailParams = {
      email: email,
      token: resetToken,
    };

    await emailjs.send(
      "service_56d40ci",
      "template_gu3rnhe",
      emailParams,
      "rq4-yuCE_eCh_aNjL"
    );

    Swal.fire("Success", "Reset link sent. Please check your email.", "success");
    setIsSubmitted(true);
    setTimeout(() => navigate("/"), 3000);
  } catch (error) {
    console.error("❌ Forgot password error:", error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again later.",
    });
  }
};


  return (
    <div  className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#ccf8db" }}>
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded shadow text-center">
        <img src={logo}  alt="Logo"  className="mb-3"
          style={{ height: "100px", objectFit: "contain" }}/>
        <h4 className="mb-4 fw-bold" style={{ color: "#4d4d4d" }}>
          Reset Your Password
        </h4>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <p style={{ color: "#4d4d4d" }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <input
                type="email"
                className="form-control rounded-pill py-2 px-3"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              <Link to="/" className="text-success fw-semibold text-decoration-none">
                Sign in
              </Link>
            </p>
          </form>
        ) : (
          <div className="text-center">
            <p style={{ color: "#4d4d4d" }}>
              Password reset link sent to <strong>{email}</strong>. Please check your email.
            </p>
            <p style={{ color: "#4d4d4d" }}>
              Didn't receive the email?{" "}
              <Link to="/">
                <button className="text-success fw-semibold text-decoration-none border-0 bg-transparent">
                  Try again
                </button>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
