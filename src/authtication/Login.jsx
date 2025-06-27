import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  
  const roleCredentials = {
    Admin: { email: "admin123", password: "admin@123" },
    Customer: { email: "customer123", password: "customer@123" },
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
        if (matchedRole === "Admin") {
          navigate("/dashboard");
        } else if (matchedRole === "Customer") {
          navigate("/customer-dashboard");
        }
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials. Please try again.",
      });
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setEmail(roleCredentials[selectedRole].email);
    setPassword(roleCredentials[selectedRole].password);
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
              style={{
                borderColor: "#4d4d4d",
                color: "#4d4d4d",
                fontWeight: "500",
              }}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control rounded-pill py-2 px-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderColor: "#4d4d4d",
                color: "#4d4d4d",
                fontWeight: "500",
              }}
            />
          </div>
          
          <div className="d-flex justify-content-end mb-4">
            <a href="/forgotpassword" className="text-decoration-none text-secondary">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-success rounded-pill w-100 py-2 fw-semibold"
          >
            Sign in
          </button>

          <p className="mt-3" style={{ color: "#4d4d4d" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-success fw-semibold text-decoration-none"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;