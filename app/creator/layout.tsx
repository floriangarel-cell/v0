"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { CREATOR_NAV_ITEMS } from "@/lib/mock-data"
import type { ReactNode } from "react"

export default function CreatorLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={CREATOR_NAV_ITEMS} spaceLabel="Espace Createur" />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium text-muted-foreground">Espace Createur</span>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
