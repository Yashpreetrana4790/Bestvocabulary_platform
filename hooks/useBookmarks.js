'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'bv_bookmarks';
const MAX_BOOKMARKS = 100;

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
  }, []);

  const addBookmark = useCallback((word) => {
    if (!word || !word.word) return;

    const bookmark = {
      word: word.word,
      id: word._id || word.id,
      pronunciation: word.pronunciation,
      meaning: word.meaning || word.meanings?.[0]?.subtitle || '',
      bookmarkedAt: new Date().toISOString(),
    };

    setBookmarks((prev) => {
      const exists = prev.some((b) => b.word.toLowerCase() === word.word.toLowerCase());
      if (exists) return prev;
      
      const updated = [bookmark, ...prev].slice(0, MAX_BOOKMARKS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeBookmark = useCallback((wordText) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.word.toLowerCase() !== wordText.toLowerCase());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleBookmark = useCallback((word) => {
    if (!word || !word.word) return;
    
    const exists = bookmarks.some((b) => b.word.toLowerCase() === word.word.toLowerCase());
    if (exists) {
      removeBookmark(word.word);
    } else {
      addBookmark(word);
    }
  }, [bookmarks, addBookmark, removeBookmark]);

  const isBookmarked = useCallback((wordText) => {
    return bookmarks.some((b) => b.word.toLowerCase() === wordText.toLowerCase());
  }, [bookmarks]);

  const clearBookmarks = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setBookmarks([]);
  }, []);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
  };
}
