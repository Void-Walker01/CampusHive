import React, { createContext, useState, useEffect, useContext } from 'react';


const getCookie=(name)=>{
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

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
        const res = await fetch('/api/v1/user/currentuser', {
          credentials: 'include',
        }); 
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.data);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Could not fetch user status", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    if (getCookie('flag')){
      checkUserStatus();
    }else{
      setLoading(false);
      setCurrentUser(null);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* We render children immediately, but ProtectedRoute will handle the loading state */}
      {children}
    </AuthContext.Provider>
  );
};