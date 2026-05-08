import React, { useState } from "react";
import "./UpdateAppointment.css"; 
import { FaBars, FaMoon, FaSun, FaUserCircle, FaCalendarAlt, FaSave } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import logoImg from "../../assets/logo.png"; 

export default function UpdateAppointment() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");


  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const day = date.getUTCDay(); 

    if (day === 5) {
      alert("Friday is a holiday. Please choose another day.");
      setSelectedDate("");
    } else {
      setSelectedDate(e.target.value);
    }
  };

  return (
    <div className={`appointment-page ${darkMode ? "dark" : ""}`}>
      <div className="page-overlay">
        
        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <FaUserCircle size={30} color={darkMode ? "white" : "#3b3f2e"} />
          </div>
          <div className="topbar-center">
            <div className="nav-item">Home</div>
            <div className="nav-item">Dashboard</div>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" /> : <FaMoon />}
            </button>
            <button className="icon-btn"><MdLanguage /></button>
          </div>
        </div>

        <div className="main-layout">
           <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item ">Profile</div>
              <div className="sidebar-item">Dashboard</div>
              <div className="sidebar-item ">Management</div>
              <div className="sidebar-item">Refund Requests</div>
              <div className="sidebar-item">Add Treatment</div>
              <div className="sidebar-item ">Edit Treatment</div>
              <div className="sidebar-item active">Management Appointment</div>

            </div>
          </div>

          <div className="content-wrapper">
            <div className="logo-section">
              <img src={logoImg} alt="Logo" className="page-logo" />
            </div>

            <h2 className="page-title">Edit Appointment Date</h2>

            <div className="appointment-card">
              <div className="card-header">Select Date</div>
              
              <div className="input-field">
                <label><FaCalendarAlt /> New Appointment Date:</label>
                <input 
                  type="date" 
                  className="date-picker"
                  min={today}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
                <p className="hint-text">* Note: Fridays are not available for booking.</p>
              </div>

              <button className="save-btn">
                <FaSave /> Save New Date
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}