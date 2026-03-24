"use client"

import React, { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

/** Public path to the hero mascot video (place file in /public/maskot/). */
const HERO_MASCOT_VIDEO = "/maskot/a49cd1f3-eb93-4be6-a08b-7a032690fafd.mp4"

const VIDEO_SIZE_CLASS = {
  compact:
    "h-[5.5rem] w-[5.5rem] sm:h-[6.5rem] sm:w-[6.5rem] md:h-28 md:w-28",
  featured: "h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40",
}

/**
 * Looped mascot MP4 in a framed shell (hero + other sections).
 * Pauses on first frame when prefers-reduced-motion is set.
 *
 * @param {{ src?: string, size?: 'compact' | 'featured', heroMotion?: boolean, className?: string }} [props]
 */
export default function HeroCatMascot({
  src = HERO_MASCOT_VIDEO,
  size = "compact",
  heroMotion = true,
  className,
}) {
  const videoRef = useRef(null)
  /* Assume reduced motion until client reads mq — avoids autoplay flash for a11y. */
  const [reduceMotion, setReduceMotion] = useState(true)
  /** Default unmuted; browsers often block unmuted autoplay — we fall back to muted + play. */
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    setReduceMotion(mq.matches)
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (reduceMotion) {
      el.pause()
      try {
        el.currentTime = 0
      } catch {
        /* ignore */
      }
      setMuted(true)
      el.muted = true
      return
    }
    setMuted(false)
    el.muted = false
    void el.play().catch(() => {
      if (!el.muted) {
        el.muted = true
        setMuted(true)
        void el.play().catch(() => {})
      }
    })
  }, [reduceMotion])

  function toggleSound() {
    const el = videoRef.current
    if (!el || reduceMotion) return
    const next = !muted
    setMuted(next)
    el.muted = next
    void el.play().catch(() => {})
  }

  return (
    <div
      className={cn(
        "pointer-events-none select-none flex justify-center",
        heroMotion && "motion-safe:animate-hero-mascot-float",
        className,
      )}
    >
      <div
        className={cn(
          "relative rounded-[2rem] border border-primary/20 bg-primary/5 backdrop-blur-md shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.18)] px-3 pt-3 pb-2 sm:px-4 sm:pt-4 sm:pb-3",
          heroMotion && "motion-safe:animate-hero-mascot-sway",
        )}
        style={{ transformOrigin: "50% 80%" }}
      >
        <div
          className={cn(
            "absolute -inset-2 -z-10 rounded-[2rem] bg-primary/[0.07] blur-xl",
            heroMotion && "motion-safe:animate-pulse motion-reduce:animate-none",
          )}
          style={heroMotion ? { animationDuration: "8s" } : undefined}
        />

        <div className="relative overflow-hidden rounded-2xl sm:rounded-[1.35rem] bg-muted/20">
          <video
            ref={videoRef}
            key={src}
            className={cn(
              "mx-auto block object-cover object-center",
              VIDEO_SIZE_CLASS[size] ?? VIDEO_SIZE_CLASS.compact,
            )}
            src={src}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={toggleSound}
            disabled={reduceMotion}
            className="pointer-events-auto absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border border-primary/20 bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-40"
            aria-label={muted ? "Unmute mascot video" : "Mute mascot video"}
            title={reduceMotion ? "Animation paused — sound unavailable" : muted ? "Turn sound on" : "Mute"}
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" aria-hidden /> : <Volume2 className="h-3.5 w-3.5" aria-hidden />}
          </button>
        </div>
      </div>
    </div>
  )
}
