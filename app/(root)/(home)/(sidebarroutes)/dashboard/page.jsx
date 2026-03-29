"use client"

import React from "react"
import Link from "next/link"
import { Brain, Sparkles, Bookmark, Layers, ArrowRight, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useSavedWords } from "@/hooks/useSavedWords"
import UserDashboardLayout from "@/components/UserDashboard/UserDashboardLayout"
import WorkspacePageHeader from "@/components/UserDashboard/WorkspacePageHeader"
import WorkspaceQuickLinks from "@/components/UserDashboard/WorkspaceQuickLinks"
import WordCard from "@/components/Cards/WordCard"
import ProtectedRoute from "@/components/Auth/ProtectedRoute"
import ProgressHeader from "@/components/UserDashboard/ProgressHeader"
import LearningActivity from "@/components/UserDashboard/LearningActivity"

export default function DashboardPage() {
  const { user } = useAuth()
  const { savedWords, isLoading: wordsLoading } = useSavedWords()
  const bookmarkedPostsCount = 0

  const preview = (savedWords || []).slice(0, 4)
  const firstName =
    user?.fullName?.trim()?.split(/\s+/)[0] ||
    (user?.email ? user.email.split("@")[0] : null) ||
    null

  return (
    <ProtectedRoute>
      <UserDashboardLayout activeKey="dashboard">
        <div className="max-w-6xl mx-auto w-full">
          <WorkspacePageHeader
            kicker="Workspace"
            title={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
            description="Flashcards and quizzes use your saved list. Add words from the dictionary anytime."
          />

          <div className="flex flex-col gap-10 sm:gap-12 mb-12">
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/45 backdrop-blur-md p-6 sm:p-10 shadow-sm">
              <div className="absolute top-0 right-0 p-12 opacity-[0.04] pointer-events-none">
                <Sparkles className="w-32 h-32 text-primary" aria-hidden />
              </div>
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <ProgressHeader savedWordCount={savedWords?.length || 0} />

                <div className="max-w-2xl space-y-3 mt-2">
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-balance">
                    Keep practicing
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Short, regular sessions stick better than rare cramming. Jump into flashcards or a quiz when you
                    have a few minutes.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/flashcards">
                    <Button size="lg" className="rounded-full gap-2 h-12 px-8 font-medium shadow-md shadow-primary/10">
                      <Layers className="h-4 w-4" />
                      Open flashcards
                    </Button>
                  </Link>
                  <Link href="/quiz">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full gap-2 h-12 px-8 font-medium border-border/80 bg-background/60"
                    >
                      <Brain className="h-4 w-4 text-primary" />
                      Take a quiz
                      <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <WorkspaceQuickLinks />

            <div>
              <LearningActivity savedWords={savedWords} />
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground mb-1">Shortcuts</h2>
              <p className="text-sm text-muted-foreground mb-5">Open tools and your library</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Link
                  href="/bookmarks"
                  className="group rounded-2xl border border-border/80 bg-card/40 p-5 transition-colors hover:bg-card/70 hover:border-primary/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <BookmarkCheck className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                      Collection
                    </span>
                  </div>
                  <p className="text-3xl font-semibold tabular-nums text-foreground">{savedWords?.length || 0}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Words saved</p>
                  <p className="text-sm font-medium text-primary mt-3 inline-flex items-center gap-1">
                    View library <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                  </p>
                </Link>

                <Link
                  href="/flashcards"
                  className="group rounded-2xl border border-border/80 bg-card/40 p-5 transition-colors hover:bg-card/70 hover:border-primary/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                      <Layers className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                      Flashcards
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Study deck</p>
                  <p className="text-sm text-muted-foreground mt-1">From your saved words</p>
                  <p className="text-sm font-medium text-primary mt-3 inline-flex items-center gap-1">
                    Open <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                  </p>
                </Link>

                <Link
                  href="/quiz"
                  className="group rounded-2xl border border-border/80 bg-card/40 p-5 transition-colors hover:bg-card/70 hover:border-primary/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Brain className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Quiz</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Check recall</p>
                  <p className="text-sm text-muted-foreground mt-1">Multiple choice on saved words</p>
                  <p className="text-sm font-medium text-primary mt-3 inline-flex items-center gap-1">
                    Start <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                  </p>
                </Link>

                <Link
                  href="/bookmarks"
                  className="group rounded-2xl border border-border/80 bg-card/40 p-5 transition-colors hover:bg-card/70 hover:border-primary/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                      <Bookmark className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                      Read later
                    </span>
                  </div>
                  <p className="text-3xl font-semibold tabular-nums text-foreground">{bookmarkedPostsCount}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Saved posts</p>
                  <p className="text-sm font-medium text-primary mt-3 inline-flex items-center gap-1">
                    Bookmarks <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Recent saves</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Latest words in your library</p>
            </div>
            <Link href="/bookmarks">
              <Button variant="ghost" className="rounded-full gap-2 font-medium text-muted-foreground hover:text-foreground">
                View all saved
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {wordsLoading ? (
            <div className="rounded-2xl border border-border/60 bg-card/50 p-8 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : preview.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {preview.map((item) => (
                <WordCard key={item.wordId ?? item.word} wordsdata={item} />
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-10 sm:p-14 text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-md mx-auto">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Your list is empty</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Save words from dictionary pages — they show up here and power flashcards and quizzes.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link href="/dictionary">
                    <Button className="rounded-full px-6 gap-2 font-medium">
                      Browse dictionary
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/random">
                    <Button variant="outline" className="rounded-full px-6 font-medium">
                      Random word
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </UserDashboardLayout>
    </ProtectedRoute>
  )
}
