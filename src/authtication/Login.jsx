import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Add this at the top
import "./Login.css"; // Import your CSS file for styling
const Login = () => {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const roleCredentials = {
    Admin: { email: "admin123", password: "admin@123" },
    Customer: { email: "Customer123", password: "Customer@123" },
  };

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      Swal.fire({
        icon: "warning",
        title: "Select Role",
        text: "Please select a role before logging in.",
      });
      return;
    }

    const credentials = roleCredentials[role];

    if (email === credentials.email && password === credentials.password) {
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", role); // Replace with actual name from API


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
        if (role === "Admin") {
          navigate("/dashboard");
        } else if (role === "Customer") {
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
    <>
      <main className="">
        <div className="login-container" style={{ backgroundColor: "#ccf8db" }}>
          {/* <img
            src="https://i.ibb.co/KxdfWFTv/3db2775f70a199b26bc47425ca16af18-1-removebg-preview.png"
            alt="Logo"
            className="mb-1"
            style={{ height: "100px", objectFit: "contain" }}
          /> */}
          <h4 className="mb-4 fw-bold" style={{ color: "#4d4d4d" }}>
            Client sign-in
          </h4>

          {!showSignUp ? (
            // Login Form
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control rounded-pill py-2 px-3"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // ✅ Make editable
                  style={{
                    borderColor: "#4d4d4d",
                    color: "#4d4d4d",
                    fontWeight: "500",
                  }}
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control rounded-pill py-2 px-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // ✅ Make editable
                  style={{
                    borderColor: "#4d4d4d",
                    color: "#4d4d4d",
                    fontWeight: "500",
                  }}
                />
              </div>
              <div className="d-flex justify-content-end mb-4">
                <a href="#" className="text-decoration-none text-secondary">
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
                Don’t have an account?{" "}
                <Link
                  className="text-success fw-semibold text-decoration-none"
                  onClick={toggleForm}
                >
                  Sign up
                </Link>
              </p>

              <div className="d-flex flex-wrap justify-content-center mt-3 gap-2">
                {Object.keys(roleCredentials).map((r) => (
                  <button
                    type="button"
                    key={r}
                    className={`btn ${role === r ? "btn-success" : "btn-outline-success"
                      } px-4 py-2 rounded-pill shadow-sm`}
                    style={{
                      minWidth: "120px",
                      fontWeight: "500",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => handleRoleSelect(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>

            </form>
          ) : (
            // Sign-Up Form
            <form className="signup-form">
              <input
                type="text"
                className="form-control rounded-pill py-2 px-3"
                placeholder="Full Name"
                style={{
                  borderColor: "#4d4d4d",
                  color: "#4d4d4d",
                  fontWeight: "500",
                }}
              />
              <input
                type="email"
                className="form-control rounded-pill py-2 px-3"
                placeholder="Email Address"
                style={{
                  borderColor: "#4d4d4d",
                  color: "#4d4d4d",
                  fontWeight: "500",
                }}
              />
              <input
                type="tel"
                className="form-control rounded-pill py-2 px-3"
                placeholder="Phone Number"
                style={{
                  borderColor: "#4d4d4d",
                  color: "#4d4d4d",
                  fontWeight: "500",
                }}
              />
              <input
                type="password"
                className="form-control rounded-pill py-2 px-3"
                placeholder="Password"
                style={{
                  borderColor: "#4d4d4d",
                  color: "#4d4d4d",
                  fontWeight: "500",
                }}
              />
              <input
                type="password"
                className="form-control rounded-pill py-2 px-3"
                placeholder="Confirm Password"
                style={{
                  borderColor: "#4d4d4d",
                  color: "#4d4d4d",
                  fontWeight: "500",
                }}
              />

              <div className="form-check text-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                />
                <label className="form-check-label small" htmlFor="terms">
                  I agree to the{" "}
                  <span className="text-success">terms and conditions</span>
                </label>
              </div>

              <button
                className="btn btn-success rounded-pill py-2 fw-semibold"
              >
                Sign Up
              </button>

              <p className="mt-2" style={{ color: "#4d4d4d" }}>
                Already have an account?{" "}
                <Link
                  onClick={toggleForm}
                  className="text-success fw-semibold text-decoration-none"
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default Login;