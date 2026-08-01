import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import "../style/toprightnav.scss";

const TopRightNav = () => {
  const { user, handleLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const profileImage = user?.profileImage || "https://i.pravatar.cc/150?u=" + (user?.username || "unknown");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="top-right-nav">
      <button className="nav-icon-btn">
        <MessageCircle size={24} />
      </button>
      <button className="nav-icon-btn">
        <Bell size={24} />
      </button>
      
      <div className="profile-menu-container" ref={dropdownRef}>
        <div className="profile-avatar-wrapper" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img src={profileImage} alt="User Profile" className="profile-avatar" />
          <div className="online-indicator"></div>
        </div>

        {isDropdownOpen && (
          <div className="profile-dropdown">
            <button className="dropdown-item" onClick={onLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRightNav;
