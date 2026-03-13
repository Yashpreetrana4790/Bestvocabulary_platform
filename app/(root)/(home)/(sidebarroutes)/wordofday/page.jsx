import React from "react";
import Link from "next/link";
import { CalendarDays, Volume2, BookOpen, Lightbulb, MessageSquareQuote, ArrowRight, Sparkles, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { capitalizeString } from "@/lib/otherutil";
import { getWordOfDay } from "@/services/wordOfDay";

const staticWordOfDay = {
  word: "Serendipity",
  pronunciation: "/ˌser.ənˈdɪp.ɪ.ti/",
  etymology: "Coined by Horace Walpole in 1754, from the Persian fairy tale 'The Three Princes of Serendip', whose heroes were always making discoveries by accidents and sagacity.",
  meanings: [
    {
      subtitle: "The occurrence of events by chance in a happy or beneficial way",
      easyMeaning: "Finding something good without looking for it. It's like when you accidentally discover something wonderful that you weren't even searching for.",
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
  let oneWord = await getWordOfDay();
  
  // Use static data if API returns nothing
  if (!oneWord || !oneWord.word) {
    oneWord = staticWordOfDay;
  }
  
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
          {/* Date Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary">
              <CalendarDays className="h-4 w-4" />
              <span>Word of the Day</span>
              <span className="w-1 h-1 rounded-full bg-primary/50" />
              <span className="text-primary/80">{formattedDate}</span>
            </div>
          </div>

          {/* Word Display */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                {capitalizeString(oneWord?.word || "Loading...")}
              </h1>
              <button className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors" title="Listen to pronunciation">
                <Volume2 className="h-6 w-6 text-muted-foreground" />
              </button>
            </div>
            
            {oneWord?.pronunciation && (
              <p className="text-xl text-muted-foreground font-mono mb-6">
                {oneWord.pronunciation}
              </p>
            )}

            {/* Quick Definition */}
            <div className="inline-block max-w-2xl">
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
                {oneWord?.meanings?.[0]?.subtitle || oneWord?.meanings?.[0]?.easyMeaning || "Loading..."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="lg" className="rounded-full gap-2">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="lg" className="rounded-full gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Link href={`/word/${oneWord?.word}`}>
              <Button size="lg" className="rounded-full gap-2">
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
        {oneWord?.meanings?.some(m => m.common_usage?.length > 0) && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <MessageSquareQuote className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Common Usage</h2>
            </div>
            
            <div className="space-y-4">
              {oneWord.meanings.map((meaning, index) => (
                meaning.common_usage?.map((usage, idx) => (
                  <div 
                    key={`${index}-${idx}`} 
                    className="p-5 rounded-2xl border bg-card hover:shadow-md transition-shadow"
                  >
                    <p className="font-medium text-foreground mb-2">{usage?.context}</p>
                    <p className="text-muted-foreground italic">"{usage?.example}"</p>
                  </div>
                ))
              ))}
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

        {/* CTA Section */}
        <div className="mt-12 p-8 rounded-3xl border bg-gradient-to-br from-primary/5 to-card text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Want to explore more words?</h3>
          <p className="text-muted-foreground mb-6">
            Discover thousands of words with rich definitions and AI-powered search.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/dictionary">
              <Button variant="outline" className="rounded-full">
                Browse Dictionary
              </Button>
            </Link>
            <Link href="/search">
              <Button className="rounded-full gap-2">
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
