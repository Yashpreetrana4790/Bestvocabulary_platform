'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Bookmark, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSavedWords } from '@/hooks/useSavedWords';

export default function WordDetailClient({ word }) {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isSaved, toggleSave, isAuthenticated } = useSavedWords();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (word?._id || word?.id) {
      setSaved(isSaved(word._id ?? word.id));
    }
  }, [word, isSaved]);

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

  const handleSave = async () => {
    if (!word) return;
    try {
      await toggleSave(word);
      setSaved(!saved);
      showNotification(saved ? 'Removed from saved words' : 'Saved word!');
    } catch (e) {
      showNotification('Could not update saved word');
    }
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs font-medium px-3 py-2 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Actions Card */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 p-3 rounded-2xl border bg-card shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSpeak}
          className={`rounded-xl h-11 w-11 transition-all ${
            isPlaying 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-primary/10 hover:text-primary'
          }`}
          title="Listen to pronunciation"
          aria-label="Listen to pronunciation"
        >
          <Volume2 className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className={`rounded-xl h-11 w-11 transition-all ${
            copied 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-primary/10 hover:text-primary'
          }`}
          title="Copy to clipboard"
          aria-label="Copy"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          className="rounded-xl h-11 w-11 hover:bg-primary/10 hover:text-primary transition-all"
          title="Share this word"
          aria-label="Share"
        >
          <Share2 className="h-5 w-5" />
        </Button>

        {isAuthenticated && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={`rounded-xl h-11 w-11 transition-all ${
              saved
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-primary/10 hover:text-primary'
            }`}
            title={saved ? 'Remove from saved words' : 'Save word'}
            aria-label={saved ? 'Remove from saved words' : 'Save word'}
          >
            <Bookmark className={`h-5 w-5 ${saved ? 'fill-primary' : ''}`} />
          </Button>
        )}

      </div>
    </div>
  );
}
