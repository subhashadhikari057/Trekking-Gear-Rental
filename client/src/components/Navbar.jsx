import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAvatarClick = () => {
    if (role === 'admin') {
      setShowDropdown(!showDropdown);
    } else {
      navigate('/profile');
    }
  };

  return (
    <header className="bg-white border-b shadow sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-[#4f45e4]">TrailGear</Link>

      {/* Desktop Menu */}
      <nav className={`hidden md:flex space-x-8 font-medium`}>
        <Link to="/browse-gear" className="hover:text-[#4f45e4]">Browse Gear</Link>
        <Link to="/how-it-works" className="hover:text-[#4f45e4]">How It Works</Link>
        <Link to="/about" className="hover:text-[#4f45e4]">About Us</Link>
        <Link to="/contact" className="hover:text-[#4f45e4]">Contact</Link>
      </nav>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <FaSearch className="text-lg hover:text-[#4f45e4]" />
          </Link>
          {isLoggedIn && (
            <Link to="/cart">
              <FaShoppingCart className="text-lg hover:text-[#4f45e4]" />
            </Link>
          )}
          {isLoggedIn && (
            <div onClick={handleAvatarClick} className="cursor-pointer relative">
              <FaUserCircle className="text-lg hover:text-[#4f45e4]" />
              {/* Admin Dropdown */}
              {role === 'admin' && showDropdown && (
                <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md w-40 py-2 z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Auth Buttons */}
        {!isLoggedIn ? (
          <div className="hidden md:flex space-x-3">
            <Link to="/login">
              <button className="px-4 py-2 text-sm font-semibold rounded border border-gray-300 hover:bg-gray-100">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 text-sm font-semibold rounded bg-[#4f45e4] text-white hover:bg-[#3a35cc]">Sign Up</button>
            </Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold rounded bg-[#4f45e4] text-white hover:bg-[#3a35cc]"
          >
            Logout
          </button>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-3 md:hidden z-40">
          <Link to="/browse-gear" onClick={() => setIsMobileMenuOpen(false)}>Browse Gear</Link>
          <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
