import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/lib/authStorageKeys';

const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND || 'http://localhost:8000';
const REFRESH_URL = `${baseUrl}/api/v1/user/refresh`;

let inFlight = null;

export function getStoredRefreshToken() {
  if (typeof window === 'undefined') return '';
  const v = localStorage.getItem(REFRESH_TOKEN_KEY);
  return v != null && typeof v === 'string' ? v.trim() : '';
}

/**
 * Call backend /refresh, persist new tokens, notify AuthContext.
 * @returns {Promise<string|null>} New access token or null
 */
export async function tryRefreshAccessToken() {
  const rt = getStoredRefreshToken();
  if (!rt) return null;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const res = await fetch(REFRESH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: rt }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success || !data.data?.token) {
        return null;
      }
      const { token, refreshToken } = data.data;
      const access = token != null && typeof token === 'string' ? token.trim() : '';
      if (!access) return null;
      localStorage.setItem(TOKEN_KEY, access);
      if (refreshToken != null && typeof refreshToken === 'string' && refreshToken.trim()) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken.trim());
      }
      window.dispatchEvent(new CustomEvent('bv-auth-refreshed', { detail: { token: access } }));
      return access;
    } catch {
      return null;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}
