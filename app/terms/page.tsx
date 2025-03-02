import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - Server Maker",
  description: "General terms of use for the Server Maker platform",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col mx-auto items-center">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-4xl">
          <Link href="/" className="inline-flex items-center text-sm mb-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Terms of Service
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US')}
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Server Maker platform, you agree to be bound by these terms of service. If you do not accept all the terms stated on this page, you may not access the site or use our services.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Server Maker is an educational platform that provides tutorials, guides, and templates for managing and customizing Discord servers. Our content is designed to help users improve their skills in moderation, organization, and customization of Discord servers.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account on our platform, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password, as well as all activities that occur under your account. We reserve the right to refuse service, remove or modify content, or terminate accounts at our sole discretion.
            </p>

            <h2>4. User Content</h2>
            <p>
              By submitting content to our platform, you grant Server Maker a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display that content as part of our services.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              The content of the Server Maker platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and data compilations, is the property of Server Maker or its content providers and is protected by French and international copyright laws.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              Server Maker does not guarantee that the site will be available uninterrupted, timely, secure, or error-free. The service is provided "as is" and "as available" without any warranties of any kind.
            </p>

            <h2>7. Links to Other Sites</h2>
            <p>
              Our platform may contain links to third-party websites. These links are provided solely for your convenience. We have no control over the content of these sites and disclaim any responsibility for any loss or damage that may result from their use.
            </p>

            <h2>8. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms of service at any time. Your continued use of the platform after any changes constitutes your acceptance of the new terms.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by French law. Any dispute relating to the interpretation or execution of these terms will be under the exclusive jurisdiction of the French courts.
            </p>

            <h2>10. Contact</h2>
            <p>
              If you have any questions regarding these terms of service, please contact us at: contact@servermaker.com
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
} 