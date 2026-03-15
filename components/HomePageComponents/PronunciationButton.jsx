'use client';

import { Volume2 } from 'lucide-react';
import { useState } from 'react';

export default function PronunciationButton({ word, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (!word || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  if (!word) return null;

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
      title="Listen to pronunciation"
      aria-label="Listen to pronunciation"
    >
      <Volume2 className={`h-4 w-4 sm:h-5 sm:w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
    </button>
  );
}
