"use client"

import { CREATOR_BENEFITS, BRAND_BENEFITS } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"

export function BenefitsSection() {
  return (
    <section id="avantages" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Des avantages concrets pour chaque partie
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            CollabWithMe a ete concu pour repondre aux besoins specifiques des createurs et des marques.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Tabs defaultValue="creator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="creator" className="text-sm font-medium">
                Createurs
              </TabsTrigger>
              <TabsTrigger value="brand" className="text-sm font-medium">
                Marques
              </TabsTrigger>
            </TabsList>

            <TabsContent value="creator" className="mt-8">
              <div className="rounded-xl border border-border bg-card p-8">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Pour les createurs de contenu
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Concentrez-vous sur la creation, on s&apos;occupe du reste.
                </p>
                <ul className="mt-6 flex flex-col gap-4">
                  {CREATOR_BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm leading-relaxed text-card-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="brand" className="mt-8">
              <div className="rounded-xl border border-border bg-card p-8">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Pour les marques et entreprises
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Trouvez les bons createurs et gerez vos campagnes sans effort.
                </p>
                <ul className="mt-6 flex flex-col gap-4">
                  {BRAND_BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm leading-relaxed text-card-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
