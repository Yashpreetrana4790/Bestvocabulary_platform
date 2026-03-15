'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSavedWords, addSavedWord, removeSavedWord } from '@/services/savedWordsApi';

/**
 * Saved words tied to the logged-in user (backend). When not logged in, save UI should be hidden.
 * Returns: savedWords (list), isSaved(wordId), toggleSave(word), addSave(wordId), removeSave(wordId), isLoading, isAuthenticated.
 */
export function useSavedWords() {
  const { token, isAuthenticated } = useAuth();
  const [savedWords, setSavedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchList = useCallback(async () => {
    if (!token) {
      setSavedWords([]);
      return;
    }
    setIsLoading(true);
    try {
      const list = await getSavedWords(token);
      setSavedWords(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('Failed to fetch saved words:', e);
      setSavedWords([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const isSaved = useCallback(
    (wordIdOrWord) => {
      if (!wordIdOrWord) return false;
      const id =
        typeof wordIdOrWord === 'string'
          ? wordIdOrWord
          : wordIdOrWord._id ?? wordIdOrWord.id ?? wordIdOrWord.wordId;
      if (!id) return false;
      const idStr = String(id);
      return savedWords.some(
        (s) => String(s.wordId ?? s._id) === idStr
      );
    },
    [savedWords]
  );

  const addSave = useCallback(
    async (wordId) => {
      if (!token || !wordId) return;
      try {
        await addSavedWord(token, String(wordId));
        await fetchList();
      } catch (e) {
        console.error('Failed to add saved word:', e);
        throw e;
      }
    },
    [token, fetchList]
  );

  const removeSave = useCallback(
    async (wordId) => {
      if (!token || !wordId) return;
      try {
        await removeSavedWord(token, String(wordId));
        await fetchList();
      } catch (e) {
        console.error('Failed to remove saved word:', e);
        throw e;
      }
    },
    [token, fetchList]
  );

  const toggleSave = useCallback(
    async (word) => {
      if (!word) return;
      const wordId = word._id ?? word.id ?? word.wordId;
      if (!wordId) return;
      if (isSaved(wordId)) {
        await removeSave(wordId);
      } else {
        await addSave(wordId);
      }
    },
    [isSaved, addSave, removeSave]
  );

  return {
    savedWords,
    isSaved,
    toggleSave,
    addSave,
    removeSave,
    refetch: fetchList,
    isLoading,
    isAuthenticated: !!isAuthenticated,
  };
}
