"use client"

import { useState } from "react"
import { useCollab } from "@/lib/collab-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  Send,
  Package,
  BookOpen,
  Plus,
  Trash2,
  FileSignature,
} from "lucide-react"

interface ChatMessage {
  id: string
  sender: "brand" | "creator" | "system"
  senderName: string
  content: string
  time: string
  type?: "normal" | "brief" | "kit-media" | "product-shipment"
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    sender: "brand",
    senderName: "Maison Eclat",
    content: "Bonjour Lea ! Merci d'avoir accepte notre prise de contact. Nous sommes ravis de pouvoir echanger avec vous.",
    time: "10:02",
  },
  {
    id: "m2",
    sender: "creator",
    senderName: "Lea Moreau",
    content: "Bonjour ! Merci a vous, votre marque m'interesse beaucoup. J'utilise deja certains de vos produits au quotidien.",
    time: "10:05",
  },
  {
    id: "m3",
    sender: "brand",
    senderName: "Maison Eclat",
    content: "C'est super ! Nous lancons un nouveau serum et aimerions que vous le presentiez a votre communaute. Quel serait le meilleur format selon vous ?",
    time: "10:08",
  },
  {
    id: "m4",
    sender: "creator",
    senderName: "Lea Moreau",
    content: "Je pense qu'une combinaison de stories pour le teasing et un post/video detaille pour la review serait ideal. Sur Instagram et TikTok pour maximiser la portee.",
    time: "10:12",
  },
  {
    id: "m5",
    sender: "brand",
    senderName: "Maison Eclat",
    content: "Parfait, c'est exactement ce qu'on avait en tete ! Je vais vous envoyer le brief officiel avec tous les details.",
    time: "10:15",
  },
]

const RATE_CARD = [
  { label: "Story IG", price: "80" },
  { label: "Post/Video IG", price: "250" },
  { label: "Story TT", price: "60" },
  { label: "Post/Video TT", price: "200" },
]

interface ProductLine {
  name: string
  unitPrice: number
  quantity: number
}

