import WordCard from '@/components/Cards/WordCard';
import Pagination from '@/components/Common/Pagination';
import SearchBar from '@/components/search-bar';
import { getWords } from '@/services/wordapis';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { Sparkles, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Dictionary - Browse All Words',
  description: 'Explore our comprehensive dictionary with 10,000+ words. Filter by difficulty, category, or part of speech. Learn new words with definitions, examples, and etymology.',
  keywords: ['dictionary', 'vocabulary', 'word list', 'english words', 'word definitions', 'learn vocabulary'],
  openGraph: {
    title: 'Dictionary - Browse All Words | Best Vocabulary',
    description: 'Explore our comprehensive dictionary with 10,000+ words. Learn new words with definitions, examples, and etymology.',
  },
};

const Page = async ({ searchParams }) => {
  const wordslist = await getWords({
    page: searchParams.page,
    limit: 12,
    search: searchParams.search,
    difficulty: searchParams.difficulty,
    length: searchParams.length,
    startsWith: searchParams.startsWith,
    category: searchParams.category,
    pos: searchParams.pos,
    hasPhrases: searchParams.hasPhrases,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
  });

  const totalWords = wordslist?.data?.pagination?.totalItems || wordslist?.data?.pagination?.total || 0;
  const currentPage = searchParams.page ? +searchParams.page : 1;
  const totalPages = wordslist?.data?.pagination?.totalPages || 1;
  const wordsOnPage = wordslist?.data?.words?.length || 0;
  const hasFilters = searchParams.search || searchParams.difficulty || searchParams.startsWith || searchParams.category || searchParams.pos || searchParams.length || searchParams.hasPhrases;

  return (
    <Suspense fallback={<DictionaryLoading />}>
      <div className="min-h-screen bg-background">
        {/* Hero Header */}
        <div className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-foreground">Dictionary</h1>
                  <p className="text-sm text-muted-foreground">
                    {totalWords > 0 ? `${totalWords.toLocaleString()} words` : 'Explore words'}
                  </p>
                </div>
              </div>

              {/* AI Search CTA */}
              <Link href="/search">
                <Button variant="outline" size="sm" className="rounded-lg gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Search
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <SearchBar route="/dictionary" />

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Results Info */}
          {(wordsOnPage > 0 || hasFilters) && (
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                {hasFilters ? (
                  <>Found <span className="font-medium text-foreground">{wordsOnPage}</span> results</>
                ) : (
                  <>Page <span className="font-medium text-foreground">{currentPage}</span> of {totalPages}</>
                )}
              </p>
              {hasFilters && (
                <Link href="/dictionary" className="text-sm text-primary hover:underline">
                  Clear filters
                </Link>
              )}
            </div>
          )}

          {/* Words Grid */}
          {wordsOnPage > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wordslist.data.words.map((word) => (
                <WordCard key={word?.id ?? word?._id} wordsdata={word} />
              ))}
            </div>
          ) : (
            <EmptyState hasFilters={hasFilters} />
          )}
        </div>

        {/* Pagination */}
        {wordsOnPage > 0 && totalPages > 1 && (
          <div className="border-t bg-muted/20">
            <Pagination pageNumber={currentPage} totalpage={totalPages} />
          </div>
        )}
      </div>
    </Suspense>
  );
};

const EmptyState = ({ hasFilters }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
      <Search className="h-7 w-7 text-muted-foreground" />
    </div>
    <h3 className="text-base font-semibold text-foreground mb-1">
      {hasFilters ? 'No words found' : 'No words available'}
    </h3>
    <p className="text-sm text-muted-foreground max-w-xs mb-5">
      {hasFilters 
        ? 'Try adjusting your search or filters.'
        : 'Check back later for new words.'}
    </p>
    {hasFilters && (
      <Link href="/dictionary">
        <Button variant="outline" size="sm" className="rounded-lg">
          Clear all filters
        </Button>
      </Link>
    )}
  </div>
);

const DictionaryLoading = () => (
  <div className="min-h-screen bg-background">
    <div className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
          <div>
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-1" />
            <div className="h-4 w-20 bg-muted/50 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
    <div className="h-20 bg-muted/20 animate-pulse" />
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-muted/30 animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export default Page;
