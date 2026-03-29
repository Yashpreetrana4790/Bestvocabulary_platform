'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister, loginWithGoogle as apiLoginGoogle } from '@/services/authapis';
import { TOKEN_KEY, USER_KEY, REFRESH_TOKEN_KEY } from '@/lib/authStorageKeys';

const AuthContext = createContext(undefined);

function persistRefreshToken(refreshToken) {
  const r = refreshToken != null && typeof refreshToken === 'string' ? refreshToken.trim() : '';
  if (r) localStorage.setItem(REFRESH_TOKEN_KEY, r);
  else localStorage.removeItem(REFRESH_TOKEN_KEY);
}

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
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // When token refresh completes outside React (e.g. saved-words retry), sync access token into state
  useEffect(() => {
    const onRefreshed = (e) => {
      const t = e?.detail?.token ?? localStorage.getItem(TOKEN_KEY);
      const tokenStr = t != null && typeof t === 'string' ? t.trim() : '';
      if (tokenStr) setToken(tokenStr);
    };
    window.addEventListener('bv-auth-refreshed', onRefreshed);
    return () => window.removeEventListener('bv-auth-refreshed', onRefreshed);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await apiLogin({ email, password });

      if (response.success && response.data) {
        const { token: newToken, refreshToken: newRefresh, user: userData } = response.data;
        const tokenStr = newToken != null && typeof newToken === 'string' ? newToken : String(newToken ?? '');
        if (!tokenStr) throw new Error('No token received');

        setToken(tokenStr);
        setUser(userData);
        localStorage.setItem(TOKEN_KEY, tokenStr);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        persistRefreshToken(newRefresh);

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
        const { token: newToken, refreshToken: newRefresh, user: userData } = response.data;
        const tokenStr = newToken != null && typeof newToken === 'string' ? newToken : String(newToken ?? '');
        if (!tokenStr) throw new Error('No token received');

        setToken(tokenStr);
        setUser(userData);
        localStorage.setItem(TOKEN_KEY, tokenStr);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        persistRefreshToken(newRefresh);

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
        const { token: newToken, refreshToken: newRefresh, user: userData, isNewUser } = response.data;
        const tokenStr = newToken != null && typeof newToken === 'string' ? newToken : String(newToken ?? '');
        if (!tokenStr) throw new Error('No token received');

        setToken(tokenStr);
        setUser(userData);
        localStorage.setItem(TOKEN_KEY, tokenStr);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        persistRefreshToken(newRefresh);

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
    localStorage.removeItem(REFRESH_TOKEN_KEY);
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
