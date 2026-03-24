import React from 'react';
import { Sparkles, BookOpen, Brain, Network, Zap, ArrowRight, BookMarked, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import CountUp from '@/components/CountUp';

const FEATURES_MASCOT_GIF = '/maskot/maskot.gif';

const Features = () => {
  const stats = [
    { value: '10K+', label: 'Words', icon: BookMarked },
    { value: '50K+', label: 'Definitions', icon: BookOpen },
    { value: 'Daily', label: 'Updates', icon: RefreshCw },
  ];

  return (
    <section className="py-12 sm:py-24 md:py-28 px-3 sm:px-4 relative overflow-hidden bg-muted/30">
      {/* Background - same pattern as Hero */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] bg-primary/20" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-30 blur-[80px] bg-primary/15" />
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial fade at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, hsl(var(--background)) 100%)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header — large mascot banner (animated GIF) */}
        <div className="mb-14 sm:mb-20 md:mb-24 rounded-[1.75rem] sm:rounded-3xl border border-primary/15 bg-gradient-to-br from-customBlue/[0.14] via-card/90 to-muted/50 dark:from-customBlue/[0.08] dark:via-card/80 dark:to-background/60 p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_-24px_hsl(var(--primary)/0.2)] overflow-hidden relative">
          {/* Soft blobs — echo hero + mascot palette */}
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-customBlue/25 blur-3xl dark:bg-customBlue/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
            style={{
              backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 128, 128, 0.12) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative grid items-center gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.05fr)] xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.15fr)]">
            <div className="text-center lg:text-left order-2 lg:order-1 min-w-0 max-w-xl mx-auto lg:mx-0 lg:max-w-none">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5">
                <Zap className="h-4 w-4 shrink-0" />
                Features
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-[1.12]">
                Built for word lovers
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                Everything you need to discover, learn, and master new vocabulary — from crisp definitions to the exact word for the moment you have in mind.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-xs sm:text-sm text-muted-foreground">
                <span className="rounded-full border border-border/80 bg-background/60 px-3 py-1.5 backdrop-blur-sm">
                  Rich definitions
                </span>
                <span className="rounded-full border border-border/80 bg-background/60 px-3 py-1.5 backdrop-blur-sm">
                  AI-powered search
                </span>
                <span className="rounded-full border border-border/80 bg-background/60 px-3 py-1.5 backdrop-blur-sm">
                  Word networks
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end w-full min-w-0">
              <div className="relative w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-none lg:w-full">
                <div className="absolute inset-0 -m-3 rounded-[2rem] bg-customBlue/20 blur-2xl dark:bg-customBlue/10 scale-95" aria-hidden />
                <div className="relative rounded-2xl sm:rounded-3xl border border-primary/20 bg-background/70 dark:bg-background/50 backdrop-blur-md shadow-[0_25px_60px_-20px_rgba(25,33,61,0.25)] p-2 sm:p-3 md:p-4 ring-1 ring-customBlue-dark/5">
                  {/* Native img keeps GIF animation reliable (Next/Image optimize often flattens GIFs). */}
                  <img
                    src={FEATURES_MASCOT_GIF}
                    alt=""
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[min(58vh,560px)] lg:max-h-[min(62vh,640px)] object-contain rounded-xl sm:rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>


      {/* Stats Row */}
      {/* <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-1.5 sm:gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-card/50 border hover:bg-card hover:border-primary/20 transition-all duration-300 min-w-0">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-1.5 sm:mb-3">
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                  <CountUp value={stat.value} className="inline-block" />
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div> */}
    </div>
    </section >
  );
};

export default Features;
