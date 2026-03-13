'use client';

import { useEffect } from 'react';
import { useRecentWords } from '@/hooks/useRecentWords';

export default function WordTracker({ word }) {
  const { addRecentWord } = useRecentWords();

  useEffect(() => {
    if (word) {
      addRecentWord(word);
    }
  }, [word, addRecentWord]);

  return null;
}
