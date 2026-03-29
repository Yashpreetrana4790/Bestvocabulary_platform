import WordCard from '@/components/Cards/WordCard';
import Pagination from '@/components/Common/Pagination';
import SearchBar from '@/components/search-bar';
import DictionaryToolbar from './components/DictionaryToolbar';
import { getWords } from '@/services/wordapis';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { BookOpen, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingWordFact from '@/components/LoadingWordFact';

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
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.limit) || 12));
  const wordslist = await getWords({
    page: searchParams.page,
    limit,
    search: searchParams.search,
    difficulty: searchParams.difficulty,
    length: searchParams.length,
    startsWith: searchParams.startsWith,
    category: searchParams.category,
    pos: searchParams.pos,
    hasPhrases: searchParams.hasPhrases,
    hasEtymology: searchParams.hasEtymology,
    frequency: searchParams.frequency,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
  });

  const totalWords = wordslist?.data?.pagination?.totalItems || wordslist?.data?.pagination?.total || 0;
  const currentPage = searchParams.page ? +searchParams.page : 1;
  const totalPages = wordslist?.data?.pagination?.totalPages || 1;
  const wordsOnPage = wordslist?.data?.words?.length || 0;
  const hasFilters = searchParams.search || searchParams.difficulty || searchParams.startsWith || searchParams.category || searchParams.pos || searchParams.length || searchParams.hasPhrases || searchParams.hasEtymology || searchParams.frequency;

  return (
    <Suspense fallback={<DictionaryLoading />}>
      <div className="min-h-screen bg-background">
        {/* Hero + Search block */}
        <div className="border-b bg-gradient-to-b from-muted/20 to-background">
          <div className="container py-6 md:py-8">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Dictionary</h1>
                <p className="text-sm text-muted-foreground">
                  {totalWords > 0 ? `${totalWords.toLocaleString()} words` : 'Explore words'} · Search by meaning or word, then filter
                </p>
              </div>
            </div>

            {/* AI Search & Filters */}
            <SearchBar route="/dictionary" aiSearch />
          </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto p-4 ">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-foreground font-medium">Dictionary</span>
          </nav>

          {/* Results toolbar (count, per page, clear filters) */}
          <Suspense fallback={<div className="h-9 mb-5" />}>
            <DictionaryToolbar
              totalWords={totalWords}
              currentPage={currentPage}
              totalPages={totalPages}
              wordsOnPage={wordsOnPage}
              hasFilters={!!hasFilters}
            />
          </Suspense>

          {/* Words Grid */}
          {wordsOnPage > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            <Pagination
              pageNumber={currentPage}
              totalpage={totalPages}
              totalItems={totalWords}
              pageSize={limit}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
};

const EmptyState = ({ hasFilters }) => (
  <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center px-4">
    <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-5">
      <Search className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">
      {hasFilters ? 'No words match your filters' : 'No words available'}
    </h3>
    <p className="text-sm text-muted-foreground max-w-sm mb-6">
      {hasFilters
        ? 'Try different filters or search by meaning in the bar above to find the word you need.'
        : 'Check back later for new words.'}
    </p>
    {hasFilters && (
      <Link href="/dictionary">
        <Button variant="outline" size="sm" className="rounded-xl">
          Clear all filters
        </Button>
      </Link>
    )}
  </div>
);

const DictionaryLoading = () => (
  <div className="min-h-screen bg-background">
    <div className="border-b bg-gradient-to-b from-muted/20 to-background">
        <div className="container py-6 md:py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-muted animate-pulse shrink-0" />
          <div>
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-48 bg-muted/50 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-14 bg-muted/30 rounded-2xl animate-pulse" />
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="h-5 w-48 bg-muted/30 rounded animate-pulse mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-muted/30 animate-pulse" />
        ))}
      </div>
      <div className="mt-8 max-w-xl">
        <LoadingWordFact variant="card" />
      </div>
    </div>
  </div>
);

export default Page;
