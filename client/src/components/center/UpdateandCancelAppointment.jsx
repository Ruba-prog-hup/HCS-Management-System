import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaUserCircle, FaEdit, FaTimesCircle, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { MdLanguage, MdAttachMoney, MdOutlineMedicalServices, MdEmail } from "react-icons/md";
import logoImg from "../../assets/logo.png";
import "./UpdateandCancelAppointment.css";

export default function UpdateandCancelAppointment() {
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
            centerName: "Al Reem",
            email: "AlReem@gmail.om",
            price: "25 OMR",
            duration: "60 Minutes",
            location: "Bawshar",
            service: "Physical Therapy"
        }
    ];

    return (
        <div className={`appointment-page ${darkMode ? "dark" : ""}`}>
            <div className="appointment-overlay">


                <div className="topbar">
                    <div className="topbar-left">
                        <button className="icon-btn" onClick={() => setOpen(!open)}><FaBars size={20} /></button>
                        <FaUserCircle size={28} className="nav-item" />
                        <span className="nav-item" style={{ fontWeight: 'bold' }}>Admin Panel</span>
                    </div>
                    <div className="topbar-center">
                        <div className="nav-item">Home</div>
                        <div className="nav-item">Dashboard</div>
                    </div>
                    <div className="topbar-right">
                        <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <FaSun color="#f1c40f" size={20} /> : <FaMoon size={20} />}
                        </button>
                        <button className="icon-btn"><MdLanguage size={22} /></button>
                    </div>
                </div>

                <div className="layout">

                    <div className={`sidebar ${open ? "open" : ""}`}>
                        <div className="sidebar-content">
                            <div className="sidebar-item ">Profile</div>
                            <div className="sidebar-item">Dashboard</div>
                            <div className="sidebar-item ">Management</div>
                            <div className="sidebar-item">Refund Requests</div>
                            <div className="sidebar-item ">Add Treatment</div>
                            <div className="sidebar-item">Edit Treatment</div>
                            <div className="sidebar-item active">Management Appointment</div>

                        </div>
                    </div>


                    <div className="content-wrapper">
                        <img src={logoImg} alt="Logo" className="profile-logo" />
                        <h2 className="title"><MdOutlineMedicalServices /> Update and Cancel Appointment</h2>

                        <div className="appointments-list">
                            {appointments.map((appt) => (
                                <div key={appt.id} className="split-card">
                                    <div className="card-left">
                                        <div className="profile-section">
                                            <FaUserCircle size={55} className="user-avatar" />
                                            <div className="user-main-info">
                                                <h3>{appt.centerName}</h3>
                                                <p className="user-email"><MdEmail /> {appt.email}</p>
                                            </div>
                                        </div>

                                        <div className="details-list">

                                            <div className="detail-item">
                                                <span className="label"><MdOutlineMedicalServices /> Service:</span>
                                                <span className="value highlight-service">{appt.service}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="label"><MdAttachMoney /> Price:</span>
                                                <span className="value highlight">{appt.price}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="label"><FaClock /> Duration:</span>
                                                <span className="value">{appt.duration}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="label"><FaMapMarkerAlt /> Location:</span>
                                                <span className="value">{appt.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-right">

                                        <div className="action-stack">
                                            <button className="action-btn edit-btn">
                                                <FaEdit size={22} />
                                                <span>Edit Appointment</span>
                                            </button>

                                            <button className="action-btn cancel-btn">
                                                <FaTimesCircle size={22} />
                                                <span>Cancel Appointment</span>
                                            </button>
                                        </div>
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