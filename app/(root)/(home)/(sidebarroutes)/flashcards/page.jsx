"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  RotateCcw,
  Shuffle,
  Sparkles,
  Volume2,
  XCircle,
} from "lucide-react";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useSavedWords } from "@/hooks/useSavedWords";

export default function FlashcardsPage() {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
// ... existing state ...
  const { savedWords } = useSavedWords();

  // ... existing functions ...

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Layers className="h-4 w-4" />
              Flashcards
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Learn with Flashcards
            </h1>
            <p className="text-muted-foreground">
              Click or press Space to flip • Use arrow keys to navigate
            </p>
          </div>

          {/* Card Source Toggle */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            <Button
              variant={useSavedCards ? 'outline' : 'default'}
              onClick={switchToDefault}
              className="rounded-full"
            >
              Default Cards ({DEFAULT_CARDS.length})
            </Button>
            <Button
              variant={useSavedCards ? 'default' : 'outline'}
              onClick={switchToSavedWords}
              disabled={savedWords.length === 0}
              className="rounded-full"
            >
              My Saved Words ({savedWords.length})
            </Button>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-muted-foreground">
                Card {currentIndex + 1} of {cards.length}
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" /> {known.length} Known
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  <Brain className="h-4 w-4" /> {learning.length} Learning
                </span>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div 
            className="perspective-1000 cursor-pointer mb-8"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div 
              className={`relative w-full h-[400px] transition-transform duration-500 transform-style-preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front */}
              <div 
                className="absolute inset-0 backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="w-full h-full rounded-3xl border bg-card shadow-lg flex flex-col items-center justify-center p-8">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Word</p>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-5xl font-bold text-foreground">
                      {currentCard.word}
                    </h2>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(currentCard.word);
                      }}
                      className="w-12 h-12 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                    >
                      <Volume2 className="h-6 w-6 text-muted-foreground" />
                    </button>
                  </div>
                  {currentCard.pronunciation && (
                    <p className="text-lg text-muted-foreground">{currentCard.pronunciation}</p>
                  )}
                  <p className="mt-8 text-sm text-muted-foreground">Click to reveal meaning</p>
                </div>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 backface-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="w-full h-full rounded-3xl border bg-gradient-to-br from-primary/5 to-card shadow-lg flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-sm text-primary uppercase tracking-wider mb-4">Meaning</p>
                  <p className="text-2xl font-semibold text-foreground mb-6">
                    {currentCard.meaning}
                  </p>
                  {currentCard.example && (
                    <div className="p-4 rounded-xl bg-muted/50 max-w-md">
                      <p className="text-sm text-muted-foreground italic">
                        &quot;{currentCard.example}&quot;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="rounded-full gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={markAsLearning}
                className="rounded-full gap-2 border-amber-500/50 text-amber-600 hover:bg-amber-500/10"
              >
                <XCircle className="h-4 w-4" />
                Still Learning
              </Button>
              <Button
                onClick={markAsKnown}
                className="rounded-full gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Know It
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={goToNext}
              disabled={currentIndex === cards.length - 1}
              className="rounded-full gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={shuffleCards} className="rounded-full gap-2">
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
            <Button variant="outline" onClick={resetProgress} className="rounded-full gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Link href="/quiz">
              <Button variant="outline" className="rounded-full gap-2">
                <Sparkles className="h-4 w-4" />
                Take Quiz
              </Button>
            </Link>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="mt-10 p-4 rounded-xl border bg-muted/30 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Keyboard shortcuts:</span>{' '}
              <kbd className="px-2 py-0.5 rounded bg-muted font-mono text-xs">Space</kbd> to flip •{' '}
              <kbd className="px-2 py-0.5 rounded bg-muted font-mono text-xs">←</kbd>{' '}
              <kbd className="px-2 py-0.5 rounded bg-muted font-mono text-xs">→</kbd> to navigate
            </p>
          </div>
        </div>
      </section>
    </div>
    </ProtectedRoute>
  );
}
