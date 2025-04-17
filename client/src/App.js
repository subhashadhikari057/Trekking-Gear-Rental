import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import BrowseGearPage from './pages/BrowseGearPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { Toaster } from 'react-hot-toast';
import CheckoutPage from './pages/CheckoutPage';


function App() {
  return (
    <>
    <Toaster position="top-right" />
    <Router>
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

        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
