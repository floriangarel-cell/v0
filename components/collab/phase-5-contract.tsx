"use client"

import { useState, useEffect } from "react"
import { useCollab } from "@/lib/collab-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  FileSignature,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react"

function ContractLoading({ onDone }: { onDone: () => void }) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."))
    }, 500)
    const timeout = setTimeout(onDone, 3000)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onDone])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">CollabWithMe genere votre contrat{dots}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Analyse des accords et generation automatique par IA
        </p>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function ContractPreview() {
  const { state, acceptContract, rejectContract } = useCollab()
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const subtotalHT = state.quoteLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)
  const tva = subtotalHT * 0.2
  const totalTTC = subtotalHT + tva
  const commission = subtotalHT * 0.05

  return (
    <div className="mx-auto max-w-3xl">
      {/* Acceptance indicators */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Lea Moreau :</span>
          {state.creatorAcceptedContract ? (
            <Badge className="bg-emerald-100 text-emerald-700 gap-1">
              <CheckCircle2 className="h-3 w-3" /> Accepte
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" /> En attente
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Maison Eclat :</span>
          {state.brandAcceptedContract ? (
            <Badge className="bg-emerald-100 text-emerald-700 gap-1">
              <CheckCircle2 className="h-3 w-3" /> Accepte
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" /> En attente
            </Badge>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="p-6 lg:p-8">
              {/* Contract header */}
              <div className="text-center mb-8">
                <Badge className="bg-primary text-primary-foreground mb-3">CollabWithMe</Badge>
                <h1 className="text-xl font-bold text-foreground">CONTRAT DE COLLABORATION COMMERCIALE</h1>
                <p className="text-sm text-muted-foreground mt-1">Genere automatiquement par CollabWithMe</p>
              </div>

              <Separator className="my-6" />

              {/* Parties */}
              <h2 className="text-base font-bold text-foreground mb-3">IDENTIFICATION DES PARTIES</h2>
              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <div className="rounded-lg bg-muted/50 p-3 text-sm">
                  <p className="font-semibold">Le Donneur d{"'"}ordre</p>
                  <p>Maison Eclat</p>
                  <p className="text-muted-foreground">SIREN : 912 345 678</p>
                  <p className="text-muted-foreground">12 rue de la Paix, 75002 Paris</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-sm">
                  <p className="font-semibold">Le Createur</p>
                  <p>Lea Moreau</p>
                  <p className="text-muted-foreground">Auto-entrepreneur</p>
                  <p className="text-muted-foreground">SIREN : 823 456 789</p>
                </div>
              </div>

              {/* Articles */}
              <div className="flex flex-col gap-5 text-sm">
                <div>
                  <h3 className="font-bold text-foreground">Article 1 — Objet</h3>
                  <p className="text-muted-foreground mt-1">
                    Le present contrat a pour objet de definir les conditions de la collaboration entre Maison Eclat et Lea Moreau dans le cadre de la campagne "Lancement serum Eclat Radieux". Le Createur s{"'"}engage a produire et publier les contenus definis a l{"'"}Article 2 sur ses reseaux sociaux.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 2 — Livrables</h3>
                  <div className="mt-2 rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="p-2 text-left font-medium">Reseau</th>
                          <th className="p-2 text-left font-medium">Format</th>
                          <th className="p-2 text-center font-medium">Qte</th>
                          <th className="p-2 text-right font-medium">Tarif HT</th>
                          <th className="p-2 text-left font-medium">Date max</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.quoteLines.map((line) => (
                          <tr key={line.id} className="border-t border-border">
                            <td className="p-2">{line.network}</td>
                            <td className="p-2">{line.format}</td>
                            <td className="p-2 text-center">{line.quantity}</td>
                            <td className="p-2 text-right">{line.unitPrice} EUR</td>
                            <td className="p-2">{line.deadline}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 3 — Remuneration</h3>
                  <div className="mt-2 rounded-lg bg-muted/50 p-3">
                    <div className="flex justify-between"><span>Sous-total HT</span><span className="font-medium">{subtotalHT.toFixed(2)} EUR</span></div>
                    <div className="flex justify-between mt-1"><span>TVA (20%)</span><span>{tva.toFixed(2)} EUR</span></div>
                    <div className="flex justify-between mt-1 font-bold"><span>Total TTC</span><span>{totalTTC.toFixed(2)} EUR</span></div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-xs text-muted-foreground"><span>Commission CollabWithMe (5% HT) — facturee a la marque en sus</span><span>{commission.toFixed(2)} EUR</span></div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-xs font-medium"><span>Total a payer par la marque</span><span>{(totalTTC + commission).toFixed(2)} EUR</span></div>
                    <div className="flex justify-between text-xs font-medium text-emerald-700"><span>Montant verse au createur</span><span>{totalTTC.toFixed(2)} EUR (integralite du TTC)</span></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 4 — Modalites de paiement</h3>
                  <p className="text-muted-foreground mt-1">Le paiement sera effectue via le systeme d{"'"}escrow de CollabWithMe (Stripe Connect). Les fonds seront places en sequestre a la signature du contrat et liberes apres validation de l{"'"}ensemble des livrables.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 5 — Cession de droits</h3>
                  <p className="text-muted-foreground mt-1">Le Createur cede a Maison Eclat les droits d{"'"}utilisation des contenus produits pour une duree de 6 mois a compter de la date de publication, sur le territoire France. Cette cession inclut le droit de reproduction et de diffusion sur les canaux propres de la marque.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 6 — Obligations de transparence</h3>
                  <p className="text-muted-foreground mt-1">Conformement a la Loi n2023-451, le Createur s{"'"}engage a mentionner le caractere sponsorise de chaque contenu publie, notamment par l{"'"}utilisation du hashtag #Sponsorise ou de tout autre moyen de signalisation prevu par la reglementation en vigueur.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 7 — Delais et revisions</h3>
                  <p className="text-muted-foreground mt-1">La marque dispose d{"'"}un delai de 72 heures pour valider chaque livrable soumis. En l{"'"}absence de reponse dans ce delai, le livrable est repute valide. Le nombre maximum de demandes de revision est fixe a 2 par livrable.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 8 — Confidentialite</h3>
                  <p className="text-muted-foreground mt-1">Les parties s{"'"}engagent a ne pas divulguer les termes financiers du present contrat a des tiers, sauf obligation legale ou accord mutuel.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 9 — Resiliation et indemnites</h3>
                  <p className="text-muted-foreground mt-1">En cas de resiliation unilaterale apres signature, la partie a l{"'"}initiative de la rupture devra verser une indemnite correspondant a 30% du montant total HT du contrat. Les livrables deja valides et publies resteront en ligne selon les termes de la cession de droits.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 10 — Litiges et arbitrage</h3>
                  <p className="text-muted-foreground mt-1">En cas de litige, les parties s{"'"}engagent a recourir en priorite au systeme de mediation de CollabWithMe. A defaut d{"'"}accord amiable, les tribunaux competents de Paris seront seuls competents.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">Article 11 — Loi applicable</h3>
                  <p className="text-muted-foreground mt-1">Le present contrat est soumis au droit francais.</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs text-amber-700">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                  <p>
                    Ce contrat est genere automatiquement par CollabWithMe a titre indicatif. Les parties sont responsables de s{"'"}assurer qu{"'"}il correspond a leur accord. CollabWithMe ne fournit pas de conseil juridique.
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="mt-4 flex justify-center gap-3">
        {((state.viewMode === "brand" && !state.brandAcceptedContract) ||
          (state.viewMode === "creator" && !state.creatorAcceptedContract)) && (
          <>
            <Button onClick={() => acceptContract(state.viewMode)} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <CheckCircle2 className="h-4 w-4" />
              Accepter le contrat
            </Button>
            <Button variant="destructive" onClick={() => setShowRejectDialog(true)} className="gap-2">
              <XCircle className="h-4 w-4" />
              Rejeter le contrat
            </Button>
          </>
        )}
        {state.viewMode === "brand" && state.brandAcceptedContract && (
          <Badge className="bg-emerald-100 text-emerald-700 text-sm py-1.5 px-4">Vous avez accepte le contrat</Badge>
        )}
        {state.viewMode === "creator" && state.creatorAcceptedContract && (
          <Badge className="bg-emerald-100 text-emerald-700 text-sm py-1.5 px-4">Vous avez accepte le contrat</Badge>
        )}
      </div>

      {/* Reject dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter le contrat</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Expliquez les modifications souhaitees. Vous serez redirige vers la negociation.
          </p>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Modifications souhaitees..."
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Annuler</Button>
            <Button
              variant="destructive"
              disabled={!rejectReason.trim()}
              onClick={() => {
                rejectContract()
                setShowRejectDialog(false)
              }}
            >
              Confirmer le rejet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function Phase5Contract() {
  const { state } = useCollab()
  const [loading, setLoading] = useState(!state.contractGenerated)

  if (loading && !state.contractGenerated) {
    return <ContractLoading onDone={() => setLoading(false)} />
  }

  return <ContractPreview />
}
