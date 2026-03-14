import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-28 px-4 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[400px] rounded-full opacity-40 blur-[120px] -translate-x-1/2 -translate-y-1/2 bg-primary/15" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center p-12 md:p-16 rounded-3xl border bg-card/80 backdrop-blur-sm shadow-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Rocket className="h-4 w-4" />
            Get Started
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Ready to expand your vocabulary?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Start your journey to becoming a word master today. Free to use, no sign-up required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/search">
              <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Try AI Search
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/dictionary">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-medium hover:bg-primary/5 transition-all">
                Browse Dictionary
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 pt-10 border-t grid grid-cols-3 gap-8">
            {[
              { value: '10K+', label: 'Words' },
              { value: '50K+', label: 'Definitions' },
              { value: 'Free', label: 'Forever' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
