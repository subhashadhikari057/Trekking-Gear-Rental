import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.email, data.role);
        navigate('/');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#4f45e4] to-blue-500 text-white flex flex-col justify-center items-center px-8 py-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">New Here?</h1>
        <p className="text-lg md:text-xl text-center max-w-md mb-6">
          Create an account to book premium gear and plan your next adventure easily with TrailGear.
        </p>
        <img src="https://cdn-icons-png.flaticon.com/512/3251/3251403.png" alt="rocket" className="w-40 sm:w-52" />
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 bg-white shadow-lg rounded-xl px-6 py-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">Create your account</h2>
          <p className="text-sm text-gray-500">Start your journey with TrailGear today.</p>

          <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
            <FaUser className="text-gray-400 mr-2" />
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent outline-none w-full" required />
          </div>

          <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent outline-none w-full" required />
          </div>

          <div className="flex items-center bg-gray-100 px-3 py-2 rounded relative">
            <FaLock className="text-gray-400 mr-2" />
            <input type={showPwd ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent outline-none w-full" required />
            <span className="absolute right-3 text-sm text-[#4f45e4] cursor-pointer font-semibold" onClick={() => setShowPwd(!showPwd)}>{showPwd ? 'HIDE' : 'SHOW'}</span>
          </div>

          <button type="submit" className="w-full bg-[#4f45e4] hover:bg-[#3a35cc] text-white py-2 rounded font-semibold transition">Sign Up</button>

          <div className="flex items-center gap-4">
            <hr className="w-full border-gray-300" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button type="button" className="w-full border border-gray-300 py-2 rounded font-semibold hover:bg-gray-100">Sign up with Google</button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account? <Link to="/login" className="text-[#4f45e4] font-semibold">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
