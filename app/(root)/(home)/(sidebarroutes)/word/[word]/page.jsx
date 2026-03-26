import React from 'react';
import Link from 'next/link';
import { getSingleWord } from '@/services/wordapis';
import { capitalizeString } from '@/lib/otherutil';
import {
  BookOpen, Lightbulb,
  ArrowLeft, Sparkles, GraduationCap,
  Globe, Users,
  BookMarked, Layers, ArrowRight,
  Zap, Brain, PenTool, Target, Shuffle,
  Quote, MessageCircle,
  Flame, BarChart3, Gem,
  Briefcase, Scale, Palette, Cpu, FlaskConical, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import WordDetailClient from './WordDetailClient';
import { DefinitionCard, ExpandableInfoCard } from './ExpandableSection';
import PronunciationButton from '@/components/HomePageComponents/PronunciationButton';
import SmartSearchBar from '@/components/SmartSearchBar';
import {
  getPhrasalVerbs,
  getWordFamily,
  getUsageDistribution,
  getHistoricalUsage,
  getRootAnalysis,
  collocationLabel,
  phrasalFirstExample,
} from '@/lib/wordShape';

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
      ...(getWordFamily(word)?.derived || []),
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
    high: { label: 'Very Common', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', icon: Flame },
    medium: { label: 'Common', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', icon: BarChart3 },
    low: { label: 'Rare', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10', icon: Gem },
  };

  const currentFrequency = frequencyConfig[word.frequency] || frequencyConfig.medium;
  const FrequencyIcon = currentFrequency.icon;

  const CATEGORY_ICONS = {
    Medical: Heart,
    Science: FlaskConical,
    Technology: Cpu,
    Business: Briefcase,
    Legal: Scale,
    Arts: Palette,
    Psychology: Brain,
    Academic: GraduationCap,
    Literature: BookMarked,
    Philosophy: Brain,
    Economics: Briefcase,
    Politics: Scale,
    General: BookOpen,
  };

  const CATEGORY_STYLES = {
    Medical: { bg: 'bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500/20' },
    Science: { bg: 'bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-500/20' },
    Technology: { bg: 'bg-cyan-500/10', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-500/20' },
    Business: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' },
    Legal: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20' },
    Arts: { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/20' },
    Psychology: { bg: 'bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/20' },
    Academic: { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20' },
    Literature: { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-600 dark:text-fuchsia-400', border: 'border-fuchsia-500/20' },
    Philosophy: { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/20' },
    Economics: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' },
    Politics: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20' },
    General: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  };

  const firstCategory = firstMeaning?.category;
  const CategoryIcon = firstCategory ? (CATEGORY_ICONS[firstCategory] || BookOpen) : BookOpen;
  const currentCategoryStyle = firstCategory ? (CATEGORY_STYLES[firstCategory] || CATEGORY_STYLES.General) : CATEGORY_STYLES.General;

  const phrasalVerbsList = getPhrasalVerbs(word);
  const wordFamily = getWordFamily(word);
  const usageDistribution = getUsageDistribution(word);
  const historicalUsage = getHistoricalUsage(word);
  const rootAnalysis = getRootAnalysis(word);

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

          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-5">
            {/* Nav: compact on mobile — Back + Random one row, search full width below */}
            <div className="flex flex-col gap-2.5 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
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

            {/* Word + actions */}
            <div className="lg:rounded-xl lg:border lg:border-border/80 lg:bg-card/80 lg:overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 lg:gap-3 items-stretch sm:p-2.5 lg:p-3">
                {/* Word block */}
                <div className="lg:col-span-8 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-3 sm:p-4 md:p-5 min-w-0 lg:rounded-xl lg:border lg:border-border/70 lg:bg-background/50">
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 gap-y-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight break-words">
                    {capitalizeString(word.word)}
                  </h1>
                  <PronunciationButton word={word.word} className="shrink-0" />
                </div>
                {word.pronunciation && (
                  <p className="mt-1 text-sm sm:text-base text-muted-foreground font-mono tracking-wide">
                    {word.pronunciation}
                  </p>
                )}
                <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-border/50 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {firstMeaning?.pos && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md border border-primary/20 shrink-0">
                      <PenTool className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      {firstMeaning.pos}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md border shrink-0 ${currentDifficulty.light} ${currentDifficulty.text} ${currentDifficulty.border}`}>
                    <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                    {difficulty}
                  </span>
                  {word.frequency && (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md shrink-0 ${currentFrequency.bg} ${currentFrequency.color}`}>
                      <FrequencyIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                      <span>{currentFrequency.label}</span>
                    </span>
                  )}
                  {firstMeaning?.category && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md border shrink-0 ${currentCategoryStyle.bg} ${currentCategoryStyle.text} ${currentCategoryStyle.border}`}
                      title={firstMeaning.category}
                    >
                      <CategoryIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      {firstMeaning.category}
                    </span>
                  )}
                </div>
                <div className="lg:hidden">
                  <WordDetailClient word={word} actionsOnly inline />
                </div>
              </div>

                <div className="hidden lg:block lg:col-span-4 min-w-0 lg:self-stretch">
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
                    <span className="text-[10px] font-medium tabular-nums text-muted-foreground bg-muted/50 border border-border/60 px-2 py-0.5 rounded-md">
                      {(word.meanings.length >= 8 ? '8+' : word.meanings.length)} meanings
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
                const getMatchStrength = (baseWord, relatedWord) => {
                  const a = String(baseWord || '').toLowerCase().trim();
                  const b = String(relatedWord || '').toLowerCase().trim();
                  if (!a || !b) return 'Related';
                  if (a === b) return 'Exact';
                  if (a[0] === b[0] || Math.abs(a.length - b.length) <= 2) return 'Close';
                  return 'Related';
                };
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
                  <ExpandableInfoCard title="Synonyms & Antonyms" iconName="sparkles" defaultOpen={false}>
                    <div className="space-y-5">
                      {hasSynonyms && (
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-2.5">Synonyms</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {synonymWords.map((w) => (
                              <Link
                                key={w}
                                href={`/word/${encodeURIComponent(w.toLowerCase())}`}
                                className="group rounded-xl border border-sky-200/40 dark:border-sky-900/40 bg-sky-500/[0.04] hover:bg-sky-500/[0.07] px-3 py-2.5 transition-colors"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">{capitalizeString(w)}</p>
                                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                                      <span className="text-[10px] font-semibold text-sky-700/90 dark:text-sky-300 bg-sky-500/10 px-1.5 py-0.5 rounded">
                                        Match: {getMatchStrength(word.word, w)}
                                      </span>
                                      <span className="text-[10px] text-muted-foreground">Use in a similar context</span>
                                    </div>
                                  </div>
                                  <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      {hasAntonyms && (
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-2.5">Antonyms</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {antonymWords.map((w) => (
                              <Link
                                key={w}
                                href={`/word/${encodeURIComponent(w.toLowerCase())}`}
                                className="group rounded-xl border border-rose-200/40 dark:border-rose-900/40 bg-rose-500/[0.035] hover:bg-rose-500/[0.065] px-3 py-2.5 transition-colors"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">{capitalizeString(w)}</p>
                                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                                      <span className="text-[10px] font-semibold text-rose-700/90 dark:text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded">
                                        Contrast
                                      </span>
                                      <span className="text-[10px] text-muted-foreground">Use for opposite tone</span>
                                    </div>
                                  </div>
                                  <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </ExpandableInfoCard>
                );
              })()}

              {/* Phrases (Phrasal verbs) */}
              {phrasalVerbsList.length > 0 && (
                <div className="rounded-2xl border bg-card overflow-hidden">
                  <div className="px-5 py-4 bg-muted/30 border-b flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Phrases</h2>
                  </div>
                  <div className="p-5 space-y-4">
                    {phrasalVerbsList.map((pv, i) => (
                      <div key={pv._id || i} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <p className="font-semibold text-foreground">{pv.phrase}</p>
                        {pv.meaning && <p className="text-sm text-muted-foreground mt-1">{pv.meaning}</p>}
                        {phrasalFirstExample(pv) && (
                          <p className="text-sm text-muted-foreground/80 mt-2 italic">&quot;{phrasalFirstExample(pv)}&quot;</p>
                        )}
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
              {(word.etymology || historicalUsage) && (
                <div className="space-y-4">
                  {word.etymology && (
                    <ExpandableInfoCard title="Etymology" iconName="history" defaultOpen={false}>
                      <p className="text-sm text-muted-foreground leading-relaxed">{word.etymology}</p>
                    </ExpandableInfoCard>
                  )}
                  {historicalUsage && (
                    <ExpandableInfoCard title="Historical Context" iconName="clock" defaultOpen={false}>
                      <p className="text-sm text-muted-foreground leading-relaxed">{historicalUsage}</p>
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

              {/* Word Origin */}
              {rootAnalysis && (rootAnalysis.origin_language || rootAnalysis.meaning || rootAnalysis.root || rootAnalysis.notes || rootAnalysis.prefix || rootAnalysis.suffix || (Array.isArray(rootAnalysis.morphemes) && rootAnalysis.morphemes.length > 0)) && (
                <div className="rounded-2xl border bg-card p-5 border-primary/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">Word Origin</h3>
                  </div>
                  {rootAnalysis.origin_language && (
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm text-muted-foreground">Language</span>
                      <span className="text-sm font-semibold text-foreground bg-muted/50 px-3 py-1 rounded-lg">
                        {rootAnalysis.origin_language}
                      </span>
                    </div>
                  )}
                  {rootAnalysis.meaning && (
                    <div className="pt-3">
                      <span className="text-xs text-muted-foreground">Original meaning</span>
                      <p className="text-sm font-medium text-foreground mt-1">&quot;{rootAnalysis.meaning}&quot;</p>
                    </div>
                  )}
                  {(rootAnalysis.root || rootAnalysis.prefix || rootAnalysis.suffix) && (
                    <div className="pt-3 space-y-1 text-sm text-muted-foreground">
                      {rootAnalysis.root && <p><span className="font-medium text-foreground">Root:</span> {rootAnalysis.root}</p>}
                      {rootAnalysis.prefix && <p><span className="font-medium text-foreground">Prefix:</span> {rootAnalysis.prefix}</p>}
                      {rootAnalysis.suffix && <p><span className="font-medium text-foreground">Suffix:</span> {rootAnalysis.suffix}</p>}
                    </div>
                  )}
                  {rootAnalysis.notes && (
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{rootAnalysis.notes}</p>
                  )}
                  {Array.isArray(rootAnalysis.morphemes) && rootAnalysis.morphemes.length > 0 && (
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                      {rootAnalysis.morphemes.map((m, idx) => (
                        <li key={idx}>
                          {[m.part, m.type, m.meaning, m.originLanguage].filter(Boolean).join(' · ')}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Word Family */}
              {wordFamily?.derived?.length > 0 && (
                <ExpandableInfoCard title="Word Family" iconName="layers" defaultOpen={false}>
                  {wordFamily.base && (
                    <div className="mb-3 p-2 rounded-lg bg-primary/5 text-center">
                      <span className="text-xs text-muted-foreground ">Base: </span>
                      <span className="font-bold text-primary capitalize">{wordFamily.base}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {wordFamily.derived.map((derived, i) => (
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
                    {word.collocations.map((col, i) => {
                      const label = collocationLabel(col);
                      if (!label) return null;
                      return (
                        <span key={i} className="text-sm bg-muted text-foreground px-3 py-1.5 rounded-lg">{label}</span>
                      );
                    })}
                  </div>
                </ExpandableInfoCard>
              )}

              {/* Misspellings */}
              {word.misspellings?.length > 0 && (
                <ExpandableInfoCard title="Common misspellings" iconName="sparkles" defaultOpen={false}>
                  <div className="flex flex-wrap gap-2.5">
                    {word.misspellings.slice(0, 6).map((m, i) => (
                      <span
                        key={i}
                        className="text-sm font-medium px-3 py-1.5 rounded-lg bg-muted/35 border border-border/70 text-foreground hover:bg-muted/60 transition-colors"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </ExpandableInfoCard>
              )}

              {/* Usage */}
              {usageDistribution && (usageDistribution.spoken > 0 || usageDistribution.written > 0) && (
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
                            strokeDasharray={`${(usageDistribution.spoken || 0) * 0.88} 88`}
                            strokeLinecap="round" className="text-primary" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <span className="text-base font-bold text-foreground mt-2">{usageDistribution.spoken || 0}%</span>
                      <span className="text-[10px] text-muted-foreground">Spoken</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative w-14 h-14">
                        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted/20" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="2.5"
                            strokeDasharray={`${(usageDistribution.written || 0) * 0.88} 88`}
                            strokeLinecap="round" className="text-primary" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookMarked className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <span className="text-base font-bold text-foreground mt-2">{usageDistribution.written || 0}%</span>
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
