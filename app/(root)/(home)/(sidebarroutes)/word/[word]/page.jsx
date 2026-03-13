import React from 'react';
import Link from 'next/link';
import { getSingleWord } from '@/services/wordapis';
import { capitalizeString } from '@/lib/otherutil';
import { 
  Volume2, BookOpen, Lightbulb, History, Quote, 
  ArrowLeft, Share2, Bookmark, Copy, ExternalLink,
  Sparkles, GraduationCap, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import WordDetailClient from './WordDetailClient';

export default async function WordPage({ params }) {
  const resolvedParams = await params;
  const wordParam = decodeURIComponent(resolvedParams.word);
  
  console.log('Fetching word:', wordParam);
  
  const response = await getSingleWord({ word: wordParam });
  
  console.log('API Response:', JSON.stringify(response, null, 2));
  
  const word = response?.data || response;
  
  console.log('Word data:', word?.word, 'Meanings:', word?.meanings?.length);

  if (!word || !word.word) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Word not found</h1>
          <p className="text-muted-foreground mb-6">The word "{wordParam}" could not be found in our dictionary.</p>
          <Link href="/dictionary">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dictionary
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const firstMeaning = word.meanings?.[0];
  const difficulty = firstMeaning?.difficulty || 'Beginner';
  
  const difficultyStyles = {
    Beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Advanced: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.05) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Back Button */}
          <Link href="/dictionary" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Dictionary
          </Link>

          {/* Word Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              {/* Difficulty Badge */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border mb-4 ${difficultyStyles[difficulty]}`}>
                <GraduationCap className="h-3 w-3" />
                {difficulty}
              </div>

              {/* Word */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {capitalizeString(word.word)}
              </h1>

              {/* Pronunciation */}
              {word.pronunciation && (
                <p className="text-lg text-muted-foreground font-mono">
                  {word.pronunciation}
                </p>
              )}

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {firstMeaning?.pos && (
                  <span className="text-sm text-primary font-medium bg-primary/5 px-3 py-1 rounded-full">
                    {firstMeaning.pos}
                  </span>
                )}
                {firstMeaning?.category && (
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {firstMeaning.category}
                  </span>
                )}
                {word.frequency && (
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {word.frequency} frequency
                  </span>
                )}
              </div>
            </div>

            {/* Actions - Client Component */}
            <WordDetailClient word={word} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meanings */}
            {word.meanings?.map((meaning, index) => (
              <div key={meaning._id || index} className="bg-card border rounded-2xl overflow-hidden">
                <div className="p-6">
                  {/* Meaning Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {index + 1}
                      </span>
                      {meaning.pos && (
                        <span className="text-sm font-medium text-primary">{meaning.pos}</span>
                      )}
                    </div>
                    {meaning.difficulty && (
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyStyles[meaning.difficulty]}`}>
                        {meaning.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Subtitle */}
                  {meaning.subtitle && (
                    <p className="text-lg font-medium text-foreground mb-2">
                      {meaning.subtitle}
                    </p>
                  )}

                  {/* Full Meaning */}
                  <p className="text-muted-foreground leading-relaxed">
                    {meaning.meaning}
                  </p>

                  {/* Easy Meaning */}
                  {meaning.easyMeaning && (
                    <div className="mt-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-sm">
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">Simply put:</span>{' '}
                        <span className="text-muted-foreground">{meaning.easyMeaning}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Examples */}
                {meaning.example_sentences?.length > 0 && (
                  <div className="border-t bg-muted/30 p-6">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Quote className="h-4 w-4 text-primary" />
                      Examples
                    </h4>
                    <div className="space-y-2">
                      {meaning.example_sentences.slice(0, 3).map((example, i) => (
                        <p key={i} className="text-sm text-muted-foreground italic pl-4 border-l-2 border-primary/20">
                          "{example}"
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Usage */}
                {meaning.common_usage?.length > 0 && (
                  <div className="border-t p-6">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Common Usage
                    </h4>
                    <div className="space-y-3">
                      {meaning.common_usage.map((usage, i) => (
                        <div key={i} className="text-sm">
                          <span className="font-medium text-primary">{usage.context}:</span>
                          <span className="text-muted-foreground ml-2 italic">"{usage.example}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mnemonic */}
            {firstMeaning?.mnemonic && (
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">Memory Tip</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {firstMeaning.mnemonic}
                </p>
              </div>
            )}

            {/* Etymology */}
            {word.etymology && (
              <div className="bg-card border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <History className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Etymology</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {word.etymology}
                </p>
              </div>
            )}

            {/* Root Analysis */}
            {word.root_analysis && (
              <div className="bg-card border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Word Origin</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {word.root_analysis.origin_language && (
                    <p>
                      <span className="text-muted-foreground">Language:</span>
                      <span className="ml-2 font-medium text-foreground">{word.root_analysis.origin_language}</span>
                    </p>
                  )}
                  {word.root_analysis.meaning && (
                    <p>
                      <span className="text-muted-foreground">Original meaning:</span>
                      <span className="ml-2 font-medium text-foreground">{word.root_analysis.meaning}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Historical Usage */}
            {word.historical_usage && (
              <div className="bg-card border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Historical Usage</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {word.historical_usage}
                </p>
              </div>
            )}

            {/* Collocations */}
            {word.collocations?.length > 0 && (
              <div className="bg-card border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-3">Related Words</h3>
                <div className="flex flex-wrap gap-2">
                  {word.collocations.map((collocation, i) => (
                    <span key={i} className="text-sm bg-muted px-3 py-1 rounded-full text-muted-foreground">
                      {collocation}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Word Family */}
            {word.word_family?.derived?.length > 0 && (
              <div className="bg-card border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-3">Word Family</h3>
                <div className="flex flex-wrap gap-2">
                  {word.word_family.derived.map((derived, i) => (
                    <Link key={i} href={`/word/${derived.toLowerCase()}`} className="text-sm bg-primary/5 text-primary px-3 py-1 rounded-full hover:bg-primary/10 transition-colors">
                      {derived}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
