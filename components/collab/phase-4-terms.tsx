"use client"

import { useState } from "react"
import { useCollab } from "@/lib/collab-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import {
  CheckCircle2,
  FileSignature,
  Send,
  Scale,
} from "lucide-react"

const CONTRACT_TERMS = [
  "Mode de paiement : avec ou sans escrow",
  "Cession de droits d'utilisation",
  "Utilisation en publicite payante",
  "Exclusivite sectorielle",
  "Duree de publication du contenu",
  "Delai de validation contenu par la marque",
  "Nombre max de demandes de revision",
  "Clause de confidentialite (NDA)",
  "Indemnite de rupture si annulation",
]

interface ChatMessage {
  id: string
  sender: "brand" | "creator"
  senderName: string
  content: string
  time: string
}

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "t1",
    sender: "brand",
    senderName: "Maison Eclat",
    content: "Les tarifs sont valides. Discutons maintenant des termes contractuels. Pour le paiement, nous souhaitons utiliser l'escrow pour securiser la transaction.",
    time: "14:02",
  },
  {
    id: "t2",
    sender: "creator",
    senderName: "Lea Moreau",
    content: "Parfait, l'escrow me convient tres bien. Pour la cession de droits, je propose 6 mois sur le territoire France. Ca vous irait ?",
    time: "14:05",
  },
  {
    id: "t3",
    sender: "brand",
    senderName: "Maison Eclat",
    content: "6 mois France, ca nous va. Pas besoin d'exclusivite sectorielle pour cette campagne. Pour les revisions, on propose 2 max avec un delai de validation de 72h.",
    time: "14:08",
  },
  {
    id: "t4",
    sender: "creator",
    senderName: "Lea Moreau",
    content: "2 revisions et 72h, c'est raisonnable. Pas de NDA necessaire pour cette campagne je pense ?",
    time: "14:11",
  },
  {
    id: "t5",
    sender: "brand",
    senderName: "Maison Eclat",
    content: "Non, pas de NDA necessaire. On est d'accord sur tous les points ! On peut generer le contrat.",
    time: "14:14",
  },
]

export function Phase4Terms() {
  const { state, toggleContractTerm, generateContract } = useCollab()
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState("")

  const checkedTerms = state.contractTermsChecked

  const addMessage = (msg: Omit<ChatMessage, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: `t${Date.now()}` }])
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    addMessage({
      sender: state.viewMode,
      senderName: state.viewMode === "brand" ? "Maison Eclat" : "Lea Moreau",
      content: newMessage,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    })
    setNewMessage("")
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Top banner */}
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="text-emerald-700">
            <span className="font-semibold">Tarifs acceptes</span> — Negociez maintenant les termes contractuels avant generation du contrat.
          </span>
        </div>

        <Card className="flex-1">
          <CardContent className="flex flex-col p-0 h-[450px]">
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => {
                  const isSelf =
                    (state.viewMode === "brand" && msg.sender === "brand") ||
                    (state.viewMode === "creator" && msg.sender === "creator")

                  return (
                    <div key={msg.id} className={`flex gap-2 ${isSelf ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {msg.sender === "brand" ? "ME" : "LM"}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`max-w-[75%] ${isSelf ? "items-end" : "items-start"} flex flex-col`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium text-foreground">{msg.senderName}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <div
                          className={`rounded-lg px-3 py-2 text-sm ${
                            isSelf ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Input bar */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Discutez des termes..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2">
                <Button onClick={generateContract} className="gap-2">
                  <FileSignature className="h-4 w-4" />
                  Generer le contrat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - terms checklist */}
      <div className="w-full lg:w-72 shrink-0">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Points a discuter</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Cochez les points au fur et a mesure de votre discussion (non bloquant).
            </p>
            <div className="flex flex-col gap-2.5">
              {CONTRACT_TERMS.map((term) => (
                <div key={term} className="flex items-start gap-2">
                  <Checkbox
                    checked={checkedTerms.includes(term)}
                    onCheckedChange={() => toggleContractTerm(term)}
                    className="mt-0.5"
                  />
                  <Label className="text-xs font-normal leading-relaxed cursor-pointer" onClick={() => toggleContractTerm(term)}>
                    {term}
                  </Label>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-muted p-2 text-xs text-muted-foreground text-center">
              {checkedTerms.length}/{CONTRACT_TERMS.length} points discutes
            </div>
          </CardContent>
        </Card>

        <Card className="mt-3">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Accords conclus</h3>
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Escrow active
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Cession de droits 6 mois France
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Pas d{"'"}exclusivite
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                2 revisions max
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Delai validation 72h
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
