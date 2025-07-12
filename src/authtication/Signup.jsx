import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BASE_URL from "../utils/baseURL";
import logo from "../assets/logo.png"; 
import emailjs from "emailjs-com";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    address: "",
    creditLine: "",
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
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
      });
      return;
    }

    const finalData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "confirmPassword") {
        finalData.append(key, formData[key]);
      }
    });

    if (gstDoc) finalData.append("gstDoc", gstDoc);
    if (panDoc) finalData.append("panDoc", panDoc);

    try {
    const response =  await axios.post(`${BASE_URL}/createcustumer`, finalData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    //  const customer = response.data.customer;
  // 2. Prepare and send email via EmailJS
    const templateParams = {
      user_name: formData.customerName,
      user_email: formData.email,
      user_subject: "New Customer Registered Successfully",
      user_message: "Please verify the customer's uploaded documents.",
    //  gst_doc_link: customer.gstDoc, 
    //   pan_doc_link: customer.panDoc, 
    };

    await emailjs.send(
      "service_56d40ci",        // your EmailJS service ID
      "template_yxebwpp",       // your EmailJS template ID
      templateParams,
      "rq4-yuCE_eCh_aNjL"       // your EmailJS public key
    );
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now login.",
      }).then(() => navigate("/"));
    } catch (err) {
      console.error("❌ Signup error:", err);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#ccf8db" }}>
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 p-4 rounded shadow text-center bg-green">
        <img
          src={logo}
          alt="Logo"
          className="mb-3"
          style={{ height: "80px", objectFit: "contain" }}
        />
        <h4 className="mb-4 fw-bold text-dark">Client Registration</h4>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input type="text" name="customerName" className="form-control input-green" placeholder="Full Name" value={formData.customerName} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="companyName" className="form-control input-green" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="email" name="email" className="form-control input-green" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="tel" name="phoneNumber" className="form-control input-green" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="address" className="form-control input-green" placeholder="Address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="number" name="creditLine" className="form-control input-green" placeholder="Credit Line ₹" value={formData.creditLine} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="password" name="password" className="form-control input-green" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="password" name="confirmPassword" className="form-control input-green" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Upload  Document</label>
              <input type="file" className="form-control input-green" accept=".jpg,.png,.pdf" onChange={(e) => setGstDoc(e.target.files[0])} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Upload  Document</label>
              <input type="file" className="form-control input-green" accept=".jpg,.png,.pdf" onChange={(e) => setPanDoc(e.target.files[0])} required />
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">Sign Up</button>
           <p className="mt-3" style={{ color: "#4d4d4d" }}>
         Already have an account?{" "}
            <Link to="/" className="text-success fw-semibold text-decoration-none">
               Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
