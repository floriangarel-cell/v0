import { Check } from "lucide-react"

const PRICING_FEATURES = [
  "Inscription 100% gratuite",
  "Acces illimite a la plateforme",
  "Contrats generes par IA",
  "Signature electronique incluse",
  "Systeme d'escrow securise",
  "Facturation automatique",
  "Support par email et chat",
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Un modele simple et transparent
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Pas d&apos;abonnement, pas de frais caches. Vous ne payez que lorsqu&apos;une collaboration se concrete.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-lg">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
            <div className="p-8 text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                Modele unique
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-card-foreground">0 {'€'}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {'d\'inscription et d\'utilisation'}
              </p>
              <div className="my-6 h-px bg-border" />
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Commission de 5% sur le montant HT par collaboration finalisee
              </div>
            </div>
            <div className="border-t border-border bg-secondary/50 p-8">
              <p className="mb-4 text-sm font-semibold text-card-foreground">Tout inclus :</p>
              <ul className="flex flex-col gap-3">
                {PRICING_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
