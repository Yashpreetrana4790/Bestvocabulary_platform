'use client'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/helper';
import { Search, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from './ui/dialog';

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

export const SearchBar = ({ route }) => {
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

  const activeFiltersCount = [difficulty, startsWith, category, pos, length].filter(Boolean).length;

  const clearAllFilters = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      KeysToRemove: ["difficulty", "startsWith", "length", "category", "pos", "sortBy", "sortOrder"]
    });
    router.push(newUrl, { scroll: false });
    setIsOpen(false);
  };

  return (
    <Suspense fallback={<div className="h-20 bg-muted/30 animate-pulse" />}>
      <div className="bg-muted/30 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Search Input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
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
            
            {/* Filter Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 px-4 gap-2 rounded-xl"
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
              
              <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filter Words
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-5 py-4">
                  {/* Starts With - Alphabet Grid */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Starts with</label>
                    <div className="grid grid-cols-9 gap-1.5">
                      {ALPHABETS.map(letter => (
                        <button
                          key={letter}
                          onClick={() => handleFilterChange("startsWith", startsWith === letter ? "" : letter)}
                          className={`h-8 rounded-md text-sm font-medium transition-all ${
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

                  {/* Difficulty */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Difficulty</label>
                    <div className="flex gap-2">
                      {[
                        { value: 'Beginner', label: 'Beginner', color: 'bg-emerald-500' },
                        { value: 'Intermediate', label: 'Intermediate', color: 'bg-amber-500' },
                        { value: 'Advanced', label: 'Advanced', color: 'bg-rose-500' },
                      ].map(level => (
                        <button
                          key={level.value}
                          onClick={() => handleFilterChange("difficulty", difficulty === level.value ? "" : level.value)}
                          className={`flex-1 h-10 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
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

                  {/* Word Length */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Word Length</label>
                    <div className="flex gap-2">
                      {[
                        { value: 'short', label: 'Short', sub: '1-4' },
                        { value: 'medium', label: 'Medium', sub: '5-8' },
                        { value: 'long', label: 'Long', sub: '9+' },
                      ].map(len => (
                        <button
                          key={len.value}
                          onClick={() => handleFilterChange("length", length === len.value ? "" : len.value)}
                          className={`flex-1 h-12 rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center ${
                            length === len.value 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted/50 hover:bg-muted text-foreground border border-border'
                          }`}
                        >
                          <span>{len.label}</span>
                          <span className={`text-xs ${length === len.value ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{len.sub} letters</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => handleFilterChange("category", category === cat ? "" : cat)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
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

                  {/* Part of Speech */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Part of Speech</label>
                    <div className="flex flex-wrap gap-2">
                      {PARTS_OF_SPEECH.map(p => (
                        <button
                          key={p.value}
                          onClick={() => handleFilterChange("pos", pos === p.value ? "" : p.value)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
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

                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Sort by</label>
                    <div className="flex gap-2">
                      <select
                        value={sortBy || "word"}
                        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                        className="flex-1 h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="word">Alphabetical</option>
                        <option value="frequency">Frequency</option>
                        <option value="createdAt">Date Added</option>
                      </select>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleFilterChange("sortOrder", sortOrder === "desc" ? "asc" : "desc")}
                        className="h-10 w-10 shrink-0"
                        title={sortOrder === "desc" ? "Descending" : "Ascending"}
                      >
                        <ArrowUpDown className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex gap-2 sm:gap-2">
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      onClick={clearAllFilters}
                      className="gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset all
                    </Button>
                  )}
                  <DialogClose asChild>
                    <Button className="flex-1 sm:flex-none">
                      Apply Filters
                      {activeFiltersCount > 0 && (
                        <span className="ml-2 bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs">
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
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-muted-foreground">Active:</span>
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
