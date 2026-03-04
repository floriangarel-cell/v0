"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, RotateCcw } from "lucide-react"
import { NICHE_OPTIONS, FOLLOWER_RANGES, REGIONS } from "@/lib/mock-creators"

export interface SearchFilters {
  platform: string
  followerRange: string
  budgetMax: string
  region: string
  availability: string
  niches: string[]
}

export const DEFAULT_FILTERS: SearchFilters = {
  platform: "all",
  followerRange: "all",
  budgetMax: "",
  region: "Toute la France",
  availability: "all",
  niches: [],
}

interface SearchFiltersBarProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export function SearchFiltersBar({ filters, onFiltersChange }: SearchFiltersBarProps) {
  const isAnyActive =
    filters.platform !== "all" ||
    filters.followerRange !== "all" ||
    filters.budgetMax !== "" ||
    filters.region !== "Toute la France" ||
    filters.availability !== "all" ||
    filters.niches.length > 0

  const toggleNiche = (niche: string) => {
    onFiltersChange({
      ...filters,
      niches: filters.niches.includes(niche)
        ? filters.niches.filter((n) => n !== niche)
        : [...filters.niches, niche],
    })
  }

  return (
    <Collapsible>
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronDown className="h-4 w-4" />
            Filtres complementaires
          </Button>
        </CollapsibleTrigger>
        {isAnyActive && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground"
            onClick={() => onFiltersChange(DEFAULT_FILTERS)}
          >
            <RotateCcw className="h-3 w-3" />
            Reinitialiser
          </Button>
        )}
      </div>

      <CollapsibleContent>
        <div className="mt-3 grid grid-cols-1 gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div>
            <Label className="text-xs">Plateforme</Label>
            <Select
              value={filters.platform}
              onValueChange={(v) => onFiltersChange({ ...filters, platform: v })}
            >
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="both">Les deux</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Fourchette d{"'"}abonnes</Label>
            <Select
              value={filters.followerRange}
              onValueChange={(v) => onFiltersChange({ ...filters, followerRange: v })}
            >
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {FOLLOWER_RANGES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Budget max / collab (EUR HT)</Label>
            <Input
              type="number"
              placeholder="Ex: 500"
              value={filters.budgetMax}
              onChange={(e) => onFiltersChange({ ...filters, budgetMax: e.target.value })}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label className="text-xs">Localisation</Label>
            <Select
              value={filters.region}
              onValueChange={(v) => onFiltersChange({ ...filters, region: v })}
            >
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Disponibilite</Label>
            <Select
              value={filters.availability}
              onValueChange={(v) => onFiltersChange({ ...filters, availability: v })}
            >
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toute disponibilite</SelectItem>
                <SelectItem value="1">1 collab/mois</SelectItem>
                <SelectItem value="2-3">2-3 collabs/mois</SelectItem>
                <SelectItem value="4-5">4-5 collabs/mois</SelectItem>
                <SelectItem value="6+">6+ collabs/mois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-5">
            <Label className="text-xs">Niches</Label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {NICHE_OPTIONS.map((niche) => (
                <Badge
                  key={niche}
                  variant={filters.niches.includes(niche) ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleNiche(niche)}
                >
                  {niche}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
