'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const TOKEN_KEY = 'bv_auth_token';
const USER_KEY = 'bv_user';

/**
 * OAuth callback: backend redirects here with ?token=...&user=...
 * Store token and user in localStorage (AuthProvider will pick up on next load), then redirect to home.
 */
export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const newUserFlag = searchParams.get('isNewUser');

    if (!token) {
      const err = searchParams.get('error') || 'No token received';
      setErrorMessage(decodeURIComponent(err));
      setStatus('error');
      return;
    }

    try {
      let user = null;
      if (userParam) {
        try {
          user = JSON.parse(decodeURIComponent(userParam));
        } catch (_) {}
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
        if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
      setIsNewUser(newUserFlag === '1' || newUserFlag === 'true');
      setStatus('success');
      window.location.href = '/';
      return;
    } catch (e) {
      setErrorMessage(e?.message || 'Failed to complete sign-in');
      setStatus('error');
    }
  }, [searchParams, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Completing sign-in...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <p className="text-destructive font-medium mb-2">Sign-in failed</p>
          <p className="text-muted-foreground text-sm mb-6">{errorMessage}</p>
          <a href="/login" className="text-primary hover:underline">
            Back to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
        <p className="text-foreground font-medium">
          {isNewUser ? 'Account created! Welcome to Best Vocabulary.' : 'Welcome back!'}
        </p>
        <p className="text-muted-foreground text-sm mt-1">Redirecting...</p>
      </div>
    </div>
  );
}
