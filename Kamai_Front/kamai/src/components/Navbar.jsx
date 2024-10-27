import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for hamburger and close
import './Navbar.css'; // Import CSS file

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle hamburger menu
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login state from localStorage
    navigate('/login'); // Redirect to login page
  };

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path); // Navigate to specified path if logged in
    } else {
      alert('Please log in to access this page.'); // Alert if not logged in
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} color="white" /> : <FaBars size={24} color="white" />}
        </div>
        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className="nav-item" onClick={() => setIsOpen(false)}>
            Active Deals
          </NavLink>
          <span
            className="nav-item"
            onClick={() => {
              handleProtectedNavigation('/orders');
              setIsOpen(false);
            }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleProtectedNavigation('/orders');
                setIsOpen(false);
              }
            }}
          >
            My Orders
          </span>
          <span
            className="nav-item"
            onClick={() => {
              handleProtectedNavigation('/earnings');
              setIsOpen(false);
            }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleProtectedNavigation('/earnings');
                setIsOpen(false);
              }
            }}
          >
            My Earnings
          </span>
          {isLoggedIn ? (
            <button className="nav-item" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="nav-item" onClick={() => setIsOpen(false)}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
