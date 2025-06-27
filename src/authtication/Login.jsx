import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
      localStorage.setItem("userName", role);

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
    <div className="login-page-container">
      <main className="login-main">
        <div className="login-container">
          <img
            src="https://i.ibb.co/KxdfWFTv/3db2775f70a199b26bc47425ca16af18-1-removebg-preview.png"
            alt="Logo"
            className="login-logo"
          />
          <h4 className="login-title">Client sign-in</h4>

          {!showSignUp ? (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="forgot-password">
                <a href="#" className="forgot-link">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="login-button">
                Sign in
              </button>

              <p className="toggle-form-text">
                Don't have an account?{" "}
                <Link className="toggle-form-link" onClick={toggleForm}>
                  Sign up
                </Link>
              </p>

              <div className="role-buttons">
                {Object.keys(roleCredentials).map((r) => (
                  <button
                    type="button"
                    key={r}
                    className={`role-button ${role === r ? "active" : ""}`}
                    onClick={() => handleRoleSelect(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </form>
          ) : (
            <form className="signup-form">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
              />
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
              />
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />

              <div className="terms-checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I agree to the <span>terms and conditions</span>
                </label>
              </div>

              <button className="signup-button">Sign Up</button>

              <p className="toggle-form-text">
                Already have an account?{" "}
                <Link className="toggle-form-link" onClick={toggleForm}>
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;