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
import { getExampleSentenceStrings, getPhrasalVerbs } from '@/lib/wordShape';

export default function WordDetailClient({ word, embeddedInCard, actionsOnly = false, inline = false }) {
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
    const ex0 = getExampleSentenceStrings(word.meanings?.[0] || {})[0] || '';
    const text = `${word.word} (${word.pronunciation || ''})\n\nDefinition: ${word.meanings?.[0]?.meaning || ''}\n\nExample: ${ex0}`;
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
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return;
    }
    try {
      await toggleSave(word);
      setSaved(!saved);
      showNotification(saved ? 'Removed from saved words' : 'Saved word!');
    } catch (e) {
      showNotification('Could not update saved word');
    }
  };

  const meaningsCount = word?.meanings?.length ?? 0;
  const expressionsCount = word?.expressions?.length ?? 0;
  const phrasalCount = getPhrasalVerbs(word).length;
  const questionsCount = word?.questions?.length ?? 0;
  const phrasesTotal = expressionsCount + phrasalCount;

  return (
    <div className="relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs font-medium px-3 py-2 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Actions + compact includes: own card on small screens, no card when embedded in hero on lg */}
      <div className={actionsOnly
          ? `${inline ? '' : 'rounded-xl border border-border/70 bg-muted/20'} overflow-hidden`
          : (embeddedInCard
            ? 'rounded-xl border border-border/70 bg-muted/20 overflow-hidden lg:rounded-xl lg:border-border/70 lg:bg-muted/20 flex flex-1 flex-col'
            : 'rounded-xl sm:rounded-2xl border border-border/80 bg-card/80 shadow-sm overflow-hidden')
        }>
        {/* Actions */}
        <div className={actionsOnly ? (inline ? 'pt-2' : 'p-2.5 sm:p-3') : 'p-2.5 sm:p-3'}>
          <div className="flex items-center justify-center sm:justify-start gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={embeddedInCard ? 'icon' : 'icon'}
                onClick={handleCopy}
                className={`rounded-lg sm:rounded-xl ${embeddedInCard ? 'h-8.5 w-8.5 sm:h-9 sm:w-9' : 'h-10 w-10 sm:h-11 sm:w-11'} transition-all ${copied
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
                size={embeddedInCard ? 'icon' : 'icon'}
                onClick={handleShare}
                className={`rounded-lg sm:rounded-xl ${embeddedInCard ? 'h-8.5 w-8.5 sm:h-9 sm:w-9' : 'h-10 w-10 sm:h-11 sm:w-11'} hover:bg-primary/10 hover:text-primary transition-all`}
                aria-label="Share this word"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[240px]">
              Share this word via your device’s share menu (or copy the link if sharing isn’t available).
            </TooltipContent>
          </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={embeddedInCard ? 'icon' : 'icon'}
                  onClick={handleSave}
                  className={`rounded-lg sm:rounded-xl ${embeddedInCard ? 'h-8.5 w-8.5 sm:h-9 sm:w-9' : 'h-10 w-10 sm:h-11 sm:w-11'} transition-all ${saved
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
          </div>
        </div>

        {/* Includes / stats */}
        {!actionsOnly && (meaningsCount > 0 || phrasesTotal > 0 || questionsCount > 0) && (
          <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 pt-2 border-t border-border/50">
            <div className="grid grid-cols-3 gap-1.5">
              {meaningsCount > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex flex-col items-center justify-center gap-0.5 min-h-12 px-1.5 py-1.5 rounded-md bg-background/80 border border-border/60 text-foreground">
                      <BookOpen className="h-3.5 w-3.5 text-primary/80" />
                      <span className="text-[11px] font-semibold tabular-nums leading-none">{meaningsCount}</span>
                      <span className="text-[10px] text-muted-foreground leading-none">Meanings</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Definitions for this word</TooltipContent>
                </Tooltip>
              )}
              {phrasesTotal > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex flex-col items-center justify-center gap-0.5 min-h-12 px-1.5 py-1.5 rounded-md bg-background/80 border border-border/60 text-foreground">
                      <Quote className="h-3.5 w-3.5 text-amber-600/80 dark:text-amber-400/80" />
                      <span className="text-[11px] font-semibold tabular-nums leading-none">{phrasesTotal}</span>
                      <span className="text-[10px] text-muted-foreground leading-none">Phrases</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Idioms & expressions</TooltipContent>
                </Tooltip>
              )}
              {questionsCount > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex flex-col items-center justify-center gap-0.5 min-h-12 px-1.5 py-1.5 rounded-md bg-background/80 border border-border/60 text-foreground">
                      <HelpCircle className="h-3.5 w-3.5 text-primary/80" />
                      <span className="text-[11px] font-semibold tabular-nums leading-none">{questionsCount}</span>
                      <span className="text-[10px] text-muted-foreground leading-none">Questions</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Related questions</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
