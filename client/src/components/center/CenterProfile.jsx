import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import logoImg from "../../assets/logo.png";
import "./Center.css";

export default function CenterProfile() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`center-page ${darkMode ? "dark" : ""}`}>
      <div className="center-overlay">


        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}>
              <FaBars size={20} />
            </button>
            <FaUserCircle size={25} className="nav-item" style={{ marginLeft: '10px' }} />
          </div>

          <div className="topbar-center">
            {["Home", "Dashboard"].map((item) => (
              <div key={item} className={`nav-item ${item === "Settings" ? "active-link" : ""}`}>
                {item}
              </div>
            ))}
          </div>

          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" size={20} /> : <FaMoon size={20} />}
            </button>
            <button className="icon-btn">
              <MdLanguage size={22} />
            </button>
          </div>
        </div>

        <div className="layout">

          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item active">Profile</div>
              <div className="sidebar-item">Dashboard</div>
              <div className="sidebar-item ">Management</div>
              <div className="sidebar-item">Refund Requests</div>
              <div className="sidebar-item">Add Treatment</div>
              <div className="sidebar-item">Edit Treatment</div>
              <div className="sidebar-item">Management Appointment</div>

            </div>
          </div>



          <div className="content-wrapper">

            <img src={logoImg} alt="HCS Logo" className="profile-logo" style={{ width: '180px', marginBottom: '10px' }} />
            <h2 className="title">Center Profile</h2>

            <form className="form-box">
              <div className="form-group">
                <label className="card-label">Center Name</label>
                <input type="text" className="styled-input" placeholder="Enter Name" />
              </div>

              <div className="form-group">
                <label className="card-label">Upload Image Link</label>
                <input type="text" className="styled-input" placeholder="https://..." />
              </div>

              <button type="button" className="save-btn">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}