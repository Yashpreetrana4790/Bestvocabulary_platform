'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Search, Sparkles, X, Loader2, ArrowRight } from 'lucide-react';
import { quickSearch, semanticSearchWords } from '@/services/wordapis';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const SmartSearchBar = ({ className, autoFocus = false, introRoll = false, endSlot = null }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-focus on mount (e.g. home page hero)
  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, [autoFocus]);

  const [query, setQuery] = useState('');
  const [isAIMode, setIsAIMode] = useState(() => searchParams?.get('mode') === 'ai');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModeHint, setShowModeHint] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  // Intro hint (keep it permanent) without any AI/Text toggling animation.
  useEffect(() => {
    if (!introRoll) return;
    setShowModeHint(true);
  }, [introRoll]);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        if (isAIMode) {
          const semanticResults = await semanticSearchWords(query, 6);
          setResults(
            semanticResults.map((r) => ({
              ...r.word,
              score: r.score,
              isSemanticResult: true,
            }))
          );
        } else {
          const quickResults = await quickSearch(query, 6);
          setResults(quickResults);
        }
        setShowDropdown(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, isAIMode ? 500 : 300);

    return () => clearTimeout(timer);
  }, [query, isAIMode]);

  // Close dropdown and remove focus when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (e) => {
      const inContainer = containerRef.current?.contains(e.target);
      const inDropdown = dropdownRef.current?.contains(e.target);
      if (!inContainer && !inDropdown) {
        setShowDropdown(false);
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateDropdownPosition = useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined') return;
    const rect = containerRef.current.getBoundingClientRect();
    const top = rect.bottom + 8; // mt-2 equivalent
    const left = Math.max(8, rect.left);
    const width = Math.min(rect.width, window.innerWidth - left - 8);
    setDropdownStyle({
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
    });
  }, []);

  useEffect(() => {
    if (!showDropdown) return;
    updateDropdownPosition();

    const onUpdate = () => updateDropdownPosition();
    window.addEventListener('resize', onUpdate);
    // capture scroll from nested containers too
    window.addEventListener('scroll', onUpdate, true);

    return () => {
      window.removeEventListener('resize', onUpdate);
      window.removeEventListener('scroll', onUpdate, true);
    };
  }, [showDropdown, updateDropdownPosition]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (isAIMode) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&mode=ai`);
    } else {
      router.push(`/dictionary?search=${encodeURIComponent(query.trim())}`);
    }
    setShowDropdown(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const toggleMode = () => {
    setIsAIMode(!isAIMode);
    setResults([]);
    if (query.trim().length >= 2) {
      setIsLoading(true);
    }
  };

  return (
    <div ref={containerRef} className={cn('relative w-full max-w-2xl mx-auto min-w-0', className)}>
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <div
            className={cn(
              'relative flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border-2 bg-background px-2.5 sm:px-4 py-2.5 sm:py-3 transition-all duration-300 min-w-0',
              isFocused
                ? 'border-primary shadow-lg shadow-primary/10 ring-4 ring-primary/5'
                : 'border-border hover:border-primary/50',
              isAIMode && isFocused && 'border-violet-500 shadow-violet-500/10 ring-violet-500/5'
            )}
          >
            {/* AI / Text Mode Toggle – roll animation during intro */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={toggleMode}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200',
                    isAIMode
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80',
                  )}
                  aria-label={isAIMode ? 'AI search by meaning – click to switch to exact word' : 'Exact word search – click to switch to AI by meaning'}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {isAIMode ? (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">AI</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Text</span>
                      </>
                    )}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[260px]">
                {isAIMode ? (
                  <>Search by <strong>meaning</strong> (e.g. &quot;feeling happy&quot;) — finds related words. Click to switch to exact word search.</>
                ) : (
                  <>Search by <strong>exact word</strong> — type the word you want. Click to switch to AI meaning search.</>
                )}
              </TooltipContent>
            </Tooltip>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                if (results.length > 0) setShowDropdown(true);
              }}
              placeholder={
                isAIMode
                  ? 'Search by meaning... e.g. "feeling happy"'
                  : 'Search for a word...'
              }
              className="flex-1 min-w-0 bg-transparent text-sm sm:text-base outline-none placeholder:text-muted-foreground/60"
            />

            {/* Loading / Clear / Submit */}
            <div className="flex items-center gap-1">
              {endSlot}
              {isLoading && (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              )}
              {query && !isLoading && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Clear the search box</TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    disabled={!query.trim()}
                    className={cn(
                      'ml-1 flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200',
                      query.trim()
                        ? isAIMode
                          ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:opacity-90'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    )}
                    aria-label="Run search"
                  >
                    <span className="hidden sm:inline">Search</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[240px]">
                  {query.trim()
                    ? (isAIMode ? 'Search for words that match this meaning' : 'Search for this exact word in the dictionary')
                    : 'Type something to search (by meaning or exact word)'}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </form>

        {/* Dropdown Results */}
        {showDropdown && (results.length > 0 || isLoading) && (
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="fixed z-[120] max-h-[50vh] rounded-xl border bg-background shadow-xl overflow-y-auto overscroll-contain animate-in fade-in-0 slide-in-from-top-2 duration-200"
          >
            {isLoading && results.length === 0 ? (
              <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{isAIMode ? 'Searching by meaning...' : 'Searching...'}</span>
              </div>
            ) : (
              <>
                {isAIMode && (
                  <div className="flex items-center gap-2 border-b bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-4 py-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                    <span>AI Semantic Results - ranked by meaning similarity</span>
                  </div>
                )}
                <ul className="divide-y">
                  {results.map((word, index) => (
                    <li key={word._id || word.id || index}>
                      <Link
                        href={`/word/${word.word}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground capitalize">
                              {word.word}
                            </span>
                            {word.pronunciation && (
                              <span className="text-xs text-muted-foreground">
                                {word.pronunciation}
                              </span>
                            )}
                            {word.score !== undefined && (
                              <span className="ml-auto text-xs rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5">
                                {Math.round(word.score * 100)}% match
                              </span>
                            )}
                          </div>
                          {word.meanings?.[0]?.subtitle && (
                            <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                              {word.meanings[0].subtitle}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="border-t bg-muted/30 px-4 py-2">
                  <button
                    onClick={handleSubmit}
                    className="flex w-full items-center justify-center gap-2 text-sm text-primary hover:underline"
                  >
                    View all results for &quot;{query}&quot;
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Helper text when focused */}
      {isFocused && !showDropdown && (
        <p className="mt-2 text-center text-xs text-muted-foreground animate-in fade-in-0 duration-200">
          {isAIMode ? (
            <>
              <Sparkles className="inline h-3 w-3 mr-1 text-violet-500" />
              AI mode searches by meaning, not just keywords
            </>
          ) : (
            'Type at least 2 characters to search for an exact word'
          )}
        </p>
      )}

      {/* Hint after intro roll: clarify meaning vs word */}
      {showModeHint && (
        <p className="mt-3 px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-center text-xs text-muted-foreground animate-in fade-in-0 duration-300  mx-auto">
          <span className="font-medium text-foreground">Tip:</span> Use <strong>AI</strong> to find words by meaning (e.g. &quot;feeling happy&quot;). Switch to <strong>Text</strong> to find an exact word by spelling.
        </p>
      )}
    </div>
  );
};

export default SmartSearchBar;
