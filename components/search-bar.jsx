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
              
              <DialogContent className="w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] p-0 max-h-[90vh] overflow-hidden flex flex-col sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl rounded-3xl border-none shadow-2xl">
                <DialogHeader className="p-5 sm:p-6 border-b bg-muted/20">
                  <DialogTitle className="flex items-center gap-2.5 text-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <SlidersHorizontal className="h-5 w-5" />
                    </div>
                    Filter Words
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
                  {/* Top Section: Sort & Control */}
                  <div className="bg-muted/30 rounded-2xl p-4 sm:p-5 border border-border/50">
                    <label className="text-xs font-semibold text-foreground/70 tracking-wide font-inter mb-3 block">Sort & Preferences</label>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <div className="flex-1">
                        <select
                          value={sortBy || "word"}
                          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                          className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                          aria-label="Sort by"
                        >
                          <option value="word">Alphabetical Order</option>
                          <option value="frequency">Global Frequency</option>
                          <option value="createdAt">Date Discovered</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleFilterChange("sortOrder", sortOrder === "desc" ? "asc" : "desc")}
                          className="h-11 px-4 rounded-xl gap-2 font-medium"
                        >
                          <ArrowUpDown className={`h-4 w-4 transition-transform duration-300 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                          <span className="text-xs sm:text-sm">{sortOrder === "desc" ? "Descending" : "Ascending"}</span>
                        </Button>
                        {activeFiltersCount > 0 && (
                          <Button
                            variant="ghost"
                            onClick={clearAllFilters}
                            className="h-11 px-4 rounded-xl gap-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <RotateCcw className="h-4 w-4" />
                            <span className="hidden sm:inline text-sm">Reset</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Main Bento Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                    
                    {/* Left Column: Navigation & Difficulty */}
                    <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                      {/* Starts With Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <label className="text-xs font-semibold text-foreground/70 tracking-wide font-inter">Quick Access: Starts With</label>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {ALPHABETS.map(letter => (
                            <button
                              key={letter}
                              onClick={() => handleFilterChange("startsWith", startsWith === letter ? "" : letter)}
                              className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center border ${
                                startsWith === letter 
                                  ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105' 
                                  : 'bg-background hover:bg-muted text-foreground border-border/80 hover:border-primary/30'
                              }`}
                            >
                              {letter}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Difficulty Section */}
                        <div className="space-y-4">
                          <label className="text-xs font-semibold text-foreground/70 tracking-wide font-inter block">Vocabulary Level</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-2">
                            {[
                              { value: 'Beginner', label: 'Beginner', color: 'bg-emerald-500', desc: 'Core everyday words' },
                              { value: 'Intermediate', label: 'Intermediate', color: 'bg-amber-500', desc: 'Academic & business' },
                              { value: 'Advanced', label: 'Advanced', color: 'bg-rose-500', desc: 'Rare & specialized' },
                            ].map(level => (
                              <button
                                key={level.value}
                                onClick={() => handleFilterChange("difficulty", difficulty === level.value ? "" : level.value)}
                                className={`group flex flex-col items-start p-3 rounded-xl border transition-all duration-200 text-left ${
                                  difficulty === level.value 
                                    ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                                    : 'bg-background hover:bg-muted/50 border-border hover:border-primary/30'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`w-2 h-2 rounded-full ${level.color} ${difficulty === level.value ? 'animate-pulse' : ''}`} />
                                  <span className={`font-bold text-sm ${difficulty === level.value ? 'text-primary' : 'text-foreground'}`}>{level.label}</span>
                                </div>
                                <span className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">{level.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Word Length */}
                        <div className="space-y-4">
                          <label className="text-xs font-semibold text-foreground/70 tracking-wide font-inter block">Physical Length</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-2">
                            {[
                              { value: 'short', label: 'Short', sub: '1-4 letters' },
                              { value: 'medium', label: 'Medium', sub: '5-8 letters' },
                              { value: 'long', label: 'Long', sub: '9+ letters' },
                            ].map(len => (
                              <button
                                key={len.value}
                                onClick={() => handleFilterChange("length", length === len.value ? "" : len.value)}
                                className={`flex flex-col items-start p-3 rounded-xl border transition-all duration-200 text-left ${
                                  length === len.value 
                                    ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                                    : 'bg-background hover:bg-muted/50 border-border hover:border-primary/30'
                                }`}
                              >
                                <span className={`font-bold text-sm mb-0.5 ${length === len.value ? 'text-primary' : 'text-foreground'}`}>{len.label}</span>
                                <span className="text-[10px] sm:text-xs text-muted-foreground">{len.sub}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Taxonomy & Usage */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8 lg:border-l lg:pl-8 border-border/60">
                      {/* Categories Section */}
                      <div className="space-y-4">
                        <label className="text-xs font-semibold text-foreground/70 tracking-wide font-inter block">Word Category</label>
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIES.map(cat => (
                            <button
                              key={cat}
                              onClick={() => handleFilterChange("category", category === cat ? "" : cat)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                                category === cat 
                                  ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                                  : 'bg-muted/30 hover:bg-muted text-foreground border-transparent hover:border-primary/20'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8 pt-4 border-t border-border/40">
                        {/* Part of Speech */}
                        <div className="space-y-4">
                          <label className="text-xs font-semibold text-foreground/70 tracking-wide font-inter block">Part of Speech</label>
                          <div className="grid grid-cols-2 gap-2">
                            {PARTS_OF_SPEECH.map(p => (
                              <button
                                key={p.value}
                                onClick={() => handleFilterChange("pos", pos === p.value ? "" : p.value)}
                                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                                  pos === p.value 
                                    ? 'bg-primary text-primary-foreground border-primary' 
                                    : 'bg-background hover:bg-muted text-foreground border-border'
                                }`}
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Usage & Content */}
                        <div className="space-y-4">
                          <label className="text-xs font-semibold text-foreground/70 tracking-wide font-inter block">Special Content</label>
                          <div className="space-y-3">
                            <div className="p-3 bg-muted/20 rounded-2xl border border-border/40">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block tracking-wider">Word Frequency</span>
                              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                                {[
                                  { value: 'high', label: 'Common' },
                                  { value: 'medium', label: 'Moderate' },
                                  { value: 'low', label: 'Rare' },
                                ].map(({ value, label }) => (
                                  <button
                                    key={value}
                                    onClick={() => handleFilterChange("frequency", frequency === value ? "" : value)}
                                    className={`flex-1 h-8 px-2.5 rounded-lg text-[11px] font-bold transition-all ${
                                      frequency === value
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "bg-background border border-border text-muted-foreground hover:bg-muted/50"
                                    }`}
                                  >
                                    {label}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => handleFilterChange("hasPhrases", hasPhrases === "true" ? "" : "true")}
                              className={`w-full h-11 rounded-xl text-xs font-bold transition-all px-4 flex items-center gap-3 border ${
                                hasPhrases === "true"
                                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                                  : "bg-background hover:bg-muted text-foreground border-border"
                              }`}
                            >
                              <Quote className={`h-4 w-4 transition-transform ${hasPhrases === "true" ? "scale-110" : "text-muted-foreground opacity-60"}`} />
                              <span>Rich with Phrases</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="p-5 sm:p-6 bg-muted/20 border-t items-center sm:justify-between flex-row-reverse sm:flex-row gap-4">
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-6 h-6 rounded-full border-2 border-background ring-1 ring-muted ${i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">Fine-tune your learning experience</span>
                  </div>
                  <DialogClose asChild>
                    <Button className="w-full sm:w-auto h-11 px-8 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all">
                      Apply Filters
                      {activeFiltersCount > 0 && (
                        <span className="ml-2.5 bg-primary-foreground shadow-inner text-primary flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-[10px] font-black">
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
