
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, User, Plus } from 'lucide-react';

// Use default export for better compatibility with standard import statements
const BottomNav = () => {
  return (
    <div className="floating-nav glass">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home size={24} />
        <span>Khám phá</span>
      </NavLink>
      
      <NavLink to="/post" className="nav-item">
        <div className="post-button">
          <Plus size={28} />
        </div>
        <span style={{marginTop: '4px'}}>Đăng tin</span>
      </NavLink>

      <NavLink to="/chats" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <MessageCircle size={24} />
        <span>Tin nhắn</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User size={24} />
        <span>Của Tui</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
