'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Bookmark, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function WordDetailClient({ word }) {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (word?.word) {
      setBookmarked(isBookmarked(word.word));
    }
  }, [word, isBookmarked]);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

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
    const text = `${word.word} (${word.pronunciation || ''})\n\nDefinition: ${word.meanings?.[0]?.meaning || ''}\n\nExample: ${word.meanings?.[0]?.example_sentences?.[0] || ''}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showNotification('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${word.word} - Best Vocabulary`,
      text: `Learn the word "${word.word}": ${word.meanings?.[0]?.subtitle || word.meanings?.[0]?.meaning || ''}`,
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
      showNotification(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks!');
    }
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs font-medium px-3 py-2 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 z-50">
          {toastMessage}
        </div>
      )}

      {/* Actions Card */}
      <div className="flex items-center gap-2 p-2 bg-card/80 backdrop-blur-sm border rounded-2xl shadow-sm">
        {/* Audio */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSpeak}
          className={`rounded-xl h-11 w-11 transition-all ${
            isPlaying 
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
              : 'hover:bg-primary/10 hover:text-primary'
          }`}
          title="Listen to pronunciation"
        >
          <Volume2 className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        </Button>

        {/* Copy */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className={`rounded-xl h-11 w-11 transition-all ${
            copied 
              ? 'bg-emerald-500 text-white' 
              : 'hover:bg-primary/10 hover:text-primary'
          }`}
          title="Copy to clipboard"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </Button>

        {/* Share */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          className="rounded-xl h-11 w-11 hover:bg-primary/10 hover:text-primary transition-all"
          title="Share this word"
        >
          <Share2 className="h-5 w-5" />
        </Button>

        {/* Bookmark */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmark}
          className={`rounded-xl h-11 w-11 transition-all ${
            bookmarked 
              ? 'bg-amber-500/10 text-amber-500' 
              : 'hover:bg-primary/10 hover:text-primary'
          }`}
          title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          <Bookmark className={`h-5 w-5 transition-all ${bookmarked ? 'fill-amber-500' : ''}`} />
        </Button>

        {/* Google Search */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(`https://www.google.com/search?q=define+${word.word}`, '_blank')}
          className="rounded-xl h-11 w-11 hover:bg-primary/10 hover:text-primary transition-all"
          title="Search on Google"
        >
          <ExternalLink className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
