"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BadgeCheck, Heart, Instagram } from "lucide-react"
import { type MockCreator, formatFollowers, getMatchColor } from "@/lib/mock-creators"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.8a8.18 8.18 0 0 0 3.76.96V6.41a4.83 4.83 0 0 1-3.76.28z" />
    </svg>
  )
}

interface CreatorCardProps {
  creator: MockCreator
  isFavorite: boolean
  onToggleFavorite: (slug: string) => void
  layout: "grid" | "list"
}

export function CreatorCard({ creator, isFavorite, onToggleFavorite, layout }: CreatorCardProps) {
  if (layout === "list") {
    return (
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-4">
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
              {creator.initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold text-foreground">{creator.name}</h3>
              <span className="shrink-0 text-sm text-muted-foreground">{creator.handle}</span>
              {creator.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
            </div>
            <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{creator.aiSummary}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {creator.niches.map((n) => (
                <Badge key={n} variant="outline" className="text-xs">{n}</Badge>
              ))}
              <span className="text-xs text-muted-foreground">|</span>
              {creator.igFollowers && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Instagram className="h-3 w-3" /> {formatFollowers(creator.igFollowers)}
                </span>
              )}
              {creator.ttFollowers && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TikTokIcon className="h-3 w-3" /> {formatFollowers(creator.ttFollowers)}
                </span>
              )}
              <span className="text-xs text-muted-foreground">|</span>
              <span className="text-xs text-muted-foreground">Engagement {creator.engagementRate}%</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className={`rounded-full border px-3 py-1 text-sm font-semibold ${getMatchColor(creator.matchScore)}`}>
              {creator.matchScore}%
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={(e) => { e.preventDefault(); onToggleFavorite(creator.slug) }}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </Button>
            <Button asChild size="sm">
              <Link href={`/creators/${creator.slug}`}>Voir le profil</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group relative flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <button
        onClick={(e) => { e.preventDefault(); onToggleFavorite(creator.slug) }}
        className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
      </button>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">
              {creator.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-semibold text-foreground">{creator.name}</h3>
              {creator.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
            </div>
            <p className="text-sm text-muted-foreground">{creator.handle}</p>
          </div>
          <div className={`ml-auto shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-bold ${getMatchColor(creator.matchScore)}`}>
            {creator.matchScore}% match
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          {creator.igFollowers && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Instagram className="h-3.5 w-3.5 text-pink-500" />
              <span className="font-medium text-foreground">{formatFollowers(creator.igFollowers)}</span>
              <BadgeCheck className="h-3 w-3 text-primary" />
            </span>
          )}
          {creator.ttFollowers && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <TikTokIcon className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{formatFollowers(creator.ttFollowers)}</span>
              <BadgeCheck className="h-3 w-3 text-primary" />
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {creator.niches.map((niche) => (
            <Badge key={niche} variant="secondary" className="text-xs">{niche}</Badge>
          ))}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {creator.aiSummary}
        </p>

        <p className="mt-3 text-xs text-muted-foreground">
          A partir de <span className="font-semibold text-foreground">{creator.minRate}</span>
        </p>

        <Button asChild className="mt-4 w-full" size="sm">
          <Link href={`/creators/${creator.slug}`}>Voir le profil</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
