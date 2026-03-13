'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'bv_recent_words';
const MAX_RECENT_WORDS = 20;

export function useRecentWords() {
  const [recentWords, setRecentWords] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentWords(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recent words:', e);
      }
    }
  }, []);

  const addRecentWord = useCallback((word) => {
    if (!word || !word.word) return;

    const wordEntry = {
      word: word.word,
      id: word._id || word.id,
      pronunciation: word.pronunciation,
      meaning: word.meanings?.[0]?.subtitle || '',
      viewedAt: new Date().toISOString(),
    };

    setRecentWords((prev) => {
      const filtered = prev.filter((w) => w.word.toLowerCase() !== word.word.toLowerCase());
      const updated = [wordEntry, ...filtered].slice(0, MAX_RECENT_WORDS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentWords = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentWords([]);
  }, []);

  const removeRecentWord = useCallback((wordText) => {
    setRecentWords((prev) => {
      const updated = prev.filter((w) => w.word.toLowerCase() !== wordText.toLowerCase());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    recentWords,
    addRecentWord,
    clearRecentWords,
    removeRecentWord,
  };
}
