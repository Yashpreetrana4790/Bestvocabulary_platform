'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Bookmark, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function WordDetailClient({ word }) {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (word?.word) {
      setBookmarked(isBookmarked(word.word));
    }
  }, [word, isBookmarked]);

  const handleSpeak = () => {
    if ('speechSynthesis' in window && word?.word) {
      setIsPlaying(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = async () => {
    const text = `${word.word} (${word.pronunciation || ''})\n\n${word.meanings?.[0]?.meaning || ''}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${word.word} - Best Vocabulary`,
      text: `${word.word}: ${word.meanings?.[0]?.subtitle || word.meanings?.[0]?.meaning || ''}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleBookmark = () => {
    if (word) {
      toggleBookmark({
        word: word.word,
        pronunciation: word.pronunciation,
        meaning: word.meanings?.[0]?.subtitle || word.meanings?.[0]?.meaning,
        difficulty: word.meanings?.[0]?.difficulty,
      });
      setBookmarked(!bookmarked);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Audio */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleSpeak}
        className={`rounded-xl h-10 w-10 ${isPlaying ? 'bg-primary/10 border-primary/30' : ''}`}
        title="Listen to pronunciation"
      >
        <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-primary animate-pulse' : ''}`} />
      </Button>

      {/* Copy */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        className="rounded-xl h-10 w-10"
        title="Copy to clipboard"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
      </Button>

      {/* Share */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleShare}
        className="rounded-xl h-10 w-10"
        title="Share"
      >
        <Share2 className="h-4 w-4" />
      </Button>

      {/* Bookmark */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleBookmark}
        className={`rounded-xl h-10 w-10 ${bookmarked ? 'bg-primary/10 border-primary/30' : ''}`}
        title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      >
        <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-primary text-primary' : ''}`} />
      </Button>
    </div>
  );
}
