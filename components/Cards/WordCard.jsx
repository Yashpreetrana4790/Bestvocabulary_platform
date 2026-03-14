'use client';

import { capitalizeString } from '@/lib/otherutil';
import { Volume2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const WordCard = ({ wordsdata }) => {
  if (!wordsdata) return null;

  const word = wordsdata?.word || '';
  const pronunciation = wordsdata?.pronunciation || '';
  const firstMeaning = wordsdata?.meanings?.[0];
  const definition = firstMeaning?.subtitle || firstMeaning?.meaning || '';
  const meaningCount = wordsdata?.meanings?.length || 0;
  const pos = firstMeaning?.pos || '';
  const category = firstMeaning?.category || '';
  const frequency = wordsdata?.frequency || '';
  
  const difficulty = firstMeaning?.difficulty || 'Beginner';
  
  const difficultyStyles = {
    Beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Advanced: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  const frequencyDot = {
    high: 'bg-emerald-500',
    medium: 'bg-amber-500',
    low: 'bg-rose-500',
  };

  const handleSpeak = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ('speechSynthesis' in window && word) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Link href={`/word/${encodeURIComponent(word?.toLowerCase())}`} className="block group h-full">
      <div className="h-full rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Header Row */}
          <div className="flex items-start gap-2 mb-2">
            {/* Word + Audio */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {capitalizeString(word)}
                </h3>
                <button 
                  onClick={handleSpeak}
                  className="shrink-0 w-7 h-7 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors"
                  aria-label="Listen to pronunciation"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </button>
              </div>
              {/* Pronunciation */}
              {pronunciation && (
                <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
                  {pronunciation}
                </p>
              )}
            </div>
            
            {/* Difficulty Badge */}
            <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${difficultyStyles[difficulty] || difficultyStyles.Beginner}`}>
              {difficulty}
            </span>
          </div>

          {/* Part of Speech */}
          {pos && (
            <p className="text-xs text-primary/80 font-medium mb-1.5 truncate">
              {pos}
            </p>
          )}

          {/* Definition */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {definition || 'No definition available'}
          </p>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-muted/30 border-t border-border/50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            {/* Category */}
            {category && (
              <span className="text-xs text-muted-foreground bg-background/80 px-2 py-0.5 rounded border border-border/50 truncate max-w-[100px]">
                {category}
              </span>
            )}
            
            {/* Meanings Count */}
            {meaningCount > 1 && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                +{meaningCount - 1} more
              </span>
            )}

            {/* Frequency Indicator */}
            {frequency && (
              <div className="flex items-center gap-1" title={`${frequency} frequency`}>
                <span className={`w-1.5 h-1.5 rounded-full ${frequencyDot[frequency] || frequencyDot.medium}`} />
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all shrink-0">
            <ArrowUpRight className="h-3.5 w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WordCard;
