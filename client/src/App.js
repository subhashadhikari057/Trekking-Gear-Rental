// src/App.js
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
import RoleBasedDashboard from './pages/Dashboard';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminUsers from './pages/AdminUsers';
import AdminAllProducts from './pages/AdminAllProducts';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminChat from './pages/AdminChat'; // ✅ Import
import ChatWidget from './components/ChatWidget'; // ✅ Correct default import
import Footer from './components/Footer';
import HowItWorksPage from "./pages/HowItWorksPage"
import AboutUs from "./pages/AboutUs"
import FAQPage from './pages/FAQPage';

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  const [isClient, setIsClient] = useState(false); // ✅ track mount status

  useEffect(() => {
    setIsClient(true); // ✅ ensures ChatWidget renders only on client

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

  // ✅ Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <>
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
          <Route path="/admin/chat" element={<AdminChat />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FAQPage />} />

          
        </Routes>

        {/* ✅ Only render chat widget after hydration */}
        {isClient && <ChatWidget />}
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
