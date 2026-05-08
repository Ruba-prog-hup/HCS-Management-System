import React, { useState } from "react";
import "./Center.css";
import { MdOutlineCalendarMonth, MdLanguage, MdOutlineReviews } from "react-icons/md";
import { FaUsers, FaMoon, FaSun, FaBars, FaCapsules } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = ({ open }) => {
  return (
     <div className={`sidebar ${open ? "open" : ""}`}>
                <div className="sidebar-content">
                  <div className="sidebar-item">Profile</div>
                  <div className="sidebar-item  active">Dashboard</div>
                  <div className="sidebar-item">Management</div>
                  <div className="sidebar-item">Refund Requests</div>
                  <div className="sidebar-item">Add Treatment</div>
                  <div className="sidebar-item">Edit Treatment</div>
                  <div className="sidebar-item">Management Appointment</div>
                </div>
                <div className="sidebar-logout"><IoLogOutOutline /> Logout</div>
              </div>
  );
};

const TopNavbar = ({ toggleMenu, darkMode, setDarkMode }) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="icon-btn" onClick={toggleMenu}>
          <FaBars />
          
        </button>
      </div>
      
      <div className="topbar-center">
        {["Home","Dashboard"].map((item) => (
          <div key={item} className="nav-item">{item}</div>
        ))}
      </div>
      
      <div className="topbar-right">
        <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun color="#f1c40f" /> : <FaMoon />}
        </button>
        <button className="icon-btn" onClick={() => alert("Language Switched!")}>
          <MdLanguage />
        </button>
      </div>
    </div>
  );
};

export default function CenterDashboard() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`center-page ${darkMode ? "dark" : ""}`}>
      <div className="center-overlay">
        <TopNavbar
          toggleMenu={() => setOpen(!open)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div className="layout">
          <Sidebar open={open} />
          <div className="content-wrapper"> 
            <h2 className="title">Center Dashboard</h2>
            <div className="cards-container">
              <div className="card">
                <MdOutlineCalendarMonth className="card-icon" />
                <p>Total Booking</p>
                <h3>44</h3>
              </div>
              <div className="card">
                <FaUsers className="card-icon" />
                <p>Users</p>
                <h3>20</h3>
              </div>
              <div className="card">
                <MdOutlineReviews className="card-icon" />
                <p>Reviews</p>
                <h3>4.5</h3>
              </div>
              <div className="card">
                <FaCapsules className="card-icon" />
                <p>Treatments</p>
                <h3>12</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}