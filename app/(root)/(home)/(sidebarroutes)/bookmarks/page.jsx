'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  Search, 
  SortAsc, 
  SortDesc,
  Calendar,
  ArrowRight,
  Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredBookmarks = bookmarks
    .filter((b) => 
      b.word.toLowerCase().includes(search.toLowerCase()) ||
      b.meaning?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.bookmarkedAt) - new Date(a.bookmarkedAt);
      } else if (sortOrder === 'oldest') {
        return new Date(a.bookmarkedAt) - new Date(b.bookmarkedAt);
      } else {
        return a.word.localeCompare(b.word);
      }
    });

  const handleSpeak = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <BookmarkCheck className="h-4 w-4" />
              My Bookmarks
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Saved Words
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {bookmarks.length > 0 
                ? `You have ${bookmarks.length} word${bookmarks.length === 1 ? '' : 's'} saved for later`
                : 'Start bookmarking words to build your personal vocabulary list'
              }
            </p>
          </div>

          {bookmarks.length > 0 && (
            <>
              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="alphabetical">A-Z</option>
                  </select>
                  <Button
                    variant="outline"
                    onClick={clearBookmarks}
                    className="h-12 px-4 gap-2 rounded-xl text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Bookmarks List */}
              <div className="grid gap-3">
                {filteredBookmarks.map((bookmark) => (
                  <div
                    key={bookmark.word}
                    className="group flex items-center justify-between gap-4 p-5 rounded-2xl border bg-card/80 backdrop-blur-sm hover:shadow-md transition-all"
                  >
                    <Link
                      href={`/word/${bookmark.word.toLowerCase()}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xl font-bold text-primary">
                            {bookmark.word.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {bookmark.word}
                          </h3>
                          {bookmark.meaning && (
                            <p className="text-sm text-muted-foreground truncate mt-1">
                              {bookmark.meaning}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                            <Calendar className="h-3 w-3" />
                            <span>Saved {formatDate(bookmark.bookmarkedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleSpeak(bookmark.word)}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => removeBookmark(bookmark.word)}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-destructive/10 flex items-center justify-center transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                      <Link
                        href={`/word/${bookmark.word.toLowerCase()}`}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </div>
                  </div>
                ))}

                {filteredBookmarks.length === 0 && search && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bookmarks match &quot;{search}&quot;</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Empty State */}
          {bookmarks.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <Bookmark className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No bookmarks yet
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start exploring words and click the bookmark icon to save them here for quick access.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/dictionary">
                  <Button className="rounded-full px-6 gap-2">
                    Browse Dictionary
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/random">
                  <Button variant="outline" className="rounded-full px-6">
                    Discover Random Word
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
