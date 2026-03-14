'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Brain, Trophy, Timer, CheckCircle2, XCircle, ArrowRight,
  RotateCcw, Sparkles, Target, Zap, Volume2, Flame, BookOpen, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const QUIZ_WORDS = [
  { word: 'Ephemeral', meaning: 'Lasting for a very short time', options: ['Lasting for a very short time', 'Extremely large', 'Very expensive', 'Highly intelligent'] },
  { word: 'Ubiquitous', meaning: 'Present, appearing, or found everywhere', options: ['Present everywhere', 'Extremely rare', 'Very dangerous', 'Completely silent'] },
  { word: 'Pragmatic', meaning: 'Dealing with things sensibly and realistically', options: ['Dealing sensibly with things', 'Extremely emotional', 'Very dramatic', 'Highly spiritual'] },
  { word: 'Eloquent', meaning: 'Fluent or persuasive in speaking or writing', options: ['Fluent in speaking', 'Unable to speak', 'Very quiet', 'Extremely loud'] },
  { word: 'Serendipity', meaning: 'Finding something good without looking for it', options: ['Finding good things by chance', 'Losing everything', 'Searching desperately', 'Forgetting memories'] },
  { word: 'Melancholy', meaning: 'A deep, pensive sadness', options: ['Deep sadness', 'Extreme happiness', 'Intense anger', 'Complete confusion'] },
  { word: 'Tenacious', meaning: 'Holding firmly to something', options: ['Holding firmly', 'Easily giving up', 'Being careless', 'Acting randomly'] },
  { word: 'Meticulous', meaning: 'Showing great attention to detail', options: ['Great attention to detail', 'Being very careless', 'Acting quickly', 'Being extremely loud'] },
  { word: 'Resilient', meaning: 'Able to recover quickly from difficulties', options: ['Recovering quickly', 'Breaking easily', 'Moving slowly', 'Being very rigid'] },
  { word: 'Ambivalent', meaning: 'Having mixed feelings about something', options: ['Having mixed feelings', 'Being very certain', 'Extremely happy', 'Completely angry'] },
];

