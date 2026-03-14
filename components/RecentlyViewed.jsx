'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, X, Trash2 } from 'lucide-react';
import { useRecentWords } from '@/hooks/useRecentWords';
import { Button } from '@/components/ui/button';

export default function RecentlyViewed({ maxItems = 10, showClear = true }) {
  const { recentWords, clearRecentWords, removeRecentWord } = useRecentWords();

  const displayedWords = recentWords.slice(0, maxItems);

  if (displayedWords.length === 0) {
    return null;
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Recently Viewed</h3>
        </div>
        {showClear && displayedWords.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearRecentWords}
            className="text-muted-foreground hover:text-destructive gap-1 h-8"
          >
            <Trash2 className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {displayedWords.map((item) => (
          <div
            key={item.word}
            className="group flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-muted/80 transition-colors"
          >
            <Link
              href={`/word/${item.word.toLowerCase()}`}
              className="flex-1 min-w-0"
            >
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {item.word}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.meaning || item.pronunciation}
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground hidden sm:block">
                {formatTime(item.viewedAt)}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeRecentWord(item.word);
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                title="Remove from history"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {recentWords.length > maxItems && (
        <div className="mt-4 pt-4 border-t text-center">
          <Link
            href="/history"
            className="text-sm text-primary hover:underline font-medium"
          >
            View all {recentWords.length} words →
          </Link>
        </div>
      )}
    </div>
  );
}
