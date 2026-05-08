import React, { useState } from "react";
import "./AppointmentRefundApproval.css";
import { FaBars, FaMoon, FaSun, FaUserCircle, FaCheckCircle, FaTimesCircle, FaHistory } from "react-icons/fa";
import { MdLanguage, MdOutlineAttachMoney } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import logoImg from "../../assets/logo.png";

export default function AppointmentRefundApproval() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

 
  const [refundRequests, setRefundRequests] = useState([
    { id: 1, patient: "Ahmed Ali", service: "Hijama", amount: "15 OMR", reason: "Double Booking" },
    { id: 2, patient: "Sara Salem", service: "Bee Venom", amount: "25 OMR", reason: "Health Emergency" },
    { id: 3, patient: "John Doe", service: "Herbal Medicine", amount: "10 OMR", reason: "Travel Plans Changed" },
  ]);

  return (
    <div className={`refund-page ${darkMode ? "dark" : ""}`}>
      <div className="refund-overlay">
        
       
        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <FaUserCircle size={30} color={darkMode ? "white" : "#3b3f2e"} />
          </div>
          <div className="topbar-center">
            <div className="nav-item">Home</div>
            <div className="nav-item active-nav">Dashboard</div>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" /> : <FaMoon />}
            </button>
            <button className="icon-btn"><MdLanguage /></button>
          </div>
        </div>

        <div className="refund-layout">
       
          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item">Profile</div>
              <div className="sidebar-item">Dashboard</div>
              <div className="sidebar-item">Management</div>
              <div className="sidebar-item active">Refund Requests</div>
              <div className="sidebar-item">Add Treatment</div>
              <div className="sidebar-item">Edit Treatment</div>
              <div className="sidebar-item">Management Appointment</div>
            </div>
            <div className="sidebar-logout"><IoLogOutOutline /> Logout</div>
          </div>

          
          <div className="refund-content">
            <div className="logo-container">
              <img src={logoImg} alt="Logo" className="refund-logo" />
            </div>

            <h2 className="title">Refund Requests Approval</h2>

            <div className="requests-container">
              {refundRequests.map((request) => (
                <div key={request.id} className="refund-card">
                  <div className="request-info">
                    <div className="patient-name">{request.patient}</div>
                    <div className="service-name">{request.service} - <span className="price">{request.amount}</span></div>
                    <div className="refund-reason">Reason: {request.reason}</div>
                  </div>
                  
                  <div className="approval-actions">
                    <button className="approve-btn">
                      <FaCheckCircle /> Approve
                    </button>
                    <button className="reject-btn">
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}