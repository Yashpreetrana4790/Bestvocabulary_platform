'use client';

import React, { useState } from 'react';
import { Volume2, Bookmark, Share2, Copy, Check, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function WordActions({ word }) {
  const [copied, setCopied] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const wordText = word?.word || '';
  const bookmarked = isBookmarked(wordText);

  const handleSpeak = () => {
    if (wordText && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = async () => {
    if (wordText) {
      await navigator.clipboard.writeText(wordText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (wordText) {
      const shareData = {
        title: `Word: ${wordText}`,
        text: `Learn a new word: ${wordText} - ${word?.meanings?.[0]?.subtitle || ''}`,
        url: `${window.location.origin}/word/${wordText.toLowerCase()}`,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('Share cancelled');
        }
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleBookmark = () => {
    if (word) {
      toggleBookmark({
        word: word.word,
        id: word._id || word.id,
        pronunciation: word.pronunciation,
        meaning: word.meanings?.[0]?.subtitle || '',
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSpeak}
        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
        title="Listen to pronunciation"
      >
        <Volume2 className="h-5 w-5 text-muted-foreground hover:text-primary" />
      </button>
      <button
        onClick={handleCopy}
        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
        title={copied ? "Copied!" : "Copy word"}
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Copy className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      <button
        onClick={handleShare}
        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
        title="Share word"
      >
        <Share2 className="h-5 w-5 text-muted-foreground" />
      </button>
      <button
        onClick={handleBookmark}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          bookmarked ? 'bg-primary/20 text-primary' : 'bg-muted/80 hover:bg-primary/10 text-muted-foreground'
        }`}
        title={bookmarked ? "Remove from bookmarks" : "Bookmark word"}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-5 w-5" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
