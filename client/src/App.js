import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Splash from './components/Splash';
import { Toaster } from 'react-hot-toast';
import ProfilePage from './pages/Profile';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import BrowseGearPage from './pages/BrowseGearPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import KhaltiSuccess from './pages/KhaltiSuccess';
import RoleBasedDashboard from './pages/Dashboard'; // ✅ path based on your project
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminUsers from './pages/AdminUsers';
import AdminAllProducts from './pages/AdminAllProducts';
import AdminAddProduct from './pages/AdminAddProduct';












function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [location.pathname]);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <>
      {/* Only show Navbar when not on splash */}
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/browse-gear" element={<BrowseGearPage />} />
          <Route path="/gear/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/khalti-success" element={<KhaltiSuccess />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<RoleBasedDashboard />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminAllProducts />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />

          
          
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
