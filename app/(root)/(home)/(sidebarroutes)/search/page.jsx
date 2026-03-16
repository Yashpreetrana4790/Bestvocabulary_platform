import React, { Suspense } from 'react';
import SmartSearchBar from '@/components/SmartSearchBar';
import SearchResults from './components/SearchResults';
import LoadingWordFact from '@/components/LoadingWordFact';

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

          <SmartSearchBar introRoll />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {query ? (
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-20 gap-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span>Searching...</span>
                </div>
                <div className="w-full max-w-md px-4">
                  <LoadingWordFact variant="card" />
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
      <p className="text-muted-foreground max-w-xl mx-auto mb-2">
        Use the search bar above and choose how you want to find words. Switch between the two modes using the <strong className="text-foreground">AI</strong> / <strong className="text-foreground">Text</strong> pill inside the search box — each mode works differently.
      </p>
      <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-8">
        Pick the mode that matches what you have in mind: a word you already know, or a meaning you want to put into words.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto text-left">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="font-semibold text-foreground">Text Search</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Use this when you already have a word (or the start of one) and want to look it up. Results match the spelling you type — useful for checking a definition, spelling, or finding words that start with certain letters.
          </p>
          <p className="text-xs text-muted-foreground/90 border-l-2 border-primary/30 pl-3 py-1">
            <span className="font-medium text-foreground/80">Example:</span> Type &quot;happ&quot; to find &quot;happy&quot;, &quot;happiness&quot;, etc.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="font-semibold text-foreground">AI Search</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Use this when you have a feeling, idea, or situation in mind but not the exact word. Describe it in plain language; our AI finds words whose meanings match. Results are ranked by how well they fit what you described.
          </p>
          <p className="text-xs text-muted-foreground/90 border-l-2 border-violet-500/30 pl-3 py-1">
            <span className="font-medium text-foreground/80">Example:</span> Type &quot;feeling happy and grateful&quot; to find words like &quot;content&quot;, &quot;thankful&quot;, &quot;blissful&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
