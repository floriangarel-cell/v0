"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Search, LayoutGrid, List, Clock, Heart } from "lucide-react"
import { MOCK_CREATORS, SAMPLE_PROMPTS, RECENT_SEARCHES, type MockCreator } from "@/lib/mock-creators"
import { CreatorCard } from "@/components/search/creator-card"
import { SearchFiltersBar, DEFAULT_FILTERS, type SearchFilters } from "@/components/search/search-filters"

type ViewLayout = "grid" | "list"
type SortKey = "relevance" | "followers" | "engagement" | "rate"

const LOADING_STEPS = [
  "CollabWithMe analyse les profils createurs...",
  "Matching en cours...",
  "Classement des resultats par pertinence...",
]

function shuffleWithSeed(arr: MockCreator[], seed: string): MockCreator[] {
  const copy = [...arr]
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  for (let i = copy.length - 1; i > 0; i--) {
    hash = (hash * 16807 + 1) % 2147483647
    const j = Math.abs(hash) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function sortCreators(creators: MockCreator[], key: SortKey): MockCreator[] {
  const sorted = [...creators]
  switch (key) {
    case "relevance":
      return sorted.sort((a, b) => b.matchScore - a.matchScore)
    case "followers":
      return sorted.sort((a, b) => ((b.igFollowers ?? 0) + (b.ttFollowers ?? 0)) - ((a.igFollowers ?? 0) + (a.ttFollowers ?? 0)))
    case "engagement":
      return sorted.sort((a, b) => b.engagementRate - a.engagementRate)
    case "rate":
      return sorted.sort((a, b) => {
        const rateA = parseInt(a.minRate) || 0
        const rateB = parseInt(b.minRate) || 0
        return rateA - rateB
      })
    default:
      return sorted
  }
}

export default function BrandSearchPage() {
  const [prompt, setPrompt] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [results, setResults] = useState<MockCreator[]>([])
  const [viewLayout, setViewLayout] = useState<ViewLayout>("grid")
  const [sortKey, setSortKey] = useState<SortKey>("relevance")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showFavorites, setShowFavorites] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)
  const [revealCount, setRevealCount] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const doSearch = useCallback((query: string) => {
    if (!query.trim()) return
    setPrompt(query)
    setHasSearched(true)
    setIsLoading(true)
    setLoadingStep(0)
    setRevealCount(0)
    setShowFavorites(false)
  }, [])

  useEffect(() => {
    if (!isLoading) return
    if (loadingStep < LOADING_STEPS.length - 1) {
      const t = setTimeout(() => setLoadingStep((s) => s + 1), 900)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      const shuffled = shuffleWithSeed(MOCK_CREATORS, prompt)
      const reScored = shuffled.map((c, i) => ({
        ...c,
        matchScore: Math.max(60, c.matchScore - i * Math.floor(Math.random() * 3)),
      }))
      setResults(sortCreators(reScored, "relevance"))
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(t)
  }, [isLoading, loadingStep, prompt])

  useEffect(() => {
    if (!isLoading && results.length > 0 && revealCount < results.length) {
      const t = setTimeout(() => setRevealCount((c) => c + 1), 120)
      return () => clearTimeout(t)
    }
  }, [isLoading, results, revealCount])

  const displayedResults = showFavorites
    ? results.filter((c) => favorites.has(c.slug))
    : sortCreators(results, sortKey)

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  // Empty state -- no search yet
  if (!hasSearched) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-center text-2xl font-bold text-foreground text-balance">
          Trouvez le createur ideal pour votre campagne
        </h1>
        <p className="mt-2 text-center text-muted-foreground text-pretty">
          Decrivez vos besoins en langage naturel, notre IA trouve les meilleurs profils parmi nos createurs verifies.
        </p>

        <div className="mt-8 w-full">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); doSearch(prompt) }
              }}
              placeholder="Decrivez votre campagne ideale... Ex : Je cherche une creatrice lifestyle parisienne, 25-35 ans, axee bien-etre et nutrition, avec au moins 20K abonnes sur Instagram et un bon taux d'engagement"
              className="min-h-[120px] resize-y pr-24 text-sm leading-relaxed"
              rows={4}
            />
            <Button
              onClick={() => doSearch(prompt)}
              disabled={!prompt.trim()}
              className="absolute bottom-3 right-3 gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Rechercher
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((sp) => (
              <Badge
                key={sp}
                variant="outline"
                className="cursor-pointer px-3 py-1.5 text-xs transition-colors hover:bg-primary/5 hover:text-primary"
                onClick={() => { setPrompt(sp); textareaRef.current?.focus() }}
              >
                {sp}
              </Badge>
            ))}
          </div>

          <SearchFiltersBar filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="mt-10 w-full">
          <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Recherches recentes
          </h3>
          <div className="mt-2 flex flex-col gap-1">
            {RECENT_SEARCHES.map((rs) => (
              <button
                key={rs.query}
                onClick={() => doSearch(rs.query)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
              >
                <span className="text-foreground">{rs.query}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{rs.time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center">
        <div className="relative mb-8 h-20 w-20">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-primary/30" />
          <div className="absolute inset-4 flex items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 animate-spin text-primary" style={{ animationDuration: "3s" }} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {LOADING_STEPS.map((step, i) => (
            <p
              key={step}
              className={`text-sm transition-all duration-500 ${
                i <= loadingStep ? "text-foreground opacity-100" : "text-transparent opacity-0"
              } ${i === loadingStep ? "font-medium" : "text-muted-foreground"}`}
            >
              {step}
            </p>
          ))}
        </div>
      </div>
    )
  }

  // Results state
  return (
    <div className="mx-auto max-w-6xl">
      {/* Prompt bar */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); doSearch(prompt) }
          }}
          className="min-h-[72px] resize-y pr-28 text-sm leading-relaxed"
          rows={2}
        />
        <Button
          onClick={() => doSearch(prompt)}
          disabled={!prompt.trim()}
          className="absolute bottom-3 right-3 gap-2"
          size="sm"
        >
          <Search className="h-4 w-4" />
          Rechercher
        </Button>
      </div>

      <SearchFiltersBar filters={filters} onFiltersChange={setFilters} />

      {/* Results header */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {showFavorites
              ? `${displayedResults.length} favori${displayedResults.length > 1 ? "s" : ""}`
              : `${results.length} createurs correspondent a votre recherche`}
          </h2>
          {!showFavorites && (
            <p className="mt-0.5 text-sm italic text-muted-foreground line-clamp-1">{prompt}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showFavorites ? "default" : "outline"}
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <Heart className={`h-3.5 w-3.5 ${showFavorites ? "fill-current" : ""}`} />
            Mes favoris ({favorites.size})
          </Button>

          {!showFavorites && (
            <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
              <SelectTrigger className="w-[180px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Pertinence IA</SelectItem>
                <SelectItem value="followers">Abonnes (decroissant)</SelectItem>
                <SelectItem value="engagement">Taux d{"'"}engagement</SelectItem>
                <SelectItem value="rate">Tarif (croissant)</SelectItem>
              </SelectContent>
            </Select>
          )}

          <div className="flex rounded-lg border border-border">
            <Button
              variant={viewLayout === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => setViewLayout("grid")}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewLayout === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => setViewLayout("list")}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results grid / list */}
      {displayedResults.length === 0 && showFavorites ? (
        <div className="mt-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">Aucun favori pour le moment.</p>
          <Button variant="link" size="sm" onClick={() => setShowFavorites(false)}>
            Retour aux resultats
          </Button>
        </div>
      ) : (
        <div
          className={
            viewLayout === "grid"
              ? "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "mt-4 flex flex-col gap-3"
          }
        >
          {displayedResults.map((creator, i) => (
            <div
              key={creator.slug}
              className="transition-all duration-500"
              style={{
                opacity: showFavorites || i < revealCount ? 1 : 0,
                transform: showFavorites || i < revealCount ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <CreatorCard
                creator={creator}
                isFavorite={favorites.has(creator.slug)}
                onToggleFavorite={toggleFavorite}
                layout={viewLayout}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
