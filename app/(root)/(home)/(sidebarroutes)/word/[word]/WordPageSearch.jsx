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
    <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 max-w-xs sm:max-w-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search another word..."
          className="w-full h-10 pl-9 pr-3 rounded-xl border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          aria-label="Search another word"
        />
      </div>
      <Button type="submit" size="sm" className="rounded-xl h-10 px-4 shrink-0" disabled={!query?.trim()}>
        Go
      </Button>
    </form>
  );
}
