import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="bg-primary py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl text-balance">
          Pret a vous lancer ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
          Rejoignez des centaines de createurs et de marques qui utilisent deja CollabWithMe pour leurs collaborations.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            className="w-full text-base sm:w-auto"
            asChild
          >
            <Link href="/signup/creator">
              Je suis createur
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-base sm:w-auto"
            asChild
          >
            <Link href="/signup/brand">
              Je suis une marque
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
