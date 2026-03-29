"use client"

import React from "react"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { LEVEL_TIERS, emblemSrc, isTierUnlocked, getTotalXp } from "@/lib/levelEmblems"

export default function ProfileLevelLadder({ savedWordCount = 0 }) {
  const totalXp = getTotalXp(savedWordCount)

  return (
    <section className="rounded-2xl border border-border/80 bg-card/40 p-5 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">Ranks & emblem unlocks</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Each rank unlocks its emblem when you reach the XP threshold. XP comes from saved words. Tiers marked
          &quot;Coming soon&quot; are defined in advance but cannot be earned yet.
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {LEVEL_TIERS.map((tier) => {
          const unlocked = isTierUnlocked(totalXp, tier)
          const isDisabled = !!tier.disabled

          return (
            <li
              key={`${tier.level}-${tier.emblem}`}
              className={cn(
                "relative flex gap-3 rounded-xl border p-3 sm:p-4 transition-colors",
                unlocked && !isDisabled
                  ? "border-primary/25 bg-primary/[0.06]"
                  : "border-border/70 bg-muted/20 opacity-95",
                isDisabled && "border-dashed border-amber-500/25 bg-amber-500/[0.04]",
              )}
            >
              <div
                className={cn(
                  "relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-xl border flex items-center justify-center overflow-hidden",
                  unlocked && !isDisabled ? "border-primary/20 bg-background" : "border-border/60 bg-muted/40",
                )}
              >
                <img
                  src={emblemSrc(tier.emblem)}
                  alt=""
                  width={56}
                  height={56}
                  className={cn(
                    "h-11 w-11 sm:h-[3.25rem] sm:w-[3.25rem] object-contain",
                    !unlocked || isDisabled ? "grayscale opacity-[0.42] saturate-0" : "",
                  )}
                  loading="lazy"
                />
                {(!unlocked || isDisabled) && (
                  <span className="absolute inset-0 flex items-center justify-center bg-background/35">
                    <Lock className="h-5 w-5 text-muted-foreground" aria-hidden />
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-primary tabular-nums">Lvl {tier.level}</span>
                  <span className="text-sm font-semibold text-foreground truncate">{tier.title}</span>
                  {isDisabled && (
                    <span className="text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                  {isDisabled ? "—" : `${tier.minXp.toLocaleString()} XP`}
                </p>
                {tier.description ? (
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{tier.description}</p>
                ) : null}
                {!unlocked && !isDisabled && (
                  <p className="text-[11px] text-muted-foreground mt-2">
                    Need {(tier.minXp - totalXp).toLocaleString()} more XP
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
