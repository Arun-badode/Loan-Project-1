import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const roleCredentials = {
    Admin: { email: "admin@gmail.com", password: "admin123" },
    Customer: { email: "customer@gmail.com", password: "customer123" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let matchedRole = null;
    Object.keys(roleCredentials).forEach((r) => {
      const cred = roleCredentials[r];
      if (cred.email === email && cred.password === password) {
        matchedRole = r;
      }
    });

    if (matchedRole) {
      localStorage.setItem("userRole", matchedRole);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", matchedRole);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setTimeout(() => {
        navigate(matchedRole === "Admin" ? "/dashboard" : "/customer-dashboard");
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center rounded-5" style={{ backgroundColor: "#ccf8db" }}>
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded shadow bg-white text-center">
        <img
          src="https://i.ibb.co/KxdfWFTv/3db2775f70a199b26bc47425ca16af18-1-removebg-preview.png"
          alt="Logo"
          className="mb-3"
          style={{ height: "100px", objectFit: "contain" }}
        />
        <h4 className="mb-4 fw-bold" style={{ color: "#4d4d4d" }}>
          Client sign-in
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill py-2 px-3"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: "#4d4d4d", color: "#4d4d4d", fontWeight: "500" }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-pill py-2 px-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: "#4d4d4d", color: "#4d4d4d", fontWeight: "500" }}
            />
          </div>
          <div className="text-end mb-3">
            <Link to="/forgotpassword" className="text-decoration-none text-secondary">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-success rounded-pill w-100 py-2 fw-semibold"
          >
            Sign in
          </button>
          <p className="mt-3" style={{ color: "#4d4d4d" }}>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-success fw-semibold text-decoration-none">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
