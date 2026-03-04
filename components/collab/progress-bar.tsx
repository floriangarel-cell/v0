"use client"

import { useCollab, PHASE_LABELS } from "@/lib/collab-context"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function CollabProgressBar() {
  const { state, goToPhase } = useCollab()

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center gap-0 min-w-[700px]">
        {PHASE_LABELS.map((phase, index) => {
          const phaseNum = index + 1
          const isActive = state.currentPhase === phaseNum
          const isCompleted = state.currentPhase > phaseNum
          const isUpcoming = state.currentPhase < phaseNum

          return (
            <div key={phaseNum} className="flex items-center flex-1">
              <button
                onClick={() => {
                  if (isCompleted || isActive) goToPhase(phaseNum)
                }}
                disabled={isUpcoming}
                className={cn(
                  "flex flex-col items-center gap-1 w-full transition-all duration-200",
                  isUpcoming ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-80"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 shrink-0",
                    isCompleted && "bg-primary text-primary-foreground",
                    isActive && "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
                    isUpcoming && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : phaseNum}
                </div>
                <span
                  className={cn(
                    "text-[10px] leading-tight text-center font-medium max-w-[72px]",
                    isCompleted && "text-primary",
                    isActive && "text-foreground font-semibold",
                    isUpcoming && "text-muted-foreground"
                  )}
                >
                  {phase.shortName}
                </span>
              </button>
              {phaseNum < 9 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 min-w-[12px] mx-0.5 transition-colors duration-300",
                    state.currentPhase > phaseNum ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
