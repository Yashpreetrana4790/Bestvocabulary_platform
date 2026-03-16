'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Share2, Copy, Check, BookOpen, Quote, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSavedWords } from '@/hooks/useSavedWords';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function WordDetailClient({ word, embeddedInCard }) {
  const [copied, setCopied] = useState(false);
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

      {/* Actions + compact includes: own card on small screens, no card when embedded in hero on lg */}
      <div className={embeddedInCard
          ? 'rounded-xl sm:rounded-2xl border border-border/80 bg-card/80 shadow-sm overflow-hidden lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none flex flex-1 flex-col'
          : 'rounded-xl sm:rounded-2xl border border-border/80 bg-card/80 shadow-sm overflow-hidden'
        }>
        {/* Actions: Copy, Share, Save — tighter on mobile */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 p-3 sm:p-4 lg:p-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className={`rounded-lg sm:rounded-xl h-10 w-10 sm:h-11 sm:w-11 transition-all ${copied
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                aria-label="Copy word and definition"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[240px]">
              {copied ? 'Copied!' : 'Copy this word, pronunciation, definition, and example to your clipboard.'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="rounded-lg sm:rounded-xl h-10 w-10 sm:h-11 sm:w-11 hover:bg-primary/10 hover:text-primary transition-all"
                aria-label="Share this word"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[240px]">
              Share this word via your device’s share menu (or copy the link if sharing isn’t available).
            </TooltipContent>
          </Tooltip>

          {isAuthenticated && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  className={`rounded-lg sm:rounded-xl h-10 w-10 sm:h-11 sm:w-11 transition-all ${saved
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-primary/10 hover:text-primary'
                    }`}
                  aria-label={saved ? 'Remove from saved words' : 'Save word'}
                >
                  <Bookmark className={`h-5 w-5 ${saved ? 'fill-primary' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[240px]">
                {saved ? 'Remove this word from your saved list.' : 'Save this word to your list so you can review it later.'}
              </TooltipContent>
            </Tooltip>
          )}

        </div>

        {/* Compact includes: single row, icon + count */}
        {(() => {
          const m = word?.meanings?.length ?? 0;
          const ex = word?.expressions?.length ?? 0;
          const pv = word?.PhrasalVerbs?.length ?? 0;
          const q = word?.questions?.length ?? 0;
          const idiomsPhrases = ex + pv;
          const hasAny = m > 0 || idiomsPhrases > 0 || q > 0;
          if (!hasAny) return null;
          return (
            <div className="px-3 sm:px-4 pb-2.5 sm:pb-3 pt-2 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs text-muted-foreground border-t border-border/50">
              {m > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-primary/80" />
                      <span className="tabular-nums">{m} meaning{m !== 1 ? 's' : ''}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Definitions for this word</TooltipContent>
                </Tooltip>
              )}
              {idiomsPhrases > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-1.5">
                      <Quote className="h-3.5 w-3.5 text-amber-600/80 dark:text-amber-400/80" />
                      <span className="tabular-nums">{idiomsPhrases} idiom{idiomsPhrases !== 1 ? 's' : ''}/phrase{idiomsPhrases !== 1 ? 's' : ''}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Idioms & expressions</TooltipContent>
                </Tooltip>
              )}
              {q > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-primary/80" />
                      <span className="tabular-nums">{q} question{q !== 1 ? 's' : ''}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Related questions</TooltipContent>
                </Tooltip>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
