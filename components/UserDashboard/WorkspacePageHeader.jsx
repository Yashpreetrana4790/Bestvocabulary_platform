"use client"

import { cn } from "@/lib/utils"

/**
 * Consistent title block for dashboard routes — readable hierarchy, minimal “marketing” caps.
 */
export default function WorkspacePageHeader({
  kicker,
  title,
  description,
  className,
  children,
  align = "left",
}) {
  return (
    <header
      className={cn(
        "space-y-3",
        align === "center" && "text-center",
        align === "center" && "[&_p]:mx-auto",
        className,
      )}
    >
      {kicker ? (
        <p className="text-sm font-medium text-primary">{kicker}</p>
      ) : null}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "text-base sm:text-[1.05rem] text-muted-foreground leading-relaxed max-w-2xl text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </header>
  )
}
