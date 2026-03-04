"use client"

import { useState } from "react"
import { useCollab, type QuoteLine } from "@/lib/collab-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import {
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  ArrowLeftRight,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

function QuoteTable({
  lines,
  onChange,
  readOnly = false,
  highlightChanges = false,
  originalLines,
}: {
  lines: QuoteLine[]
  onChange?: (lines: QuoteLine[]) => void
  readOnly?: boolean
  highlightChanges?: boolean
  originalLines?: QuoteLine[]
}) {
  const subtotalHT = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)
  const tva = subtotalHT * 0.2
  const totalTTC = subtotalHT + tva
  const commission = subtotalHT * 0.05

  const isChanged = (lineIndex: number, field: keyof QuoteLine) => {
    if (!highlightChanges || !originalLines || !originalLines[lineIndex]) return false
    return originalLines[lineIndex][field] !== lines[lineIndex][field]
  }

  const updateLine = (index: number, field: keyof QuoteLine, value: string | number) => {
    if (!onChange) return
    const next = [...lines]
    next[index] = { ...next[index], [field]: value }
    onChange(next)
  }

  const addLine = () => {
    if (!onChange) return
    onChange([
      ...lines,
      { id: `q${Date.now()}`, network: "Instagram", format: "Story", quantity: 1, unitPrice: 0, deadline: "", conditions: "" },
    ])
  }

  const removeLine = (index: number) => {
    if (!onChange) return
    onChange(lines.filter((_, i) => i !== index))
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reseau</TableHead>
            <TableHead>Format</TableHead>
            <TableHead className="text-center">Qte</TableHead>
            <TableHead className="text-right">Tarif unitaire HT</TableHead>
            <TableHead>Date max</TableHead>
            {!readOnly && <TableHead className="w-10" />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {lines.map((line, index) => (
            <TableRow key={line.id}>
              <TableCell>
                {readOnly ? (
                  <span className="text-sm">{line.network}</span>
                ) : (
                  <Select value={line.network} onValueChange={(v) => updateLine(index, "network", v)}>
                    <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell>
                {readOnly ? (
                  <span className="text-sm">{line.format}</span>
                ) : (
                  <Select value={line.format} onValueChange={(v) => updateLine(index, "format", v)}>
                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Story">Story</SelectItem>
                      <SelectItem value="Post/Video">Post/Video</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell className="text-center">
                {readOnly ? (
                  <span className="text-sm">{line.quantity}</span>
                ) : (
                  <Input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) => updateLine(index, "quantity", Number(e.target.value))}
                    className="w-16 text-center"
                  />
                )}
              </TableCell>
              <TableCell className="text-right">
                {readOnly ? (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isChanged(index, "unitPrice") && "bg-amber-100 px-1 rounded text-amber-800"
                    )}
                  >
                    {line.unitPrice} EUR
                  </span>
                ) : (
                  <Input
                    type="number"
                    min={0}
                    value={line.unitPrice}
                    onChange={(e) => updateLine(index, "unitPrice", Number(e.target.value))}
                    className={cn(
                      "w-24 text-right",
                      isChanged(index, "unitPrice") && "border-amber-400 bg-amber-50"
                    )}
                  />
                )}
              </TableCell>
              <TableCell>
                {readOnly ? (
                  <span className="text-sm">{line.deadline}</span>
                ) : (
                  <Input
                    value={line.deadline}
                    onChange={(e) => updateLine(index, "deadline", e.target.value)}
                    placeholder="JJ/MM/AAAA"
                    className="w-28"
                  />
                )}
              </TableCell>
              {!readOnly && (
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeLine(index)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={readOnly ? 3 : 3} className="font-medium">Sous-total HT</TableCell>
            <TableCell className="text-right font-bold">{subtotalHT.toFixed(2)} EUR</TableCell>
            <TableCell colSpan={readOnly ? 1 : 2} />
          </TableRow>
          <TableRow>
            <TableCell colSpan={readOnly ? 3 : 3} className="text-muted-foreground">TVA (20%)</TableCell>
            <TableCell className="text-right">{tva.toFixed(2)} EUR</TableCell>
            <TableCell colSpan={readOnly ? 1 : 2} />
          </TableRow>
          <TableRow>
            <TableCell colSpan={readOnly ? 3 : 3} className="font-bold text-foreground">Total TTC</TableCell>
            <TableCell className="text-right font-bold text-foreground">{totalTTC.toFixed(2)} EUR</TableCell>
            <TableCell colSpan={readOnly ? 1 : 2} />
          </TableRow>
          <TableRow>
            <TableCell colSpan={readOnly ? 3 : 3} className="text-xs text-muted-foreground">
              Commission CollabWithMe : 5% HT ({commission.toFixed(2)} EUR) — deduite du versement au createur
            </TableCell>
            <TableCell colSpan={readOnly ? 2 : 3} />
          </TableRow>
        </TableFooter>
      </Table>

      {!readOnly && (
        <Button variant="outline" size="sm" onClick={addLine} className="mt-3 gap-1.5">
          <Plus className="h-3 w-3" />
          Ajouter une ligne
        </Button>
      )}
    </div>
  )
}

export function Phase3Quote() {
  const { state, updateQuoteLines, sendQuote, acceptQuote, sendCounterProposal, acceptCounterProposal } = useCollab()
  const [editableLines, setEditableLines] = useState<QuoteLine[]>(state.quoteLines)
  const [showCounterForm, setShowCounterForm] = useState(false)
  const [counterLines, setCounterLines] = useState<QuoteLine[]>(state.quoteLines)
  const originalLines = state.quoteLines

  // Creator builds and sends the quote
  if (state.viewMode === "creator" && !state.quoteSent) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Construire votre devis</h2>
            </div>
            <QuoteTable lines={editableLines} onChange={setEditableLines} />
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  updateQuoteLines(editableLines)
                  sendQuote()
                }}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Envoyer le devis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quote sent - show read-only card
  if (state.quoteSent && !state.quoteAccepted) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">
                {state.counterProposalSent ? "Contre-proposition de Maison Eclat" : "Devis de Lea Moreau"}
              </h2>
              <Badge variant="outline" className="text-xs">
                {state.counterProposalSent ? "Contre-proposition" : "Devis initial"}
              </Badge>
            </div>

            {showCounterForm ? (
              <>
                <QuoteTable
                  lines={counterLines}
                  onChange={setCounterLines}
                  highlightChanges
                  originalLines={originalLines}
                />
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCounterForm(false)}>Annuler</Button>
                  <Button onClick={() => { sendCounterProposal(counterLines); setShowCounterForm(false) }} className="gap-2">
                    <ArrowLeftRight className="h-4 w-4" />
                    Envoyer la contre-proposition
                  </Button>
                </div>
              </>
            ) : (
              <>
                <QuoteTable lines={state.quoteLines} readOnly />
                {state.viewMode === "brand" && !state.counterProposalSent && (
                  <div className="mt-4 flex justify-end gap-2">
                    <Button onClick={acceptQuote} className="gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Accepter le devis
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCounterLines(state.quoteLines.map((l, i) =>
                          i === 1 ? { ...l, unitPrice: 70 } : l
                        ))
                        setShowCounterForm(true)
                      }}
                      className="gap-2"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                      Faire une contre-proposition
                    </Button>
                  </div>
                )}
                {state.viewMode === "creator" && state.counterProposalSent && !state.counterProposalAccepted && (
                  <div className="mt-4 flex justify-end gap-2">
                    <Button onClick={acceptCounterProposal} className="gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Accepter la contre-proposition
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <ArrowLeftRight className="h-4 w-4" />
                      Faire une nouvelle proposition
                    </Button>
                  </div>
                )}
                {state.viewMode === "creator" && !state.counterProposalSent && (
                  <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground text-center">
                    En attente de la reponse de Maison Eclat...
                  </div>
                )}
                {state.viewMode === "brand" && state.counterProposalSent && (
                  <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground text-center">
                    Contre-proposition envoyee. En attente de la reponse de Lea Moreau...
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fallback when creator hasn't sent quote yet (brand view)
  return (
    <div className="mx-auto max-w-lg text-center">
      <Card>
        <CardContent className="p-8">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold text-foreground">En attente du devis</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {state.viewMode === "brand"
              ? "Lea Moreau est en train de preparer son devis. Basculez en vue Createur pour le construire."
              : "Envoyez votre devis a Maison Eclat."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
