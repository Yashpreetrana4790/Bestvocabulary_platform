'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { X, Check, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SavedWordsQuiz({ words, onClose }) {
  const list = useMemo(() => words?.filter((w) => w?.word) ?? [], [words]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [shuffledList, setShuffledList] = useState([]);

  const initShuffle = useCallback(() => {
    setShuffledList(shuffle(list));
    setQuestionIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore({ correct: 0, total: 0 });
  }, [list]);

  React.useEffect(() => {
    if (list.length > 0 && shuffledList.length === 0) initShuffle();
  }, [list.length, shuffledList.length, initShuffle]);

  const current = shuffledList[questionIndex];
  const total = shuffledList.length;

  const options = useMemo(() => {
    if (!current || list.length < 2) return [current?.word].filter(Boolean);
    const others = list.filter((w) => w.word !== current.word).map((w) => w.word);
    const count = Math.min(4, list.length);
    const pool = shuffle(others).slice(0, count - 1);
    const opts = [current.word, ...pool].slice(0, count);
    return shuffle(opts);
  }, [current, list, questionIndex]);

  const handleAnswer = (word) => {
    if (revealed) return;
    setSelected(word);
    setRevealed(true);
    setScore((s) => ({
      correct: s.correct + (word === current?.word ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const handleNext = () => {
    if (questionIndex >= total - 1) {
      initShuffle();
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  };

  if (list.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No words to quiz. Save some words first.</p>
        <Button variant="outline" className="mt-4" onClick={onClose}>Back to list</Button>
      </div>
    );
  }

  if (list.length < 2) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Add at least 2 saved words to play the quiz.</p>
        <Button variant="outline" className="mt-4" onClick={onClose}>Back to list</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-2">
          <X className="h-4 w-4" />
          Back to list
        </Button>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground tabular-nums">
            Question {questionIndex + 1} / {total}
          </span>
          <span className="font-medium text-primary">
            Score: {score.correct}/{score.total}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-border bg-card p-6 sm:p-8">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Definition</p>
        <p className="text-lg sm:text-xl text-foreground mb-6">
          {current?.meaning || 'No definition.'}
        </p>
        <p className="text-sm text-muted-foreground mb-4">Which word is it?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((word) => {
            const isCorrect = word === current?.word;
            const isChosen = selected === word;
            const showRight = revealed && isCorrect;
            const showWrong = revealed && isChosen && !isCorrect;
            return (
              <button
                key={word}
                type="button"
                onClick={() => handleAnswer(word)}
                disabled={revealed}
                className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition-all ${
                  showRight
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    : showWrong
                    ? 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400'
                    : revealed
                    ? 'border-border bg-muted/30 opacity-70 cursor-default'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <span>{word}</span>
                {showRight && <Check className="h-5 w-5 shrink-0" />}
                {showWrong && <XCircle className="h-5 w-5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {revealed && (
        <div className="flex justify-center">
          <Button onClick={handleNext} className="rounded-xl gap-2">
            {questionIndex >= total - 1 ? 'Play again' : 'Next question'}
          </Button>
        </div>
      )}
    </div>
  );
}
