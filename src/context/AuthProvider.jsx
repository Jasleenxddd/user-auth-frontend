import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false, user: null });
  
  const loadUser = async () => {
    if (localStorage.token) {
      setAuth({ token: localStorage.token, isAuthenticated: true, user: null });
      try {
        const res = await axios.get('/api/auth/user', { headers: { 'x-auth-token': localStorage.token } });
        setAuth({ token: localStorage.token, isAuthenticated: true, user: res.data });
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
