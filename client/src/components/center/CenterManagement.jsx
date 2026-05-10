import React, { useState } from "react";
import "./Management.css";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { MdLanguage, MdAccountCircle } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";

export default function CenterManagement() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const categories = ["Hijama", "Bee Venom", "Herbal Medicine"];

  return (
    <div className={`center-page ${darkMode ? "dark" : ""}`}>
      <div className="center-overlay">

       
        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <button className="icon-btn profile-nav-btn" onClick={() => navigate("/center/center-profile")}>
              <MdAccountCircle size={32} />
            </button>
            <span className="menu-text">Center Panel</span>
          </div>
          
          <div className="topbar-center">
            <div className="nav-item" onClick={() => navigate("/center/dashboard")}>Dashboard</div>
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
              <div className="sidebar-item" onClick={() => navigate("/center/center-profile")}>Profile</div>
              <div className="sidebar-item" onClick={() => navigate("/center/dashboard")}>Dashboard</div>
              <div className="sidebar-item active">Management</div>
              <div className="sidebar-item" onClick={() => navigate("/center/appointment-refundApproval")}>Refund Requests</div>
              <div className="sidebar-item" onClick={() => navigate("/center/add-treatment")}>Add Treatment</div>
              <div className="sidebar-item" onClick={() => navigate("/center/edit-treatment")}>Edit Treatment</div>
              <div className="sidebar-item" onClick={() => navigate("/center/management-appointment")}>Management Appointments</div>
            </div>
            
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline size={20} /> Logout
            </div>
          </div>

         
          <div className="content-wrapper">
            <img src={logoImg} alt="HCS Logo" className="profile-logo" style={{ width: '180px', marginBottom: '10px' }} />
            
            <h2 className="title">Center Management</h2>

            <div className="categories-box">
              <div className="box-header">Existing Categories</div>

              {categories.map((cat, index) => (
                <div key={index} className="category-row">
                  <span className="category-name">{cat}</span>
                  <div className="action-buttons">
                    <button className="btn-dark">Edit</button>
                    <button className="btn-dark delete-btn">Delete</button>
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
