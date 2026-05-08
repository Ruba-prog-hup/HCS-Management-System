import React, { useState } from "react";
import "./Admin.css";
import { MdOutlineCalendarMonth, MdLanguage } from "react-icons/md";
import { FaUsers, FaPlus, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = ({ open }) => {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-content">
        <div className="sidebar-item">Centers</div>
        <div className="sidebar-item">Admin Management</div>
        <div className="sidebar-item active">Dashboard</div>
      </div>
      <div className="sidebar-logout">
        <IoLogOutOutline size="1.2rem" style={{marginRight: '8px'}} /> Logout
      </div>
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
        <span className="menu-text">Menu</span>
      </div>
      <div className="topbar-center">
        {["Home", "Centers", "Dashboard"].map((item) => (
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

export default function AdminDashboard() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`admin-page ${darkMode ? "dark" : ""}`}>
      <div className="overlay">
        <TopNavbar
          toggleMenu={() => setOpen(!open)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div className="layout">
          <Sidebar open={open} />
         
          <div className="content-wrapper"> 
            <h2 className="title">Admin Dashboard</h2>
            <div className="cards-container">
              <div className="card">
                <MdOutlineCalendarMonth className="card-icon" />
                <p>Total Centers</p>
                <h3>44</h3>
              </div>
              <div className="card">
                <FaUsers className="card-icon" />
                <p>Total Users</p>
                <h3>20</h3>
              </div>
              <div className="card">
                <FaPlus className="card-icon" />
                <p>Total Booking</p>
                <h3>12</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}