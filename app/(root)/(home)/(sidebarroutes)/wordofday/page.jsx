import React from "react";
import Link from "next/link";
import { CalendarDays, Volume2, BookOpen, Lightbulb, MessageSquareQuote, ArrowRight, Sparkles, Share2, Bookmark, History, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { capitalizeString } from "@/lib/otherutil";
import { getWordOfDay, getWodHistory } from "@/services/wordOfDay";
import { getCommonUsage } from "@/lib/wordShape";

export const metadata = {
  title: 'Word of the Day',
  description: 'Learn a new word every day with our Word of the Day feature. Expand your vocabulary with daily curated words, definitions, examples, and memory tips.',
  keywords: ['word of the day', 'daily word', 'learn vocabulary', 'new words', 'vocabulary building'],
  openGraph: {
    title: 'Word of the Day | Best Vocabulary',
    description: 'Learn a new word every day. Expand your vocabulary with daily curated words, definitions, and memory tips.',
  },
};

const staticWordOfDay = {
  word: "Serendipity",
  pronunciation: "/ˌser.ənˈdɪp.ɪ.ti/",
  etymology: "Coined by Horace Walpole in 1754, from the Persian fairy tale &apos;The Three Princes of Serendip&apos;, whose heroes were always making discoveries by accidents and sagacity.",
  meanings: [
    {
      subtitle: "The occurrence of events by chance in a happy or beneficial way",
      easyMeaning: "Finding something good without looking for it. It&apos;s like when you accidentally discover something wonderful that you weren&apos;t even searching for.",
      category: "noun",
      difficulty: "Medium",
      common_usage: [
        {
          context: "In everyday life",
          example: "It was pure serendipity that I met my best friend at a random coffee shop."
        },
        {
          context: "In scientific discovery",
          example: "The discovery of penicillin was a case of serendipity - Fleming found it by accident."
        },
        {
          context: "In career",
          example: "Through serendipity, she landed her dream job after a chance encounter at a conference."
        }
      ]
    }
  ]
};

const Page = async () => {
  const [oneWordResult, historyResult] = await Promise.all([
    getWordOfDay(),
    getWodHistory(7)
  ]);
  
  // Use static data if API returns nothing
  const oneWord = (oneWordResult && oneWordResult.word) ? oneWordResult : staticWordOfDay;
  const history = historyResult || [];
  
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] bg-primary/20" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-20 blur-[80px] bg-primary/15" />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center space-y-4 mb-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 rounded-2xl sm:rounded-full bg-muted/50 border text-xs sm:text-sm text-muted-foreground font-medium max-w-full">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <CalendarDays className="h-4 w-4 shrink-0" />
                <span>Word of the Day</span>
              </div>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="whitespace-nowrap">{formattedDate}</span>
            </div>
          </div>

          {/* Word Display */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight break-words max-w-full">
                {capitalizeString(oneWord?.word || "Loading...")}
              </h1>
              <button className="p-2 sm:p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors shrink-0" title="Listen to pronunciation">
                <Volume2 className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              </button>
            </div>
            
            {oneWord?.pronunciation && (
              <p className="text-xl text-muted-foreground font-mono mb-6">
                {oneWord.pronunciation}
              </p>
            )}

            {/* Quick Definition */}
            <div className="inline-block max-w-2xl px-2">
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 leading-relaxed">
                {oneWord?.meanings?.[0]?.subtitle || oneWord?.meanings?.[0]?.easyMeaning || "Loading..."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto">
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1 sm:flex-none rounded-full gap-2 h-11 sm:h-12">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="lg" className="flex-1 sm:flex-none rounded-full gap-2 h-11 sm:h-12">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            <Link href={`/word/${oneWord?.word}`} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full gap-2 h-11 sm:h-12">
                Full Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Meaning Card */}
        {oneWord?.meanings?.[0]?.easyMeaning && (
          <div className="mb-8 p-6 md:p-8 rounded-3xl border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Simple Meaning</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {oneWord.meanings[0].easyMeaning}
            </p>
          </div>
        )}

        {/* Common Usage Section */}
        {oneWord?.meanings?.some((m) => getCommonUsage(m).length > 0) && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <MessageSquareQuote className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Common Usage</h2>
            </div>
            
            <div className="space-y-4">
              {oneWord.meanings.map((meaning, index) =>
                getCommonUsage(meaning).map((usage, idx) => (
                  <div 
                    key={`${index}-${idx}`} 
                    className="p-5 rounded-2xl border bg-card hover:shadow-md transition-shadow"
                  >
                    <p className="font-medium text-foreground mb-2">{usage?.context}</p>
                    <p className="text-muted-foreground italic">&quot;{usage?.example}&quot;</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Etymology Section */}
        {oneWord?.etymology && (
          <div className="mb-8 p-6 md:p-8 rounded-3xl border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Etymology</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {oneWord.etymology}
            </p>
          </div>
        )}

        {/* History Section */}
        {history.length > 1 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <History className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Previous Words</h2>
            </div>
            
            <div className="grid gap-3">
              {history.slice(1, 8).map((item, idx) => {
                const wordData = item.word;
                if (!wordData) return null;
                
                const date = new Date(item.date);
                const formattedHistoryDate = new Intl.DateTimeFormat('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short'
                }).format(date);
                
                return (
                  <Link 
                    key={item._id || idx} 
                    href={`/word/${wordData.word}`}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-2xl border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all group gap-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
                      <span className="text-xs sm:text-sm text-muted-foreground sm:min-w-[80px]">{formattedHistoryDate}</span>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {capitalizeString(wordData.word)}
                        </span>
                        {wordData.pronunciation && (
                          <span className="text-xs sm:text-sm text-muted-foreground font-mono truncate hidden min-[400px]:inline">{wordData.pronunciation}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 p-8 rounded-3xl border bg-gradient-to-br from-primary/5 to-card text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Want to explore more words?</h3>
          <p className="text-muted-foreground mb-6">
            Discover thousands of words with rich definitions and AI-powered search.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/dictionary" className="w-full sm:w-auto">
              <Button variant="outline" className="rounded-full w-full sm:w-auto h-11">
                Browse Dictionary
              </Button>
            </Link>
            <Link href="/search" className="w-full sm:w-auto">
              <Button className="rounded-full gap-2 w-full sm:w-auto h-11">
                <Sparkles className="h-4 w-4" />
                AI Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