export default function QuizPage() {
  const [gameState, setGameState] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizWords, setQuizWords] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = useCallback(() => {
    const shuffledWords = shuffleArray(QUIZ_WORDS).slice(0, 5);
    const wordsWithShuffledOptions = shuffledWords.map(word => ({
      ...word,
      options: shuffleArray(word.options),
    }));
    setQuizWords(wordsWithShuffledOptions);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
    setAnswers([]);
    setStreak(0);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing' || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { handleAnswer(null); return 15; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, showResult, currentQuestion]);

  const handleAnswer = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    const currentWord = quizWords[currentQuestion];
    const isCorrect = answer === currentWord.meaning;
    setAnswers(prev => [...prev, { word: currentWord.word, correct: isCorrect, userAnswer: answer, correctAnswer: currentWord.meaning }]);
    if (isCorrect) { setScore((prev) => prev + 1); setStreak((prev) => prev + 1); } 
    else { setStreak(0); }
    setTimeout(() => {
      if (currentQuestion < quizWords.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
      } else { setGameState('finished'); }
    }, 1500);
  };

  const handleSpeak = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentWord = quizWords[currentQuestion];
  const timerProgress = (timeLeft / 15) * 100;

  return (
    <div className="min-h-screen">
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
          <div className="max-w-xl w-full">
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                <Brain className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Vocabulary Quiz</h1>
              <p className="text-muted-foreground">Test your word knowledge with quick questions</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Target, label: '5', desc: 'Questions', color: 'text-blue-500 bg-blue-500/10' },
                { icon: Timer, label: '15s', desc: 'Per Question', color: 'text-orange-500 bg-orange-500/10' },
                { icon: Trophy, label: 'Score', desc: 'Track Progress', color: 'text-green-500 bg-green-500/10' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border text-center">
                  <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mx-auto mb-2`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xl font-bold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-card border rounded-xl p-5 mb-8">
              <h3 className="font-semibold text-foreground mb-3 text-sm">How it works</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {['A word appears on screen', 'Pick the correct meaning from 4 options', 'Answer before time runs out'].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={startQuiz} size="lg" className="w-full h-12 rounded-xl gap-2">
              <Zap className="h-5 w-5" /> Start Quiz
            </Button>
            <p className="text-center mt-4 text-sm text-muted-foreground">
              Or try <Link href="/flashcards" className="text-primary hover:underline">Flashcards</Link> instead
            </p>
          </div>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && currentWord && (
        <div className="min-h-screen flex flex-col p-4 py-8">
          <div className="max-w-xl w-full mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {quizWords.length}</span>
              <div className="flex items-center gap-2">
                {streak >= 2 && <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-500 flex items-center gap-1"><Flame className="h-3 w-3" />{streak}</span>}
                <span className="font-bold text-foreground">{score} pts</span>
              </div>
            </div>
            <div className="h-1 bg-muted rounded-full mb-8">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / quizWords.length) * 100}%` }} />
            </div>

            {/* Timer */}
            <div className="flex justify-center mb-6">
              <div className={`relative w-16 h-16 ${timeLeft <= 5 ? 'animate-pulse' : ''}`}>
                <svg className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray={176} strokeDashoffset={176 - (176 * timerProgress) / 100} strokeLinecap="round" className={`transition-all duration-1000 ${timeLeft <= 5 ? 'text-red-500' : 'text-primary'}`} />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${timeLeft <= 5 ? 'text-red-500' : ''}`}>{timeLeft}</span>
              </div>
            </div>

            {/* Question */}
            <div className="bg-card border rounded-2xl p-6 mb-6 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">What does this word mean?</p>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{currentWord.word}</h2>
                <button onClick={() => handleSpeak(currentWord.word)} className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentWord.options.map((option, index) => {
                const isCorrect = option === currentWord.meaning;
                const isSelected = selectedAnswer === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-500/10'
                          : isSelected
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-border bg-card opacity-40'
                        : 'border-border bg-card hover:border-primary'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                      showResult && isCorrect ? 'bg-green-500 text-white' : showResult && isSelected ? 'bg-red-500 text-white' : 'bg-muted'
                    }`}>{String.fromCharCode(65 + index)}</span>
                    <span className="font-medium flex-1">{option}</span>
                    {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Finished Screen */}
      {gameState === 'finished' && (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="text-5xl mb-4">{score === quizWords.length ? '🏆' : score >= 3 ? '🌟' : '📚'}</div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {score === quizWords.length ? 'Perfect!' : score >= 3 ? 'Great Job!' : 'Keep Learning!'}
            </h1>
            <div className="text-5xl font-bold text-primary mb-1">{score}/{quizWords.length}</div>
            <p className="text-muted-foreground mb-6">correct answers</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-card border text-center">
                <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
                <p className="text-lg font-bold">{Math.round((score / quizWords.length) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
              <div className="p-3 rounded-xl bg-card border text-center">
                <Flame className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                <p className="text-lg font-bold">{Math.max(...answers.reduce((acc, a, i) => { acc.push(a.correct ? (acc[i-1] || 0) + 1 : 0); return acc; }, []), 0)}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-sm mb-3">Results</h3>
              <div className="space-y-2">
                {answers.map((a, i) => (
                  <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${a.correct ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    {a.correct ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                    <span className="font-medium text-sm">{a.word}</span>
                    {!a.correct && <span className="text-xs text-muted-foreground ml-auto truncate max-w-[120px]">{a.correctAnswer}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={startQuiz} className="w-full h-11 rounded-xl gap-2"><RotateCcw className="h-4 w-4" />Play Again</Button>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/flashcards"><Button variant="outline" className="w-full h-10 rounded-xl gap-1 text-sm"><Sparkles className="h-4 w-4" />Flashcards</Button></Link>
                <Link href="/dictionary"><Button variant="outline" className="w-full h-10 rounded-xl gap-1 text-sm"><BookOpen className="h-4 w-4" />Dictionary</Button></Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
