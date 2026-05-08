import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import logoImg from "../../assets/logo.png";
import "./Center.css";

export default function AddTreatment() {
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
            <FaUserCircle size={28} className="nav-item" />
            
          </div>

          <div className="topbar-center">
            <div className="nav-item">Home</div>
            <div className="nav-item">Dashboard</div>
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
              <div className="sidebar-item ">Profile</div>
              <div className="sidebar-item">Dashboard</div>
              <div className="sidebar-item ">Management</div>
              <div className="sidebar-item">Refund Requests</div>
              <div className="sidebar-item active">Add Treatment</div>
              <div className="sidebar-item">Edit Treatment</div>
              <div className="sidebar-item">Management Appointment</div>

            </div>
          </div>
          <div className="content-wrapper">

            <img 
              src={logoImg} 
              alt="HCS Logo" 
              className="profile-logo" 
              style={{ width: '180px', height: 'auto', marginBottom: '10px' }} 
            />
            <h2 className="title">Add Treatment</h2>

            <form className="form-box">
              <div className="form-group">
                <label className="card-label">Treatment Name</label>
                <input type="text" className="styled-input" placeholder="Hijama (cupping Therapy)" />
              </div>

             
              <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="card-label">Price</label>
                  <input type="text" className="styled-input" placeholder="10 OMR" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="card-label">Duration</label>
                  <input type="text" className="styled-input" placeholder="45 min" />
                </div>
              </div>

              <div className="form-group">
                <label className="card-label">Upload Image Link</label>
                <input type="text" className="styled-input" placeholder="https://..." />
              </div>

              <div className="form-group">
                <label className="card-label">Location</label>
                <input type="text" className="styled-input" placeholder="Muscat" />
              </div>

              <div className="form-group">
                <label className="card-label">Description</label>
                <textarea className="styled-input" rows="3" placeholder="Enter description here..."></textarea>
              </div>

            
              <div className="form-actions" style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>Add</button>
                <button type="button" className="save-btn cancel-btn" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}