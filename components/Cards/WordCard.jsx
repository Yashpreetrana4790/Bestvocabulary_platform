'use client';

import { capitalizeString } from '@/lib/otherutil';
import {
  Volume2,
  ArrowUpRight,
  Bookmark,
  Share2,
  BookOpen,
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
import { getPhrasalVerbs } from '@/lib/wordShape';
import WordStatPills from '@/components/Cards/WordStatPills';

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
const CATEGORY_STYLES = {
  Medical: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  Science: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  Technology: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
  Business: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Legal: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  Arts: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  Psychology: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  Academic: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Literature: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
  Philosophy: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  Economics: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Politics: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  General: 'bg-primary/10 text-primary border-primary/20',
};

const WordCard = ({ wordsdata }) => {
  const { isSaved, toggleSave, isAuthenticated } = useSavedWords();
  const [copied, setCopied] = React.useState(false);

  if (!wordsdata) return null;

  const word = wordsdata?.word || '';
  const pronunciation = wordsdata?.pronunciation || '';
  const meanings = wordsdata?.meanings || [];
  const firstMeaning = meanings[0];
  const definition = firstMeaning?.subtitle || firstMeaning?.meaning || wordsdata?.meaning || '';
  const meaningCount = meanings.length > 0 ? meanings.length : (wordsdata?.meaning ? 1 : 0);
  const pos = firstMeaning?.pos || wordsdata?.pos || '';
  const category = firstMeaning?.category || wordsdata?.category || '';
  const frequency = wordsdata?.frequency || '';
  const expressionsCount = (wordsdata?.expressions?.length ?? 0) + getPhrasalVerbs(wordsdata).length; // idioms + phrases

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

  const frequencyLabel = {
    high: 'Common',
    medium: 'Moderate',
    low: 'Rare',
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

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return;
    }
    try {
      await toggleSave(wordsdata);
    } catch {
      /* Auth expiry handled in hook (logout); other errors are logged there */
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}/word/${encodeURIComponent(word?.toLowerCase())}`;
    const text = `${capitalizeString(word)} - ${definition}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: capitalizeString(word), text, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // Ignore cancellation and fallback failures.
    }
  };

  const CategoryIcon = CATEGORY_ICONS[category] || CATEGORY_ICON_DEFAULT;
  const categoryStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES.General;

  return (
    <Link href={`/word/${encodeURIComponent(word?.toLowerCase())}`} className="block group h-full">
      <div className="h-full rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Header Row: Word, Audio, Actions, Difficulty */}
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
              <button
                onClick={handleShare}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Share word"
                title={copied ? 'Copied' : 'Share word'}
              >
                <Share2 className={`h-3.5 w-3.5 ${copied ? 'text-primary' : 'text-muted-foreground'}`} />
              </button>
              <button
                onClick={handleSave}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label={saved ? 'Remove from saved words' : 'Save word'}
                title={isAuthenticated ? (saved ? 'Unsave' : 'Save word') : 'Sign in to save'}
              >
                <Bookmark
                  className={`h-3.5 w-3.5 ${saved ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
              </button>
            </div>
          </div>

          {/* Category icon + Part of speech */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {category && (
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md border ${categoryStyle}`}
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

        {/* Footer: stat pills + meta + arrow */}
        <div className="bg-muted/30 border-t border-border/50">
          {(meaningCount > 0 || expressionsCount > 0) && (
            <WordStatPills
              idiomCount={expressionsCount}
              meaningCount={meaningCount}
              variant="compact"
              className="mx-3 sm:mx-4 mt-2"
            />
          )}
          <div className="px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden flex-wrap">
            {/* Difficulty breakdown when multiple meanings */}
            {meaningCount > 1 && (difficultyCounts.easy > 0 || difficultyCounts.medium > 0 || difficultyCounts.hard > 0) && (
              <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                {difficultyCounts.easy > 0 && (
                  <span
                    className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    title={`${difficultyCounts.easy} easy`}
                  >
                    E {difficultyCounts.easy}
                  </span>
                )}
                {difficultyCounts.medium > 0 && (
                  <span
                    className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    title={`${difficultyCounts.medium} medium`}
                  >
                    M {difficultyCounts.medium}
                  </span>
                )}
                {difficultyCounts.hard > 0 && (
                  <span
                    className="px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    title={`${difficultyCounts.hard} hard`}
                  >
                    H {difficultyCounts.hard}
                  </span>
                )}
              </span>
            )}
            {/* Frequency label */}
            {frequency && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground"
                title={`${frequency} frequency`}
              >
                {frequencyLabel[frequency] || 'Moderate'}
              </span>
            )}
          </div>

          <div className="w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-all shrink-0">
            <ArrowUpRight className="h-3.5 w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default WordCard;
