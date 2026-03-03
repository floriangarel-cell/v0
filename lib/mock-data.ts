export const STEPS = [
  {
    number: 1,
    title: "Inscription gratuite",
    description: "Creez votre compte en quelques secondes, que vous soyez createur ou marque.",
    icon: "UserPlus" as const,
  },
  {
    number: 2,
    title: "Matching intelligent",
    description: "Notre algorithme identifie les profils les plus compatibles avec vos objectifs.",
    icon: "Sparkles" as const,
  },
  {
    number: 3,
    title: "Negociation simplifiee",
    description: "Discutez directement sur la plateforme et trouvez un accord en toute transparence.",
    icon: "MessageSquare" as const,
  },
  {
    number: 4,
    title: "Contrat automatique",
    description: "Un contrat genere automatiquement par IA, pret a etre signe electroniquement.",
    icon: "FileSignature" as const,
  },
  {
    number: 5,
    title: "Paiement securise",
    description: "Le paiement est securise via notre systeme d'escrow. Livrable valide = paiement garanti.",
    icon: "ShieldCheck" as const,
  },
]

export const CREATOR_BENEFITS = [
  "Revenus securises par un systeme d'escrow",
  "Contrats generes automatiquement par IA",
  "Zero tache administrative",
  "Tableau de bord pour suivre vos collaborations",
  "Facturation automatique",
  "Historique complet de toutes vos missions",
]

export const BRAND_BENEFITS = [
  "Acces a des createurs verifies et professionnels",
  "Processus structure de A a Z",
  "Paiements proteges jusqu'a validation du livrable",
  "Recherche avancee par niche, audience, tarif",
  "Gestion centralisee de toutes vos campagnes",
  "Gain de temps considerable sur la logistique",
]

export const TESTIMONIALS = [
  {
    name: "Lea Martin",
    role: "Creatrice lifestyle - 45K abonnes",
    quote:
      "Avant CollabWithMe, je passais des heures a negocier et a relancer. Maintenant, tout est fluide : du premier message au paiement, c'est un vrai gain de temps.",
  },
  {
    name: "Thomas Girard",
    role: "Directeur marketing - FreshFood",
    quote:
      "On a trouve des createurs parfaitement alignes avec notre marque en quelques clics. Le processus structure nous a fait gagner un temps fou.",
  },
  {
    name: "Camille Rousseau",
    role: "Creatrice beaute - 120K abonnes",
    quote:
      "Le contrat automatique est un game-changer. Plus besoin de payer un avocat, et je suis sure d'etre payee grace au systeme d'escrow.",
  },
]

export const FAQ_ITEMS = [
  {
    question: "CollabWithMe est-il vraiment gratuit ?",
    answer:
      "Oui, l'inscription et l'utilisation de la plateforme sont 100% gratuites. Nous prelevons uniquement une commission de 5% sur le montant HT de chaque collaboration finalisee et payee.",
  },
  {
    question: "Comment fonctionne le systeme de paiement securise ?",
    answer:
      "Le paiement fonctionne via un systeme d'escrow : la marque depose le montant au moment de la signature du contrat. Le createur recoit le paiement une fois le livrable valide par la marque. Cela protege les deux parties.",
  },
  {
    question: "Qui peut s'inscrire sur CollabWithMe ?",
    answer:
      "Tout createur de contenu (Instagram, TikTok, YouTube, etc.) et toute marque ou entreprise souhaitant collaborer avec des createurs. L'inscription est ouverte a tous.",
  },
  {
    question: "Les contrats generes sont-ils juridiquement valides ?",
    answer:
      "Oui, nos contrats sont generes par IA et revus pour etre conformes au droit francais. La signature electronique leur confere une valeur juridique pleine et entiere.",
  },
  {
    question: "Puis-je utiliser CollabWithMe si j'ai peu d'abonnes ?",
    answer:
      "Absolument ! CollabWithMe est ouvert a tous les createurs, quel que soit leur nombre d'abonnes. Les marques recherchent souvent des micro-influenceurs pour des campagnes ciblees.",
  },
  {
    question: "Comment contacter le support ?",
    answer:
      "Vous pouvez nous joindre par email a support@collabwithme.com ou directement via le chat integre a la plateforme. Nous repondons sous 24h.",
  },
]

export const CREATOR_NAV_ITEMS = [
  { title: "Dashboard", href: "/creator/dashboard", icon: "LayoutDashboard" as const },
  { title: "Mon Profil", href: "/creator/profile", icon: "User" as const },
  { title: "Prises de contact", href: "/creator/contacts", icon: "Inbox" as const, badge: 3 },
  { title: "Discussions", href: "/creator/discussions", icon: "MessageCircle" as const, badge: 2 },
  { title: "Collaborations", href: "/creator/collaborations", icon: "Handshake" as const },
  { title: "Historique", href: "/creator/history", icon: "Clock" as const },
  { title: "Finances", href: "/creator/finances", icon: "Wallet" as const },
  { title: "Parametres", href: "/creator/settings", icon: "Settings" as const },
]

export const BRAND_NAV_ITEMS = [
  { title: "Dashboard", href: "/brand/dashboard", icon: "LayoutDashboard" as const },
  { title: "Mon Profil", href: "/brand/profile", icon: "Building2" as const },
  { title: "Recherche createurs", href: "/brand/search", icon: "Search" as const },
  { title: "Prises de contact", href: "/brand/contacts", icon: "Send" as const, badge: 5 },
  { title: "Discussions", href: "/brand/discussions", icon: "MessageCircle" as const, badge: 1 },
  { title: "Collaborations", href: "/brand/collaborations", icon: "Handshake" as const },
  { title: "Historique", href: "/brand/history", icon: "Clock" as const },
  { title: "Finances", href: "/brand/finances", icon: "Wallet" as const },
  { title: "Parametres", href: "/brand/settings", icon: "Settings" as const },
]
