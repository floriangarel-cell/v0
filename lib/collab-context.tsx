"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { toast } from "sonner"

export type ViewMode = "brand" | "creator"

export type PhaseStatus = "completed" | "active" | "upcoming"

export interface CollabPhase {
  id: number
  name: string
  shortName: string
  status: PhaseStatus
}

export type DeliverableStatus =
  | "pending"
  | "submitted"
  | "revision-requested"
  | "resubmitted"
  | "validated"
  | "published"
  | "confirmed"

export interface Deliverable {
  id: string
  label: string
  format: string
  network: string
  status: DeliverableStatus
  revisionCount: number
  revisionNote?: string
  url?: string
  thumbnailSubmitted?: boolean
}

export interface QuoteLine {
  id: string
  network: "Instagram" | "TikTok"
  format: "Story" | "Post/Video"
  quantity: number
  unitPrice: number
  deadline: string
  conditions: string
}

export interface CollabState {
  currentPhase: number
  viewMode: ViewMode
  // Phase 1
  contactSent: boolean
  contactAccepted: boolean
  // Phase 2
  briefSent: boolean
  productShipmentProposed: boolean
  productShipmentAccepted: boolean
  kitMediaShared: boolean
  // Phase 3
  quoteLines: QuoteLine[]
  quoteSent: boolean
  quoteAccepted: boolean
  counterProposalSent: boolean
  counterProposalAccepted: boolean
  // Phase 4
  contractTermsChecked: string[]
  // Phase 5
  contractGenerated: boolean
  creatorAcceptedContract: boolean
  brandAcceptedContract: boolean
  contractRejected: boolean
  // Phase 6
  creatorSigned: boolean
  brandSigned: boolean
  // Phase 7
  paymentCompleted: boolean
  // Phase 8
  deliverables: Deliverable[]
  // Phase 9
  fundsReleased: boolean
}

const INITIAL_QUOTE_LINES: QuoteLine[] = [
  { id: "1", network: "Instagram", format: "Post/Video", quantity: 1, unitPrice: 250, deadline: "15/05/2026", conditions: "" },
  { id: "2", network: "Instagram", format: "Story", quantity: 3, unitPrice: 80, deadline: "15/05/2026", conditions: "" },
  { id: "3", network: "TikTok", format: "Post/Video", quantity: 1, unitPrice: 200, deadline: "20/05/2026", conditions: "" },
]

const INITIAL_DELIVERABLES: Deliverable[] = [
  { id: "d1", label: "Post/Video Instagram", format: "1 post", network: "Instagram", status: "pending", revisionCount: 0 },
  { id: "d2", label: "Story Instagram", format: "3 stories", network: "Instagram", status: "pending", revisionCount: 0 },
  { id: "d3", label: "Post/Video TikTok", format: "1 video", network: "TikTok", status: "pending", revisionCount: 0 },
]

const INITIAL_STATE: CollabState = {
  currentPhase: 1,
  viewMode: "brand",
  contactSent: false,
  contactAccepted: false,
  briefSent: false,
  productShipmentProposed: false,
  productShipmentAccepted: false,
  kitMediaShared: false,
  quoteLines: INITIAL_QUOTE_LINES,
  quoteSent: false,
  quoteAccepted: false,
  counterProposalSent: false,
  counterProposalAccepted: false,
  contractTermsChecked: [],
  contractGenerated: false,
  creatorAcceptedContract: false,
  brandAcceptedContract: false,
  contractRejected: false,
  creatorSigned: false,
  brandSigned: false,
  paymentCompleted: false,
  deliverables: INITIAL_DELIVERABLES,
  fundsReleased: false,
}

export const PHASE_LABELS: { name: string; shortName: string }[] = [
  { name: "Prise de contact", shortName: "Contact" },
  { name: "Discussion et Brief", shortName: "Brief" },
  { name: "Negociation tarifaire", shortName: "Devis" },
  { name: "Termes contractuels", shortName: "Termes" },
  { name: "Contrat IA", shortName: "Contrat" },
  { name: "Signature", shortName: "Signature" },
  { name: "Paiement", shortName: "Paiement" },
  { name: "Livrables", shortName: "Livrables" },
  { name: "Cloture", shortName: "Cloture" },
]

export function getStatusBadge(phase: number, state: CollabState): { label: string; color: "blue" | "orange" | "green" | "red" } {
  switch (phase) {
    case 1:
      if (state.contactAccepted) return { label: "Discussion ouverte", color: "green" }
      if (state.contactSent) return { label: "En attente de reponse", color: "orange" }
      return { label: "Prise de contact", color: "blue" }
    case 2:
      return { label: "Discussion ouverte", color: "blue" }
    case 3:
      return { label: "Negociation tarifaire", color: "orange" }
    case 4:
      return { label: "Negociation des termes", color: "blue" }
    case 5:
      return { label: "Contrat en revue", color: "orange" }
    case 6:
      if (state.creatorSigned && state.brandSigned) return { label: "Signe - En attente de paiement", color: "green" }
      return { label: "En attente de signature", color: "orange" }
    case 7:
      return { label: "En cours de production", color: "blue" }
    case 8:
      return { label: "Livrables soumis", color: "blue" }
    case 9:
      return { label: "Terminee", color: "green" }
    default:
      return { label: "Inconnu", color: "blue" }
  }
}

