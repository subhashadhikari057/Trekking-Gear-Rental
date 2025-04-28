import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Mail, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
      } catch (err) {
        toast.error("Failed to load profile");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

        <div className="bg-white rounded shadow overflow-hidden relative">
          <div className="h-40 bg-gradient-to-r from-[#4f45e4] to-[#6366f1]" />

          {/* Avatar */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
            <div className="h-28 w-28 rounded-full bg-white border-4 border-white shadow flex items-center justify-center text-4xl font-bold text-[#4f45e4]">
              {getInitials(user.name)}
            </div>
          </div>

          {/* Info Box */}
          <div className="px-8 pt-20">
            <div className="text-center mt-2">
              <h2 className="text-3xl font-bold text-black">{user.name}</h2>
              <div className="flex justify-center items-center gap-2 text-slate-500 mt-1">
                <span className="capitalize">{user.role}</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-[#4f45e4]/10 text-[#4f45e4] border border-[#4f45e4]/20">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div>
              <p className="flex items-center text-slate-500 text-sm gap-2">
                <User className="h-4 w-4" /> Full Name
              </p>
              <p className="text-lg font-medium">{user.name}</p>

              <p className="flex items-center text-slate-500 text-sm gap-2 mt-4">
                <Mail className="h-4 w-4" /> Email Address
              </p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div>
              <p className="flex items-center text-slate-500 text-sm gap-2">
                <User className="h-4 w-4" /> Role
              </p>
              <p className="text-lg font-medium capitalize">{user.role}</p>

              <p className="flex items-center text-slate-500 text-sm gap-2 mt-4">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Member Since
              </p>
              <p className="text-lg font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="p-8 flex justify-center gap-4">
            <Link to="/" className="bg-[#4f45e4] text-white px-6 py-2 rounded hover:bg-[#3a35cc] flex items-center gap-2">
              <Home className="h-5 w-5" /> Home
            </Link>
            <Link to="/dashboard" className="border px-6 py-2 rounded flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" /> Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
