'use client';

import { capitalizeString } from '@/lib/otherutil';
import {
  Volume2,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Quote,
  Heart,
  FlaskConical,
  Cpu,
  Briefcase,
  Scale,
  Palette,
  Brain,
  GraduationCap,
  BookMarked,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSavedWords } from '@/hooks/useSavedWords';

// Category → icon for quick scan (word lover UX)
const CATEGORY_ICONS = {
  Medical: Heart,
  Science: FlaskConical,
  Technology: Cpu,
  Business: Briefcase,
  Legal: Scale,
  Arts: Palette,
  Psychology: Brain,
  Academic: GraduationCap,
  Literature: BookMarked,
  Philosophy: Brain,
  Economics: Briefcase,
  Politics: Scale,
  General: BookOpen,
};
const CATEGORY_ICON_DEFAULT = BookOpen;

const WordCard = ({ wordsdata }) => {
  const { isSaved, toggleSave, isAuthenticated } = useSavedWords();

  if (!wordsdata) return null;

  const word = wordsdata?.word || '';
  const pronunciation = wordsdata?.pronunciation || '';
  const meanings = wordsdata?.meanings || [];
  const firstMeaning = meanings[0];
  const definition = firstMeaning?.subtitle || firstMeaning?.meaning || '';
  const meaningCount = meanings.length;
  const pos = firstMeaning?.pos || '';
  const category = firstMeaning?.category || '';
  const frequency = wordsdata?.frequency || '';
  const expressionsCount = (wordsdata?.expressions?.length ?? 0) + (wordsdata?.PhrasalVerbs?.length ?? 0); // idioms + phrases

  const difficulty = firstMeaning?.difficulty || 'Beginner';
  const difficultyStyles = {
    Beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Advanced: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  // Difficulty breakdown across meanings (easy / medium / hard)
  const difficultyCounts = meanings.reduce(
    (acc, m) => {
      const d = (m?.difficulty || 'Beginner').toLowerCase();
      if (d === 'beginner' || d === 'easy') acc.easy += 1;
      else if (d === 'intermediate' || d === 'medium') acc.medium += 1;
      else acc.hard += 1;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 }
  );

  const frequencyDot = {
    high: 'bg-emerald-500',
    medium: 'bg-amber-500',
    low: 'bg-rose-500',
  };

  const wordId = wordsdata?._id ?? wordsdata?.id ?? wordsdata?.wordId;
  const saved = wordId ? isSaved(wordId) : false;

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

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(wordsdata);
  };

  const CategoryIcon = CATEGORY_ICONS[category] || CATEGORY_ICON_DEFAULT;

  return (
    <Link href={`/word/${encodeURIComponent(word?.toLowerCase())}`} className="block group h-full">
      <div className="h-full rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Header Row: Word, Audio, Save, Difficulty */}
          <div className="flex items-start gap-2 mb-2">
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
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {isAuthenticated && (
                <button
                  onClick={handleSave}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-primary/10 hover:text-primary"
                  aria-label={saved ? 'Remove from saved words' : 'Save word'}
                  title={saved ? 'Unsave' : 'Save word'}
                >
                  <Bookmark
                    className={`h-3.5 w-3.5 ${saved ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                  />
                </button>
              )}
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${difficultyStyles[difficulty] || difficultyStyles.Beginner}`}
              >
                {difficulty}
              </span>
            </div>
          </div>

          {/* Category icon + Part of speech */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {category && (
              <span
                className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md border border-border/50"
                title={category}
              >
                <CategoryIcon className="h-3 w-3 shrink-0" />
                <span className="truncate max-w-[90px]">{category}</span>
              </span>
            )}
            {pos && (
              <span className="text-xs text-primary/80 font-medium">{pos}</span>
            )}
          </div>

          {/* Definition */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {definition || 'No definition available'}
          </p>
        </div>

        {/* Footer: counts + arrow */}
        <div className="px-4 py-3 bg-muted/30 border-t border-border/50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden flex-wrap">
            {/* Meanings count */}
            {meaningCount > 0 && (
              <span
                className="inline-flex items-center gap-1 text-[10px] text-muted-foreground whitespace-nowrap"
                title={`${meaningCount} meaning${meaningCount !== 1 ? 's' : ''}`}
              >
                <BookOpen className="h-3 w-3 shrink-0 text-primary/70" />
                <span>{meaningCount} {meaningCount === 1 ? 'meaning' : 'meanings'}</span>
              </span>
            )}
            {/* Idioms / phrases count */}
            {expressionsCount > 0 && (
              <span
                className="inline-flex items-center gap-1 text-[10px] text-muted-foreground whitespace-nowrap"
                title={`${expressionsCount} idiom${expressionsCount !== 1 ? 's' : ''} or phrase${expressionsCount !== 1 ? 's' : ''}`}
              >
                <Quote className="h-3 w-3 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>{expressionsCount}</span>
              </span>
            )}
            {/* Difficulty breakdown when multiple meanings */}
            {meaningCount > 1 && (difficultyCounts.easy > 0 || difficultyCounts.medium > 0 || difficultyCounts.hard > 0) && (
              <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                {difficultyCounts.easy > 0 && (
                  <span className="flex items-center gap-0.5" title={`${difficultyCounts.easy} easy`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {difficultyCounts.easy}
                  </span>
                )}
                {difficultyCounts.medium > 0 && (
                  <span className="flex items-center gap-0.5" title={`${difficultyCounts.medium} medium`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {difficultyCounts.medium}
                  </span>
                )}
                {difficultyCounts.hard > 0 && (
                  <span className="flex items-center gap-0.5" title={`${difficultyCounts.hard} hard`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {difficultyCounts.hard}
                  </span>
                )}
              </span>
            )}
            {/* Frequency dot */}
            {frequency && (
              <span className="flex items-center gap-1" title={`${frequency} frequency`}>
                <span className={`w-1.5 h-1.5 rounded-full ${frequencyDot[frequency] || frequencyDot.medium}`} />
              </span>
            )}
          </div>

          <div className="w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all shrink-0">
            <ArrowUpRight className="h-3.5 w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WordCard;
