import React from 'react';
import { Sparkles, BookOpen, Brain, Network, Zap, ArrowRight, BookMarked, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import CountUp from '@/components/CountUp';

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
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Zap className="h-4 w-4" />
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for word lovers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to discover, learn, and master new vocabulary
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
          {/* AI Search - Large Card */}
          <Link
            href="/search"
            className="md:col-span-2 group relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border bg-gradient-to-br from-primary/5 via-card to-card hover:from-primary/10 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium">
              Try it now
            </div>
            <div className="flex flex-col h-full min-w-0">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0">
                <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">AI-Powered Search</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 w-full min-w-0">
                When you look for a word, you’re really looking for a situation—that moment when you think, &quot;What’s the exact word for this?&quot; Describe the action, feeling, or situation; our AI and enriched database of word relations find the word that fits.
              </p>
              <div className="mt-auto flex items-center gap-2 text-primary font-medium">
                <span>Search by meaning</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
          </Link>

          {/* Rich Definitions - Tall Card */}
          <div className="group p-6 rounded-3xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Rich Definitions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Multiple meanings, real examples, etymology, and usage notes for deeper understanding.
            </p>
          </div>

          {/* Memory Aids */}
          <div className="group p-6 rounded-3xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Memory Aids</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Clever mnemonics and visual associations to make vocabulary stick.
            </p>
          </div>

          {/* Word Networks - Wide Card */}
          <div className="md:col-span-2 group p-6 rounded-3xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="flex flex-col sm:items-start gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Network className="h-6 w-6 sm:h-7 sm:w-7 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Word Networks</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Explore synonyms, antonyms, and word families to build meaningful connections and expand your vocabulary naturally.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-1.5 sm:gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default Features;
