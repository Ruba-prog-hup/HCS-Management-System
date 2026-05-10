import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaEdit, FaTimesCircle, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { MdLanguage, MdAttachMoney, MdOutlineMedicalServices, MdEmail, MdAccountCircle } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import "./UpdateandCancelAppointment.css";
 
export default function UpdateandCancelAppointment() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
 
    const appointments = [
        {
            id: 1,
            customerName: "Ali Ahmed",
            email: "Ali@gmail.com",
            price: "10 OMR",
            duration: "45 Minutes",
            location: "Seeb",
            service: "Hijama Session"
        },
        {
            id: 2,
            customerName: "Sara Said",
            email: "Sara@gmail.om",
            price: "25 OMR",
            duration: "60 Minutes",
            location: "Bawshar",
            service: "Physical Therapy"
        }
    ];
 
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
                            <div className="sidebar-item" onClick={() => navigate("/center/management")}>Management</div>
                            <div className="sidebar-item" onClick={() => navigate("/center/appointment-refundApproval")}>Refund Requests</div>
                            <div className="sidebar-item" onClick={() => navigate("/center/add-treatment")}>Add Treatment</div>
                            <div className="sidebar-item" onClick={() => navigate("/center/edit-treatment")}>Edit Treatment</div>
                            <div className="sidebar-item active">Management Appointments</div>
                        </div>
                       
                        <div className="sidebar-logout" onClick={() => navigate("/")}>
                            <IoLogOutOutline size={20} /> Logout
                        </div>
                    </div>
 
                   
                    <div className="content-wrapper">
                        <img src={logoImg} alt="HCS Logo" className="profile-logo" style={{ width: '180px', marginBottom: '10px' }} />
                        <h2 className="title"><MdOutlineMedicalServices /> Update and Cancel Appointment</h2>
 
                        <div className="appointments-list-container">
                            {appointments.map((appt) => (
                                <div key={appt.id} className="form-box appointment-card">
                                    <div className="card-header-info">
                                        <div className="user-profile-info">
                                            <MdAccountCircle size={40} color="#76a37b" />
                                            <div>
                                                <h3>{appt.customerName}</h3>
                                                <span className="email-span"><MdEmail /> {appt.email}</span>
                                            </div>
                                        </div>
                                    </div>
 
                                    <div className="appointment-details-grid">
                                        <div className="detail-item">
                                            <label><MdOutlineMedicalServices /> Service</label>
                                            <p>{appt.service}</p>
                                        </div>
                                        <div className="detail-item">
                                            <label><MdAttachMoney /> Price</label>
                                            <p>{appt.price}</p>
                                        </div>
                                        <div className="detail-item">
                                            <label><FaClock /> Duration</label>
                                            <p>{appt.duration}</p>
                                        </div>
                                        <div className="detail-item">
                                            <label><FaMapMarkerAlt /> Location</label>
                                            <p>{appt.location}</p>
                                        </div>
                                    </div>
 
                                    <div className="form-actions card-btns">
                                        <button className="save-btn edit-btn"><FaEdit /> Edit</button>
                                        <button className="save-btn cancel-btn"><FaTimesCircle /> Cancel</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
