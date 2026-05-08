import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaUserCircle, FaEdit, FaSave, FaStethoscope, FaTag } from "react-icons/fa";
import { MdLanguage, MdAttachMoney, MdTimer, MdLocationOn } from "react-icons/md";
import logoImg from "../../assets/logo.png";
import "./UpdateTreatment.css";

export default function EditTretment() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


  const [treatment, setTreatment] = useState({
    name: "Hijama (cupping Therapy)",
    price: "10",
    duration: "45",
    location: "Muscat",
    category: "Therapy",
    description: "Traditional wet cupping therapy for pain relief and detoxification."
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", treatment);
    alert("Treatment updated successfully!");
  };

  return (
    <div className={`center-page ${darkMode ? "dark" : ""}`}>
      <div className="center-overlay">


        <div className="topbar">
          <div className="topbar-left">
            <button className="icon-btn" onClick={() => setOpen(!open)}>
              <FaBars size={20} />
            </button>
            <FaUserCircle size={28} className="nav-item" />

          </div>

          <div className="topbar-center">
            <div className="nav-item">Home</div>
            <div className="nav-item">Dashboard</div>
          </div>

          <div className="topbar-right">
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" size={20} /> : <FaMoon size={20} />}
            </button>
            <button className="icon-btn">
              <MdLanguage size={22} />
            </button>
          </div>
        </div>

        <div className="layout">

          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item ">Profile</div>
              <div className="sidebar-item">Dashboard</div>
              <div className="sidebar-item ">Management</div>
              <div className="sidebar-item">Refund Requests</div>
              <div className="sidebar-item">Add Treatment</div>
              <div className="sidebar-item active">Edit Treatment</div>
              <div className="sidebar-item">Management Appointment</div>

            </div>
          </div>

          <div className="content-wrapper">

            <img
              src={logoImg}
              alt="HCS Logo"
              className="profile-logo"
            />
            <h2 className="title"><FaEdit /> Update Treatment</h2>

            <form className="form-box" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="card-label"><FaStethoscope /> Treatment Name</label>
                <input
                  type="text"
                  className="styled-input"
                  value={treatment.name}
                  onChange={(e) => setTreatment({ ...treatment, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="card-label"><MdAttachMoney /> Price (OMR)</label>
                  <input
                    type="text"
                    className="styled-input"
                    value={treatment.price}
                    onChange={(e) => setTreatment({ ...treatment, price: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="card-label"><MdTimer /> Duration</label>
                  <input
                    type="text"
                    className="styled-input"
                    value={treatment.duration}
                    onChange={(e) => setTreatment({ ...treatment, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="card-label"><FaTag /> Category</label>
                <select
                  className="styled-input"
                  value={treatment.category}
                  onChange={(e) => setTreatment({ ...treatment, category: e.target.value })}
                >
                  <option value="Therapy">Therapy</option>
                  <option value="Massage">Massage</option>
                  <option value="Hijama">Hijama</option>
                </select>
              </div>

              <div className="form-group">
                <label className="card-label"><MdLocationOn /> Location</label>
                <input
                  type="text"
                  className="styled-input"
                  value={treatment.location}
                  onChange={(e) => setTreatment({ ...treatment, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="card-label">Description</label>
                <textarea
                  className="styled-input"
                  rows="3"
                  value={treatment.description}
                  onChange={(e) => setTreatment({ ...treatment, description: e.target.value })}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  <FaSave /> Save
                </button>
                <button type="button" className="save-btn cancel-btn" onClick={() => alert("Changes canceled")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}