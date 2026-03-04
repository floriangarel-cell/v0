"use client"

import { useCollab, getStatusBadge } from "@/lib/collab-context"
import { cn } from "@/lib/utils"

export function StatusBadge() {
  const { state } = useCollab()
  const { label, color } = getStatusBadge(state.currentPhase, state)

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        color === "blue" && "bg-primary/10 text-primary",
        color === "orange" && "bg-amber-100 text-amber-700",
        color === "green" && "bg-emerald-100 text-emerald-700",
        color === "red" && "bg-destructive/10 text-destructive"
      )}
    >
      {label}
    </span>
  )
}
