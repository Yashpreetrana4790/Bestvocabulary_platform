import React from 'react';
import Link from 'next/link';
import { getSingleWord } from '@/services/wordapis';
import { capitalizeString } from '@/lib/otherutil';
import { 
  BookOpen, Lightbulb,
  ArrowLeft, Sparkles, GraduationCap,
  Globe, AlertCircle, Users,
  BookMarked, Layers, ArrowRight,
  Zap, Brain, PenTool, Target, Shuffle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import WordDetailClient from './WordDetailClient';
import { DefinitionCard, ExpandableInfoCard } from './ExpandableSection';

export default async function WordPage({ params }) {
  const resolvedParams = await params;
  const wordParam = decodeURIComponent(resolvedParams.word);
  
  const response = await getSingleWord({ word: wordParam });
  const word = response?.data || response;

  if (!word || !word.word) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Word not found</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            The word &quot;{wordParam}&quot; could not be found in our dictionary.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/dictionary">
              <Button variant="outline" size="lg" className="rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dictionary
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" className="rounded-xl">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const firstMeaning = word.meanings?.[0];
  const difficulty = firstMeaning?.difficulty || 'Beginner';
  
  const difficultyConfig = {
    Beginner: { bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', light: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    Easy: { bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', light: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    Intermediate: { bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', light: 'bg-amber-500/10', border: 'border-amber-500/20' },
    Medium: { bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', light: 'bg-amber-500/10', border: 'border-amber-500/20' },
    Advanced: { bg: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400', light: 'bg-rose-500/10', border: 'border-rose-500/20' },
    Hard: { bg: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400', light: 'bg-rose-500/10', border: 'border-rose-500/20' },
  };

  const currentDifficulty = difficultyConfig[difficulty] || difficultyConfig.Beginner;

  const frequencyConfig = {
    high: { label: 'Very Common', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', icon: '🔥' },
    medium: { label: 'Common', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', icon: '📊' },
    low: { label: 'Rare', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10', icon: '💎' },
  };

  const currentFrequency = frequencyConfig[word.frequency] || frequencyConfig.medium;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(128,128,128,0.15) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/dictionary" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Dictionary
            </Link>
            <Link href="/random">
              <Button variant="ghost" size="sm" className="rounded-lg gap-2 text-xs">
                <Shuffle className="h-3.5 w-3.5" />
                Random
              </Button>
            </Link>
          </div>

          {/* Main Header Grid */}
          <div className="grid lg:grid-cols-[1fr,auto] gap-8">
            {/* Left: Word Info */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-2">
                {capitalizeString(word.word)}
              </h1>
              {word.pronunciation && (
                <p className="text-xl md:text-2xl text-muted-foreground font-mono mb-5">
                  {word.pronunciation}
                </p>
              )}

              {/* Quick Stats Row */}
              <div className="flex flex-wrap items-center gap-3">
                {firstMeaning?.pos && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                    <PenTool className="h-3.5 w-3.5" />
                    {firstMeaning.pos}
                  </span>
                )}
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border ${currentDifficulty.light} ${currentDifficulty.text} ${currentDifficulty.border}`}>
                  <GraduationCap className="h-3.5 w-3.5" />
                  {difficulty}
                </span>
                {word.frequency && (
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl ${currentFrequency.bg} ${currentFrequency.color}`}>
                    <span className="text-base">{currentFrequency.icon}</span>
                    {currentFrequency.label}
                  </span>
                )}
                {firstMeaning?.category && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-xl">
                    <Target className="h-3.5 w-3.5" />
                    {firstMeaning.category}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Actions & Stats */}
            <div className="flex flex-col gap-4">
              <WordDetailClient word={word} />
              
              {/* Usage Distribution */}
              {word.usage_distribution && (word.usage_distribution.spoken > 0 || word.usage_distribution.written > 0) && (
                <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-3 text-center">Usage Pattern</p>
                  <div className="flex items-center justify-center gap-6">
                    <div className="relative flex flex-col items-center">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/30" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3"
                            strokeDasharray={`${(word.usage_distribution.spoken || 0) * 0.88} 88`}
                            strokeLinecap="round" className="text-violet-500" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Users className="h-4 w-4 text-violet-500" />
                        </div>
                      </div>
                      <span className="text-lg font-bold text-foreground mt-1">{word.usage_distribution.spoken || 0}%</span>
                      <span className="text-[10px] text-muted-foreground">Spoken</span>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/30" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3"
                            strokeDasharray={`${(word.usage_distribution.written || 0) * 0.88} 88`}
                            strokeLinecap="round" className="text-primary" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookMarked className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <span className="text-lg font-bold text-foreground mt-1">{word.usage_distribution.written || 0}%</span>
                      <span className="text-[10px] text-muted-foreground">Written</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,340px] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Quick Memory Tip */}
            {firstMeaning?.mnemonic && (
              <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10 border border-amber-500/20 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Quick Memory Tip</h3>
                    <p className="text-muted-foreground">{firstMeaning.mnemonic}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Definitions */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Definitions
                </h2>
                {word.meanings?.length > 1 && (
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {word.meanings.length} meanings
                  </span>
                )}
              </div>
              
              <div className="space-y-4">
                {word.meanings?.map((meaning, index) => (
                  <DefinitionCard
                    key={meaning._id || index}
                    meaning={meaning}
                    index={index}
                    word={word.word}
                    difficultyConfig={difficultyConfig}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            </div>

            {/* Etymology & History - Expandable */}
            {(word.etymology || word.historical_usage) && (
              <div className="space-y-4">
                {word.etymology && (
                  <ExpandableInfoCard title="Etymology" iconName="history" defaultOpen={false}>
                    <p className="text-sm text-muted-foreground leading-relaxed">{word.etymology}</p>
                  </ExpandableInfoCard>
                )}
                {word.historical_usage && (
                  <ExpandableInfoCard title="Historical Context" iconName="clock" defaultOpen={false}>
                    <p className="text-sm text-muted-foreground leading-relaxed">{word.historical_usage}</p>
                  </ExpandableInfoCard>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Word Origin */}
            {word.root_analysis && (word.root_analysis.origin_language || word.root_analysis.meaning) && (
              <div className="bg-gradient-to-br from-violet-500/10 to-primary/5 border border-violet-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-violet-500" />
                  <h3 className="font-bold text-foreground">Word Origin</h3>
                </div>
                {word.root_analysis.origin_language && (
                  <div className="flex items-center justify-between py-2 border-b border-violet-500/10">
                    <span className="text-sm text-muted-foreground">Language</span>
                    <span className="text-sm font-semibold text-foreground bg-background/50 px-3 py-1 rounded-lg">
                      {word.root_analysis.origin_language}
                    </span>
                  </div>
                )}
                {word.root_analysis.meaning && (
                  <div className="pt-3">
                    <span className="text-xs text-muted-foreground">Original Meaning</span>
                    <p className="text-base font-medium text-foreground mt-1">&quot;{word.root_analysis.meaning}&quot;</p>
                  </div>
                )}
              </div>
            )}

            {/* Word Family */}
            {word.word_family?.derived?.length > 0 && (
              <ExpandableInfoCard title="Word Family" iconName="layers" defaultOpen={true}>
                {word.word_family.base && (
                  <div className="mb-3 p-2 rounded-lg bg-primary/5 text-center">
                    <span className="text-xs text-muted-foreground">Base: </span>
                    <span className="font-bold text-primary">{word.word_family.base}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {word.word_family.derived.map((derived, i) => (
                    <Link key={i} href={`/word/${derived.toLowerCase()}`}
                      className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium">
                      {derived}
                    </Link>
                  ))}
                </div>
              </ExpandableInfoCard>
            )}

            {/* Collocations */}
            {word.collocations?.length > 0 && (
              <ExpandableInfoCard title="Common Pairs" iconName="sparkles" defaultOpen={false}>
                <div className="flex flex-wrap gap-2">
                  {word.collocations.map((col, i) => (
                    <span key={i} className="text-sm bg-muted text-foreground px-3 py-1.5 rounded-lg">{col}</span>
                  ))}
                </div>
              </ExpandableInfoCard>
            )}

            {/* Misspellings */}
            {word.misspellings?.length > 0 && (
              <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                  <h3 className="font-bold text-foreground">Avoid</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {word.misspellings.slice(0, 4).map((m, i) => (
                    <span key={i} className="text-sm bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-lg line-through">{m}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Practice */}
            <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Practice
              </h3>
              <div className="space-y-2">
                <Link href="/quiz" className="flex items-center justify-between p-3 rounded-xl bg-background/50 hover:bg-background transition-colors group">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Quiz</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/flashcards" className="flex items-center justify-between p-3 rounded-xl bg-background/50 hover:bg-background transition-colors group">
                  <div className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-violet-500" />
                    <span className="text-sm font-medium">Flashcards</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
