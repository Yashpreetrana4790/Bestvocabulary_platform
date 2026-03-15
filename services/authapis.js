const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND || 'http://localhost:8000';

// Auth API paths – login and register are separate; do not mix.
const AUTH = {
  login: `${baseUrl}/api/v1/user/login`,
  register: `${baseUrl}/api/v1/user/register`,
  loginGoogle: `${baseUrl}/api/v1/user/login/google`,
  /** Server-side OAuth: redirect user here to start Google sign-in (backend then redirects to Google) */
  googleRedirect: `${baseUrl}/api/v1/user/auth/google`,
  me: `${baseUrl}/api/v1/user/me`,
  changePassword: `${baseUrl}/api/v1/user/change-password`,
};

/** URL to start server-side Google OAuth (redirect flow). Use as href for a link. */
export const googleServerAuthUrl = AUTH.googleRedirect;

export async function loginUser(credentials) {
  try {
    const response = await fetch(AUTH.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginWithGoogle(credential) {
  try {
    const response = await fetch(AUTH.loginGoogle, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Google sign-in failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(userData) {
  try {
    const response = await fetch(AUTH.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

function ensureTokenString(token) {
  if (token != null && typeof token === 'string') return token.trim();
  return '';
}

export async function getCurrentUser(token) {
  try {
    const tokenStr = ensureTokenString(token);
    if (!tokenStr) return null;
    const response = await fetch(AUTH.me, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success && data.data ? data.data : null;
  } catch (error) {
    return null;
  }
}

export async function changePassword(passwordData, token) {
  try {
    const tokenStr = ensureTokenString(token);
    if (!tokenStr) throw new Error('Not authenticated');
    const response = await fetch(AUTH.changePassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`,
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Password change failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
