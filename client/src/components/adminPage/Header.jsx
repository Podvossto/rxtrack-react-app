/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../../assets/images/profile-pic.png";
import { useAuth } from "../../auth/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const formattedTime = `${currentHour}:${
    currentMinute < 10 ? "0" + currentMinute : currentMinute
  }`;

  const notificationStyle = {
    position: "relative",
    display: "inline-block",
  };

  const badgeStyle = {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "red",
    color: "white",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "20px",
    fontSize: "12px",
  };

  const dropdownStyle = {
    fontSize:'15px',
    position: "absolute",
    width:'150px',
    top: "40px", // Adjust this value to control the dropdown position
    left: "-120px",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: showDropdown ? "block" : "none",
  };

  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <section
      className="bg-white d-flex justify-content-between align-items-center px-4"
      style={{ width: "100%", height: "60px", border: "1px solid #e8ebed" }}
    >
      <div className="d-flex align-items-center">
        <i className="bi bi-calendar h3 px-3 m-0" />
        <span className="text-dark">
          {formattedDate} , {formattedTime}
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-4">
        <div className="notification" style={notificationStyle}>
          <i className="bi bi-bell h3 m-0" onClick={handleBellClick}></i>
          <span style={badgeStyle}>2</span>
          {showDropdown && (
            <div style={dropdownStyle}>
              <p className="badge bg-secondary" style={{ color: "black" }}>
                ใกล้หมดอายุ 1 รายการ
              </p>
              <p className="badge bg-warning" style={{ color: "black" }}>
                ใกล้หมด 1 รายการ
              </p>
            </div>
          )}
        </div>

        <div
          className="profile-icon d-flex justify-content-center align-items-center dropdown"
          style={{
            marginRight: "30px",
            width: "40px",
            height: "40px",
            backgroundColor: "lightcoral",
            borderRadius: "50%",
          }}
        >
          <a
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={profilePic}
              alt="user"
              style={{ width: "100%" }}
            />
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link to={"/admin/profile"}>
                <a className="dropdown-item">โปรไฟล์ของฉัน</a>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item text-danger" role="button" onClick={handleLogout}>
                ออกจากระบบ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
