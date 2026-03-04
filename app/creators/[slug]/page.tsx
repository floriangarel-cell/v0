"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { MOCK_CREATORS, formatFollowers } from "@/lib/mock-creators"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  BadgeCheck,
  ExternalLink,
  Instagram,
  MapPin,
  Send,
  Users,
} from "lucide-react"
import { toast } from "sonner"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.8a8.18 8.18 0 0 0 3.76.96V6.41a4.83 4.83 0 0 1-3.76.28z" />
    </svg>
  )
}

export default function CreatorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const creator = MOCK_CREATORS.find((c) => c.slug === slug)
  const router = useRouter()
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  if (!creator) {
    notFound()
  }

  const handleContact = () => {
    setContactSent(true)
    setShowContactModal(false)
    toast.success(`Prise de contact envoyee a ${creator.name} !`)
    // Navigate to collab flow after a short delay
    setTimeout(() => {
      router.push("/collab")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4">
          <Button variant="ghost" size="sm" asChild className="gap-1.5">
            <Link href="/brand/search">
              <ArrowLeft className="h-4 w-4" />
              Retour aux resultats
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-muted-foreground">Profil createur</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {contactSent ? (
          <Card className="mx-auto max-w-lg">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Prise de contact envoyee</h2>
              <p className="text-muted-foreground">
                Redirection vers le flow de collaboration...
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  <Avatar className="h-28 w-28 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-3xl font-bold text-primary">
                      {creator.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col items-center gap-2 sm:flex-row">
                      <h1 className="text-2xl font-bold text-foreground">{creator.name}</h1>
                      <span className="text-muted-foreground">{creator.handle}</span>
                      {creator.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <BadgeCheck className="mr-1 h-3 w-3" />
                          Profil verifie CollabWithMe
                        </Badge>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                      <MapPin className="h-3.5 w-3.5" />
                      {creator.city}, {creator.region}
                    </div>

                    <p className="mt-3 leading-relaxed text-muted-foreground">{creator.bio}</p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                      {creator.niches.map((n) => (
                        <Badge key={n} variant="outline">{n}</Badge>
                      ))}
                    </div>

                    {/* Social stats */}
                    <div className="mt-5 flex flex-wrap justify-center gap-5 sm:justify-start">
                      {creator.igFollowers && (
                        <div className="flex items-center gap-2">
                          <Instagram className="h-5 w-5 text-pink-500" />
                          <div>
                            <span className="font-semibold text-foreground">{formatFollowers(creator.igFollowers)}</span>
                            <span className="ml-1 text-sm text-muted-foreground">abonnes</span>
                          </div>
                          <BadgeCheck className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      {creator.ttFollowers && (
                        <div className="flex items-center gap-2">
                          <TikTokIcon className="h-5 w-5" />
                          <div>
                            <span className="font-semibold text-foreground">{formatFollowers(creator.ttFollowers)}</span>
                            <span className="ml-1 text-sm text-muted-foreground">abonnes</span>
                          </div>
                          <BadgeCheck className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Audience stats grid */}
                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-4 text-sm sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                        <p className="font-semibold text-foreground">{creator.engagementRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Audience</p>
                        <p className="font-semibold text-foreground">{creator.audience}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Localisation</p>
                        <p className="font-semibold text-foreground">{creator.city}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Collabs passees</p>
                        <p className="font-semibold text-foreground">{creator.pastCollabs.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Past collabs */}
            {creator.pastCollabs.length > 0 && (
              <Card className="mt-4">
                <CardContent className="p-6">
                  <h2 className="flex items-center gap-2 font-semibold text-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    Collaborations passees declarees
                  </h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {creator.pastCollabs.map((collab) => (
                      <div key={collab.url} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                        <div>
                          <p className="font-medium text-foreground">{collab.brand}</p>
                          <p className="text-xs text-muted-foreground">{collab.date}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" asChild>
                          <a href={collab.url} target="_blank" rel="noopener noreferrer">
                            Voir le contenu
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info note */}
            <div className="mt-4 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              Les tarifs indicatifs et le kit media ne sont visibles qu{"'"}apres acceptation de la prise de contact par le createur.
            </div>

            {/* CTA */}
            <div className="mt-6 flex justify-center">
              <Button size="lg" className="gap-2" onClick={() => setShowContactModal(true)}>
                <Send className="h-4 w-4" />
                Prendre contact avec {creator.name}
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Contact modal (Phase 1 of collab flow) */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Prendre contact avec {creator.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Objet / titre de la collaboration</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Campagne lancement serum Eclat Radieux"
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
                placeholder="Presentez votre marque et votre projet de collaboration..."
                className="mt-1.5"
                rows={6}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {message.length} caracteres (min. 50)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactModal(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleContact}
              disabled={message.length < 50 || !subject.trim()}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Envoyer la prise de contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
