'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  Search,
  ArrowRight,
  Volume2,
  LogIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSavedWords } from '@/hooks/useSavedWords';

export default function SavedWordsPage() {
  const { savedWords, removeSave, refetch, isLoading, isAuthenticated } = useSavedWords();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredList = (savedWords || [])
    .filter(
      (b) =>
        (b.word || '').toLowerCase().includes(search.toLowerCase()) ||
        (b.meaning || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'alphabetical') return (a.word || '').localeCompare(b.word || '');
      return 0;
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

  const handleRemove = async (wordId) => {
    try {
      await removeSave(wordId);
    } catch (e) {
      console.error('Failed to remove saved word', e);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <section className="relative py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
          </div>
          <div className="max-w-5xl mx-auto text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <BookmarkCheck className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Saved Words
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Sign in to save words and see them here. Your saved words will be synced to your account.
            </p>
            <Link href="/login">
              <Button className="rounded-full px-6 gap-2">
                <LogIn className="h-4 w-4" />
                Sign in
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <BookmarkCheck className="h-4 w-4" />
              My Saved Words
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Saved Words
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {savedWords.length > 0
                ? `You have ${savedWords.length} word${savedWords.length === 1 ? '' : 's'} saved`
                : 'Save words from the dictionary to build your personal list.'}
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : savedWords.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search saved words..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="newest">Newest first</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>

              <div className="grid gap-3">
                {filteredList.map((item) => (
                  <div
                    key={item.wordId ?? item.word}
                    className="group flex items-center justify-between gap-4 p-5 rounded-2xl border bg-card/80 backdrop-blur-sm hover:shadow-md transition-all"
                  >
                    <Link
                      href={`/word/${(item.word || '').toLowerCase()}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xl font-bold text-primary">
                            {(item.word || '').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {item.word}
                          </h3>
                          {item.meaning && (
                            <p className="text-sm text-muted-foreground truncate mt-1">
                              {item.meaning}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleSpeak(item.word)}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleRemove(item.wordId)}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-destructive/10 flex items-center justify-center transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                      <Link
                        href={`/word/${(item.word || '').toLowerCase()}`}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </div>
                  </div>
                ))}
                {filteredList.length === 0 && search && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No saved words match &quot;{search}&quot;</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <Bookmark className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No saved words yet
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Click the save icon on any word page to add it here.
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
