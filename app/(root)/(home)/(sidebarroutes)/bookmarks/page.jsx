'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Search,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSavedWords } from '@/hooks/useSavedWords';
import LoadingWordFact from '@/components/LoadingWordFact';
import SavedWordsFlashcards from './components/SavedWordsFlashcards';
import SavedWordsQuiz from './components/SavedWordsQuiz';
import UserDashboardLayout from '@/components/UserDashboard/UserDashboardLayout';
import WorkspacePageHeader from '@/components/UserDashboard/WorkspacePageHeader';
import PracticeTrainingBanner from '@/components/UserDashboard/PracticeTrainingBanner';
import WordCard from '@/components/Cards/WordCard';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

export default function SavedWordsPage() {
  const { savedWords, isLoading } = useSavedWords();
  const [practiceMode, setPracticeMode] = useState(null); // null | 'flashcards' | 'quiz'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredList = useMemo(() => {
    const list = (savedWords || []).filter(
      (b) =>
        (b.word || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.meaning || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortOrder === 'alphabetical') return [...list].sort((a, b) => (a.word || '').localeCompare(b.word || ''));
    if (sortOrder === 'oldest') return [...list].reverse();
    return list;
  }, [savedWords, searchQuery, sortOrder]);

  return (
    <ProtectedRoute>
      <UserDashboardLayout activeKey="saved">
        <div className="max-w-6xl mx-auto w-full">
          <WorkspacePageHeader
            kicker="Collection"
            title="Saved words"
            description={
              savedWords.length > 0
                ? `${savedWords.length} word${savedWords.length === 1 ? '' : 's'} in your library. Search, sort, and practice below.`
                : 'Words you save from the dictionary appear here for review, flashcards, and quizzes.'
            }
            className="mb-8 sm:mb-10"
          />

          {isLoading ? (
            <div className="flex flex-col items-center py-12 gap-6">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
              <p className="text-muted-foreground animate-pulse">Loading your collection...</p>
              <div className="w-full max-w-md">
                <LoadingWordFact variant="card" />
              </div>
            </div>
          ) : savedWords.length > 0 ? (
            <div className="space-y-8">
              {/* Practice Banner */}
              {practiceMode === null && (
                <PracticeTrainingBanner
                  className="mb-10"
                  savedWordCount={filteredList.length}
                  onStartFlashcards={() => setPracticeMode('flashcards')}
                  onStartQuiz={() => setPracticeMode('quiz')}
                  quizDisabled={filteredList.length < 2}
                  quizDisabledHint={filteredList.length < 2 ? 'Add at least 2 words to play' : undefined}
                />
              )}

              {/* Interaction Modes */}
              {practiceMode === 'flashcards' && (
                <div className="mb-12">
                  <SavedWordsFlashcards
                    words={filteredList}
                    onClose={() => setPracticeMode(null)}
                  />
                </div>
              )}
              {practiceMode === 'quiz' && (
                <div className="mb-12">
                  <SavedWordsQuiz
                    words={filteredList}
                    onClose={() => setPracticeMode(null)}
                  />
                </div>
              )}

              {/* Filtering and List - Only when not in full practice mode */}
              {practiceMode === null && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-1 min-w-0 items-center gap-3 h-14 px-4 rounded-2xl border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-shadow">
                      <Search
                        className="h-5 w-5 shrink-0 text-muted-foreground pointer-events-none"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <input
                        type="text"
                        placeholder="Search your collection..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="min-w-0 flex-1 h-full bg-transparent border-0 p-0 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                      />
                    </div>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="h-14 px-4 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium text-foreground min-w-[10.5rem]"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="alphabetical">A – Z</option>
                    </select>
                  </div>

                  {filteredList.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {filteredList.map((item) => (
                        <WordCard
                          key={item.wordId ?? item._id ?? item.word}
                          wordsdata={item}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border border-dashed border-border/60">
                      <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
                      <p className="text-xl font-medium text-muted-foreground">No matches found for &quot;{searchQuery}&quot;</p>
                      <Button variant="outline" className="mt-6 rounded-full px-8" onClick={() => setSearchQuery('')}>
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 rounded-[2rem] bg-muted/30 flex items-center justify-center mx-auto mb-8">
                <Bookmark className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                No saved words yet
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
                Click the save icon on any word page to build your own personal training list.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/dictionary">
                  <Button size="lg" className="rounded-full px-10 h-14 font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                    Browse Dictionary
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/random">
                  <Button size="lg" variant="outline" className="rounded-full px-10 h-14 font-bold border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all">
                    Discover Random
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </UserDashboardLayout>
    </ProtectedRoute>
  );
}
