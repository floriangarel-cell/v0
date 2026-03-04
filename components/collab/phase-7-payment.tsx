"use client"

import { useState } from "react"
import { useCollab } from "@/lib/collab-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react"

function BrandPaymentView() {
  const { state, completePayment } = useCollab()
  const [processing, setProcessing] = useState(false)

  const subtotalHT = state.quoteLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)
  const tva = subtotalHT * 0.2
  const totalTTC = subtotalHT + tva
  const commission = subtotalHT * 0.05
  const totalToPay = totalTTC + commission

  if (state.paymentCompleted) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Paiement confirme</h2>
            <p className="text-sm text-muted-foreground">
              Fonds places en escrow ({totalTTC.toFixed(2)} EUR TTC). La production peut commencer !
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Paiement et mise en escrow</h2>
          </div>

          {/* Recap */}
          <div className="rounded-lg bg-muted/50 p-4 mb-4">
            <h3 className="text-sm font-semibold mb-2">Recapitulatif</h3>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant du contrat TTC</span>
                <span>{totalTTC.toFixed(2)} EUR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Commission CollabWithMe (5% HT)</span>
                <span>{commission.toFixed(2)} EUR</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total a payer</span>
                <span>{totalToPay.toFixed(2)} EUR</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-4 rounded-lg bg-primary/5 px-3 py-2 text-xs text-primary">
            <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>Escrow via Stripe Connect — Les fonds seront places en sequestre et verses au createur apres validation des livrables.</span>
          </div>

          {/* Stripe form mock */}
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Paiement securise par Stripe</span>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs">Numero de carte</Label>
                <Input defaultValue="4242 4242 4242 4242" className="mt-1 font-mono text-sm" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Expiration</Label>
                  <Input defaultValue="12/28" className="mt-1 font-mono text-sm" readOnly />
                </div>
                <div>
                  <Label className="text-xs">CVC</Label>
                  <Input defaultValue="123" className="mt-1 font-mono text-sm" readOnly />
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-4 gap-2"
            onClick={() => {
              setProcessing(true)
              setTimeout(() => {
                completePayment()
                setProcessing(false)
              }, 1500)
            }}
            disabled={processing}
          >
            {processing ? (
              <>Traitement en cours...</>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Proceder au paiement — {totalToPay.toFixed(2)} EUR
              </>
            )}
          </Button>

          <p className="mt-3 text-xs text-muted-foreground text-center">
            Relance automatique sous 5 jours. Annulation sous 10 jours sans paiement.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function CreatorPaymentView() {
  const { state } = useCollab()

  const subtotalHT = state.quoteLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)
  const tva = subtotalHT * 0.2
  const totalTTC = subtotalHT + tva

  if (state.paymentCompleted) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Fonds en escrow</h2>
            <p className="text-sm text-muted-foreground">
              Maison Eclat a place les fonds en escrow ({totalTTC.toFixed(2)} EUR TTC). Vous pouvez commencer la production !
            </p>
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span>Completez votre verification KYC pour pouvoir recevoir les fonds.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg text-center">
      <Card>
        <CardContent className="p-8">
          <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold text-foreground">En attente du paiement</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Maison Eclat doit effectuer le paiement pour que la production puisse commencer.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function Phase7Payment() {
  const { state } = useCollab()
  return state.viewMode === "brand" ? <BrandPaymentView /> : <CreatorPaymentView />
}
