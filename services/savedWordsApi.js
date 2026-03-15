const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND || 'http://localhost:8000';

const SAVED_WORDS = {
  list: `${baseUrl}/api/v1/user/saved-words`,
  add: `${baseUrl}/api/v1/user/saved-words`,
  remove: (wordId) => `${baseUrl}/api/v1/user/saved-words/${wordId}`,
};

function authHeaders(token) {
  const t = token != null && typeof token === 'string' ? token.trim() : '';
  if (!t) return {};
  return { Authorization: `Bearer ${t}` };
}

/**
 * Get current user's saved words. Requires token.
 * @param {string} token - JWT
 * @returns {Promise<Array<{ wordId: string, word: string, pronunciation?: string, meaning?: string }>>}
 */
export async function getSavedWords(token) {
  const res = await fetch(SAVED_WORDS.list, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data?.data ?? [];
}

/**
 * Add a word to saved. Requires token.
 * @param {string} token - JWT
 * @param {string} wordId - Word MongoDB ID
 * @returns {Promise<{ added: boolean, word?: string }>}
 */
export async function addSavedWord(token, wordId) {
  const res = await fetch(SAVED_WORDS.add, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify({ wordId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Failed to save word');
  return data?.data ?? { added: true };
}

/**
 * Remove a word from saved. Requires token.
 * @param {string} token - JWT
 * @param {string} wordId - Word MongoDB ID
 * @returns {Promise<{ removed: boolean }>}
 */
export async function removeSavedWord(token, wordId) {
  const res = await fetch(SAVED_WORDS.remove(wordId), {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Failed to remove saved word');
  return data?.data ?? { removed: true };
}
