import React from "react";
import { useNavigate, useLocation } from "react-router";
import { 
  Home, 
  Search, 
  Compass, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  User, 
  Menu
} from "lucide-react";
import "../style/sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "#" },
    { icon: Compass, label: "Explore", path: "#" },
    { icon: MessageCircle, label: "Messages", path: "#" },
    { icon: Heart, label: "Notifications", path: "#" },
    { icon: PlusSquare, label: "Create", path: "/create-post" },
    { icon: User, label: "Profile", path: "#" },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate("/")}>
        {/* Replace with actual logo or stylized text */}
        <h2>Instagram</h2>
      </div>

      <div className="nav-links">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <div 
              key={index} 
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => {
                if(item.path !== "#") navigate(item.path);
              }}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="nav-item more-options">
        <Menu size={24} className="nav-icon" />
        <span className="nav-label">More</span>
      </div>
    </nav>
  );
};

export default Sidebar;
