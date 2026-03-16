'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import wordFacts from '@/word_facts.json';

/**
 * Picks a random word fact to show during loading. Keeps users engaged.
 * Use inside loading fallbacks, skeletons, or slow-loading sections.
 */
export function LoadingWordFact({ variant = 'card', className = '' }) {
  const [fact, setFact] = useState(null);

  useEffect(() => {
    if (!wordFacts?.length) return;
    const index = Math.floor(Math.random() * wordFacts.length);
    setFact(wordFacts[index]);
  }, []);

  if (!fact?.fact) return null;

  const isInline = variant === 'inline';

  if (isInline) {
    return (
      <div
        className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`.trim()}
        role="status"
        aria-live="polite"
      >
        <BookOpen className="h-4 w-4 text-primary shrink-0" />
        <span className="line-clamp-2">{fact.fact}</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-border/60 bg-muted/30 px-4 py-3 ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <BookOpen className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Word fact
          </p>
          <p className="text-sm text-foreground/90 leading-snug">{fact.fact}</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingWordFact;
