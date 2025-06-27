import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
      });
      return;
    }

    if (!formData.agreeTerms) {
      Swal.fire({
        icon: "error",
        title: "Terms Not Accepted",
        text: "Please agree to the terms and conditions.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "Your account has been created successfully!",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#ccf8db" }}
    >
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded shadow  text-center">
        <img
          src="https://i.ibb.co/KxdfWFTv/3db2775f70a199b26bc47425ca16af18-1-removebg-preview.png"
          alt="Logo"
          className="mb-3"
          style={{ height: "100px", objectFit: "contain" }}
        />
        <h4 className="mb-4 fw-bold" style={{ color: "#4d4d4d" }}>
          Create an account
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            className="form-control rounded-pill py-2 px-3 mb-3"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={{
              borderColor: "#4d4d4d",
              color: "#4d4d4d",
              fontWeight: "500",
            }}
          />

          <input
            type="email"
            name="email"
            className="form-control rounded-pill py-2 px-3 mb-3"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              borderColor: "#4d4d4d",
              color: "#4d4d4d",
              fontWeight: "500",
            }}
          />

          <input
            type="tel"
            name="phone"
            className="form-control rounded-pill py-2 px-3 mb-3"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={{
              borderColor: "#4d4d4d",
              color: "#4d4d4d",
              fontWeight: "500",
            }}
          />

          <input
            type="password"
            name="password"
            className="form-control rounded-pill py-2 px-3 mb-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              borderColor: "#4d4d4d",
              color: "#4d4d4d",
              fontWeight: "500",
            }}
          />

          <input
            type="password"
            name="confirmPassword"
            className="form-control rounded-pill py-2 px-3 mb-3"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              borderColor: "#4d4d4d",
              color: "#4d4d4d",
              fontWeight: "500",
            }}
          />

          <div className="form-check text-start mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="agreeTerms"
              id="terms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            <label className="form-check-label small" htmlFor="terms">
              I agree to the{" "}
              <span className="text-success">terms and conditions</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-success rounded-pill w-100 py-2 fw-semibold"
          >
            Sign Up
          </button>

          <p className="mt-3" style={{ color: "#4d4d4d" }}>
            Already have an account?{" "}
            <Link
              to="/"
              className="text-success fw-semibold text-decoration-none"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
