'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Shuffle, 
  ArrowRight, 
  Volume2, 
  Bookmark, 
  Share2, 
  RefreshCw,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RandomWordPage() {
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchRandomWord = useCallback(async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASEURL_BACKEND;
      const response = await fetch(`${baseUrl}/api/v1/words/random`, {
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setWord(data?.data || null);
      }
    } catch (error) {
      console.error('Failed to fetch random word:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomWord();
  }, [fetchRandomWord]);

  const handleSpeak = () => {
    if (word?.word && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = async () => {
    if (word?.word) {
      await navigator.clipboard.writeText(word.word);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (word?.word) {
      const shareData = {
        title: `Word: ${word.word}`,
        text: `Learn a new word: ${word.word} - ${word.meanings?.[0]?.subtitle || ''}`,
        url: `${window.location.origin}/word/${word.word.toLowerCase()}`,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('Share cancelled');
        }
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const meaning = word?.meanings?.[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Shuffle className="h-4 w-4" />
              Random Word Generator
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover Something New
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Click the button to reveal a random word and expand your vocabulary one word at a time.
            </p>
          </div>

          {/* Word Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-card/80 backdrop-blur-sm border rounded-3xl p-8 md:p-12 shadow-lg">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Finding a word for you...</p>
                </div>
              ) : word ? (
                <>
                  {/* Word Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                        {word.word}
                      </h2>
                      {word.pronunciation && (
                        <p className="text-lg text-muted-foreground">{word.pronunciation}</p>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSpeak}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="h-5 w-5 text-muted-foreground hover:text-primary" />
                      </button>
                      <button
                        onClick={handleCopy}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
                        title={copied ? "Copied!" : "Copy word"}
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <Copy className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                      <button
                        onClick={handleShare}
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
                        title="Share word"
                      >
                        <Share2 className="h-5 w-5 text-muted-foreground" />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-muted/80 hover:bg-primary/10 flex items-center justify-center transition-colors"
                        title="Bookmark word"
                      >
                        <Bookmark className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {meaning?.category && (
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {meaning.category}
                      </span>
                    )}
                    {meaning?.difficulty && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        meaning.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                        meaning.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        {meaning.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Definition */}
                  {meaning?.subtitle && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Definition</h3>
                      <p className="text-xl text-foreground leading-relaxed">
                        {meaning.subtitle}
                      </p>
                    </div>
                  )}

                  {/* Easy Meaning */}
                  {meaning?.easyMeaning && (
                    <div className="mb-6 p-4 rounded-xl bg-muted/50">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">In Simple Words</h3>
                      <p className="text-foreground">
                        {meaning.easyMeaning}
                      </p>
                    </div>
                  )}

                  {/* Example */}
                  {meaning?.common_usage?.[0]?.example && (
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Example</h3>
                      <p className="text-foreground italic">
                        "{meaning.common_usage[0].example}"
                      </p>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t">
                    <Button
                      onClick={fetchRandomWord}
                      size="lg"
                      className="rounded-full px-8 gap-2 shadow-lg shadow-primary/20"
                    >
                      <Shuffle className="h-4 w-4" />
                      Get Another Word
                    </Button>
                    <Link href={`/word/${word.word.toLowerCase()}`}>
                      <Button variant="outline" size="lg" className="rounded-full px-8 gap-2">
                        View Full Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No word found. Try again!</p>
                  <Button onClick={fetchRandomWord} className="rounded-full gap-2">
                    <Shuffle className="h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              { title: 'Daily Practice', desc: 'Learn one random word each day to steadily grow your vocabulary.' },
              { title: 'Use in Sentences', desc: 'Try using the new word in 3 different sentences today.' },
              { title: 'Share & Discuss', desc: 'Share interesting words with friends to reinforce learning.' },
            ].map((tip, i) => (
              <div key={i} className="p-4 rounded-xl border bg-card/50 text-center">
                <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
