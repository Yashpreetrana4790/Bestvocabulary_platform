"use client"

import React, { useMemo, useEffect, useState } from "react"
import { Flame, Zap, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { getPlayerLevel } from "@/lib/levelEmblems"

export default function ProgressHeader({ savedWordCount = 0 }) {
  const [streak, setStreak] = useState(1)

  const { level, xp, nextLevelXp, levelName, progress } = useMemo(
    () => getPlayerLevel(savedWordCount),
    [savedWordCount],
  )

  useEffect(() => {
    const lastActive = localStorage.getItem("bv_last_active")
    const currentStreak = localStorage.getItem("bv_streak") || "1"
    const today = new Date().toISOString().split("T")[0]

    if (lastActive) {
      const lastDate = new Date(lastActive)
      const diff = (new Date(today) - lastDate) / (1000 * 60 * 60 * 24)

      if (diff === 1) {
        const newStreak = parseInt(currentStreak, 10) + 1
        setStreak(newStreak)
        localStorage.setItem("bv_streak", newStreak.toString())
      } else if (diff > 1) {
        setStreak(1)
        localStorage.setItem("bv_streak", "1")
      } else {
        setStreak(parseInt(currentStreak, 10))
      }
    }

    localStorage.setItem("bv_last_active", today)
  }, [])

  const labelClass = "text-xs font-medium text-muted-foreground"
  const valueClass = "text-lg font-semibold tracking-tight text-foreground tabular-nums"

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/50 p-4 sm:p-5 flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Star className="h-5 w-5" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <p className={labelClass}>Rank</p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className={cn(valueClass, "truncate")}>{levelName}</span>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md tabular-nums">
              Lvl {level}
            </span>
          </div>
        </div>
      </div>

      <div className="md:col-span-1 relative overflow-hidden rounded-2xl border border-border/80 bg-card/50 p-4 sm:p-5 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className={cn(labelClass, "flex items-center gap-1.5")}>
            <Zap className="h-3.5 w-3.5 text-amber-500" aria-hidden />
            {nextLevelXp == null ? "Max rank (earn more)" : "Progress to next level"}
          </p>
          <p className="text-xs font-medium text-muted-foreground tabular-nums">
            {nextLevelXp == null ? `${xp} XP` : `${xp} / ${nextLevelXp}`}
          </p>
        </div>
        <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${nextLevelXp == null ? 100 : progress}%` }}
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/50 p-4 sm:p-5 flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
          <Flame className={cn("h-5 w-5", streak > 1 && "fill-orange-500/15")} aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <p className={labelClass}>Visit streak</p>
          <p className={cn(valueClass, "mt-0.5")}>
            {streak} day{streak !== 1 ? "s" : ""}{" "}
            <span className="text-sm font-normal text-muted-foreground">on this device</span>
          </p>
        </div>
      </div>
    </div>
  )
}
