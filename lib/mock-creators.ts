export interface MockCreator {
  slug: string
  name: string
  handle: string
  initials: string
  city: string
  region: string
  bio: string
  niches: string[]
  igFollowers: number | null
  igHandle: string | null
  ttFollowers: number | null
  ttHandle: string | null
  engagementRate: number
  matchScore: number
  aiSummary: string
  minRate: string
  verified: boolean
  audience: string
  pastCollabs: { brand: string; date: string; url: string }[]
}

export const MOCK_CREATORS: MockCreator[] = [
  {
    slug: "leamoreau",
    name: "Lea Moreau",
    handle: "@leamoreau",
    initials: "LM",
    city: "Paris",
    region: "Ile-de-France",
    bio: "Creatrice lifestyle & beaute passionnee. Je partage mes decouvertes bien-etre et routines nutrition avec authenticite. Toujours a la recherche de marques alignees avec mes valeurs.",
    niches: ["Lifestyle", "Beaute", "Bien-etre"],
    igFollowers: 45000,
    igHandle: "@leamoreau",
    ttFollowers: 28000,
    ttHandle: "@leamoreau",
    engagementRate: 5.2,
    matchScore: 96,
    aiSummary: "Creatrice lifestyle parisienne, specialisee bien-etre et nutrition. Contenu authentique et soigne, audience feminine 25-34 ans.",
    minRate: "80\u20AC HT / story IG",
    verified: true,
    audience: "F 25-34 ans",
    pastCollabs: [
      { brand: "NaturaSkin", date: "Mars 2026", url: "https://instagram.com/p/example1" },
      { brand: "YogaZen", date: "Janvier 2026", url: "https://instagram.com/p/example2" },
      { brand: "BioJuice", date: "Novembre 2025", url: "https://instagram.com/p/example3" },
    ],
  },
  {
    slug: "inesbkr",
    name: "Ines Bakouri",
    handle: "@inesbkr",
    initials: "IB",
    city: "Lyon",
    region: "Auvergne-Rhone-Alpes",
    bio: "Experte beaute clean et mode ethique. Je decode les tendances beaute responsables et partage des looks mode durables. Ambassadrice du slow fashion.",
    niches: ["Beaute", "Mode"],
    igFollowers: 62000,
    igHandle: "@inesbkr",
    ttFollowers: 41000,
    ttHandle: "@inesbkr",
    engagementRate: 4.8,
    matchScore: 91,
    aiSummary: "Experte beaute clean et mode ethique. Forte communaute engagee, disponible pour evenements en France.",
    minRate: "120\u20AC HT / story IG",
    verified: true,
    audience: "F 20-30 ans",
    pastCollabs: [
      { brand: "GreenBeauty", date: "Fevrier 2026", url: "https://instagram.com/p/example4" },
      { brand: "EthicWear", date: "Decembre 2025", url: "https://instagram.com/p/example5" },
    ],
  },
  {
    slug: "camilledurand",
    name: "Camille Durand",
    handle: "@camilledurand",
    initials: "CD",
    city: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    bio: "Passionnee de gastronomie et d'art de vivre a la bordelaise. Je partage mes recettes, mes bonnes adresses et mes decouvertes culinaires.",
    niches: ["Food", "Lifestyle"],
    igFollowers: 33000,
    igHandle: "@camilledurand",
    ttFollowers: 15000,
    ttHandle: "@camilledurand",
    engagementRate: 6.1,
    matchScore: 87,
    aiSummary: "Creatrice food et lifestyle bordelaise. Contenu visuel haut de gamme, partenariats avec des marques premium.",
    minRate: "70\u20AC HT / story IG",
    verified: true,
    audience: "F 25-40 ans",
    pastCollabs: [
      { brand: "ChezMarcel", date: "Janvier 2026", url: "https://instagram.com/p/example6" },
    ],
  },
  {
    slug: "amirasayed",
    name: "Amira Sayed",
    handle: "@amirasayed",
    initials: "AS",
    city: "Marseille",
    region: "Provence-Alpes-Cote d'Azur",
    bio: "Coach bien-etre et fitness, contenu motivant et accessible. Je partage mes routines sport, mes conseils nutrition et mon quotidien healthy a Marseille.",
    niches: ["Bien-etre", "Sport"],
    igFollowers: 28000,
    igHandle: "@amirasayed",
    ttFollowers: 52000,
    ttHandle: "@amirasayed",
    engagementRate: 7.3,
    matchScore: 84,
    aiSummary: "Coach bien-etre et fitness, tres active sur TikTok. Audience mixte 18-34 ans, taux d'engagement exceptionnel.",
    minRate: "60\u20AC HT / story IG",
    verified: true,
    audience: "Mixte 18-34 ans",
    pastCollabs: [
      { brand: "FitPro", date: "Fevrier 2026", url: "https://tiktok.com/@example1" },
      { brand: "NutriShake", date: "Decembre 2025", url: "https://tiktok.com/@example2" },
    ],
  },
  {
    slug: "chloemtn",
    name: "Chloe Martin",
    handle: "@chloe.mtn",
    initials: "CM",
    city: "Paris",
    region: "Ile-de-France",
    bio: "Creatrice mode et lifestyle parisienne. Je partage mes looks, mes coups de coeur shopping et mes inspirations mode au quotidien.",
    niches: ["Mode", "Lifestyle"],
    igFollowers: 91000,
    igHandle: "@chloe.mtn",
    ttFollowers: 67000,
    ttHandle: "@chloe.mtn",
    engagementRate: 3.9,
    matchScore: 79,
    aiSummary: "Influenceuse mode premium parisienne. Collaborations regulieres avec grandes marques, contenu esthetique soigne.",
    minRate: "200\u20AC HT / story IG",
    verified: true,
    audience: "F 20-35 ans",
    pastCollabs: [
      { brand: "LuxeMode", date: "Mars 2026", url: "https://instagram.com/p/example7" },
      { brand: "ChicParis", date: "Janvier 2026", url: "https://instagram.com/p/example8" },
      { brand: "FashionWeek", date: "Octobre 2025", url: "https://instagram.com/p/example9" },
    ],
  },
  {
    slug: "noemiepetit",
    name: "Noemie Petit",
    handle: "@noemie.petit",
    initials: "NP",
    city: "Nantes",
    region: "Pays de la Loire",
    bio: "Jeune maman et creatrice de contenu lifestyle. Je partage notre quotidien de famille, mes astuces parentalite et mes decouvertes produits bebe et maison.",
    niches: ["Parentalite", "Lifestyle"],
    igFollowers: 18000,
    igHandle: "@noemie.petit",
    ttFollowers: null,
    ttHandle: null,
    engagementRate: 8.4,
    matchScore: 74,
    aiSummary: "Jeune maman creatrice de contenu lifestyle et parentalite. Communaute tres fidele, parfaite pour marques famille.",
    minRate: "50\u20AC HT / story IG",
    verified: false,
    audience: "F 25-40 ans",
    pastCollabs: [
      { brand: "BabyNat", date: "Fevrier 2026", url: "https://instagram.com/p/example10" },
    ],
  },
  {
    slug: "jadelefebvre",
    name: "Jade Lefebvre",
    handle: "@jadelefebvre",
    initials: "JL",
    city: "Lille",
    region: "Hauts-de-France",
    bio: "Creatrice beaute naturelle et bien-etre. Specialiste UGC, je cree du contenu authentique pour les marques de cosmetiques et de soin.",
    niches: ["Beaute", "Bien-etre"],
    igFollowers: 22000,
    igHandle: "@jadelefebvre",
    ttFollowers: 31000,
    ttHandle: "@jadelefebvre",
    engagementRate: 5.7,
    matchScore: 71,
    aiSummary: "Creatrice beaute naturelle et bien-etre. Specialiste UGC, ouverte aux partenariats long-terme.",
    minRate: "65\u20AC HT / story IG",
    verified: true,
    audience: "F 22-32 ans",
    pastCollabs: [
      { brand: "NatCosmetics", date: "Mars 2026", url: "https://instagram.com/p/example11" },
    ],
  },
  {
    slug: "sofiamorel",
    name: "Sofia Morel",
    handle: "@sofia.morel",
    initials: "SM",
    city: "Toulouse",
    region: "Occitanie",
    bio: "Creatrice voyage et lifestyle basee a Toulouse. Je partage mes escapades, mes bons plans et mon quotidien entre aventure et douceur de vivre.",
    niches: ["Voyage", "Lifestyle"],
    igFollowers: 55000,
    igHandle: "@sofia.morel",
    ttFollowers: 38000,
    ttHandle: "@sofia.morel",
    engagementRate: 4.2,
    matchScore: 68,
    aiSummary: "Creatrice voyage et lifestyle. Contenu immersif, ideale pour marques tourisme et outdoor.",
    minRate: "90\u20AC HT / story IG",
    verified: true,
    audience: "Mixte 22-38 ans",
    pastCollabs: [
      { brand: "TravelZen", date: "Janvier 2026", url: "https://instagram.com/p/example12" },
      { brand: "OutdoorLife", date: "Novembre 2025", url: "https://instagram.com/p/example13" },
    ],
  },
]

