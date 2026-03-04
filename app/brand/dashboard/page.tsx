"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Search,
  Send,
  MessageCircle,
  Handshake,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react"

const RECENT_ACTIVITY = [
  { icon: CheckCircle2, text: "Livrable valide — Collaboration avec Lea Moreau", time: "il y a 2h", color: "text-emerald-600" },
  { icon: MessageCircle, text: "Nouveau message de Ines Bakouri", time: "il y a 5h", color: "text-primary" },
  { icon: Send, text: "Prise de contact envoyee a Camille Durand", time: "hier", color: "text-primary" },
]

export default function BrandDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bonjour, Maison Eclat</h1>
          <p className="text-muted-foreground">Voici un apercu de vos collaborations.</p>
        </div>
      </div>

      {/* Search CTA - prominent */}
      <Card className="mt-6 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Rechercher des createurs par IA</h2>
              <p className="text-sm text-muted-foreground">
                Decrivez votre campagne et trouvez les profils ideaux parmi nos createurs verifies.
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="shrink-0 gap-2">
            <Link href="/brand/search">
              <Search className="h-4 w-4" />
              Rechercher
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Send className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground">Contacts envoyes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Discussions actives</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <Handshake className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Collaborations en cours</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Collabs terminees</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Activite recente
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted/50">
                <item.icon className={`h-4 w-4 shrink-0 ${item.color}`} />
                <p className="flex-1 text-sm text-foreground">{item.text}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Button variant="outline" className="h-auto justify-start gap-3 px-4 py-3" asChild>
          <Link href="/brand/search">
            <Search className="h-4 w-4 text-primary" />
            <div className="text-left">
              <p className="font-medium">Recherche IA</p>
              <p className="text-xs text-muted-foreground">Trouver des createurs</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
        </Button>
        <Button variant="outline" className="h-auto justify-start gap-3 px-4 py-3" asChild>
          <Link href="/collab">
            <Handshake className="h-4 w-4 text-primary" />
            <div className="text-left">
              <p className="font-medium">Flow de collaboration</p>
              <p className="text-xs text-muted-foreground">Demo interactive</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
        </Button>
        <Button variant="outline" className="h-auto justify-start gap-3 px-4 py-3" asChild>
          <Link href="/brand/profile">
            <Badge variant="outline" className="text-xs">Profil</Badge>
            <div className="text-left">
              <p className="font-medium">Mon profil marque</p>
              <p className="text-xs text-muted-foreground">Gerer mon entreprise</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