interface CollabContextType {
  state: CollabState
  setViewMode: (mode: ViewMode) => void
  goToPhase: (phase: number) => void
  // Phase 1
  sendContact: () => void
  acceptContact: () => void
  // Phase 2
  sendBrief: () => void
  proposeShipment: () => void
  acceptShipment: () => void
  shareKitMedia: () => void
  // Phase 3
  updateQuoteLines: (lines: QuoteLine[]) => void
  sendQuote: () => void
  acceptQuote: () => void
  sendCounterProposal: (lines: QuoteLine[]) => void
  acceptCounterProposal: () => void
  // Phase 4
  toggleContractTerm: (term: string) => void
  // Phase 5
  generateContract: () => void
  acceptContract: (party: "creator" | "brand") => void
  rejectContract: () => void
  // Phase 6
  signContract: (party: "creator" | "brand") => void
  // Phase 7
  completePayment: () => void
  // Phase 8
  submitDeliverable: (id: string) => void
  validateDeliverable: (id: string) => void
  requestRevision: (id: string, note: string) => void
  resubmitDeliverable: (id: string) => void
  markPublished: (id: string, url: string) => void
  confirmPublication: (id: string) => void
  // Phase 9
  releaseFunds: () => void
  // Reset
  resetFlow: () => void
}

const CollabContext = createContext<CollabContextType | undefined>(undefined)

