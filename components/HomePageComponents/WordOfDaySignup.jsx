'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WordOfDaySignup({ compact = false }) {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email?.trim() || '';
    if (trimmed) {
      const params = new URLSearchParams({ email: trimmed });
      router.push(`/register?${params.toString()}`);
    } else {
      router.push('/register');
    }
  };

  if (compact) {
    return (
      <div className="min-w-0 w-full rounded-xl bg-muted/30 border border-border/50 p-4 sm:p-5">
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words min-w-0 leading-snug">
          Get one word in your inbox every day
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-full min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
          <div className="relative w-full min-w-0 flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 h-9 rounded-lg border border-border/80 bg-background/90 text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50"
              aria-label="Email for daily word"
            />
          </div>
          <Button
            type="submit"
            className="w-full sm:w-auto rounded-lg h-9 px-4 text-sm font-medium shrink-0"
          >
            Get daily word
            <ArrowRight className="h-3.5 w-3.5 ml-1.5 shrink-0" />
          </Button>
        </form>
        <p className="mt-2.5 text-[11px] sm:text-xs text-muted-foreground/90">
          Prefer a full account?{' '}
          <Link
            href="/register"
            className="text-primary/90 hover:text-primary font-medium hover:underline underline-offset-2"
          >
            Register for free
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-5 md:mb-6 tracking-tight break-words min-w-0">
        Get one word every day in your inbox
      </h3>
      <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed mb-5 sm:mb-6 md:mb-8 break-words min-w-0">
        Sign up for free and we’ll help you build your vocabulary—one word at a time.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 mb-5 sm:mb-6">
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11 rounded-xl border-border bg-background/80 text-sm"
            aria-label="Email for daily word"
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-full h-11 text-sm font-medium shadow-md hover:shadow-lg transition-all"
        >
          Get daily word
          <ArrowRight className="h-4 w-4 ml-2 shrink-0" />
        </Button>
      </form>

      <div className="relative flex items-center gap-3 text-sm text-muted-foreground">
        <span className="flex-shrink-0">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Link href="/register" className="inline-block mt-4 min-w-0">
        <Button
          variant="outline"
          className="w-full sm:w-auto rounded-full h-10 px-5 text-sm gap-2 border-2 hover:bg-primary/10 hover:border-primary/30"
        >
          <UserPlus className="h-4 w-4" />
          Create free account
        </Button>
      </Link>
    </>
  );
}
