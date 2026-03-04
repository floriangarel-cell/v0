"use client"

import { useCollab, PHASE_LABELS } from "@/lib/collab-context"
import { CollabProgressBar } from "@/components/collab/progress-bar"
import { ViewToggle } from "@/components/collab/view-toggle"
import { StatusBadge } from "@/components/collab/status-badge"
import { Phase1Contact } from "@/components/collab/phase-1-contact"
import { Phase2Discussion } from "@/components/collab/phase-2-discussion"
import { Phase3Quote } from "@/components/collab/phase-3-quote"
import { Phase4Terms } from "@/components/collab/phase-4-terms"
import { Phase5Contract } from "@/components/collab/phase-5-contract"
import { Phase6Signature } from "@/components/collab/phase-6-signature"
import { Phase7Payment } from "@/components/collab/phase-7-payment"
import { Phase8Deliverables } from "@/components/collab/phase-8-deliverables"
import { Phase9Closing } from "@/components/collab/phase-9-closing"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

function PhaseRenderer() {
  const { state } = useCollab()

  switch (state.currentPhase) {
    case 1:
      return <Phase1Contact />
    case 2:
      return <Phase2Discussion />
    case 3:
      return <Phase3Quote />
    case 4:
      return <Phase4Terms />
    case 5:
      return <Phase5Contract />
    case 6:
      return <Phase6Signature />
    case 7:
      return <Phase7Payment />
    case 8:
      return <Phase8Deliverables />
    case 9:
      return <Phase9Closing />
    default:
      return null
  }
}

export default function CollabPage() {
  const { state } = useCollab()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-3">
          {/* Top row: logo + toggle + badge */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-lg font-bold text-primary hidden sm:block">
                CollabWithMe
              </Link>
              <Link href="/" className="text-lg font-bold text-primary sm:hidden">
                CWM
              </Link>
              <span className="text-xs text-muted-foreground hidden md:inline">
                Prototype interactif
              </span>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge />
              <ViewToggle />
            </div>
          </div>

          {/* Progress bar */}
          <CollabProgressBar />
        </div>
      </header>

      {/* Phase title */}
      <div className="mx-auto max-w-6xl w-full px-4 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
            {state.currentPhase}
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              {PHASE_LABELS[state.currentPhase - 1]?.name}
            </h1>
            <p className="text-xs text-muted-foreground">
              {state.viewMode === "brand" ? "Vue Maison Eclat (Marque)" : "Vue Lea Moreau (Creatrice)"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl w-full flex-1 px-4 py-4 pb-12">
        <PhaseRenderer />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-4">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>CollabWithMe — Prototype de collaboration</span>
          <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="h-3 w-3" />
            Retour a l{"'"}accueil
          </Link>
        </div>
      </footer>
    </div>
  )
}