export const SAMPLE_PROMPTS = [
  "Createur food a Lyon, 10K-50K abonnes, stories Instagram",
  "Micro-influenceuse beaute, audience feminine 18-24 ans, TikTok",
  "Createur tech/gaming masculin, bon engagement, ouvert aux partenariats long-terme",
  "Creatrice mode eco-responsable, Paris, disponible pour evenements",
]

export const RECENT_SEARCHES = [
  { query: "Creatrice lifestyle parisienne bien-etre nutrition 20K+ IG", time: "il y a 2h" },
  { query: "Micro-influenceur food Lyon stories Instagram", time: "hier" },
  { query: "Createur tech gaming masculin bon engagement", time: "il y a 3 jours" },
]

export const NICHE_OPTIONS = [
  "Beaute", "Mode", "Lifestyle", "Food", "Voyage", "Sport",
  "Tech", "Gaming", "Bien-etre", "Parentalite", "Decoration", "Musique",
]

export const FOLLOWER_RANGES = [
  { label: "Tous", value: "all" },
  { label: "< 1K", value: "0-1000" },
  { label: "1K - 5K", value: "1000-5000" },
  { label: "5K - 10K", value: "5000-10000" },
  { label: "10K - 50K", value: "10000-50000" },
  { label: "50K - 100K", value: "50000-100000" },
  { label: "100K - 500K", value: "100000-500000" },
  { label: "500K+", value: "500000-999999999" },
]

export const REGIONS = [
  "Toute la France",
  "Ile-de-France",
  "Auvergne-Rhone-Alpes",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Hauts-de-France",
  "Provence-Alpes-Cote d'Azur",
  "Pays de la Loire",
  "Bretagne",
  "Normandie",
  "Grand Est",
  "Centre-Val de Loire",
  "Bourgogne-Franche-Comte",
  "Corse",
]

export function formatFollowers(n: number | null): string {
  if (n === null) return "-"
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${Math.round(n / 1000)}K`
  return n.toString()
}

export function getMatchColor(score: number): string {
  if (score >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200"
  if (score >= 75) return "text-primary bg-primary/5 border-primary/20"
  return "text-muted-foreground bg-muted border-border"
}
