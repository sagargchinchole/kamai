import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session or token
        setIsLoggedIn(false);
        navigate('/login');
        localStorage.removeItem('token');
    };

    const handleProtectedNavigation = (path) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            alert('Please log in to access this page');
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-item">
                <button className="nav-item">Active Deals</button>
            </NavLink>

            {/* Protected Route for My Orders */}
            <button
                className="nav-item"
                onClick={() => handleProtectedNavigation('/orders')}
            >
                My Orders
            </button>

            {/* Protected Route for My Earnings */}
            <button
                className="nav-item"
                onClick={() => handleProtectedNavigation('/earnings')}
            >
                My Earnings
            </button>

            {/* Conditional Rendering for Login/Logout */}
            {isLoggedIn ? (
                <button className="nav-item" onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <NavLink to="/login" className="nav-item">Login</NavLink>
            )}
        </nav>
    );
};

export default Navbar;
