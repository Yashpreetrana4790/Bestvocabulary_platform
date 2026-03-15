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
import PronunciationButton from '@/components/HomePageComponents/PronunciationButton';
import WordPageSearch from './WordPageSearch';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bestvocabulary.com';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const wordParam = decodeURIComponent(resolvedParams.word);
  const response = await getSingleWord({ word: wordParam });
  const word = response?.data || response;

  if (!word || !word.word) {
    return {
      title: 'Word Not Found',
      description: 'The requested word could not be found in our dictionary.',
    };
  }

  const firstMeaning = word.meanings?.[0];
  const definition = firstMeaning?.meaning || firstMeaning?.subtitle || '';
  const pos = firstMeaning?.pos || '';
  
  return {
    title: `${capitalizeString(word.word)} - Definition, Meaning & Examples`,
    description: `${capitalizeString(word.word)} (${pos}): ${definition.slice(0, 150)}${definition.length > 150 ? '...' : ''} Learn the meaning, etymology, synonyms, and usage examples.`,
    keywords: [
      word.word,
      `${word.word} meaning`,
      `${word.word} definition`,
      `${word.word} synonym`,
      `${word.word} example`,
      `how to use ${word.word}`,
      ...(word.word_family?.derived || []),
    ],
    openGraph: {
      title: `${capitalizeString(word.word)} - Definition & Meaning | Best Vocabulary`,
      description: `${capitalizeString(word.word)} (${pos}): ${definition.slice(0, 150)}${definition.length > 150 ? '...' : ''}`,
      url: `${SITE_URL}/word/${encodeURIComponent(word.word)}`,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${capitalizeString(word.word)} - Best Vocabulary`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${capitalizeString(word.word)} - Definition & Meaning`,
      description: `${capitalizeString(word.word)} (${pos}): ${definition.slice(0, 100)}...`,
    },
    alternates: {
      canonical: `${SITE_URL}/word/${encodeURIComponent(word.word)}`,
    },
  };
}

