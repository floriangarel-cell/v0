import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground">
            100% gratuit a l&apos;inscription
          </div>

          <h1 className="text-pretty text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            La plateforme qui professionnalise les{" "}
            <span className="text-primary">collaborations</span> createurs x marques
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Du premier contact au paiement securise, CollabWithMe simplifie et
            structure chaque etape de vos partenariats.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full text-base sm:w-auto" asChild>
              <Link href="/signup/creator">
                Je suis createur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full text-base sm:w-auto" asChild>
              <Link href="/signup/brand">
                Je suis une marque
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Pas de carte bancaire requise. Commission de 5% uniquement a la finalisation.
          </p>

          <div className="mt-8 inline-flex items-center rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5">
            <span className="text-sm text-muted-foreground mr-2">Nouveau :</span>
            <Link href="/collab" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              Decouvrir le flow de collaboration interactif
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
