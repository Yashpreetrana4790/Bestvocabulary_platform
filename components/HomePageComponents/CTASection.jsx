import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountUp from '@/components/CountUp';

const CTASection = () => {
  return (
    <section className="py-12 sm:py-24 md:py-28 px-3 sm:px-4 relative overflow-hidden bg-muted/30">
      {/* Background - theme-matching gradient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[400px] rounded-full opacity-40 blur-[120px] -translate-x-1/2 -translate-y-1/2 bg-primary/15" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full min-w-0">
        <div className="text-center p-4 sm:p-6 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl border bg-card/80 backdrop-blur-sm shadow-lg shadow-primary/5">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-4 sm:mb-6">
            <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Get Started
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--muted-foreground)))',
            }}
          >
            Ready to expand your vocabulary?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto">
            Your next favorite word is waiting. Start your journey to becoming a word master today—free to use, no sign-up required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link href="/search" className="w-full min-w-0 sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-5 sm:px-8 h-11 sm:h-12 text-sm sm:text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Try AI Search
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/dictionary" className="w-full min-w-0 sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-5 sm:px-8 h-11 sm:h-12 text-sm sm:text-base font-medium hover:bg-primary/5 transition-all">
                Browse Dictionary
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {[
              { value: '10K+', label: 'Words' },
              { value: '50K+', label: 'Definitions' },
              { value: 'Free', label: 'Forever' },
            ].map((stat, i) => (
              <div key={i} className="min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                  <CountUp value={stat.value} className="inline-block" />
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
