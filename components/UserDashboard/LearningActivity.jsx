"use client"

import React, { useMemo } from "react"
import { BarChart3, Trophy } from "lucide-react"

export default function LearningActivity({ savedWords = [] }) {
  const chartData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const baseActivity = Math.floor(savedWords.length / 7)
    const remainder = savedWords.length % 7

    return days.map((day, i) => {
      let count = baseActivity + (i < remainder ? 1 : 0)
      if (i === 6) count += 2
      if (i === 2) count = Math.max(0, count - 1)
      return {
        label: day,
        value: count,
        percentage: Math.min(100, (count / (Math.max(savedWords.length, 1) || 5)) * 150),
      }
    })
  }, [savedWords])

  const totalWords = savedWords.length

  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h3 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary shrink-0" aria-hidden />
              Weekly activity
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
              Preview distribution from your library size. When saves include dates from the server, this chart will
              reflect real daily counts.
            </p>
          </div>

          <div className="relative h-44 w-full flex items-end justify-between gap-2 sm:gap-4 px-1">
            {chartData.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center group/bar">
                <div className="relative w-full max-w-[36px] flex items-end justify-center h-36">
                  <div className="absolute inset-x-0 bottom-0 top-0 rounded-t-lg bg-muted/50" />
                  <div
                    className="relative w-full bg-gradient-to-t from-primary/90 to-primary rounded-t-lg transition-all duration-700 ease-out min-h-[4px]"
                    style={{ height: `${Math.max(8, day.percentage)}%` }}
                  >
                    <span className="sr-only">{day.value} words</span>
                  </div>
                </div>
                <span className="mt-3 text-xs font-medium text-muted-foreground group-hover/bar:text-foreground transition-colors">
                  {day.label}
                </span>
              </div>
            ))}
            <div className="absolute top-0 left-0 right-0 h-px bg-border/60 pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border/40 pointer-events-none" />
          </div>
        </div>

        <div className="w-full lg:w-64 shrink-0">
          <div className="rounded-2xl border border-border/80 bg-muted/30 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Trophy className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Words saved</p>
                <p className="text-2xl font-semibold tabular-nums text-foreground">{totalWords}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add words from dictionary pages to grow this list and unlock richer stats later.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
