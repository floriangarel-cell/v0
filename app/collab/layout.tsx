"use client"

import { CollabProvider } from "@/lib/collab-context"
import type { ReactNode } from "react"

export default function CollabLayout({ children }: { children: ReactNode }) {
  return (
    <CollabProvider>
      {children}
    </CollabProvider>
  )
}
