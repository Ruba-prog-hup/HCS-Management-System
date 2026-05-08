import React, { useState } from "react";
import "./Management.css";
import { FaBars, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import logoImg from "../../assets/logo.png";

export default function CenterManagement() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const categories = ["Hijama", "Bee Venom", "Herbal Medicine"];

  return (
    <div className={`center-page ${darkMode ? "dark" : ""}`}>
      <div className="center-overlay">

        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}>
              <FaBars />
            </button>
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
            <button className="icon-btn">
              <MdLanguage />
            </button>
          </div>
        </div>

        <div className="layout">
          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item">Profile</div>
              <div className="sidebar-item  ">Dashboard</div>
              <div className="sidebar-item active">Management</div>
              <div className="sidebar-item">Refund Requests</div>
              <div className="sidebar-item">Add Treatment</div>
              <div className="sidebar-item">Edit Treatment</div>
              <div className="sidebar-item">Management Appointment</div>
            </div>
            <div className="sidebar-logout"><IoLogOutOutline /> Logout</div>
          </div>

          <div className="management-wrapper">

            <div className="logo-container">
              <img
                src={logoImg}
                alt="HCS Logo"
                className="hcs-logo"
              />
            </div>

            <h2 className="management-title">Center Management</h2>

            <div className="categories-box">
              <div className="box-header">Existing Categories</div>

              {categories.map((cat, index) => (
                <div key={index} className="category-row">
                  <span className="category-name">{cat}</span>
                  <div className="action-buttons" style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-dark">Edit</button>
                    <button className="btn-dark">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="add-category-btn">Add New Category</button>
          </div>
        </div>
      </div>
    </div>
  );
}