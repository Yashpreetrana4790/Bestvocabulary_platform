'use client'

import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function Error({ error, reset }) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          {/* Big 500 + label */}
          <div className="text-center mb-6">
            <h1 className="text-[8rem] sm:text-[10rem] font-bold tracking-tighter text-amber-400 dark:text-amber-400 select-none leading-none">
              500
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base uppercase tracking-widest font-medium -mt-2">
              Internal Server Error
            </p>
          </div>

          {/* Illustration: server rack + cord + "off" laptop */}
          <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto mb-10 flex justify-center">
            <svg
              viewBox="0 0 280 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              aria-hidden
            >
              {/* Wall socket */}
              <rect x="20" y="100" width="32" height="40" rx="4" className="fill-muted-foreground/30" />
              <rect x="26" y="106" width="20" height="28" rx="2" className="fill-muted-foreground/50" />
              <rect x="30" y="112" width="6" height="8" rx="1" className="fill-background" />
              <rect x="42" y="112" width="6" height="8" rx="1" className="fill-background" />

              {/* Power cord */}
              <path
                d="M 46 128 Q 80 90 90 100 Q 100 108 120 100 L 140 95"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-muted-foreground"
              />
              {/* Spark at chew point */}
              <g className="text-amber-400">
                <path d="M 88 98 L 92 102 M 96 94 L 92 98 M 92 106 L 96 110 M 84 100 L 88 104" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Dog (simplified: rounded shape biting cord) */}
              <ellipse cx="85" cy="108" rx="18" ry="14" className="fill-amber-400/90" />
              <ellipse cx="92" cy="105" rx="4" ry="3" className="fill-foreground/80" />
              <ellipse cx="78" cy="106" rx="3" ry="2.5" className="fill-foreground/80" />

              {/* Server rack */}
              <rect x="140" y="40" width="100" height="120" rx="6" className="fill-muted" />
              <rect x="148" y="50" width="84" height="12" rx="2" className="fill-muted-foreground/20" />
              {/* Server lights */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i}>
                  <rect x={152 + i * 14} y="54" width="8" height="4" rx="1" className="fill-amber-400/80" />
                </g>
              ))}
              <rect x="148" y="68" width="84" height="12" rx="2" className="fill-muted-foreground/20" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={152 + i * 14} y="72" width="8" height="4" rx="1" className="fill-amber-400/60" />
              ))}
              <rect x="148" y="86" width="84" height="12" rx="2" className="fill-muted-foreground/20" />
              <rect x="148" y="104" width="84" height="12" rx="2" className="fill-muted-foreground/20" />
              <rect x="148" y="122" width="84" height="12" rx="2" className="fill-muted-foreground/20" />

              {/* Laptop on top */}
              <rect x="158" y="18" width="64" height="38" rx="4" className="fill-muted stroke-muted-foreground/50" strokeWidth="2" />
              <rect x="164" y="24" width="52" height="26" rx="2" className="fill-background" />
              {/* X eyes */}
              <text x="182" y="42" className="fill-muted-foreground text-lg font-bold" style={{ fontFamily: 'system-ui' }}>×</text>
              <text x="198" y="42" className="fill-muted-foreground text-lg font-bold" style={{ fontFamily: 'system-ui' }}>×</text>
            </svg>
          </div>

          <p className="text-muted-foreground text-sm text-center max-w-sm mb-8">
            Something went wrong on our end. We&apos;ve been notified and are looking into it.
          </p>

          <Button
            onClick={reset}
            variant="secondary"
            size="lg"
            className="rounded-xl bg-foreground text-background hover:bg-foreground/90 font-medium"
          >
            Try again
          </Button>
        </div>
      </div>
    </>
  )
}
