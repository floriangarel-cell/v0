"use client"

import { useState } from "react"
import { useCollab } from "@/lib/collab-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Instagram,
  Clock,
  Send,
  CheckCircle2,
  XCircle,
  BadgeCheck,
  Sparkles,
  Heart,
  Users,
  Bell,
} from "lucide-react"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.8a8.18 8.18 0 0 0 3.76.96V6.41a4.83 4.83 0 0 1-3.76.28z" />
    </svg>
  )
}

function CreatorPublicProfile({ onContact }: { onContact: () => void }) {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
            <Avatar className="h-24 w-24 shrink-0">
              <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">LM</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h2 className="text-2xl font-bold text-foreground">Lea Moreau</h2>
                <Badge variant="secondary" className="text-xs">
                  <BadgeCheck className="mr-1 h-3 w-3" />
                  Profil verifie
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Creatrice lifestyle & beaute passionnee. Je partage mes decouvertes et routines avec authenticite.
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge variant="outline">
                  <Heart className="mr-1 h-3 w-3" />
                  Beaute
                </Badge>
                <Badge variant="outline">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Lifestyle
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
                <div className="flex items-center gap-1.5 text-sm">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <span className="font-semibold">45K</span>
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <TikTokIcon className="h-4 w-4" />
                  <span className="font-semibold">28K</span>
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  3 collabs passees
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Taux engagement IG</p>
                  <p className="font-semibold">4.2%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Taux engagement TT</p>
                  <p className="font-semibold">6.8%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Audience principale</p>
                  <p className="font-semibold">F 25-34 ans</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Localisation</p>
                  <p className="font-semibold">France (78%)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center sm:justify-start">
            <Button size="lg" onClick={onContact} className="gap-2">
              <Send className="h-4 w-4" />
              Prendre contact avec ce createur
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ContactSentConfirmation() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Send className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Prise de contact envoyee</h2>
          <p className="text-muted-foreground">
            En attente de reponse de <span className="font-semibold">Lea Moreau</span>
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-700">
            <Clock className="h-4 w-4" />
            Expiration automatique dans 7 jours
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CreatorInbox() {
  const { acceptContact } = useCollab()
  const [showAccept, setShowAccept] = useState(false)
  const [showRefuse, setShowRefuse] = useState(false)
  const [acceptMsg, setAcceptMsg] = useState(
    "Merci pour votre interet ! Je serais ravie de discuter de cette collaboration avec vous."
  )

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center gap-2">
        <Bell className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Mes prises de contact</h2>
        <Badge variant="destructive" className="text-xs">1</Badge>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">ME</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">Maison Eclat</h3>
                <p className="text-sm font-medium text-primary">
                  Campagne lancement serum Eclat Radieux
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {"Bonjour Lea, nous adorons votre contenu beaute et aimerions vous proposer une collaboration pour le lancement de notre nouveau serum Eclat Radieux..."}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">Il y a 2h</span>
              <div className="flex items-center gap-2 text-xs text-amber-600">
                <Clock className="h-3 w-3" />
                Expire dans 7 jours
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={() => setShowAccept(true)} className="gap-2 flex-1 sm:flex-none">
              <CheckCircle2 className="h-4 w-4" />
              Accepter
            </Button>
            <Button variant="outline" onClick={() => setShowRefuse(true)} className="gap-2 flex-1 sm:flex-none">
              <XCircle className="h-4 w-4" />
              Refuser
            </Button>
          </div>

          {showAccept && (
            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
              <Label className="text-sm font-medium">Message d{"'"}accueil</Label>
              <Textarea
                value={acceptMsg}
                onChange={(e) => setAcceptMsg(e.target.value)}
                className="mt-2"
                rows={3}
              />
              <p className="mt-1 text-xs text-muted-foreground">Minimum 20 caracteres</p>
              <Button
                onClick={() => acceptContact()}
                disabled={acceptMsg.length < 20}
                className="mt-3"
              >
                Confirmer l{"'"}acceptation
              </Button>
            </div>
          )}

          {showRefuse && (
            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
              <Label className="text-sm font-medium">Message explicatif (optionnel)</Label>
              <Textarea placeholder="Raison du refus..." className="mt-2" rows={3} />
              <Button variant="destructive" className="mt-3">
                Confirmer le refus
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function Phase1Contact() {
  const { state, sendContact } = useCollab()
  const [showModal, setShowModal] = useState(false)
  const [subject, setSubject] = useState("Campagne lancement serum Eclat Radieux")
  const [message, setMessage] = useState(
    "Bonjour Lea,\n\nNous sommes Maison Eclat, marque de cosmetiques naturels. Nous adorons votre contenu beaute et lifestyle, et aimerions vous proposer une collaboration pour le lancement de notre nouveau serum Eclat Radieux.\n\nNous pensons que votre authenticite et votre expertise seraient parfaites pour presenter ce produit a votre communaute.\n\nAu plaisir d'echanger !"
  )

  // Brand view
  if (state.viewMode === "brand") {
    if (state.contactSent) {
      return <ContactSentConfirmation />
    }

    return (
      <>
        <CreatorPublicProfile onContact={() => setShowModal(true)} />
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Prendre contact avec Lea Moreau</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div>
                <Label>Objet / titre de la collaboration</Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={100}
                  className="mt-1.5"
                />
                <p className="mt-1 text-xs text-muted-foreground">{subject.length}/100 caracteres</p>
              </div>
              <div>
                <Label>Message d{"'"}introduction</Label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5"
                  rows={6}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {message.length} caracteres (min. 50)
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              <Button
                onClick={() => {
                  sendContact()
                  setShowModal(false)
                }}
                disabled={message.length < 50}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Envoyer la prise de contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Creator view
  if (!state.contactSent) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <Card>
          <CardContent className="p-8">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-muted">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">Aucune prise de contact</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Basculez en vue Marque pour initier le premier contact.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <CreatorInbox />
}
