"use client"

import { useState, useEffect } from "react"
import { useCollab } from "@/lib/collab-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2,
  Download,
  ArrowRight,
  Loader2,
  Banknote,
  Calendar,
  ExternalLink,
  Star,
  RotateCcw,
} from "lucide-react"

const TIMELINE = [
  { phase: "Prise de contact", date: "02/03/2026", done: true },
  { phase: "Discussion ouverte", date: "02/03/2026", done: true },
  { phase: "Devis envoye", date: "03/03/2026", done: true },
  { phase: "Tarifs acceptes", date: "03/03/2026", done: true },
  { phase: "Termes negocies", date: "04/03/2026", done: true },
  { phase: "Contrat genere", date: "04/03/2026", done: true },
  { phase: "Contrat signe", date: "04/03/2026", done: true },
  { phase: "Paiement escrow", date: "05/03/2026", done: true },
  { phase: "Livrables valides", date: "15/03/2026", done: true },
  { phase: "Fonds liberes", date: "15/03/2026", done: true },
]

export function Phase9Closing() {
  const { state, releaseFunds, resetFlow } = useCollab()
  const [releasing, setReleasing] = useState(false)

  const subtotalHT = state.quoteLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)
  const tva = subtotalHT * 0.2
  const totalTTC = subtotalHT + tva
  const commission = subtotalHT * 0.05
  const creatorPayout = totalTTC
  const brandTotalPaid = totalTTC + commission

  useEffect(() => {
    if (!state.fundsReleased) {
      setReleasing(true)
      const timeout = setTimeout(() => {
        releaseFunds()
        setReleasing(false)
      }, 2500)
      return () => clearTimeout(timeout)
    }
  }, [state.fundsReleased, releaseFunds])

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6">
      {/* Funds release animation */}
      {releasing && !state.fundsReleased && (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <h2 className="text-lg font-bold text-foreground">Fonds en cours de liberation...</h2>
          </CardContent>
        </Card>
      )}

      {state.fundsReleased && (
        <>
          {/* Summary header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Collaboration terminee</h2>
                  <p className="text-sm text-muted-foreground">Maison Eclat x Lea Moreau</p>
                </div>
                <Badge className="ml-auto bg-emerald-100 text-emerald-700">Terminee</Badge>
              </div>

              <Separator className="my-4" />

              {/* Deliverables recap */}
              <h3 className="text-sm font-semibold mb-2">Livrables</h3>
              <div className="flex flex-col gap-2">
                {state.deliverables.map((d) => (
                  <div key={d.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>{d.label} — {d.format}</span>
                    </div>
                    {d.url && (
                      <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" /> Voir
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Financial recap */}
              <h3 className="text-sm font-semibold mb-2">Finances</h3>
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">Fonds liberes</span>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span>Montant verse au createur</span>
                    <span>{creatorPayout.toFixed(2)} EUR TTC (integralite)</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant du contrat TTC</span>
                    <span>{totalTTC.toFixed(2)} EUR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commission CollabWithMe (5% HT) — payee par la marque</span>
                    <span>{commission.toFixed(2)} EUR</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between font-medium">
                    <span>Total paye par Maison Eclat</span>
                    <span>{brandTotalPaid.toFixed(2)} EUR</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Virement en cours — delai estime : 1-2 jours ouvres
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold">Timeline de la collaboration</h3>
              </div>
              <div className="flex flex-col gap-0">
                {TIMELINE.map((item, index) => (
                  <div key={item.phase} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      {index < TIMELINE.length - 1 && (
                        <div className="h-6 w-0.5 bg-emerald-200" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 pb-3">
                      <span className="text-sm font-medium">{item.phase}</span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Downloads & actions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-3">Documents</h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Facture Lea Moreau → Maison Eclat (prestation — {totalTTC.toFixed(2)} EUR TTC)
                </Button>
                <Button variant="outline" className="justify-start gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Facture CollabWithMe → Maison Eclat (commission 5% HT — {commission.toFixed(2)} EUR)
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Rating placeholder */}
              <div className="rounded-lg bg-muted/50 p-4 opacity-60">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Notez cette collaboration</span>
                </div>
                <p className="text-xs text-muted-foreground">Disponible en V2</p>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" onClick={resetFlow} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reinitialiser le prototype
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
