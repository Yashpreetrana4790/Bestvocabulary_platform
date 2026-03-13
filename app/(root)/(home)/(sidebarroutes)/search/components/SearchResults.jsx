import React from 'react';
import Link from 'next/link';
import { getWords, semanticSearchWords } from '@/services/wordapis';
import { ArrowUpNarrowWide, Sparkles, ArrowRight } from 'lucide-react';
import { capitalizeString } from '@/lib/otherutil';

async function SearchResults({ query, mode }) {
  const isAIMode = mode === 'ai';

  let results = [];
  let totalCount = 0;

  if (isAIMode) {
    const semanticResults = await semanticSearchWords(query, 20);
    results = semanticResults.map((r) => ({
      ...r.word,
      score: r.score,
    }));
    totalCount = results.length;
  } else {
    const response = await getWords({ search: query, limit: 20 });
    results = response?.data?.words || [];
    totalCount = response?.data?.pagination?.totalItems || results.length;
  }

  if (!results || results.length === 0) {
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">No results found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find any words matching "{query}".{' '}
          {!isAIMode && (
            <span>
              Try{' '}
              <Link
                href={`/search?q=${encodeURIComponent(query)}&mode=ai`}
                className="text-violet-600 hover:underline font-medium"
              >
                AI semantic search
              </Link>{' '}
              to find words by meaning.
            </span>
          )}
        </p>
      </div>
    );
  }

  const difficultyColors = {
    E: 'bg-emerald-500',
    M: 'bg-amber-500',
    H: 'bg-rose-500',
  };

  const difficultyMap = {
    Easy: 'E',
    Beginner: 'E',
    Medium: 'M',
    Intermediate: 'M',
    Hard: 'H',
    Advanced: 'H',
  };

  return (
    <div>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {isAIMode ? 'Semantic Results' : 'Search Results'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Found {totalCount} {totalCount === 1 ? 'word' : 'words'} for "{query}"
            {isAIMode && (
              <span className="inline-flex items-center gap-1 ml-2 text-violet-600">
                <Sparkles className="h-3 w-3" />
                AI-powered
              </span>
            )}
          </p>
        </div>

        {!isAIMode && (
          <Link
            href={`/search?q=${encodeURIComponent(query)}&mode=ai`}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Sparkles className="h-4 w-4" />
            Try AI Search
          </Link>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((word, index) => {
          const difficultyCount = {};
          word.meanings?.forEach((meaning) => {
            const abbr = difficultyMap[meaning.difficulty];
            if (abbr) {
              difficultyCount[abbr] = (difficultyCount[abbr] || 0) + 1;
            }
          });

          return (
            <Link
              key={word._id || word.id || index}
              href={`/word/${word.word}`}
              className="group relative rounded-xl border bg-card p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
            >
              {/* Score badge for AI results */}
              {word.score !== undefined && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-2.5 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
                    <Sparkles className="h-3 w-3" />
                    {Math.round(word.score * 100)}%
                  </span>
                </div>
              )}

              {/* Word */}
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {capitalizeString(word.word)}
              </h3>

              {/* Pronunciation & Difficulty */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {word.pronunciation && (
                  <span className="text-sm text-muted-foreground">{word.pronunciation}</span>
                )}
                {Object.entries(difficultyCount).map(([abbr, count]) => (
                  <span
                    key={abbr}
                    className={`rounded-full px-2 py-0.5 text-xs text-white ${difficultyColors[abbr]}`}
                  >
                    {abbr} {count}
                  </span>
                ))}
              </div>

              {/* Subtitle/Meaning */}
              {word.meanings?.[0]?.subtitle && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {word.meanings[0].subtitle}
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ArrowUpNarrowWide className="h-3.5 w-3.5" />
                  <span>{word.frequency || 'N/A'}</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  View word <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;
