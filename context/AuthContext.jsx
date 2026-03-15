'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister, loginWithGoogle as apiLoginGoogle } from '@/services/authapis';

const AuthContext = createContext(undefined);

const TOKEN_KEY = 'bv_auth_token';
const USER_KEY = 'bv_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        const tokenStr = storedToken != null && typeof storedToken === 'string' ? storedToken.trim() : '';
        if (tokenStr && storedUser) {
          setToken(tokenStr);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await apiLogin({ email, password });
      
      if (response.success && response.data) {
        const { token: newToken, user: userData } = response.data;
        const tokenStr = newToken != null && typeof newToken === 'string' ? newToken : String(newToken ?? '');
        if (!tokenStr) throw new Error('No token received');
        
        setToken(tokenStr);
        setUser(userData);
        localStorage.setItem(TOKEN_KEY, tokenStr);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        return { success: true, user: userData };
      }
      
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const register = useCallback(async (fullName, email, password, confirmPassword) => {
    try {
      const response = await apiRegister({ fullName, email, password, confirmPassword });
      
      if (response.success && response.data) {
        const { token: newToken, user: userData } = response.data;
        const tokenStr = newToken != null && typeof newToken === 'string' ? newToken : String(newToken ?? '');
        if (!tokenStr) throw new Error('No token received');
        
        setToken(tokenStr);
        setUser(userData);
        localStorage.setItem(TOKEN_KEY, tokenStr);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        return { success: true, user: userData };
      }
      
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const loginWithGoogle = useCallback(async (credential) => {
    try {
      const response = await apiLoginGoogle(credential);
      
      if (response.success && response.data) {
        const { token: newToken, user: userData, isNewUser } = response.data;
        const tokenStr = newToken != null && typeof newToken === 'string' ? newToken : String(newToken ?? '');
        if (!tokenStr) throw new Error('No token received');
        
        setToken(tokenStr);
        setUser(userData);
        localStorage.setItem(TOKEN_KEY, tokenStr);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        return { success: true, user: userData, isNewUser: !!isNewUser };
      }
      
      throw new Error(response.message || 'Google sign-in failed');
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
