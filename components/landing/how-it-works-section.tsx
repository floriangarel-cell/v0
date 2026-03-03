import { STEPS } from "@/lib/mock-data"
import { UserPlus, Sparkles, MessageSquare, FileSignature, ShieldCheck } from "lucide-react"

const ICON_MAP = {
  UserPlus,
  Sparkles,
  MessageSquare,
  FileSignature,
  ShieldCheck,
}

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Comment ca marche ?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            5 etapes simples pour une collaboration reussie
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connector line (desktop only) */}
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-border lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step) => {
              const Icon = ICON_MAP[step.icon]
              return (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-background shadow-sm ring-1 ring-border">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
