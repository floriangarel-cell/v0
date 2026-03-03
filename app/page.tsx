import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FaqSection } from "@/components/landing/faq-section"
import { CtaSection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <BenefitsSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <PublicFooter />
    </div>
  )
}
