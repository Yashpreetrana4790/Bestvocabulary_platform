import React, { Suspense } from 'react';
import SmartSearchBar from '@/components/SmartSearchBar';
import SearchResults from './components/SearchResults';

export const metadata = {
  title: 'Search Words | Best Vocabulary',
  description: 'Search for words by keyword or meaning using AI semantic search',
};

export default function SearchPage({ searchParams }) {
  const query = searchParams?.q || '';
  const mode = searchParams?.mode || 'text';
  const isAIMode = mode === 'ai';

  return (
    <div className="min-h-screen">
      {/* Hero Search Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 sm:py-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {isAIMode ? (
                <>
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    AI-Powered
                  </span>{' '}
                  Word Search
                </>
              ) : (
                'Search Words'
              )}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {isAIMode
                ? 'Find words by their meaning, not just spelling. Our AI understands context and synonyms.'
                : 'Search our dictionary by word or phrase'}
            </p>
          </div>

          <SmartSearchBar />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {query ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span>Searching...</span>
                </div>
              </div>
            }
          >
            <SearchResults query={query} mode={mode} />
          </Suspense>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
        <svg
          className="w-8 h-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Start Searching</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Enter a word or phrase above to search. Toggle to AI mode to search by meaning instead of
        keywords.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        <div className="rounded-xl border bg-card p-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="font-medium">Text Search</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Search by exact word spelling or prefix match
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="font-medium">AI Search</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Search by meaning – find synonyms and related words
          </p>
        </div>
      </div>
    </div>
  );
}
