import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BASE_URL from "../utils/baseURL";
import logo from "../assets/logo.png"; // Adjust the path as needed

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
       console.log("✅ Login response:", response.data.customer);
      const { role } = response.data.customer;
      // Store in localStorage
      localStorage.setItem("userRole", role);
      localStorage.setItem("login_id", JSON.stringify(response.data.customer.id) );
      localStorage.setItem("token", response.data.customer.token);
      localStorage.setItem("login-detail", JSON.stringify(response.data.customer));

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
        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "customer") {
          navigate("/customer-dashboard");
        } else {
          Swal.fire("Unknown role", "No matching dashboard for this role.", "warning");
        }
      }, 1000);
    } catch (err) {
      console.error("❌ Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err?.response?.data?.message || "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center rounded-5" style={{ backgroundColor: "#ccf8db" }}>
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4 rounded shadow text-center">
        <img
          src={logo}
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
