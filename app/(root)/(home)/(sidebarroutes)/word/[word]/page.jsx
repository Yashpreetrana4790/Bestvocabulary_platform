import React from 'react';
import Link from 'next/link';
import { getSingleWord } from '@/services/wordapis';
import { capitalizeString } from '@/lib/otherutil';
import {
  BookOpen, Lightbulb,
  ArrowLeft, Sparkles, GraduationCap,
  Globe, AlertCircle, Users,
  BookMarked, Layers, ArrowRight,
  Zap, Brain, PenTool, Target, Shuffle,
  Replace, Quote, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import WordDetailClient from './WordDetailClient';
import { DefinitionCard, ExpandableInfoCard } from './ExpandableSection';
import PronunciationButton from '@/components/HomePageComponents/PronunciationButton';
import SmartSearchBar from '@/components/SmartSearchBar';

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

          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
            {/* Nav: compact on mobile — Back + Random one row, search full width below */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center justify-between gap-2 min-w-0">
                <Link
                  href="/dictionary"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform" />
                  <span className="hidden sm:inline">Back to Dictionary</span>
                  <span className="sm:hidden">Back</span>
                </Link>
                <Link href="/random" className="shrink-0">
                  <Button variant="secondary" size="sm" className="rounded-xl gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm font-medium">
                    <Shuffle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Random
                  </Button>
                </Link>
              </div>
              <SmartSearchBar className="w-full max-w-xl mx-auto" />
            </div>

            {/* Word + actions: stack on mobile, side-by-side on lg */}
            <div className="lg:rounded-2xl lg:border lg:border-border/80 lg:bg-card/80 lg:overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-0 items-stretch">
              {/* Word block with subtle card so it doesn’t feel floating */}
                <div className="lg:col-span-8 rounded-xl sm:rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 min-w-0 lg:rounded-none lg:border-0 lg:border-r lg:border-border/60 lg:bg-transparent lg:backdrop-blur-none">
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 gap-y-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight break-words">
                    {capitalizeString(word.word)}
                  </h1>
                  <PronunciationButton word={word.word} className="shrink-0" />
                </div>
                {word.pronunciation && (
                  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base md:text-lg text-muted-foreground font-mono tracking-wide">
                    {word.pronunciation}
                  </p>
                )}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {firstMeaning?.pos && (
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-primary/20 shrink-0">
                      <PenTool className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      {firstMeaning.pos}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border shrink-0 ${currentDifficulty.light} ${currentDifficulty.text} ${currentDifficulty.border}`}>
                    <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                    {difficulty}
                  </span>
                  {word.frequency && (
                    <span className={`inline-flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg shrink-0 ${currentFrequency.bg} ${currentFrequency.color}`}>
                      <span className="text-xs sm:text-sm">{currentFrequency.icon}</span>
                      {currentFrequency.label}
                    </span>
                  )}
                  {firstMeaning?.category && (
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground bg-muted/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-transparent shrink-0">
                      <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      {firstMeaning.category}
                    </span>
                  )}
                </div>
              </div>

                <div className="lg:col-span-4 min-w-0 flex">
                  <WordDetailClient word={word} embeddedInCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content — tighter on mobile */}
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-6 md:py-10">
          <div className="grid lg:grid-cols-[1fr,340px] gap-5 sm:gap-6 lg:gap-8">
            <div className="space-y-5 sm:space-y-6 min-w-0">
              {/* Definitions */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-5">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    Definitions
                  </h2>
                  {word.meanings?.length > 1 && (
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-xl">
                      {word.meanings.length} meanings
                    </span>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
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

              {/* Synonyms & Antonyms */}
              {(() => {
                const synonymWords = [];
                const antonymWords = [];
                const isId = (v) => typeof v === 'string' && /^[a-f0-9]{24}$/i.test(v);
                word.meanings?.forEach((m) => {
                  (m.synonyms || []).forEach((s) => {
                    const w = typeof s === 'object' && s !== null && s?.word ? s.word : (typeof s === 'string' ? s : null);
                    if (w && typeof w === 'string' && !isId(w) && !synonymWords.includes(w)) synonymWords.push(w);
                  });
                  (m.antonyms || []).forEach((a) => {
                    const w = typeof a === 'object' && a !== null && a?.word ? a.word : (typeof a === 'string' ? a : null);
                    if (w && typeof w === 'string' && !isId(w) && !antonymWords.includes(w)) antonymWords.push(w);
                  });
                });
                const hasSynonyms = synonymWords.length > 0;
                const hasAntonyms = antonymWords.length > 0;
                if (!hasSynonyms && !hasAntonyms) return null;
                return (
                  <div className="rounded-2xl border bg-card overflow-hidden">
                    <div className="px-5 py-4 bg-muted/30 border-b flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Replace className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">Synonyms & Antonyms</h2>
                    </div>
                    <div className="p-5 space-y-4">
                      {hasSynonyms && (
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Synonyms</h3>
                          <div className="flex flex-wrap gap-2">
                            {synonymWords.map((w) => (
                              <Link key={w} href={`/word/${encodeURIComponent(w.toLowerCase())}`} className="text-sm font-medium text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-xl transition-colors">
                                {capitalizeString(w)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      {hasAntonyms && (
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Antonyms</h3>
                          <div className="flex flex-wrap gap-2">
                            {antonymWords.map((w) => (
                              <Link key={w} href={`/word/${encodeURIComponent(w.toLowerCase())}`} className="text-sm font-medium text-foreground bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-xl border border-border transition-colors">
                                {capitalizeString(w)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Phrases (Phrasal verbs) */}
              {word.PhrasalVerbs?.length > 0 && (
                <div className="rounded-2xl border bg-card overflow-hidden">
                  <div className="px-5 py-4 bg-muted/30 border-b flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Phrases</h2>
                  </div>
                  <div className="p-5 space-y-4">
                    {word.PhrasalVerbs.map((pv, i) => (
                      <div key={pv._id || i} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <p className="font-semibold text-foreground">{pv.phrase}</p>
                        {pv.meaning && <p className="text-sm text-muted-foreground mt-1">{pv.meaning}</p>}
                        {pv.example_sentences?.[0] && <p className="text-sm text-muted-foreground/80 mt-2 italic">&quot;{pv.example_sentences[0]}&quot;</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Idioms & Expressions */}
              {word.expressions?.length > 0 && (
                <div className="rounded-2xl border bg-card overflow-hidden">
                  <div className="px-5 py-4 bg-muted/30 border-b flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Quote className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Idioms & expressions</h2>
                  </div>
                  <div className="p-5 space-y-4">
                    {word.expressions.map((ex, i) => {
                      const meaning = ex.meanings?.[0];
                      return (
                        <div key={ex._id || i} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                          <p className="font-semibold text-foreground">{ex.expression}</p>
                          {meaning?.meaning && <p className="text-sm text-muted-foreground mt-1">{meaning.meaning}</p>}
                          {meaning?.examples?.[0] && <p className="text-sm text-muted-foreground/80 mt-2 italic">&quot;{meaning.examples[0]}&quot;</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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
                <ExpandableInfoCard title="Word Family" iconName="layers" defaultOpen={false}>
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
                      <span key={i} className="text-sm font-medium px-3 py-1.5 rounded-lg  bg-white dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-800 dark:text-red-200">
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

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
