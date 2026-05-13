import React, { useState } from "react";
import "./Admin.css";
import { FaMoon, FaSun, FaBars, FaHome, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AdminMessages() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyText, setReplyText] = useState("");

  const users = [
    { id: 1, name: "Ahmed Al-Balushi", lastMsg: "Hello, I have a question about my appointment." },
    { id: 2, name: "Sara Al-Riyami", lastMsg: "Can I change my center?" },
    { id: 3, name: "Mazin Al-Harthy", lastMsg: "Payment was successful, thank you." }
  ];

  const handleSend = () => {
    if (replyText.trim() && selectedUser) {
      setReplyText("");
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
            <span className="nav-item" onClick={() => navigate("/admin/dashboard")}>Dashboard</span>
            <span className="nav-item" onClick={() => navigate("/admin/management")}>Admin Management</span>
            <span className="nav-item" onClick={() => navigate("/admin/register-center")}>Register Center</span>
            <span className="nav-item active" onClick={() => navigate("/admin/messages")}>Messages</span>
          </div>
          <div className="topbar-right">
            <button className="icon-btn" onClick={() => navigate("/admin/messages")}><FaEnvelope color="#76a37b" /></button>
            <button className="icon-btn" onClick={() => navigate("/admin/dashboard")}><FaHome /></button>
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun color="#f1c40f" /> : <FaMoon />}
            </button>
            <button className="icon-btn"><MdLanguage /></button>
          </div>
        </div>

        <div className="layout">
          <div className={`sidebar ${open ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-item" onClick={() => navigate("/admin/dashboard")}>Dashboard</div>
              <div className="sidebar-item" onClick={() => navigate("/admin/management")}>Admin Management</div>
              <div className="sidebar-item" onClick={() => navigate("/admin/register-center")}>Register Center</div>
              <div className="sidebar-item active" onClick={() => navigate("/admin/messages")}>Messages</div>
            </div>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <IoLogOutOutline style={{marginRight: '8px'}} /> Logout
            </div>
          </div>

          <div className="content-wrapper">
            <h2 className="title">User Messages</h2>
            
            <div className="dashboard-record-box" style={{ maxWidth: '1000px', display: 'flex', gap: '20px', height: '60vh' }}>
              
              <div className="dashboard-record-card" style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {selectedUser ? (
                  <>
                    <div>
                      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Chat with {selectedUser.name}</h3>
                      <div style={{ padding: '15px', background: '#f9f9f9', borderRadius: '8px', marginTop: '10px' }}>
                        <p><strong>{selectedUser.name}:</strong> {selectedUser.lastMsg}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      <input 
                        type="text" 
                        className="input" 
                        placeholder="Type your reply..." 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button className="remove-btn" style={{ background: '#76a37b', width: '60px' }} onClick={handleSend}>
                        <FaPaperPlane />
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#999' }}>
                    Select a user to start chatting
                  </div>
                )}
              </div>

              <div className="dashboard-record-card" style={{ flex: 1, overflowY: 'auto' }}>
                <h3 style={{ marginBottom: '15px' }}>Users List</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {users.map(user => (
                    <div 
                      key={user.id} 
                      onClick={() => setSelectedUser(user)}
                      style={{ 
                        padding: '10px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        background: selectedUser?.id === user.id ? '#76a37b' : '#f5f5f5',
                        color: selectedUser?.id === user.id ? 'white' : 'inherit',
                        transition: '0.3s'
                      }}
                    >
                      <strong>{user.name}</strong>
                      <p style={{ fontSize: '12px', margin: '5px 0 0', opacity: 0.8 }}>{user.lastMsg.substring(0, 20)}...</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
