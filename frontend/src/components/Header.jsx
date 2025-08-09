import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.jpeg";
import apiClient from '../api/axios';

function Header() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 2. Use the new apiClient
      await apiClient.post('/user/logout');
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const activeLinkStyle = {
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <h1 className="text-xl font-bold text-white tracking-wider">
            CampusHive
          </h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            {currentUser ? (
              <>
                <li>
                  <NavLink
                    to="/feed"
                    className="text-gray-300 hover:text-white transition duration-300"
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  >
                    Explore
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/profile/${currentUser._id}`}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={currentUser.profilePic || `https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&background=4f46e5&color=fff`}
                      alt="profile"
                      className="h-9 w-9 rounded-full object-cover border-2 border-transparent hover:border-purple-500 transition"
                    />
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
