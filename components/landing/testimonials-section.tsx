import { TESTIMONIALS } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Decouvrez les retours de nos utilisateurs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.name} className="relative border-border">
              <CardContent className="flex flex-col gap-4 p-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="text-sm leading-relaxed text-card-foreground">
                  {`"${testimonial.quote}"`}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
