'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const famousWords = [
  { word: 'Serendipity', meaning: 'Finding something good without looking for it', difficulty: 'M' },
  { word: 'Ephemeral', meaning: 'Lasting for a very short time', difficulty: 'H' },
  { word: 'Eloquent', meaning: 'Fluent and persuasive in speaking', difficulty: 'M' },
  { word: 'Resilience', meaning: 'Ability to recover from difficulties', difficulty: 'M' },
  { word: 'Ubiquitous', meaning: 'Present everywhere', difficulty: 'H' },
  { word: 'Mellifluous', meaning: 'Sweet sounding', difficulty: 'H' },
  { word: 'Ethereal', meaning: 'Extremely delicate and light', difficulty: 'H' },
  { word: 'Luminous', meaning: 'Full of light; bright', difficulty: 'M' },
  { word: 'Wanderlust', meaning: 'Strong desire to travel', difficulty: 'B' },
  { word: 'Petrichor', meaning: 'Smell of earth after rain', difficulty: 'H' },
  { word: 'Euphoria', meaning: 'Intense happiness', difficulty: 'M' },
  { word: 'Cascade', meaning: 'A series of waterfalls', difficulty: 'B' },
  { word: 'Ineffable', meaning: 'Too great for words', difficulty: 'H' },
  { word: 'Halcyon', meaning: 'Idyllically happy period', difficulty: 'H' },
  { word: 'Epiphany', meaning: 'Sudden realization', difficulty: 'M' },
  { word: 'Solitude', meaning: 'State of being alone', difficulty: 'B' },
];

const difficultyLabels = {
  B: 'Easy',
  M: 'Medium', 
  H: 'Hard',
};

const ScrollingWords = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollHeight / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollTop = scrollPosition;
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    const handleMouseEnter = () => cancelAnimationFrame(animationRef.current);
    const handleMouseLeave = () => {
      animationRef.current = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const duplicatedWords = [...famousWords, ...famousWords];

  return (
    <div className="relative h-[520px] overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm">
      {/* Fades */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none rounded-t-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none rounded-b-2xl" />

      <div ref={scrollRef} className="h-full overflow-hidden px-2">
        <div className="space-y-2 py-6">
          {duplicatedWords.map((item, index) => (
            <Link
              key={`${item.word}-${index}`}
              href={`/word/${item.word.toLowerCase()}`}
              className="group flex items-center justify-between gap-4 p-4 rounded-xl hover:bg-muted/80 transition-all duration-200"
            >
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {item.word}
                </h4>
                <p className="text-sm text-muted-foreground truncate mt-0.5">{item.meaning}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {difficultyLabels[item.difficulty]}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingWords;
