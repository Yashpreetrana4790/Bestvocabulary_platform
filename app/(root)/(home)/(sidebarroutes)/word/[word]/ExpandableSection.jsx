'use client';

import React, { useState } from 'react';
import {
  ChevronDown, Quote, MessageSquare, Lightbulb, Target,
  History, Clock, Layers, Sparkles, BookOpen, ThumbsUp, ThumbsDown, Minus, Volume2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {
  getCommonUsage,
  getExampleSentenceStrings,
  getKidDefinition,
} from '@/lib/wordShape';

const iconMap = {
  history: History,
  clock: Clock,
  layers: Layers,
  sparkles: Sparkles,
};

function ConnotationIcon({ tone }) {
  const t = (tone || '').toLowerCase();
  if (t === 'positive') return <ThumbsUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />;
  if (t === 'negative') return <ThumbsDown className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" aria-hidden />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />;
}

function speakWord(wordText) {
  if (!wordText || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(wordText);
  u.lang = 'en-US';
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

export function DefinitionCard({ meaning, index, word, difficultyConfig, isFirst }) {
  const [expanded, setExpanded] = useState(false);
  const currentDifficulty = difficultyConfig[meaning.difficulty] || difficultyConfig.Beginner;
  const exampleLines = getExampleSentenceStrings(meaning);
  const commonUsage = getCommonUsage(meaning);
  const kidDef = getKidDefinition(meaning);

  const hasMoreContent = meaning.easyMeaning || kidDef ||
    (exampleLines.length > 1) ||
    commonUsage.length > 0 ||
    (meaning.mnemonic && !isFirst);

  return (
    <div className="bg-card border rounded-xl sm:rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-sm transition-all">
      {/* Header: meaning as heading, pronunciation, then POS + connotation + difficulty with icons */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 bg-muted/30 border-b">
        <div className="flex gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary">{index + 1}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug flex-1 min-w-0 font-Merriweather">
                {meaning.meaning}
              </h3>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => speakWord(word)}
                      className="shrink-0 w-9 h-9 rounded-lg bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                      aria-label="Listen to pronunciation"
                    >
                      <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-[200px]">
                    Listen to pronunciation
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {meaning.pronunciation && (
              <p className="text-sm text-muted-foreground font-mono mt-1.5">{meaning.pronunciation}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {meaning.pos && (
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                        <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span>{meaning.pos}</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[200px]">
                      Part of speech
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {meaning.tone && (
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/80 px-2.5 py-1 rounded-lg border border-border">
                        <ConnotationIcon tone={meaning.tone} />
                        <span className="capitalize">{meaning.tone}</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[200px]">
                      Connotation
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {meaning.difficulty && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border shrink-0 ${currentDifficulty.light} ${currentDifficulty.text} ${currentDifficulty.border}`}>
                  {meaning.difficulty}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content: category, subtitle if different, example */}
      <div className="p-4 sm:p-5">
        {meaning.category && (
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">{meaning.category}</span>
          </div>
        )}

        {meaning.subtitle && meaning.subtitle !== meaning.meaning && (
          <p className="text-sm font-medium text-foreground/90 mb-3">{meaning.subtitle}</p>
        )}

        {exampleLines[0] && (
          <div className="flex gap-3">
            <Quote className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground italic">{exampleLines[0]}</p>
          </div>
        )}
      </div>

      {/* Expandable Content */}
      {hasMoreContent && (
        <>
          <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {/* Easy Meaning */}
            {meaning.easyMeaning && (
              <div className="px-5 pb-4">
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <p className="text-sm">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">💡 Simply:</span>{' '}
                    <span className="text-foreground/80">{meaning.easyMeaning}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Kid Definition */}
            {kidDef && (
              <div className="px-5 pb-4">
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <p className="text-sm">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">👶 For kids:</span>{' '}
                    <span className="text-foreground/80">{kidDef}</span>
                  </p>
                </div>
              </div>
            )}

            {/* More Examples */}
            {exampleLines.length > 1 && (
              <div className="border-t bg-muted/30 p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Quote className="h-4 w-4 text-primary" />
                  More Examples
                </h4>
                <div className="space-y-3">
                  {exampleLines.slice(1, 4).map((example, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">
                        {i + 2}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Usage */}
            {commonUsage.length > 0 && (
              <div className="border-t p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  How It&apos;s Used
                </h4>
                <div className="grid gap-3">
                  {commonUsage.map((usage, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                      <span className="shrink-0 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                        {usage.context}
                      </span>
                      <p className="text-sm text-muted-foreground italic flex-1">
                        &quot;{usage.example}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mnemonic */}
            {meaning.mnemonic && !isFirst && (
              <div className="border-t bg-amber-500/5 p-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Tip:</span>
                  <span className="text-sm text-muted-foreground">{meaning.mnemonic}</span>
                </div>
              </div>
            )}
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full px-5 py-3 border-t bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <span>{expanded ? 'Show less' : 'Show more'}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </>
      )}
    </div>
  );
}

export function ExpandableInfoCard({ title, iconName, children, defaultOpen = false }) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const Icon = iconMap[iconName] || History;

  return (
    <div className="bg-card border rounded-2xl overflow-hidden hover:border-primary/20 transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground text-sm font-inter">{title}</h3>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 shrink-0 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pt-4 pb-5">
          {children}
        </div>
      </div>
    </div>
  );
}
