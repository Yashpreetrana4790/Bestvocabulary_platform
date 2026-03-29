"use client"

import Image from "next/image"
import { HelpCircle, Layers, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MASCOT_SRC = "/maskot/maskot.gif"

export default function PracticeTrainingBanner({
  className,
  savedWordCount,
  onStartFlashcards,
  onStartQuiz,
  quizDisabled,
  quizDisabledHint,
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-primary/20",
        /* Base: neutral center; avoid a grey “mud” stop on the right */
        "bg-gradient-to-br from-card/98 via-background to-background",
        "shadow-[0_20px_60px_-28px_hsl(var(--primary)_/_0.35),0_0_0_1px_hsl(var(--foreground)_/_0.04)_inset]",
        "p-6 sm:p-8 lg:p-10 transition-[box-shadow,border-color] duration-500 hover:border-primary/30 hover:shadow-[0_28px_72px_-28px_hsl(var(--primary)_/_0.42),0_0_0_1px_hsl(var(--foreground)_/_0.06)_inset]",
        className,
      )}
    >
      {/* Right-side wash: soft violet / indigo (matches headline), not flat neutral grey */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[min(100%,560px)] opacity-100"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 92% 88% at 100% 40%, rgb(167 139 250 / 0.26) 0%, rgb(167 139 250 / 0) 56%),
            radial-gradient(ellipse 78% 72% at 94% 86%, rgb(129 140 248 / 0.2) 0%, rgb(129 140 248 / 0) 50%),
            linear-gradient(108deg, transparent 0%, transparent 36%, rgb(196 181 253 / 0.16) 74%, rgb(233 213 255 / 0.28) 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[min(100%,560px)] hidden opacity-100 dark:block"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 90% 85% at 100% 42%, rgb(139 92 246 / 0.28) 0%, transparent 58%),
            radial-gradient(ellipse 75% 70% at 96% 88%, rgb(99 102 241 / 0.22) 0%, transparent 52%),
            linear-gradient(110deg, transparent 0%, transparent 38%, rgb(91 33 182 / 0.15) 72%, rgb(76 29 149 / 0.22) 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.38] dark:opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border) / 0.5) 1px, transparent 0)`,
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to right, black 0%, black 42%, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 42%, transparent 88%)",
        }}
      />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl dark:bg-violet-500/18" />
      <div className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl transition-transform duration-700 group-hover:scale-110 dark:bg-indigo-500/15" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary shadow-sm">
              <Layers className="h-3.5 w-3.5" aria-hidden />
              Training mode
            </span>
            {savedWordCount != null ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-semibold tabular-nums text-muted-foreground backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                {savedWordCount} word{savedWordCount === 1 ? "" : "s"} ready
              </span>
            ) : null}
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent dark:from-primary dark:to-violet-400">
                practice?
              </span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Strengthen your memory by reviewing your saved words through interactive flashcards or a
              customized quiz.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center lg:flex-col xl:flex-row xl:items-center">
        

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:w-full lg:flex-col xl:w-auto xl:flex-row">
            <Button
              type="button"
              size="lg"
              onClick={onStartFlashcards}
              className="w-full rounded-full gap-2 px-7 font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 sm:w-auto active:scale-[0.98] lg:w-full xl:w-auto"
            >
              <Layers className="h-4 w-4 shrink-0" aria-hidden />
              Start flashcards
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={onStartQuiz}
              disabled={quizDisabled}
              title={quizDisabledHint || undefined}
              className={cn(
                "w-full rounded-full gap-2 border-primary/25 bg-background/80 px-7 font-semibold backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/[0.06] sm:w-auto active:scale-[0.98] lg:w-full xl:w-auto",
                quizDisabled && "opacity-60",
              )}
            >
              <HelpCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              Take quiz
              {quizDisabled ? (
                <span className="text-xs font-normal opacity-70">(2+ words)</span>
              ) : null}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
