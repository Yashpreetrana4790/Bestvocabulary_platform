import React from 'react';
import { Sparkles, Check } from 'lucide-react';

const FEATURES_MASCOT_GIF = '/maskot/maskot.gif';

const highlights = [
  'Rich definitions and examples',
  'AI-powered meaning search',
  'Word networks and connections',
];

const Features = () => {
  return (
    <section className="py-12 sm:py-24 md:py-28 px-3 sm:px-4 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-[380px] h-[380px] rounded-full opacity-35 blur-[100px] -translate-y-1/2 bg-primary/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full min-w-0">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Copy — same rhythm as NewLight / NoMatter */}
          <div className="text-center lg:text-left min-w-0 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-4 sm:mb-6">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              Features
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-6 leading-tight">
              Built for word lovers
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Everything you need to discover, learn, and remember vocabulary — crisp definitions, the right word for
              the thought you have in mind, and tools that fit how you actually browse.
            </p>
            <ul className="space-y-3 sm:space-y-4 inline-block text-left mx-auto lg:mx-0">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground text-sm sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Mascot — simple frame like other sections’ imagery */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end w-full min-w-0">
            <div className="relative w-full max-w-[min(100%,380px)] sm:max-w-md">
              <div className="absolute inset-2 rounded-3xl bg-primary/10 blur-2xl opacity-70 dark:opacity-40" aria-hidden />
              <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-card/80 backdrop-blur-sm p-3 sm:p-4 shadow-sm">
                <img
                  src={FEATURES_MASCOT_GIF}
                  alt=""
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[min(52vh,420px)] sm:max-h-[min(56vh,480px)] object-contain rounded-xl sm:rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
