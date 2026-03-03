"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, ChevronDown, User, Settings, LogOut } from "lucide-react"

const NAV_LINKS = [
  { label: "Comment ca marche", href: "#comment-ca-marche" },
  { label: "Avantages", href: "#avantages" },
  { label: "Pricing", href: "#pricing" },
]

export function PublicHeader() {
  const { isLoggedIn, user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          CollabWithMe
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href={user.userType === "creator" ? "/creator/dashboard" : "/brand/dashboard"}>
                    <User className="mr-2 h-4 w-4" />
                    Mon espace
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={user.userType === "creator" ? "/creator/settings" : "/brand/settings"}>
                    <Settings className="mr-2 h-4 w-4" />
                    Parametres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Deconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-1">
                    Inscription <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/signup/creator">Je suis createur</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup/brand">Je suis une marque</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="text-primary font-bold">CollabWithMe</SheetTitle>
            <nav className="mt-8 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="my-4 h-px bg-border" />
              {isLoggedIn && user ? (
                <>
                  <Link
                    href={user.userType === "creator" ? "/creator/dashboard" : "/brand/dashboard"}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-foreground"
                  >
                    Mon espace
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false) }}
                    className="text-left text-base font-medium text-destructive"
                  >
                    Deconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-foreground"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/signup/creator"
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-primary"
                  >
                    Inscription createur
                  </Link>
                  <Link
                    href="/signup/brand"
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-primary"
                  >
                    Inscription marque
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
