import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <>
      <main>
        <div className="login-container" style={{ backgroundColor: '#ccf8db' }}>
          <img
            src="https://i.ibb.co/KxdfWFTv/3db2775f70a199b26bc47425ca16af18-1-removebg-preview.png"
            alt="Logo"
            className="mb-1"
            style={{ height: "150px", objectFit: "contain" }}
          />
          <h3 className="mb-4 fw-bold" style={{ color: "#4d4d4d" }}>
            Client sign-in
          </h3>

          {!showSignUp ? (
            // Login Form
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control rounded-pill py-2 px-3"
                  placeholder="Username"
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

               <Link to="/dashboard">
        <button style={{background:"green"}} className="btn btn-danger rounded-pill w-100 py-2 fw-semibold">
          Sign in
        </button>
        </Link>
        <p className="mt-3" style={{ color: '#4d4d4d' }}>
          Don’t have an account?{' '}
          <Link  className="text-danger fw-semibold text-decoration-none"  onClick={toggleForm}>
            Sign up
          </Link>
        </p>
              {/* <div className="d-flex">
                <Link style={{ color: "white" }} to="/dashboard">
                  <button
                    type="submit"
                    className="px-4 py-2 ms-1 btn-primary shadow"
                  >
                    Login
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={toggleForm}
                  className="px-4 py-2 ms-4 btn-outline-primary"
                >
                  Sign Up
                </button>
              </div> */}
            </form>
          ) : (
            // Sign-Up Form
            <form className="signup-form">
              
                <input
            type="text"
            className="form-control rounded-pill py-2 px-3"
            placeholder="Full Name"
            style={{ borderColor: '#4d4d4d', color: '#4d4d4d', fontWeight: '500' }}
          />
          <input
            type="email"
            className="form-control rounded-pill py-2 px-3"
            placeholder="Email Address"
            style={{ borderColor: '#4d4d4d', color: '#4d4d4d', fontWeight: '500' }}
          />
           <input
            type="tel"
            className="form-control rounded-pill py-2 px-3"
            placeholder="Phone Number"
            style={{ borderColor: '#4d4d4d', color: '#4d4d4d', fontWeight: '500' }}
          />
          <input
            type="password"
            className="form-control rounded-pill py-2 px-3"
            placeholder="Password"
            style={{ borderColor: '#4d4d4d', color: '#4d4d4d', fontWeight: '500' }}
          />
          <input
            type="password"
            className="form-control rounded-pill py-2 px-3"
            placeholder="Confirm Password"
            style={{ borderColor: '#4d4d4d', color: '#4d4d4d', fontWeight: '500' }}
          />
             
              {/* <div className="form-row">
                <select className="form-input">
                  <option value="" disabled selected>
                    Gender *
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="City *"
                  className="form-input "
                />
              </div> */}
              {/* <div className="form-row ">
                <input
                  type="text"
                  placeholder="State *"
                  className="form-input "
                />
                <input
                  type="text"
                  placeholder="Country *"
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <select className="form-input">
                  <option value="" disabled selected>
                    User Type *
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <input
                  type="password"
                  placeholder="Password *"
                  className="form-input"
                />
              </div> */}
              {/* <div className="form-row ">
                <input
                  type="password"
                  placeholder="Confirm Password *"
                  className="form-input"
                />
              </div> */}
               <div className="form-check text-start">
            <input className="form-check-input" type="checkbox" id="terms" />
            <label className="form-check-label small" htmlFor="terms">
              I agree to the <span className="text-danger">terms and conditions</span>
            </label>
          </div>

          <button style={{background:"green"}} className="btn btn-danger rounded-pill py-2 fw-semibold">
            Sign Up
          </button>

           <p className="mt-2" style={{ color: '#4d4d4d' }}>
          Already have an account?{' '}
          <Link onClick={toggleForm} className="text-danger fw-semibold text-decoration-none">
            Sign in
          </Link>
        </p>
              {/* <div className="d-flex">
                <button
                  type="submit"
                  className="px-4 py-2 ms-1 btn-primary shadow"
                  style={{ border: "none" }}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={toggleForm}
                  className="px-4 py-2 ms-4 "
                  style={{ border: "2px solid #578e7e", color: "#578e7e" }}
                >
                  Login
                </button>
              </div> */}
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default Login;
