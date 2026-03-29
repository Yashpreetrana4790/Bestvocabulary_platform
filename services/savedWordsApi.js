import { tryRefreshAccessToken } from '@/services/tokenRefresh';

const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND || 'http://localhost:8000';

const SAVED_WORDS = {
  list: `${baseUrl}/api/v1/user/saved-words`,
  add: `${baseUrl}/api/v1/user/saved-words`,
  remove: (wordId) => `${baseUrl}/api/v1/user/saved-words/${wordId}`,
};

/** Thrown when the backend rejects the JWT (expired / invalid). Handlers should log the user out. */
export const SAVED_WORDS_AUTH_ERROR = 'AUTH_EXPIRED';

function authHeaders(token) {
  const t = token != null && typeof token === 'string' ? token.trim() : '';
  if (!t) return {};
  return { Authorization: `Bearer ${t}` };
}

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function throwIfAuthFailed(res, data) {
  const msg = data?.message != null ? String(data.message) : '';
  const lower = msg.toLowerCase();
  const looksLikeToken =
    res.status === 401 ||
    res.status === 403 ||
    (lower.includes('token') && (lower.includes('expired') || lower.includes('invalid')));
  if (looksLikeToken) {
    const err = new Error(msg || 'Session expired. Please sign in again.');
    err.code = SAVED_WORDS_AUTH_ERROR;
    throw err;
  }
}

function responseSuggestsStaleAccess(res, data) {
  const msg = data?.message != null ? String(data.message) : '';
  const lower = msg.toLowerCase();
  return (
    res.status === 401 ||
    res.status === 403 ||
    (lower.includes('token') && (lower.includes('expired') || lower.includes('invalid')))
  );
}

/**
 * One fetch; if access token is rejected, try refresh once then repeat the same request.
 */
async function fetchWithAuthRetry(url, init, accessToken) {
  const run = (t) =>
    fetch(url, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        ...authHeaders(t),
      },
    });

  let t = accessToken;
  let res = await run(t);
  let data = await parseJsonSafe(res);

  if (!res.ok && typeof window !== 'undefined' && responseSuggestsStaleAccess(res, data)) {
    const newTok = await tryRefreshAccessToken();
    if (newTok) {
      t = newTok;
      res = await run(t);
      data = await parseJsonSafe(res);
    }
  }

  return { res, data };
}

/**
 * Get current user's saved words. Requires token.
 * @param {string} token - JWT
 * @returns {Promise<Array<{ wordId: string, word: string, pronunciation?: string, meaning?: string }>>}
 */
export async function getSavedWords(token) {
  const { res, data } = await fetchWithAuthRetry(
    SAVED_WORDS.list,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
    token,
  );
  if (!res.ok) {
    throwIfAuthFailed(res, data);
    return [];
  }
  return data?.data ?? [];
}

/**
 * Add a word to saved. Requires token.
 * @param {string} token - JWT
 * @param {string} wordId - Word MongoDB ID
 * @returns {Promise<{ added: boolean, word?: string }>}
 */
export async function addSavedWord(token, wordId) {
  const { res, data } = await fetchWithAuthRetry(
    SAVED_WORDS.add,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wordId }),
    },
    token,
  );
  if (!res.ok) {
    throwIfAuthFailed(res, data);
    throw new Error(data?.message || 'Failed to save word');
  }
  return data?.data ?? { added: true };
}

/**
 * Remove a word from saved. Requires token.
 * @param {string} token - JWT
 * @param {string} wordId - Word MongoDB ID
 * @returns {Promise<{ removed: boolean }>}
 */
export async function removeSavedWord(token, wordId) {
  const { res, data } = await fetchWithAuthRetry(
    SAVED_WORDS.remove(wordId),
    { method: 'DELETE' },
    token,
  );
  if (!res.ok) {
    throwIfAuthFailed(res, data);
    throw new Error(data?.message || 'Failed to remove saved word');
  }
  return data?.data ?? { removed: true };
}
