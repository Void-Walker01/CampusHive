import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // 🔑 Check if refresh token exists (cookie or localStorage)
        const hasRefresh = document.cookie.includes("refreshToken"); 

        if (!hasRefresh) {
          setCurrentUser(null);
          return;
        }

        // Only call backend if refresh token is present
        const response = await apiClient.get('/user/currentuser');
        setCurrentUser(response.data.data);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []); 

  const login = async (credentials) => {
    const response = await apiClient.post('/user/login', credentials);
    setCurrentUser(response.data.data);
    return response;
  };

  const logout = async () => {
    await apiClient.post('/user/logout');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login, 
    logout,  
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don’t render children until initial check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
