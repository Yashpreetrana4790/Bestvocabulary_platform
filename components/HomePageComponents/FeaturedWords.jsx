import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollingWords from './ScrollingWords';
import { getWordOfDay } from '@/services/wordOfDay';
import { capitalizeString } from '@/lib/otherutil';

const FeaturedWords = async () => {
  const wordOfTheDay = await getWordOfDay();

  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full opacity-50 blur-[120px] bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Daily Learning
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Expand Your Vocabulary
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Word of the Day Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl sm:rounded-3xl border bg-card/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 md:mb-8">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">Word of the Day</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{today}</p>
                </div>
              </div>

              {/* Content */}
              {wordOfTheDay && wordOfTheDay.word ? (
                <>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 tracking-tight break-words">
                    {capitalizeString(wordOfTheDay.word)}
                  </h3>
                  {wordOfTheDay.pronunciation && (
                    <p className="text-muted-foreground font-mono text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6 tracking-wide">
                      {wordOfTheDay.pronunciation}
                    </p>
                  )}
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 sm:mb-8 md:mb-10 line-clamp-3">
                    {wordOfTheDay.meanings?.[0]?.meaning ||
                      wordOfTheDay.meanings?.[0]?.subtitle ||
                      wordOfTheDay.meanings?.[0]?.easyMeaning ||
                      'Discover the meaning of this fascinating word'}
                  </p>
                  <Link href={`/word/${wordOfTheDay.word}`}>
                    <Button className="rounded-full px-4 sm:px-5 md:px-6 h-9 sm:h-10 md:h-11 text-sm sm:text-base shadow-md hover:shadow-lg transition-all">
                      Learn this word
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6 tracking-tight">
                    Discover Today
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 sm:mb-8 md:mb-10">
                    Learn a new word every day. Expand your vocabulary and express yourself with precision.
                  </p>
                  <Link href="/wordofday">
                    <Button className="rounded-full px-4 sm:px-5 md:px-6 h-9 sm:h-10 md:h-11 text-sm sm:text-base shadow-md hover:shadow-lg transition-all">
                      Explore words
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Popular Words */}
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 px-1 sm:px-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 sm:h-6 rounded-full bg-primary"></div>
                <span className="text-xs sm:text-sm font-semibold text-foreground">Popular Words</span>
              </div>
              <Link href="/dictionary" className="text-xs sm:text-sm text-primary hover:underline font-medium">
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
