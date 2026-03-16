'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WordPageSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query?.trim();
    if (!trimmed) return;
    router.push(`/word/${encodeURIComponent(trimmed)}`);
    setQuery('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md rounded-lg sm:rounded-xl border-2 border-border bg-background overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
    >
      <div className="relative flex-1 min-w-0 flex items-center">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search another word..."
          className="w-full h-10 sm:h-11 pl-9 sm:pl-10 pr-2 sm:pr-3 py-2 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border-0"
          aria-label="Search another word"
        />
      </div>
      <Button
        type="submit"
        size="sm"
        className="rounded-none h-10 sm:h-11 px-3 sm:px-5 shrink-0 font-medium border-l border-border text-sm"
        disabled={!query?.trim()}
      >
        Go
      </Button>
    </form>
  );
}
