'use client'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/helper';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw, Quote, BookOpen, BarChart3 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { Button } from './ui/button';
import SmartSearchBar from '@/components/SmartSearchBar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';
import LoadingWordFact from '@/components/LoadingWordFact';

const CATEGORIES = [
  'General',
  'Academic',
  'Business',
  'Medical',
  'Legal',
  'Technology',
  'Science',
  'Arts',
  'Literature',
  'Philosophy',
  'Psychology',
  'Economics',
  'Politics',
];

const PARTS_OF_SPEECH = [
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'preposition', label: 'Preposition' },
  { value: 'conjunction', label: 'Conjunction' },
];

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const SearchBar = ({ route, aiSearch = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  const difficulty = searchParams.get("difficulty");
  const startsWith = searchParams.get("startsWith");
  const category = searchParams.get("category");
  const pos = searchParams.get("pos");
  const length = searchParams.get("length");
  const hasPhrases = searchParams.get("hasPhrases");
  const hasEtymology = searchParams.get("hasEtymology");
  const frequency = searchParams.get("frequency");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

  useEffect(() => {
    const delaydebounce = setTimeout(() => {
      if (search) {
        const newurl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search || ""
        })
        router.push(newurl, { scroll: false })
      }
      else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            KeysToRemove: ["search"]
          });
          router.push(newUrl, { scroll: false })
        }
      }
    }, 300)

    return () => clearTimeout(delaydebounce)
  }, [query, pathname, search, router, searchParams, route]);

  const handleClear = () => {
    setSearch("");
  };

  const handleFilterChange = (key, value) => {
    if (value) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key,
        value
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        KeysToRemove: [key]
      });
      router.push(newUrl, { scroll: false });
    }
  };

  const activeFiltersCount = [difficulty, startsWith, category, pos, length, hasPhrases, hasEtymology, frequency].filter(Boolean).length;

  const clearAllFilters = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      KeysToRemove: ["difficulty", "startsWith", "length", "category", "pos", "hasPhrases", "hasEtymology", "frequency", "sortBy", "sortOrder"]
    });
    router.push(newUrl, { scroll: false });
    setIsOpen(false);
  };

  return (
    <Suspense fallback={
        <div className="space-y-3">
          <div className="h-20 bg-muted/30 animate-pulse rounded-xl" />
          <LoadingWordFact variant="inline" className="px-1" />
        </div>
      }>
      <div className={aiSearch ? 'min-w-0' : 'bg-muted/30 border-b'}>
        <div className="max-w-6xl mx-auto py-3 md:px-3 sm:py-4 min-w-0">
          {/* Search: AI search (dictionary) or text search */}
          <div className="flex gap-2 sm:gap-3 items-center min-w-0">
            <div className="flex-1 min-w-0">
              {aiSearch ? (
                <SmartSearchBar className="max-w-none" introRoll />
              ) : (
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search words..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11 pl-12 pr-10 rounded-xl border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  {search && (
                    <button
                      onClick={handleClear}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Filter Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-11 px-4 gap-2 rounded-xl"
                      aria-label="Open filters"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="hidden sm:inline">Filters</span>
                      {activeFiltersCount > 0 && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[260px]">
                  Refine the word list by difficulty, length, category, part of speech, frequency, and more. Opens the filter panel.
                </TooltipContent>
              </Tooltip>
              
              <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] p-4 max-h-[85vh] overflow-y-auto sm:max-w-lg sm:p-6 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filter Words
                  </DialogTitle>
                </DialogHeader>

                <div className="py-2 sm:py-4">
                  {/* Sort – full width at top */}
                  <div className="pb-3 mb-4 sm:pb-4 sm:mb-6 border-b border-border/60">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 block">Sort & order</label>
                    <div className="flex gap-1.5 sm:gap-2 min-w-0">
                      <select
                        value={sortBy || "word"}
                        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                        className="min-w-0 flex-1 h-9 sm:h-10 px-2.5 sm:px-3 rounded-lg border border-border bg-background text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        aria-label="Sort by"
                      >
                        <option value="word">Alphabetical</option>
                        <option value="frequency">Frequency</option>
                        <option value="createdAt">Date added</option>
                      </select>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleFilterChange("sortOrder", sortOrder === "desc" ? "asc" : "desc")}
                            className="h-10 w-10 shrink-0"
                            aria-label={sortOrder === "desc" ? "Switch to ascending" : "Switch to descending"}
                          >
                            <ArrowUpDown className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          {sortOrder === "desc" ? "Descending (Z→A). Click for ascending (A→Z)." : "Ascending (A→Z). Click for descending (Z→A)."}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Filter sections: stacked on small, horizontal grid on larger */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Quick filters */}
                  <div className="md:col-span-2 lg:col-span-2 min-w-0">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 block">Starts with</label>
                    <div className="grid grid-cols-9 gap-1 sm:gap-1.5">
                      {ALPHABETS.map(letter => (
                        <button
                          key={letter}
                          onClick={() => handleFilterChange("startsWith", startsWith === letter ? "" : letter)}
                          className={`h-7 w-full min-w-0 rounded-md text-xs sm:text-sm font-medium transition-all ${
                            startsWith === letter 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted/50 hover:bg-muted text-foreground'
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 block">Difficulty</label>
                    <div className="flex gap-1.5 sm:gap-2">
                      {[
                        { value: 'Beginner', label: 'Beginner', color: 'bg-emerald-500' },
                        { value: 'Intermediate', label: 'Intermediate', color: 'bg-amber-500' },
                        { value: 'Advanced', label: 'Advanced', color: 'bg-rose-500' },
                      ].map(level => (
                        <button
                          key={level.value}
                          onClick={() => handleFilterChange("difficulty", difficulty === level.value ? "" : level.value)}
                          className={`flex-1 min-w-0 h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                            difficulty === level.value 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted/50 hover:bg-muted text-foreground border border-border'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${level.color}`} />
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 block">Word length</label>
                    <div className="flex gap-1.5 sm:gap-2">
                      {[
                        { value: 'short', label: 'Short', sub: '1-4' },
                        { value: 'medium', label: 'Medium', sub: '5-8' },
                        { value: 'long', label: 'Long', sub: '9+' },
                      ].map(len => (
                        <button
                          key={len.value}
                          onClick={() => handleFilterChange("length", length === len.value ? "" : len.value)}
                          className={`flex-1 min-w-0 h-11 sm:h-12 rounded-lg text-xs sm:text-sm font-medium transition-all flex flex-col items-center justify-center ${
                            length === len.value 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted/50 hover:bg-muted text-foreground border border-border'
                          }`}
                        >
                          <span>{len.label}</span>
                          <span className={`text-[10px] sm:text-xs ${length === len.value ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{len.sub} letters</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 block">Category</label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => handleFilterChange("category", category === cat ? "" : cat)}
                          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                            category === cat 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted/50 hover:bg-muted text-foreground border border-border'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 block">Part of speech</label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {PARTS_OF_SPEECH.map(p => (
                        <button
                          key={p.value}
                          onClick={() => handleFilterChange("pos", pos === p.value ? "" : p.value)}
                          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                            pos === p.value 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted/50 hover:bg-muted text-foreground border border-border'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Usage & content */}
                  <div className="min-w-0">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 block">Usage & content</label>
                    <div className="space-y-2 sm:space-y-3">
                      {/* Frequency */}
                      <div>
                        <span className="text-xs sm:text-sm text-muted-foreground block mb-1 sm:mb-1.5">Frequency</span>
                        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                          {[
                            { value: 'high', label: 'Common', icon: BarChart3 },
                            { value: 'medium', label: 'Moderate' },
                            { value: 'low', label: 'Rare' },
                          ].map(({ value, label, icon: Icon }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleFilterChange("frequency", frequency === value ? "" : value)}
                              className={`flex-1 min-w-0 basis-20 sm:basis-auto sm:min-w-[80px] h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                                frequency === value
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "bg-muted/50 hover:bg-muted text-foreground border border-border"
                              }`}
                            >
                              {Icon && <Icon className="h-3.5 w-3.5" />}
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Has phrases */}
                      <button
                        type="button"
                        onClick={() => handleFilterChange("hasPhrases", hasPhrases === "true" ? "" : "true")}
                        className={`w-full min-w-0 h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 sm:gap-2 px-2 ${
                          hasPhrases === "true"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 hover:bg-muted text-foreground border border-border"
                        }`}
                      >
                        <Quote className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                        <span className="truncate">{hasPhrases === "true" ? "With phrases / idioms" : "Words with phrases or idioms"}</span>
                      </button>
                 
                    </div>
                  </div>
                  </div>
                </div>

                <DialogFooter className="flex flex-wrap gap-2 pt-2 sm:pt-4">
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="gap-1.5 text-xs sm:text-sm h-8 sm:h-9"
                    >
                      <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Reset all
                    </Button>
                  )}
                  <DialogClose asChild>
                    <Button className="flex-1 min-w-0 h-8 sm:h-9 sm:flex-none text-xs sm:text-sm">
                     Done
                      {activeFiltersCount > 0 && (
                        <span className="ml-1.5 sm:ml-2 bg-primary-foreground/20 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Active Filters Pills */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 flex-wrap min-w-0">
              <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0">Active:</span>
              {difficulty && (
                <FilterPill 
                  label={difficulty} 
                  onRemove={() => handleFilterChange("difficulty", "")} 
                />
              )}
              {startsWith && (
                <FilterPill 
                  label={`Starts with "${startsWith}"`} 
                  onRemove={() => handleFilterChange("startsWith", "")} 
                />
              )}
              {length && (
                <FilterPill 
                  label={length === 'short' ? 'Short' : length === 'medium' ? 'Medium' : 'Long'} 
                  onRemove={() => handleFilterChange("length", "")} 
                />
              )}
              {category && (
                <FilterPill 
                  label={category} 
                  onRemove={() => handleFilterChange("category", "")} 
                />
              )}
              {pos && (
                <FilterPill 
                  label={PARTS_OF_SPEECH.find(p => p.value === pos)?.label || pos} 
                  onRemove={() => handleFilterChange("pos", "")} 
                />
              )}
              {hasPhrases && (
                <FilterPill 
                  label="Phrases / idioms" 
                  onRemove={() => handleFilterChange("hasPhrases", "")} 
                />
              )}
              {hasEtymology && (
                <FilterPill 
                  label="Has etymology" 
                  onRemove={() => handleFilterChange("hasEtymology", "")} 
                />
              )}
              {frequency && (
                <FilterPill 
                  label={frequency === "high" ? "Common" : frequency === "medium" ? "Moderate" : "Rare"} 
                  onRemove={() => handleFilterChange("frequency", "")} 
                />
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

const FilterPill = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
    {label}
    <button 
      onClick={onRemove}
      className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
    >
      <X className="h-3 w-3" />
    </button>
  </span>
);

export default SearchBar;
