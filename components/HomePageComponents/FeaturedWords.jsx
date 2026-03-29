import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollingWords from './ScrollingWords';
import PronunciationButton from './PronunciationButton';
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
    <section className="py-10 sm:py-16 md:py-20 lg:py-28 px-3 sm:px-4 relative overflow-hidden w-full min-w-0 max-w-full box-border">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full opacity-50 blur-[120px] bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full min-w-0 box-border">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-primary mb-3 sm:mb-4">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Daily Learning
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Expand Your Vocabulary
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 sm:gap-8 lg:gap-10 min-w-0 w-full">
          {/* Word of the Day Card (includes email signup at bottom) */}
          <div className="group relative min-w-0 w-full max-w-full flex flex-col">
            <div className="absolute inset-x-4 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div
              className="relative flex flex-col flex-1 min-h-0 rounded-xl sm:rounded-2xl md:rounded-3xl border bg-card/80 backdrop-blur-sm p-3 sm:p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-lg transition-all duration-300 overflow-x-hidden"
              style={{ minWidth: 0, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
            >
              {/* Header */}
              <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 md:mb-8 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">Word of the Day</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{today}</p>
                </div>
              </div>

              {/* Content */}
              {wordOfTheDay && wordOfTheDay.word ? (
                <>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4 min-w-0">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-loose min-w-0 truncate py-1" title={capitalizeString(wordOfTheDay.word)}>
                      {capitalizeString(wordOfTheDay.word)}
                    </h3>
                    <PronunciationButton word={wordOfTheDay.word} className="shrink-0 mt-1 sm:mt-2" />
                  </div>
                  {wordOfTheDay.pronunciation && (
                    <p className="text-muted-foreground font-mono text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6 tracking-wide min-w-0 truncate">
                      {wordOfTheDay.pronunciation}
                    </p>
                  )}
                  <div className="wod-definition-wrapper mb-5 sm:mb-8 md:mb-10">
                    <p className="wod-definition text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed line-clamp-3 min-w-0" title={wordOfTheDay.meanings?.[0]?.meaning || wordOfTheDay.meanings?.[0]?.subtitle || wordOfTheDay.meanings?.[0]?.easyMeaning || ''}>
                      {wordOfTheDay.meanings?.[0]?.meaning ||
                        wordOfTheDay.meanings?.[0]?.subtitle ||
                        wordOfTheDay.meanings?.[0]?.easyMeaning ||
                        'Discover the meaning of this fascinating word'}
                    </p>
                  </div>
                  <Link href={`/search?q=${encodeURIComponent(wordOfTheDay.word)}`} className="inline-block min-w-0">
                    <Button className="rounded-full px-3 sm:px-5 md:px-6 h-11 sm:h-11 md:h-11 text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                      Learn this word
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2 shrink-0" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-5 md:mb-6 tracking-tight min-w-0 truncate py-1">
                    Discover Today
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed mb-5 sm:mb-8 md:mb-10 min-w-0 line-clamp-3">
                    Learn a new word every day. Expand your vocabulary and express yourself with precision.
                  </p>
                  <Link href="/wordofday" className="inline-block min-w-0">
                    <Button className="rounded-full px-3 sm:px-5 md:px-6 h-11 sm:h-11 md:h-11 text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                      Explore words
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2 shrink-0" />
                    </Button>
                  </Link>
                </>
              )}


            </div>
          </div>

          {/* Popular Words */}
          <div className="min-w-0">
            <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 px-1 sm:px-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 sm:h-6 rounded-full bg-primary"></div>
                <span className="text-sm sm:text-base font-semibold text-foreground">Popular Words</span>
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