export function CollabProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CollabState>(INITIAL_STATE)

  const setViewMode = useCallback((mode: ViewMode) => {
    setState((s) => ({ ...s, viewMode: mode }))
    toast.info(mode === "brand" ? "Vue Marque activee" : "Vue Createur activee")
  }, [])

  const goToPhase = useCallback((phase: number) => {
    if (phase >= 1 && phase <= 9) {
      setState((s) => ({ ...s, currentPhase: phase }))
    }
  }, [])

  const sendContact = useCallback(() => {
    setState((s) => ({ ...s, contactSent: true }))
    toast.success("Prise de contact envoyee !")
  }, [])

  const acceptContact = useCallback(() => {
    setState((s) => ({ ...s, contactAccepted: true, currentPhase: 2 }))
    toast.success("Contact accepte ! Discussion ouverte.")
  }, [])

  const sendBrief = useCallback(() => {
    setState((s) => ({ ...s, briefSent: true }))
    toast.success("Brief officiel envoye !")
  }, [])

  const proposeShipment = useCallback(() => {
    setState((s) => ({ ...s, productShipmentProposed: true }))
    toast.info("Proposition d'envoi de produits envoyee.")
  }, [])

  const acceptShipment = useCallback(() => {
    setState((s) => ({ ...s, productShipmentAccepted: true }))
    toast.success("Envoi de produits accepte !")
  }, [])

  const shareKitMedia = useCallback(() => {
    setState((s) => ({ ...s, kitMediaShared: true }))
    toast.success("Kit Media partage !")
  }, [])

  const updateQuoteLines = useCallback((lines: QuoteLine[]) => {
    setState((s) => ({ ...s, quoteLines: lines }))
  }, [])

  const sendQuote = useCallback(() => {
    setState((s) => ({ ...s, quoteSent: true, currentPhase: 3 }))
    toast.success("Devis envoye !")
  }, [])

  const acceptQuote = useCallback(() => {
    setState((s) => ({ ...s, quoteAccepted: true, currentPhase: 4 }))
    toast.success("Devis accepte !")
  }, [])

  const sendCounterProposal = useCallback((lines: QuoteLine[]) => {
    setState((s) => ({ ...s, quoteLines: lines, counterProposalSent: true }))
    toast.info("Contre-proposition envoyee.")
  }, [])

  const acceptCounterProposal = useCallback(() => {
    setState((s) => ({
      ...s,
      counterProposalAccepted: true,
      quoteAccepted: true,
      currentPhase: 4,
    }))
    toast.success("Contre-proposition acceptee ! Tarifs valides.")
  }, [])

  const toggleContractTerm = useCallback((term: string) => {
    setState((s) => ({
      ...s,
      contractTermsChecked: s.contractTermsChecked.includes(term)
        ? s.contractTermsChecked.filter((t) => t !== term)
        : [...s.contractTermsChecked, term],
    }))
  }, [])

  const generateContract = useCallback(() => {
    setState((s) => ({ ...s, contractGenerated: true, currentPhase: 5 }))
    toast.info("Generation du contrat en cours...")
  }, [])

  const acceptContract = useCallback((party: "creator" | "brand") => {
    setState((s) => {
      const next = {
        ...s,
        creatorAcceptedContract: party === "creator" ? true : s.creatorAcceptedContract,
        brandAcceptedContract: party === "brand" ? true : s.brandAcceptedContract,
      }
      if (next.creatorAcceptedContract && next.brandAcceptedContract) {
        next.currentPhase = 6
        toast.success("Contrat accepte par les deux parties !")
      } else {
        toast.success(`Contrat accepte par ${party === "brand" ? "Maison Eclat" : "Lea Moreau"}.`)
      }
      return next
    })
  }, [])

  const rejectContract = useCallback(() => {
    setState((s) => ({
      ...s,
      contractGenerated: false,
      creatorAcceptedContract: false,
      brandAcceptedContract: false,
      contractRejected: true,
      currentPhase: 4,
    }))
    toast.error("Contrat rejete. Retour a la negociation.")
  }, [])

  const signContract = useCallback((party: "creator" | "brand") => {
    setState((s) => {
      const next = {
        ...s,
        creatorSigned: party === "creator" ? true : s.creatorSigned,
        brandSigned: party === "brand" ? true : s.brandSigned,
      }
      if (next.creatorSigned && next.brandSigned) {
        next.currentPhase = 7
        toast.success("Contrat signe par les deux parties !")
      } else {
        toast.success(`Contrat signe par ${party === "brand" ? "Maison Eclat" : "Lea Moreau"}.`)
      }
      return next
    })
  }, [])

  const completePayment = useCallback(() => {
    setState((s) => ({ ...s, paymentCompleted: true, currentPhase: 8 }))
    toast.success("Paiement confirme ! Fonds places en escrow.")
  }, [])

  const submitDeliverable = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      deliverables: s.deliverables.map((d) =>
        d.id === id ? { ...d, status: "submitted" as DeliverableStatus, thumbnailSubmitted: true } : d
      ),
    }))
    toast.success("Contenu soumis pour validation !")
  }, [])

  const validateDeliverable = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      deliverables: s.deliverables.map((d) =>
        d.id === id ? { ...d, status: "validated" as DeliverableStatus } : d
      ),
    }))
    toast.success("Livrable valide !")
  }, [])

  const requestRevision = useCallback((id: string, note: string) => {
    setState((s) => ({
      ...s,
      deliverables: s.deliverables.map((d) =>
        d.id === id
          ? { ...d, status: "revision-requested" as DeliverableStatus, revisionCount: d.revisionCount + 1, revisionNote: note }
          : d
      ),
    }))
    toast.info("Demande de revision envoyee.")
  }, [])

  const resubmitDeliverable = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      deliverables: s.deliverables.map((d) =>
        d.id === id ? { ...d, status: "resubmitted" as DeliverableStatus } : d
      ),
    }))
    toast.success("Contenu resoumis !")
  }, [])

  const markPublished = useCallback((id: string, url: string) => {
    setState((s) => ({
      ...s,
      deliverables: s.deliverables.map((d) =>
        d.id === id ? { ...d, status: "published" as DeliverableStatus, url } : d
      ),
    }))
    toast.success("Contenu marque comme publie !")
  }, [])

  const confirmPublication = useCallback((id: string) => {
    setState((s) => {
      const next = {
        ...s,
        deliverables: s.deliverables.map((d) =>
          d.id === id ? { ...d, status: "confirmed" as DeliverableStatus } : d
        ),
      }
      const allConfirmed = next.deliverables.every((d) => d.status === "confirmed")
      if (allConfirmed) {
        next.currentPhase = 9
        toast.success("Tous les livrables confirmes ! Cloture de la collaboration.")
      } else {
        toast.success("Publication confirmee !")
      }
      return next
    })
  }, [])

  const releaseFunds = useCallback(() => {
    setState((s) => ({ ...s, fundsReleased: true }))
    toast.success("Fonds liberes !")
  }, [])

  const resetFlow = useCallback(() => {
    setState(INITIAL_STATE)
    toast.info("Prototype reinitialise.")
  }, [])

  return (
    <CollabContext.Provider
      value={{
        state,
        setViewMode,
        goToPhase,
        sendContact,
        acceptContact,
        sendBrief,
        proposeShipment,
        acceptShipment,
        shareKitMedia,
        updateQuoteLines,
        sendQuote,
        acceptQuote,
        sendCounterProposal,
        acceptCounterProposal,
        toggleContractTerm,
        generateContract,
        acceptContract,
        rejectContract,
        signContract,
        completePayment,
        submitDeliverable,
        validateDeliverable,
        requestRevision,
        resubmitDeliverable,
        markPublished,
        confirmPublication,
        releaseFunds,
        resetFlow,
      }}
    >
      {children}
    </CollabContext.Provider>
  )
}

export function useCollab() {
  const context = useContext(CollabContext)
  if (!context) {
    throw new Error("useCollab must be used within a CollabProvider")
  }
  return context
}
