'use client';

import React, { useState } from 'react';
import {
  ChevronDown, Quote, MessageSquare, Lightbulb, Target,
  History, Clock, Layers, Sparkles
} from 'lucide-react';
import { capitalizeString } from '@/lib/otherutil';

const iconMap = {
  history: History,
  clock: Clock,
  layers: Layers,
  sparkles: Sparkles,
};

export function DefinitionCard({ meaning, index, word, difficultyConfig, isFirst }) {
  const [expanded, setExpanded] = useState(false);
  const currentDifficulty = difficultyConfig[meaning.difficulty] || difficultyConfig.Beginner;

  const hasMoreContent = meaning.easyMeaning || meaning.kiddefinition ||
    (meaning.example_sentences?.length > 1) ||
    meaning.common_usage?.length > 0 ||
    (meaning.mnemonic && !isFirst);

  return (
    <div className="bg-card border rounded-2xl overflow-hidden hover:border-primary/20 transition-all">
      {/* Header - Always Visible */}
      <div className="px-5 py-4 bg-muted/50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 ${currentDifficulty.bg}`}>
              {index + 1}
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-bold text-foreground">
                {capitalizeString(word)}
              </h3>
              {meaning.pos && (
                <span className="text-sm font-medium text-primary">({meaning.pos})</span>
              )}
            </div>
          </div>
          {meaning.difficulty && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${currentDifficulty.light} ${currentDifficulty.text} ${currentDifficulty.border}`}>
              {meaning.difficulty}
            </span>
          )}
        </div>
        {meaning.pronunciation && (
          <p className="text-sm text-muted-foreground font-mono mt-1 ml-11">{meaning.pronunciation}</p>
        )}
      </div>

      {/* Minimal Content - Always Visible */}
      <div className="p-5">
        {/* Category */}
        {meaning.category && (
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">{meaning.category}</span>
          </div>
        )}

        {/* Short Definition */}
        {meaning.subtitle && (
          <p className="text-base font-medium text-foreground mb-2">{meaning.subtitle}</p>
        )}

        {/* Main Meaning */}
        <p className="text-muted-foreground leading-relaxed">
          {meaning.meaning}
        </p>

        {/* First Example - Always Show */}
        {meaning.example_sentences?.[0] && (
          <div className="mt-4 flex gap-3">
            <Quote className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground italic">{meaning.example_sentences[0]}</p>
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
            {meaning.kiddefinition && (
              <div className="px-5 pb-4">
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <p className="text-sm">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">👶 For kids:</span>{' '}
                    <span className="text-foreground/80">{meaning.kiddefinition}</span>
                  </p>
                </div>
              </div>
            )}

            {/* More Examples */}
            {meaning.example_sentences?.length > 1 && (
              <div className="border-t bg-muted/30 p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Quote className="h-4 w-4 text-primary" />
                  More Examples
                </h4>
                <div className="space-y-3">
                  {meaning.example_sentences.slice(1, 4).map((example, i) => (
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
            {meaning.common_usage?.length > 0 && (
              <div className="border-t p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  How It&apos;s Used
                </h4>
                <div className="grid gap-3">
                  {meaning.common_usage.map((usage, i) => (
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
    <div className="bg-card border rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-color mb-2.5s"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
