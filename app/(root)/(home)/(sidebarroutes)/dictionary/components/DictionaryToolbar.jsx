'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/helper';

const LIMIT_OPTIONS = [12, 24, 48];

export default function DictionaryToolbar({
  totalWords,
  currentPage,
  totalPages,
  wordsOnPage,
  hasFilters,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit')) || 12));

  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', newLimit);
    params.set('page', '1');
    router.push(`/dictionary?${params.toString()}`, { scroll: false });
  };

  const startItem = totalWords > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endItem = totalWords > 0 ? Math.min(currentPage * limit, totalWords) : 0;
  const showRange = totalWords > 0 && wordsOnPage > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
      <p className="text-sm text-muted-foreground">
        {hasFilters ? (
          <>Found <span className="font-medium text-foreground">{wordsOnPage}</span> results</>
        ) : showRange ? (
          <>
            <span className="font-medium text-foreground">{startItem}–{endItem}</span>
            {' '}of {totalWords.toLocaleString()}
          </>
        ) : (
          'Use the search above or open Filters to explore the dictionary.'
        )}
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        {hasFilters && (
          <Link href="/dictionary" className="text-sm text-primary hover:underline">
            Clear filters
          </Link>
        )}
        {showRange && (
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Per page</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="h-8 pl-2 pr-8 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Items per page"
            >
              {LIMIT_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  );
}
