import Link from "next/link"
import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComingSoonProps {
  title?: string
  backHref?: string
  backLabel?: string
}

export function ComingSoon({
  title = "Cette page arrive bientot",
  backHref = "/",
  backLabel = "Retour au dashboard",
}: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
        <Construction className="h-8 w-8 text-primary" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">
          Nous travaillons activement sur cette fonctionnalite.
        </p>
      </div>
      <Button variant="outline" asChild>
        <Link href={backHref}>{backLabel}</Link>
      </Button>
    </div>
  )
}
