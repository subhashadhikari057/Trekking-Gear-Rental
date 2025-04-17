import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedEmail && storedRole) {
      setToken(storedToken);
      setEmail(storedEmail);
      setRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  // Login Function
  const login = (token, email, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);

    setToken(token);
    setEmail(email);
    setRole(role);
    setIsLoggedIn(true);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    setToken(null);
    setEmail(null);
    setRole(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, email, role, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
