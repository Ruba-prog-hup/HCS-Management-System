import React, { useState } from "react";
import "./Admin.css";
import { MdLanguage } from "react-icons/md";
import { FaMoon, FaSun, FaBars, FaTrashAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = ({ open }) => {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-content">
        <div className="sidebar-item">Centers</div>
        <div className="sidebar-item active">Admin Management</div>
        <div className="sidebar-item">Dashboard</div>
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

export default function AdminManagement() {
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
            <img src="/logo.png" alt="logo" className="logo" />

            <h2 className="title">Admin Management</h2>

            <div className="management-card">
              <input
                type="text"
                placeholder="Enter Center Name"
                className="input"
              />
              <button className="remove-btn">
                <FaTrashAlt style={{marginRight: '8px'}} /> Remove Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}