function generateWordJsonLd(word) {
  const firstMeaning = word.meanings?.[0];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/word/${encodeURIComponent(word.word)}`,
    name: word.word,
    description: firstMeaning?.meaning || firstMeaning?.subtitle || '',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Best Vocabulary Dictionary',
      url: SITE_URL,
    },
    ...(word.pronunciation && { 
      alternateName: word.pronunciation 
    }),
    ...(word.etymology && {
      disambiguatingDescription: word.etymology,
    }),
  };
}

function generateBreadcrumbJsonLd(word) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Dictionary',
        item: `${SITE_URL}/dictionary`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: capitalizeString(word.word),
        item: `${SITE_URL}/word/${encodeURIComponent(word.word)}`,
      },
    ],
  };
}

export default async function WordPage({ params }) {
  const resolvedParams = await params;
  const wordParam = decodeURIComponent(resolvedParams.word);
  
  const response = await getSingleWord({ word: wordParam });
  const word = response?.data || response;

  if (!word || !word.word) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Word not found</h1>
          <p className="text-muted-foreground mb-6">
            &quot;{wordParam}&quot; isn&apos;t in our dictionary yet.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/dictionary">
              <Button variant="outline" size="lg" className="rounded-xl gap-2">
                <ArrowLeft className="h-4 w-4" />
                Dictionary
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" className="rounded-xl gap-2">
                <Sparkles className="h-4 w-4" />
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWordJsonLd(word)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(word)),
        }}
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b bg-gradient-to-b from-muted/30 to-background">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
            {/* Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 md:mb-8">
              <Link 
                href="/dictionary" 
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group rounded-lg px-3 py-2 -ml-2 hover:bg-muted/50 shrink-0"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Dictionary
              </Link>
              <WordPageSearch />
              <Link href="/random" className="shrink-0 sm:ml-auto">
                <Button variant="outline" size="sm" className="rounded-xl gap-2 w-full sm:w-auto">
                  <Shuffle className="h-4 w-4" />
                  Random word
                </Button>
              </Link>
            </div>

            {/* Main Header Grid */}
            <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-start">
              {/* Left: Word Info */}
              <div className="space-y-5">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
                      {capitalizeString(word.word)}
                    </h1>
                    <PronunciationButton word={word.word} className="shrink-0 mt-2 sm:mt-3" />
                  </div>
                  {word.pronunciation && (
                    <p className="text-lg md:text-xl text-muted-foreground font-mono tracking-wide">
                      {word.pronunciation}
                    </p>
                  )}
                </div>

                {/* Quick Stats Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {firstMeaning?.pos && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                      <PenTool className="h-3.5 w-3.5" />
                      {firstMeaning.pos}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl border ${currentDifficulty.light} ${currentDifficulty.text} ${currentDifficulty.border}`}>
                    <GraduationCap className="h-3.5 w-3.5" />
                    {difficulty}
                  </span>
                  {word.frequency && (
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl ${currentFrequency.bg} ${currentFrequency.color}`}>
                      <span className="text-sm">{currentFrequency.icon}</span>
                      {currentFrequency.label}
                    </span>
                  )}
                  {firstMeaning?.category && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/80 px-3 py-1.5 rounded-xl border border-transparent">
                      <Target className="h-3.5 w-3.5" />
                      {firstMeaning.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Actions only */}
              <div className="flex flex-col gap-4 lg:min-w-[280px]">
                <WordDetailClient word={word} />
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid lg:grid-cols-[1fr,340px] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Definitions */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  Definitions
                </h2>
                {word.meanings?.length > 1 && (
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-xl">
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
            {/* Usage */}
            {word.usage_distribution && (word.usage_distribution.spoken > 0 || word.usage_distribution.written > 0) && (
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">Usage</h3>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted/20" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="2.5"
                          strokeDasharray={`${(word.usage_distribution.spoken || 0) * 0.88} 88`}
                          strokeLinecap="round" className="text-primary" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <span className="text-base font-bold text-foreground mt-2">{word.usage_distribution.spoken || 0}%</span>
                    <span className="text-[10px] text-muted-foreground">Spoken</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted/20" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="2.5"
                          strokeDasharray={`${(word.usage_distribution.written || 0) * 0.88} 88`}
                          strokeLinecap="round" className="text-primary" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookMarked className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <span className="text-base font-bold text-foreground mt-2">{word.usage_distribution.written || 0}%</span>
                    <span className="text-[10px] text-muted-foreground">Written</span>
                  </div>
                </div>
              </div>
            )}

            {/* Memory Tip */}
            {firstMeaning?.mnemonic && (
              <div className="rounded-2xl border bg-card p-5 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground mb-1">Memory tip</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{firstMeaning.mnemonic}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Word Origin */}
            {word.root_analysis && (word.root_analysis.origin_language || word.root_analysis.meaning) && (
              <div className="rounded-2xl border bg-card p-5 border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">Word Origin</h3>
                </div>
                {word.root_analysis.origin_language && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Language</span>
                    <span className="text-sm font-semibold text-foreground bg-muted/50 px-3 py-1 rounded-lg">
                      {word.root_analysis.origin_language}
                    </span>
                  </div>
                )}
                {word.root_analysis.meaning && (
                  <div className="pt-3">
                    <span className="text-xs text-muted-foreground">Original meaning</span>
                    <p className="text-sm font-medium text-foreground mt-1">&quot;{word.root_analysis.meaning}&quot;</p>
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
              <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/30 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-bold text-foreground">Common misspellings</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {word.misspellings.slice(0, 4).map((m, i) => (
                    <span key={i} className="text-sm font-medium px-3 py-1.5 rounded-lg line-through bg-white dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-800 dark:text-red-200">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Practice */}
            <div className="rounded-2xl border bg-card p-5 border-primary/20">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                Practice
              </h3>
              <div className="space-y-2">
                <Link href="/quiz" className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Quiz</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/flashcards" className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Flashcards</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
