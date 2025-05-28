import React, { createContext, useState, useEffect } from 'react';
import axios from '../src/services/api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null
  );

  const loginUser = async (username, password) => {
    const response = await axios.post('/api/token/', { username, password });
    if (response.status === 200) {
      setAuthTokens(response.data);
      localStorage.setItem('tokens', JSON.stringify(response.data));
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem('tokens');
  };

  return (
    <AuthContext.Provider value={{ authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
