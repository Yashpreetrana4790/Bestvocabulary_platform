'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command, ArrowRight, Sparkles, X } from 'lucide-react';
import { quickSearch } from '@/services/wordapis';

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const searchWords = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await quickSearch(query, 8);
        setResults(data || []);
        setSelectedIndex(0);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchWords, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = useCallback((word) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    router.push(`/word/${word.toLowerCase()}`);
  }, [router]);

  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex].word);
    }
  };

  const goToAISearch = () => {
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}&mode=ai`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
          setResults([]);
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 bg-card border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search words..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNavigation}
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <button
            onClick={() => {
              setIsOpen(false);
              setQuery('');
              setResults([]);
            }}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {loading && (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="p-2">
              {results.map((result, index) => (
                <button
                  key={result.word}
                  onClick={() => handleSelect(result.word)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                    index === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted/80'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <span className="font-semibold text-muted-foreground">
                      {result.word?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{result.word}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.meanings?.[0]?.subtitle || result.pronunciation}
                    </p>
                  </div>
                  <ArrowRight className={`h-4 w-4 shrink-0 ${
                    index === selectedIndex ? 'opacity-100' : 'opacity-0'
                  }`} />
                </button>
              ))}
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No words found for "{query}"</p>
              <button
                onClick={goToAISearch}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Sparkles className="h-4 w-4" />
                Try AI semantic search
              </button>
            </div>
          )}

          {!loading && query.length < 2 && (
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">Quick actions</p>
              <div className="space-y-1">
                {[
                  { label: 'Browse Dictionary', href: '/dictionary', icon: '📖' },
                  { label: 'Word of the Day', href: '/wordofday', icon: '✨' },
                  { label: 'Random Word', href: '/random', icon: '🎲' },
                  { label: 'AI Search', href: '/search', icon: '🤖' },
                  { label: 'My Bookmarks', href: '/bookmarks', icon: '🔖' },
                ].map((action) => (
                  <button
                    key={action.href}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(action.href);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/80 transition-colors text-left"
                  >
                    <span className="text-xl">{action.icon}</span>
                    <span className="font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd>
              to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">esc</kbd>
            to close
          </span>
        </div>
      </div>
    </div>
  );
}
