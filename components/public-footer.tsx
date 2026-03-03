import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const FOOTER_LINKS = {
  Produit: [
    { label: "Comment ca marche", href: "#comment-ca-marche" },
    { label: "Avantages", href: "#avantages" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Ressources: [
    { label: "Blog", href: "#" },
    { label: "Guide du createur", href: "#" },
    { label: "Guide de la marque", href: "#" },
    { label: "Centre d'aide", href: "#" },
  ],
  Legal: [
    { label: "Conditions generales", href: "#" },
    { label: "Politique de confidentialite", href: "#" },
    { label: "Mentions legales", href: "#" },
  ],
}

export function PublicFooter() {
  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-primary">
              CollabWithMe
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              La plateforme qui professionnalise les collaborations entre createurs de contenu et marques.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {'© 2026 CollabWithMe. Tous droits reserves.'}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
