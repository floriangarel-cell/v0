"use client"

import { useState } from "react"
import { useCollab, type DeliverableStatus } from "@/lib/collab-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  CheckCircle2,
  Clock,
  Eye,
  RotateCcw,
  Send,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
  Film,
} from "lucide-react"

function getStatusBadge(status: DeliverableStatus, revisionCount: number) {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="gap-1 text-xs"><Clock className="h-3 w-3" /> A soumettre</Badge>
    case "submitted":
      return <Badge className="bg-primary/10 text-primary gap-1 text-xs"><Upload className="h-3 w-3" /> Soumis - En attente de validation</Badge>
    case "revision-requested":
      return <Badge className="bg-amber-100 text-amber-700 gap-1 text-xs"><RotateCcw className="h-3 w-3" /> Revision demandee ({revisionCount}/2)</Badge>
    case "resubmitted":
      return <Badge className="bg-primary/10 text-primary gap-1 text-xs"><Upload className="h-3 w-3" /> Resoumis - En attente de validation</Badge>
    case "validated":
      return <Badge className="bg-emerald-100 text-emerald-700 gap-1 text-xs"><CheckCircle2 className="h-3 w-3" /> Valide - A publier</Badge>
    case "published":
      return <Badge className="bg-blue-100 text-blue-700 gap-1 text-xs"><Send className="h-3 w-3" /> Publie - En attente de confirmation</Badge>
    case "confirmed":
      return <Badge className="bg-emerald-100 text-emerald-700 gap-1 text-xs"><CheckCircle2 className="h-3 w-3" /> Publie + Confirme</Badge>
  }
}

