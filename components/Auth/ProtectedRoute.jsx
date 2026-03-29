"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/")
      } else {
        setShouldRender(true)
      }
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !shouldRender) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Authenticating your workspace...
        </p>
      </div>
    )
  }

  return <>{children}</>
}
