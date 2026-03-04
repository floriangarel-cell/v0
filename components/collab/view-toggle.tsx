"use client"

import { useCollab } from "@/lib/collab-context"
import { Building2, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function ViewToggle() {
  const { state, setViewMode } = useCollab()

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      <button
        onClick={() => setViewMode("brand")}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
          state.viewMode === "brand"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Building2 className="h-4 w-4" />
        <span className="hidden sm:inline">Maison Eclat</span>
        <span className="sm:hidden">Marque</span>
      </button>
      <button
        onClick={() => setViewMode("creator")}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
          state.viewMode === "creator"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Lea Moreau</span>
        <span className="sm:hidden">Createur</span>
      </button>
    </div>
  )
}
