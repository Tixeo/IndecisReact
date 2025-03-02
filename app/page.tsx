import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { TeamSection } from "@/components/team-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen mx-auto max-w-7xl flex-col items-center">
      <SiteHeader />
      <main className="flex-1 px-4">
        <HeroSection />
        <FeatureSection />
        <TeamSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}