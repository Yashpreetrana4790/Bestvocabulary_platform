import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollingWords from './ScrollingWords';

const FeaturedWords = async () => {
  let wordOfTheDay = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
    if (baseUrl) {
      const wodRes = await fetch(`${baseUrl}/api/v1/word-of-the-day`, { 
        cache: 'no-store' 
      }).catch(() => null);

      if (wodRes?.ok) {
        const wodData = await wodRes.json();
        wordOfTheDay = wodData?.data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch word of the day:', error);
  }

  return (
    <section className="py-28 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-50 blur-[120px] bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Daily Learning
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Expand Your Vocabulary
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Word of the Day Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-3xl border bg-card/80 backdrop-blur-sm p-10 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Word of the Day</p>
                  <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              {wordOfTheDay ? (
                <>
                  <h3 className="text-5xl md:text-6xl font-bold text-foreground mb-4 capitalize tracking-tight">
                    {wordOfTheDay.word?.word || wordOfTheDay.word}
                  </h3>
                  {wordOfTheDay.word?.pronunciation && (
                    <p className="text-muted-foreground font-mono text-sm mb-6 tracking-wide">
                      {wordOfTheDay.word.pronunciation}
                    </p>
                  )}
                  <p className="text-lg text-foreground/80 leading-relaxed mb-10">
                    {wordOfTheDay.word?.meanings?.[0]?.meaning ||
                      wordOfTheDay.word?.meanings?.[0]?.subtitle ||
                      'Discover the meaning of this fascinating word'}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                    Discover Today
                  </h3>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-10">
                    Learn a new word every day. Expand your vocabulary and express yourself with precision.
                  </p>
                </>
              )}

              <Link href="/wordofday">
                <Button className="rounded-full px-6 h-11 shadow-md hover:shadow-lg transition-all">
                  Learn this word
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Popular Words */}
          <div>
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-primary"></div>
                <span className="text-sm font-semibold text-foreground">Popular Words</span>
              </div>
              <Link href="/dictionary" className="text-sm text-primary hover:underline font-medium">
                View all →
              </Link>
            </div>
            <ScrollingWords />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWords;