export function Phase2Discussion() {
  const { state, sendBrief, shareKitMedia, proposeShipment, acceptShipment, sendQuote } = useCollab()
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [showBriefForm, setShowBriefForm] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)

  // Brief form state
  const [briefObjectives, setBriefObjectives] = useState(
    "Promouvoir le lancement du serum Eclat Radieux aupres d'une audience feminine 25-34 ans interessee par la beaute naturelle. Objectif : generer de la notoriete et du trafic vers notre site."
  )
  const [briefFormats, setBriefFormats] = useState({
    storyIG: true,
    postIG: true,
    storyTT: false,
    postTT: true,
  })
  const [briefGuidelines, setBriefGuidelines] = useState(
    "Mention #Sponsorise obligatoire. Mettre en avant les ingredients naturels. Montrer le produit en situation reelle. Pas de retouches excessives."
  )
  const [briefBudget, setBriefBudget] = useState("600")

  // Product shipment
  const [products, setProducts] = useState<ProductLine[]>([
    { name: "Serum Eclat Radieux 30ml", unitPrice: 45, quantity: 2 },
    { name: "Coffret decouverte soins", unitPrice: 25, quantity: 1 },
  ])

  const addMessage = (msg: Omit<ChatMessage, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: `m${Date.now()}` }])
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

  const handleSendBrief = () => {
    const selectedFormats = []
    if (briefFormats.storyIG) selectedFormats.push("Story IG")
    if (briefFormats.postIG) selectedFormats.push("Post/Video IG")
    if (briefFormats.storyTT) selectedFormats.push("Story TT")
    if (briefFormats.postTT) selectedFormats.push("Post/Video TT")

    addMessage({
      sender: "brand",
      senderName: "Maison Eclat",
      content: `**Brief Officiel**\n\nObjectifs : ${briefObjectives}\n\nFormats : ${selectedFormats.join(", ")}\n\nGuidelines : ${briefGuidelines}\n\nBudget indicatif : ${briefBudget}EUR HT`,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      type: "brief",
    })
    sendBrief()
    setShowBriefForm(false)
  }

  const handleShareKit = () => {
    addMessage({
      sender: "system",
      senderName: "Systeme",
      content: "Lea a partage son Kit Media",
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      type: "kit-media",
    })
    shareKitMedia()
  }

  const handleProposeProducts = () => {
    const total = products.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0)
    addMessage({
      sender: "brand",
      senderName: "Maison Eclat",
      content: `**Proposition d'envoi de produits**\n\n${products.map((p) => `- ${p.name} x${p.quantity} (${p.unitPrice}EUR HT/u)`).join("\n")}\n\nTotal HT : ${total}EUR`,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      type: "product-shipment",
    })
    proposeShipment()
    setShowProductForm(false)
  }

  const productTotal = products.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0)

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1">
          <CardContent className="flex flex-col p-0 h-[500px]">
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => {
                  if (msg.type === "brief") {
                    return (
                      <div key={msg.id} className="mx-auto w-full max-w-md">
                        <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <FileSignature className="h-4 w-4 text-primary" />
                            <Badge className="bg-primary text-primary-foreground text-xs">Brief Officiel</Badge>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="whitespace-pre-line text-sm text-foreground">{msg.content.replace("**Brief Officiel**\n\n", "")}</p>
                        </div>
                      </div>
                    )
                  }

                  if (msg.type === "kit-media") {
                    return (
                      <div key={msg.id} className="mx-auto">
                        <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-xs text-muted-foreground">
                          <FileText className="h-3 w-3" />
                          {msg.content}
                        </div>
                      </div>
                    )
                  }

                  if (msg.type === "product-shipment") {
                    return (
                      <div key={msg.id} className="mx-auto w-full max-w-md">
                        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <Package className="h-4 w-4 text-amber-600" />
                            <Badge variant="outline" className="text-xs border-amber-400 text-amber-700">
                              Envoi de produits
                            </Badge>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="whitespace-pre-line text-sm text-foreground">{msg.content.replace("**Proposition d'envoi de produits**\n\n", "")}</p>
                          {state.viewMode === "creator" && state.productShipmentProposed && !state.productShipmentAccepted && (
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" onClick={acceptShipment}>Accepter</Button>
                              <Button size="sm" variant="outline">Refuser</Button>
                            </div>
                          )}
                          {state.productShipmentAccepted && (
                            <p className="mt-2 text-xs text-emerald-600 font-medium">Envoi accepte</p>
                          )}
                        </div>
                      </div>
                    )
                  }

                  const isSelf =
                    (state.viewMode === "brand" && msg.sender === "brand") ||
                    (state.viewMode === "creator" && msg.sender === "creator")

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${isSelf ? "flex-row-reverse" : "flex-row"}`}
                    >
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
                  placeholder="Ecrivez un message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Action buttons */}
              <div className="mt-2 flex flex-wrap gap-2">
                {state.viewMode === "creator" && !state.kitMediaShared && (
                  <Button variant="outline" size="sm" onClick={handleShareKit} className="gap-1.5 text-xs">
                    <FileText className="h-3 w-3" />
                    Partager mon kit media
                  </Button>
                )}
                {state.viewMode === "brand" && !state.briefSent && (
                  <Button variant="outline" size="sm" onClick={() => setShowBriefForm(true)} className="gap-1.5 text-xs">
                    <BookOpen className="h-3 w-3" />
                    Envoyer un brief officiel
                  </Button>
                )}
                {state.viewMode === "brand" && !state.productShipmentProposed && (
                  <Button variant="outline" size="sm" onClick={() => setShowProductForm(true)} className="gap-1.5 text-xs">
                    <Package className="h-3 w-3" />
                    Proposer un envoi de produits
                  </Button>
                )}
                {state.viewMode === "creator" && state.briefSent && (
                  <Button size="sm" onClick={() => sendQuote()} className="gap-1.5 text-xs">
                    <FileSignature className="h-3 w-3" />
                    Proposer un devis
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - rate card (brand view) */}
      {state.viewMode === "brand" && (
        <div className="w-full lg:w-64 shrink-0">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Tarifs indicatifs de Lea</h3>
              <div className="flex flex-col gap-2">
                {RATE_CARD.map((rate) => (
                  <div key={rate.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{rate.label}</span>
                    <span className="font-semibold">{rate.price} EUR HT</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Brief form dialog */}
      <Dialog open={showBriefForm} onOpenChange={setShowBriefForm}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Envoyer un brief officiel</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Objectifs de la campagne</Label>
              <Textarea value={briefObjectives} onChange={(e) => setBriefObjectives(e.target.value)} className="mt-1.5" rows={3} />
            </div>
            <div>
              <Label>Formats souhaites</Label>
              <div className="mt-2 flex flex-col gap-2">
                {[
                  { key: "storyIG" as const, label: "Story Instagram" },
                  { key: "postIG" as const, label: "Post/Video Instagram" },
                  { key: "storyTT" as const, label: "Story TikTok" },
                  { key: "postTT" as const, label: "Post/Video TikTok" },
                ].map((f) => (
                  <div key={f.key} className="flex items-center gap-2">
                    <Checkbox
                      checked={briefFormats[f.key]}
                      onCheckedChange={(checked) =>
                        setBriefFormats((prev) => ({ ...prev, [f.key]: !!checked }))
                      }
                    />
                    <Label className="text-sm font-normal">{f.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Contraintes / guidelines</Label>
              <Textarea value={briefGuidelines} onChange={(e) => setBriefGuidelines(e.target.value)} className="mt-1.5" rows={3} />
            </div>
            <div>
              <Label>Budget indicatif (EUR HT)</Label>
              <Input type="number" value={briefBudget} onChange={(e) => setBriefBudget(e.target.value)} className="mt-1.5" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBriefForm(false)}>Annuler</Button>
            <Button onClick={handleSendBrief}>Envoyer le brief</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product shipment dialog */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Proposer un envoi de produits</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {products.map((product, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Nom du produit"
                  value={product.name}
                  onChange={(e) => {
                    const next = [...products]
                    next[index] = { ...next[index], name: e.target.value }
                    setProducts(next)
                  }}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Prix"
                  value={product.unitPrice}
                  onChange={(e) => {
                    const next = [...products]
                    next[index] = { ...next[index], unitPrice: Number(e.target.value) }
                    setProducts(next)
                  }}
                  className="w-20"
                />
                <Input
                  type="number"
                  placeholder="Qte"
                  value={product.quantity}
                  onChange={(e) => {
                    const next = [...products]
                    next[index] = { ...next[index], quantity: Number(e.target.value) }
                    setProducts(next)
                  }}
                  className="w-16"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setProducts(products.filter((_, i) => i !== index))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setProducts([...products, { name: "", unitPrice: 0, quantity: 1 }])} className="gap-1.5 w-fit">
              <Plus className="h-3 w-3" />
              Ajouter un produit
            </Button>
            <div className="rounded-lg bg-muted p-3 text-sm">
              <span className="text-muted-foreground">Total HT :</span>
              <span className="ml-2 font-bold">{productTotal} EUR</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProductForm(false)}>Annuler</Button>
            <Button onClick={handleProposeProducts}>Envoyer la proposition</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
