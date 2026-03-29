import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Word stats: small tags (label + count), same visual weight as category / difficulty chips.
 */
function StatChip({
  label,
  countDisplay,
  title,
  compact,
  textMain,
  countBoxClass,
  countTextClass,
  outerClass,
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border transition-colors',
        compact ? 'pl-1.5 pr-0.5 py-0.5 gap-1' : 'pl-2 pr-1 py-1 gap-1',
        outerClass,
      )}
      title={title}
    >
      <span className={cn(textMain, 'tracking-tight leading-tight text-left')}>{label}</span>
      <span
        className={cn(
          'inline-flex shrink-0 min-w-[1rem] items-center justify-center rounded border px-1 tabular-nums leading-none',
          compact ? 'h-3.5' : 'h-4',
          countBoxClass,
          countTextClass,
        )}
        aria-hidden
      >
        {countDisplay}
      </span>
    </div>
  );
}

export default function WordStatPills({
  idiomCount = 0,
  meaningCount = 0,
  questionsCount = 0,
  variant = 'default',
  className,
  showRules = true,
}) {
  const showIdiom = idiomCount > 0;
  const showMeanings = meaningCount > 0;
  const showQuestions = questionsCount > 0;

  if (!showIdiom && !showMeanings && !showQuestions) return null;

  const compact = variant === 'compact';
  const textMain = 'text-[10px] font-medium';
  const countTextClass = 'text-[10px] font-medium tabular-nums';

  return (
    <div
      className={cn(
        showRules && 'border-y border-dashed border-border/55 dark:border-border/45',
        showRules && 'py-2',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {showIdiom && (
          <StatChip
            label={idiomCount === 1 ? 'Idiom' : 'Idioms'}
            countDisplay={idiomCount}
            title={`${idiomCount} idiom${idiomCount === 1 ? '' : 's'} or phrase${idiomCount === 1 ? '' : 's'}`}
            compact={compact}
            textMain={textMain}
            countTextClass={countTextClass}
            outerClass={cn(
              'border-sky-500/20 bg-sky-500/10 text-sky-800',
              'dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-sky-200',
            )}
            countBoxClass={cn(
              'border-border/50 bg-background/90 text-foreground/85 shadow-none',
              'dark:border-border/50 dark:bg-muted/35 dark:text-foreground',
            )}
          />
        )}

        {showMeanings && (
          <StatChip
            label={meaningCount === 1 ? 'Meaning' : 'Meanings'}
            countDisplay={meaningCount >= 8 ? '8+' : meaningCount}
            title={`${meaningCount} sense${meaningCount === 1 ? '' : 's'}`}
            compact={compact}
            textMain={textMain}
            countTextClass={countTextClass}
            outerClass={cn(
              'border-amber-500/20 bg-amber-500/10 text-amber-900',
              'dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200',
            )}
            countBoxClass={cn(
              'border-border/50 bg-background/90 text-foreground/85 shadow-none',
              'dark:border-border/50 dark:bg-muted/35 dark:text-foreground',
            )}
          />
        )}

        {showQuestions && (
          <StatChip
            label={questionsCount === 1 ? 'Question' : 'Questions'}
            countDisplay={questionsCount >= 8 ? '8+' : questionsCount}
            title="Related questions"
            compact={compact}
            textMain={textMain}
            countTextClass={countTextClass}
            outerClass={cn(
              'border-emerald-500/20 bg-emerald-500/10 text-emerald-900',
              'dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
            )}
            countBoxClass={cn(
              'border-border/50 bg-background/90 text-foreground/85 shadow-none',
              'dark:border-border/50 dark:bg-muted/35 dark:text-foreground',
            )}
          />
        )}
      </div>
    </div>
  );
}
