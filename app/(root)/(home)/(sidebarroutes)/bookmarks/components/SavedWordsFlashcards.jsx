'use client';

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SavedWordsFlashcards({ words, onClose }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const list = words?.filter((w) => w?.word) ?? [];
  const total = list.length;
  const current = list[index];
  const hasMultiple = total > 1;

  const handlePrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? total - 1 : i - 1));
    setFlipped(false);
  }, [total]);
  const handleNext = useCallback(() => {
    setIndex((i) => (i >= total - 1 ? 0 : i + 1));
    setFlipped(false);
  }, [total]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis && text) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  if (total === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No words to practice. Save some words first.</p>
        <Button variant="outline" className="mt-4" onClick={onClose}>Back to list</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-2">
          <X className="h-4 w-4" />
          Back to list
        </Button>
        <span className="text-sm text-muted-foreground tabular-nums">
          {index + 1} / {total}
        </span>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
        className="min-h-[220px] sm:min-h-[260px] rounded-2xl border-2 border-border bg-card shadow-lg flex flex-col items-center justify-center p-6 sm:p-8 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all hover:border-primary/30"
      >
        {!flipped ? (
          <>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Word</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center break-words">
              {current?.word}
            </h2>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); speak(current?.word); }}
              className="mt-4 w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center"
              aria-label="Listen"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <p className="text-xs text-muted-foreground mt-4">Tap to see definition</p>
          </>
        ) : (
          <>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Definition</p>
            <p className="text-lg sm:text-xl text-foreground text-center max-w-lg">
              {current?.meaning || 'No definition saved.'}
            </p>
            <p className="text-xs text-muted-foreground mt-4">Tap to see word</p>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-xl h-11 w-11">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setFlipped(false)} className="gap-2 rounded-xl">
            <RotateCw className="h-4 w-4" />
            Flip
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext} className="rounded-xl h-11 w-11">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
