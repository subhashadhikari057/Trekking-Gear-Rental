import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.email, data.role);
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#4f45e4] to-blue-600 text-white flex flex-col justify-center items-center px-8 py-10">
  <h1 className="text-4xl md:text-5xl font-extrabold mb-4">WELCOME BACK</h1>
  <p className="text-lg md:text-xl text-center max-w-md mb-6">
    Access all your bookings, gear, and your personalized trekking dashboard.
  </p>
  <img
    src="https://static.vecteezy.com/system/resources/previews/019/872/884/non_2x/3d-minimal-user-login-page-user-authentication-concept-user-verification-concept-login-page-with-a-fingerprint-padlock-3d-illustration-free-png.png"
    alt="Compass emoji"
    className="w-36 sm:w-80"
  />
</div>

      {/* Right */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 bg-white shadow-lg rounded-xl px-6 py-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">Sign in</h2>
          <p className="text-sm text-gray-500">Enter your credentials to continue</p>

          <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
            <FaUser className="text-gray-400 mr-2" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent outline-none w-full" required />
          </div>

          <div className="flex items-center bg-gray-100 px-3 py-2 rounded relative">
            <FaLock className="text-gray-400 mr-2" />
            <input type={showPwd ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent outline-none w-full" required />
            <span className="absolute right-3 text-sm text-[#4f45e4] cursor-pointer font-semibold" onClick={() => setShowPwd(!showPwd)}>{showPwd ? 'HIDE' : 'SHOW'}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label><input type="checkbox" className="mr-1" /> Remember me</label>
            <button className="text-[#4f45e4] font-medium">Forgot Password?</button>
          </div>

          <button type="submit" className="w-full bg-[#4f45e4] hover:bg-[#3a35cc] text-white py-2 rounded font-semibold transition">Sign in</button>

          <div className="flex items-center gap-4">
            <hr className="w-full border-gray-300" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button type="button" className="w-full border border-gray-300 py-2 rounded font-semibold hover:bg-gray-100">Sign in with other</button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Don’t have an account? <Link to="/signup" className="text-[#4f45e4] font-semibold">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
