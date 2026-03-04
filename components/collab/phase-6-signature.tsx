"use client"

import { useState } from "react"
import { useCollab } from "@/lib/collab-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  FileSignature,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  PartyPopper,
} from "lucide-react"

function YouSignModal({
  open,
  onClose,
  onSign,
  signerName,
}: {
  open: boolean
  onClose: () => void
  onSign: () => void
  signerName: string
}) {
  const [agreed, setAgreed] = useState(false)
  const [otp, setOtp] = useState("482901")

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Signature electronique — YouSign
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Contract miniature */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileSignature className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Contrat de collaboration</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Maison Eclat x Lea Moreau — Campagne serum Eclat Radieux
            </p>
            <div className="mt-2 h-20 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
              Apercu du contrat (10 pages)
            </div>
          </div>

          <Separator />

          {/* Agreement checkbox */}
          <div className="flex items-start gap-2">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(c) => setAgreed(!!c)}
              className="mt-0.5"
            />
            <Label htmlFor="agree" className="text-sm font-normal leading-relaxed">
              Je, <span className="font-semibold">{signerName}</span>, confirme avoir lu et approuve ce contrat.
            </Label>
          </div>

          {/* OTP */}
          <div>
            <Label className="text-sm">Code de verification OTP</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Code envoye par SMS (pre-rempli pour le prototype)
            </p>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            disabled={!agreed || otp.length < 6}
            onClick={onSign}
            className="w-full gap-2"
          >
            <FileSignature className="h-4 w-4" />
            Signer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Phase6Signature() {
  const { state, signContract } = useCollab()
  const [showYouSign, setShowYouSign] = useState(false)

  const bothSigned = state.creatorSigned && state.brandSigned

  if (bothSigned) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <PartyPopper className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Contrat signe !</h2>
            <p className="text-sm text-muted-foreground">
              Le contrat a ete signe par les deux parties. Le document PDF est disponible dans votre espace.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Lea Moreau :</span>
                <Badge className="bg-emerald-100 text-emerald-700 gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Signe
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Maison Eclat :</span>
                <Badge className="bg-emerald-100 text-emerald-700 gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Signe
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="gap-2 mt-2">
              <Download className="h-4 w-4" />
              Telecharger le contrat signe (PDF)
            </Button>
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
            <FileSignature className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Signature electronique</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Contrat accepte par les deux parties — Signature electronique en cours via <span className="font-semibold">YouSign</span>.
          </p>

          {/* Signature status */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <span className="text-sm font-medium">Lea Moreau</span>
              {state.creatorSigned ? (
                <Badge className="bg-emerald-100 text-emerald-700 gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Signe
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" /> En attente de signature
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <span className="text-sm font-medium">Maison Eclat</span>
              {state.brandSigned ? (
                <Badge className="bg-emerald-100 text-emerald-700 gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Signe
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" /> En attente de signature
                </Badge>
              )}
            </div>
          </div>

          {/* Sign button */}
          {((state.viewMode === "brand" && !state.brandSigned) ||
            (state.viewMode === "creator" && !state.creatorSigned)) && (
            <Button onClick={() => setShowYouSign(true)} className="w-full gap-2">
              <FileSignature className="h-4 w-4" />
              Signer le contrat
            </Button>
          )}
          {state.viewMode === "brand" && state.brandSigned && !state.creatorSigned && (
            <p className="text-center text-sm text-muted-foreground">
              Vous avez signe. En attente de la signature de Lea Moreau.
            </p>
          )}
          {state.viewMode === "creator" && state.creatorSigned && !state.brandSigned && (
            <p className="text-center text-sm text-muted-foreground">
              Vous avez signe. En attente de la signature de Maison Eclat.
            </p>
          )}
        </CardContent>
      </Card>

      <YouSignModal
        open={showYouSign}
        onClose={() => setShowYouSign(false)}
        signerName={state.viewMode === "brand" ? "Marie Dupont (Maison Eclat)" : "Lea Moreau"}
        onSign={() => {
          signContract(state.viewMode)
          setShowYouSign(false)
        }}
      />
    </div>
  )
}
