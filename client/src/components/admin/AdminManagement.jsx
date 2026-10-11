import React, { useState } from "react";
import "./Admin.css";
import { FaMoon, FaSun, FaBars, FaTrashAlt } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AdminManagement() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [centerName, setCenterName] = useState("");


  const handleRemoveCenter = async () => {
    if (!centerName.trim()) {
      alert("Please enter center name");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${centerName}?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3002/remove-center", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          centerName: centerName.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to remove center");
        return;
      }

      alert("Center removed successfully!");
      setCenterName("");
    } catch (error) {
      alert("Cannot connect to server");
    }
  };


  return (
    <div className={`admin-page ${darkMode ? "dark" : ""}`}>
      <div className="overlay">

        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <span className="menu-text">Menu</span>
          </div>
          <div className="topbar-center">
            <span className="nav-item active">
              Admin Management
            </span>

            <span
              className="nav-item"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </span>
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
              <div
                className="sidebar-item"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </div>
              <div
                className="sidebar-item active"
                onClick={() => setShowAdminMenu(!showAdminMenu)}
                style={{ cursor: "pointer" }}
              >
                Admin Management
              </div>

              {showAdminMenu && (
                <div style={{ paddingLeft: "25px" }}>
                  <div
                    className="sidebar-item"
                    onClick={() => navigate("/admin/management")}
                  >
                    Remove Center
                  </div>

                  <div
                    className="sidebar-item"
                    onClick={() => navigate("/admin/register-center")}
                  >
                    Register Center
                  </div>

                  <div
                    className="sidebar-item"
                    onClick={() => navigate("/admin/messages")}
                  >
                    Messages
                  </div>
                </div>
              )}
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline style={{ marginRight: '8px' }} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <img src="/logo.png" alt="logo" className="logo" />
            <h2 className="title">Admin Management</h2>
            <div className="management-card">
              <input
                type="text"
                placeholder="Enter Center Name"
                className="input"
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
              />
              <button
                className="remove-btn"
                onClick={handleRemoveCenter}
              >
                <FaTrashAlt style={{ marginRight: '8px' }} />
                Remove Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