export function Phase8Deliverables() {
  const {
    state,
    submitDeliverable,
    validateDeliverable,
    requestRevision,
    resubmitDeliverable,
    markPublished,
    confirmPublication,
  } = useCollab()

  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [selectedDeliverableId, setSelectedDeliverableId] = useState("")
  const [showRevisionDialog, setShowRevisionDialog] = useState(false)
  const [revisionNote, setRevisionNote] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [publishUrl, setPublishUrl] = useState("")
  const [fileUploaded, setFileUploaded] = useState(false)

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Film className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Suivi des livrables</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Livrable</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.deliverables.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.label}</TableCell>
                    <TableCell className="text-muted-foreground">{d.format}</TableCell>
                    <TableCell>{getStatusBadge(d.status, d.revisionCount)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 flex-wrap">
                        {/* Creator actions */}
                        {state.viewMode === "creator" && d.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedDeliverableId(d.id)
                              setFileUploaded(false)
                              setShowSubmitDialog(true)
                            }}
                            className="gap-1.5 text-xs"
                          >
                            <Upload className="h-3 w-3" />
                            Soumettre
                          </Button>
                        )}
                        {state.viewMode === "creator" && d.status === "revision-requested" && (
                          <div className="flex flex-col items-end gap-1">
                            <Button
                              size="sm"
                              onClick={() => resubmitDeliverable(d.id)}
                              className="gap-1.5 text-xs"
                            >
                              <Upload className="h-3 w-3" />
                              Resoumettre
                            </Button>
                            {d.revisionNote && (
                              <span className="text-xs text-amber-600 max-w-[200px] text-right">
                                Note : {d.revisionNote}
                              </span>
                            )}
                          </div>
                        )}
                        {state.viewMode === "creator" && d.status === "validated" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedDeliverableId(d.id)
                              setPublishUrl(`https://www.instagram.com/p/mock-${d.id}/`)
                              setShowPublishDialog(true)
                            }}
                            className="gap-1.5 text-xs"
                          >
                            <Send className="h-3 w-3" />
                            Marquer comme publie
                          </Button>
                        )}

                        {/* Brand actions */}
                        {state.viewMode === "brand" && (d.status === "submitted" || d.status === "resubmitted") && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowPreview(true)}
                              className="gap-1.5 text-xs"
                            >
                              <Eye className="h-3 w-3" />
                              Previsualer
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => validateDeliverable(d.id)}
                              className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              Valider
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedDeliverableId(d.id)
                                setRevisionNote("")
                                setShowRevisionDialog(true)
                              }}
                              className="gap-1.5 text-xs"
                            >
                              <RotateCcw className="h-3 w-3" />
                              Revision
                            </Button>
                          </div>
                        )}
                        {state.viewMode === "brand" && d.status === "published" && (
                          <div className="flex gap-2 items-center">
                            {d.url && (
                              <a
                                href={d.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Voir
                              </a>
                            )}
                            <Button
                              size="sm"
                              onClick={() => confirmPublication(d.id)}
                              className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              Confirmer
                            </Button>
                          </div>
                        )}

                        {/* Both - confirmed */}
                        {d.status === "confirmed" && d.url && (
                          <a
                            href={d.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Voir la publication
                          </a>
                        )}

                        {/* Waiting states */}
                        {state.viewMode === "brand" && d.status === "pending" && (
                          <span className="text-xs text-muted-foreground">En attente de soumission</span>
                        )}
                        {state.viewMode === "brand" && d.status === "validated" && (
                          <span className="text-xs text-muted-foreground">En attente de publication</span>
                        )}
                        {state.viewMode === "creator" && (d.status === "submitted" || d.status === "resubmitted") && (
                          <span className="text-xs text-muted-foreground">En attente de validation</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {state.viewMode === "brand" && (
            <p className="mt-3 text-xs text-muted-foreground">
              Delai de validation : 72h. Sans reponse, validation automatique.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Submit dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Soumettre un contenu</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Livrable concerne</Label>
              <Select value={selectedDeliverableId} onValueChange={setSelectedDeliverableId}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {state.deliverables
                    .filter((d) => d.status === "pending")
                    .map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fichier</Label>
              <div
                className="mt-1.5 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setFileUploaded(true)}
              >
                {fileUploaded ? (
                  <>
                    <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-primary/10">
                      <ImageIcon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-sm text-foreground font-medium">contenu_eclat_radieux.mp4</span>
                    <span className="text-xs text-muted-foreground">42.3 MB</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Cliquez pour simuler un upload</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>Annuler</Button>
            <Button
              disabled={!selectedDeliverableId || !fileUploaded}
              onClick={() => {
                submitDeliverable(selectedDeliverableId)
                setShowSubmitDialog(false)
              }}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Envoyer pour validation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revision dialog */}
      <Dialog open={showRevisionDialog} onOpenChange={setShowRevisionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demander une revision</DialogTitle>
          </DialogHeader>
          <div>
            <Label>Modifications demandees</Label>
            <Textarea
              value={revisionNote}
              onChange={(e) => setRevisionNote(e.target.value)}
              placeholder="Decrivez les modifications souhaitees..."
              className="mt-1.5"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRevisionDialog(false)}>Annuler</Button>
            <Button
              disabled={!revisionNote.trim()}
              onClick={() => {
                requestRevision(selectedDeliverableId, revisionNote)
                setShowRevisionDialog(false)
              }}
            >
              Envoyer la demande
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Previsualisation du contenu</DialogTitle>
          </DialogHeader>
          <div className="rounded-lg bg-muted aspect-video flex flex-col items-center justify-center gap-2">
            <Film className="h-12 w-12 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Apercu video/image mockee</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Protection anti-telechargement active
          </div>
        </DialogContent>
      </Dialog>

      {/* Publish dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marquer comme publie</DialogTitle>
          </DialogHeader>
          <div>
            <Label>URL de publication</Label>
            <Input
              value={publishUrl}
              onChange={(e) => setPublishUrl(e.target.value)}
              className="mt-1.5"
              placeholder="https://..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>Annuler</Button>
            <Button
              disabled={!publishUrl.trim()}
              onClick={() => {
                markPublished(selectedDeliverableId, publishUrl)
                setShowPublishDialog(false)
              }}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Confirmer la publication
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
