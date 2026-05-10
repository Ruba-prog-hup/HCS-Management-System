import React, { useState } from "react";
import "./Admin.css";
import { MdOutlineCalendarMonth, MdLanguage } from "react-icons/md";
import { FaUsers, FaPlus, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCard, setActiveCard] = useState(""); 

 
  const centersData = [
    { id: 1, name: "Abna Freish Center" },
    { id: 2, name: "Muscat Hijama Center" },
    { id: 3, name: "Al Manar Hijama Center" },
    { id: 4, name: "AlYahyaei Hijama Center" },
    { id: 5, name: "BMC Center" }
  ];


  const usersData = [
    { id: 1, name: "Ahmed Al-Balushi", email: "ahmed.balushi@example.com" },
    { id: 2, name: "Sara Al-Riyami", email: "sara.riyami@example.com" },
    { id: 3, name: "Mazin Al-Harthy", email: "mazin.harthy@example.com" }
  ];


  const bookingsData = [
    { id: 1, userEmail: "ahmed.balushi@example.com", date: "15 May 2026", time: "10:00 AM", center: "Abna Freish Center" },
    { id: 2, userEmail: "sara.riyami@example.com", date: "16 May 2026", time: "11:30 AM", center: "Muscat Hijama Center" },
    { id: 3, userEmail: "mazin.harthy@example.com", date: "18 May 2026", time: "09:00 AM", center: "BMC Center" },
  ];

  return (
    <div className={`admin-page ${darkMode ? "dark" : ""}`}>
      <div className="overlay">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars /></button>
            <span className="menu-text">Menu</span>
          </div>
          <div className="topbar-center">            
            <span className="nav-item" onClick={() => navigate("/admin/management")}>Admin Management</span>
            <span className="nav-item active">Dashboard</span>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" /> : <FaMoon />}
            </button>
            <button className="icon-btn" onClick={() => alert("Language Switched!")}><MdLanguage /></button>
          </div>
        </div>

        <div className="layout">
          {/* Sidebar */}
          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item" onClick={() => navigate("/admin/management")}>Admin Management</div>
              <div className="sidebar-item active">Dashboard</div>
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline style={{marginRight: '8px'}} /> Logout
            </div>
          </div>

          {/* Main Content */}
          <div className="content-wrapper">
            <h2 className="title">Admin Dashboard</h2>
            
            <div className="cards-container">
            
              <div 
                className={`card clickable-card ${activeCard === "centers" ? "active-card" : ""}`} 
                onClick={() => setActiveCard(activeCard === "centers" ? "" : "centers")}
              >
                <MdOutlineCalendarMonth className="card-icon" />
                <p>Total Centers</p>
                <h3>{centersData.length}</h3>
              </div>

              <div 
                className={`card clickable-card ${activeCard === "users" ? "active-card" : ""}`} 
                onClick={() => setActiveCard(activeCard === "users" ? "" : "users")}
              >
                <FaUsers className="card-icon" />
                <p>Total Users</p>
                <h3>{usersData.length}</h3>
              </div>

             
              <div 
                className={`card clickable-card ${activeCard === "bookings" ? "active-card" : ""}`} 
                onClick={() => setActiveCard(activeCard === "bookings" ? "" : "bookings")}
              >
                <FaPlus className="card-icon" />
                <p>Total Booking</p>
                <h3>{bookingsData.length}</h3>
              </div>
            </div>

            
            {activeCard === "centers" && (
              <div className="dashboard-record-box">
                <h2>Centers Summary</h2>
                <div className="records-grid">
                  {centersData.map((center) => (
                    <div key={center.id} className="dashboard-record-card">
                      <p><strong>Center Name:</strong> {center.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

           
            {activeCard === "users" && (
              <div className="dashboard-record-box">
                <h2>Users Summary</h2>
                <div className="records-grid">
                  {usersData.map((user) => (
                    <div key={user.id} className="dashboard-record-card">
                      <p><strong>Name:</strong> {user.name}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          
            {activeCard === "bookings" && (
              <div className="dashboard-record-box">
                <h2>Bookings Summary</h2>
                <div className="records-grid">
                  {bookingsData.map((booking, index) => (
                    <div key={index} className="dashboard-record-card">
                      <p><strong>User:</strong> {booking.userEmail}</p>
                      <p><strong>Center:</strong> {booking.center}</p>
                      <p><strong>Date:</strong> {booking.date} | {booking.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
