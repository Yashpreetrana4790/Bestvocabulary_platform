"use client"

import React from "react"
import { User } from "lucide-react"
import ProtectedRoute from "@/components/Auth/ProtectedRoute"
import UserDashboardLayout from "@/components/UserDashboard/UserDashboardLayout"
import WorkspacePageHeader from "@/components/UserDashboard/WorkspacePageHeader"
import ProfileLevelLadder from "@/components/UserDashboard/ProfileLevelLadder"
import { useAuth } from "@/context/AuthContext"
import { useSavedWords } from "@/hooks/useSavedWords"
import { getPlayerLevel, emblemSrc } from "@/lib/levelEmblems"

export default function ProfilePage() {
  const { user } = useAuth()
  const { savedWords } = useSavedWords()
  const count = savedWords?.length || 0

  const displayName =
    user?.fullName?.trim() ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "Learner"

  const { levelName, level, totalXp, currentTier } = getPlayerLevel(count)

  return (
    <ProtectedRoute>
      <UserDashboardLayout activeKey="profile">
        <div className="max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
          <WorkspacePageHeader
            kicker="Account"
            title="Profile"
            description="Your rank, emblem unlocks, and progress at a glance."
          />

          <div className="rounded-2xl border border-border/80 bg-card/50 p-5 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl border border-primary/20 bg-primary/10 flex items-center justify-center overflow-hidden">
              <img
                src={emblemSrc(currentTier.emblem)}
                alt=""
                className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] object-contain"
                width={72}
                height={72}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4 shrink-0" aria-hidden />
                <span className="text-xs font-medium uppercase tracking-wide">Active emblem</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight truncate">
                {displayName}
              </h2>
              {user?.email ? (
                <p className="text-sm text-muted-foreground break-all">{user.email}</p>
              ) : null}
              <p className="text-sm text-foreground pt-2">
                <span className="font-medium text-primary">{levelName}</span>
                <span className="text-muted-foreground"> · Level {level}</span>
                <span className="text-muted-foreground tabular-nums"> · {totalXp.toLocaleString()} XP</span>
              </p>
              <p className="text-xs text-muted-foreground pt-1 leading-relaxed">
                Save more words to unlock higher ranks and their emblems below.
              </p>
            </div>
          </div>

          <ProfileLevelLadder savedWordCount={count} />
        </div>
      </UserDashboardLayout>
    </ProtectedRoute>
  )
}
