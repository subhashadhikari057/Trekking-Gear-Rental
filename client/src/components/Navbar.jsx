import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3001/api/products/search?q=${search}`);
        setResults(res.data.slice(0, 5)); // Limit to 5 previews
        setShowDropdown(true);
      } catch (err) {
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b shadow sticky top-0 z-50 px-6 py-3 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-[#4f45e4]">TrailGear</Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-8 font-medium">
        <Link to="/browse-gear" className="hover:text-[#4f45e4]">Browse Gear</Link>
        <Link to="/how-it-works" className="hover:text-[#4f45e4]">How It Works</Link>
        <Link to="/about-us" className="hover:text-[#4f45e4]">About Us</Link>
        <Link to="/faq" className="hover:text-[#4f45e4]">FAQ</Link>
      </nav>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden md:block border rounded px-2 py-1 text-sm w-40 focus:outline-[#4f45e4]"
            onFocus={() => search && setShowDropdown(true)}
          />
          {showDropdown && results.length > 0 && (
            <div className="absolute bg-white border w-full shadow-lg mt-1 rounded z-50">
              {results.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    navigate(`/gear/${item._id}`);
                    setShowDropdown(false);
                    setSearch('');
                  }}
                  className="px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {isLoggedIn && (
          <Link to="/cart">
            <FaShoppingCart className="text-lg hover:text-[#4f45e4]" />
          </Link>
        )}

        {isLoggedIn && (
          <div onClick={handleAvatarClick} className="cursor-pointer">
            <FaUserCircle className="text-lg hover:text-[#4f45e4]" />
          </div>
        )}

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
            className="px-4 py-2 text-sm font-semibold rounded bg-[#4f45e4] text-white hover:bg-[#3a35cc] hidden md:block"
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
          <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-red-600 font-semibold">Logout</button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
