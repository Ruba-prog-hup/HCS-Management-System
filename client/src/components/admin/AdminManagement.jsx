import React, { useState } from "react";
import "./Admin.css";
import { FaMoon, FaSun, FaBars, FaTrashAlt } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AdminManagement() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`admin-page ${darkMode ? "dark" : ""}`}>
      <div className="overlay">
        
        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <span className="menu-text">Menu</span>
          </div>
          <div className="topbar-center">
            <span className="nav-item">Admin Management</span>
            <span className="nav-item" onClick={() => navigate("/admin/dashboard")}>Dashboard</span>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" /> : <FaMoon />}
            </button>
            <button className="icon-btn"><MdLanguage /></button>
          </div>
        </div>

        <div className="layout">
          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item active">Admin Management</div>
              <div className="sidebar-item" onClick={() => navigate("/admin/dashboard")}>Dashboard</div>
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline style={{marginRight: '8px'}} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <img src="/logo.png" alt="logo" className="logo" />
            <h2 className="title">Admin Management</h2>
            <div className="management-card">
              <input type="text" placeholder="Enter Center Name" className="input" />
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
