import React from 'react';
import { Sparkles, BookOpen, Brain, Layers, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Features = () => {
  return (
    <section className="py-28 px-4 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] bg-primary/20" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-30 blur-[80px] bg-primary/15" />
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
        <div className="grid md:grid-cols-3 gap-4">
          {/* AI Search - Large Card */}
          <Link 
            href="/search"
            className="md:col-span-2 group relative p-8 rounded-3xl border bg-gradient-to-br from-primary/5 via-card to-card hover:from-primary/10 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              Try it now
            </div>
            <div className="flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">AI-Powered Search</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Ever had a word on the tip of your tongue? Describe the feeling or situation, and let AI find the perfect word.
              </p>
              <div className="mt-auto flex items-center gap-2 text-primary font-medium">
                <span>Search by meaning</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
          </Link>

          {/* Rich Definitions - Tall Card */}
          <div className="group p-6 rounded-3xl border bg-card hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Rich Definitions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Multiple meanings, real examples, etymology, and usage notes for deeper understanding.
            </p>
          </div>

          {/* Memory Aids */}
          <div className="group p-6 rounded-3xl border bg-card hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5">
              <Brain className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Memory Aids</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Clever mnemonics and visual associations to make vocabulary stick.
            </p>
          </div>

          {/* Word Networks - Wide Card */}
          <div className="md:col-span-2 group p-6 rounded-3xl border bg-card hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Layers className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { value: '10K+', label: 'Words' },
            { value: '50K+', label: 'Definitions' },
            { value: 'Daily', label: 'Updates' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-card/50 border">
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
