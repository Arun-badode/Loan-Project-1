import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BASE_URL from "../utils/baseURL";
import logo from "../assets/logo.png";
import emailjs from "emailjs-com";

const Signup = () => {
  const navigate = useNavigate();

  const [randomFive, setRandomFive] = useState(() =>
    Math.floor(10000 + Math.random() * 90000)
  );

  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    einLastFour: "", // 👈 only last 4 digits here
    password: "",
    confirmPassword: "",
  });

  const [gstDoc, setGstDoc] = useState(null);
  const [panDoc, setPanDoc] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    Swal.fire({ icon: "error", title: "Password Mismatch", text: "Passwords do not match!" });
    return;
  }

  if (formData.einLastFour.length !== 4 || isNaN(formData.einLastFour)) {
    Swal.fire({ icon: "error", title: "Invalid EIN", text: "Enter 4-digit EIN" });
    return;
  }

  const fullEin = `${randomFive}${formData.einLastFour}`;

  const finalData = new FormData();
  finalData.append("customerName", formData.customerName);
  finalData.append("companyName", formData.companyName);
  finalData.append("email", formData.email);
  finalData.append("phoneNumber", formData.phoneNumber);
  finalData.append("password", formData.password);
  finalData.append("einNumber", fullEin); // 👈 Final EIN ready

  if (gstDoc) finalData.append("gstDoc", gstDoc);
  if (panDoc) finalData.append("panDoc", panDoc);

  try {
    await axios.post(`${BASE_URL}/createcustumer`, finalData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Optional: notify admin via email
    const templateParams = {
      user_name: formData.customerName,
      user_email: formData.email,
      user_subject: "New Customer Registered",
      user_message: `Generated EIN: ${fullEin}`,
    };

    await emailjs.send(
      "service_56d40ci",
      "template_yxebwpp",
      templateParams,
      "rq4-yuCE_eCh_aNjL"
    );

    Swal.fire({ icon: "success", title: "Registered", text: "Congratulations, you may login to your account. Generally your credit line is available within several business hours, but please allow up to 48 business hours for activation." }).then(() =>
      navigate("/")
    );
  } catch (err) {
    console.error("Signup error:", err);
    Swal.fire({ icon: "error", title: "Signup Failed", text: "Try again later." });
  }
};


  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#ccf8db" }}
    >
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 p-4 rounded shadow text-center bg-green">
        <img
          src={logo}
          alt="Logo"
          className="mb-3"
          style={{ height: "100px", objectFit: "contain" }}
        />
        <h4 className="mb-4 fw-bold text-dark">Client Registration</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="customerName"
                className="form-control input-green"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="companyName"
                className="form-control input-green"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="email"
                name="email"
                className="form-control input-green"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="tel"
                name="phoneNumber"
                className="form-control input-green"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="password"
                name="password"
                className="form-control input-green"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-control input-green"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
  <label className="form-label fw-semibold">  Account Number </label>
  <div className="input-group">
    {/* 5-digit readonly field */}
    <input
      type="text"
      className="form-control input-green"
      value={randomFive}
      readOnly
      style={{ backgroundColor: "#e9ecef" }}
    />

    {/* Last 4 digits input from user */}
    <input
      type="text"
      name="einLastFour"
      className="form-control input-green"
      placeholder="Last 4 of EIN"
      value={formData.einLastFour}
      onChange={handleChange}
      maxLength={4}
      required
    />
  </div>
  <small className="text-muted">
    Your full account number will be: <strong>{randomFive}{formData.einLastFour}</strong>
  </small>
</div>

          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">
            Sign Up
          </button>
          <p className="mt-3" style={{ color: "#4d4d4d" }}>
            Already have an account?{" "}
            <Link
              to="/"
              className="text-success fw-semibold text-decoration-none"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
