import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy - Server Maker",
  description: "How we protect your data on the Server Maker platform",
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US')}
            </p>

            <h2>1. Introduction</h2>
            <p>
              At Server Maker, we are committed to protecting your privacy. This privacy policy explains how we collect, use, disclose, and protect your personal information when you use our platform.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We collect several types of information about you, including:
            </p>
            <ul>
              <li><strong>Discord Account Information</strong>: When you log in with Discord, we receive information such as your Discord ID, username, avatar, and email address.</li>
              <li><strong>Usage Data</strong>: We collect data about your interaction with our platform, such as pages visited, features used, and time spent on the site.</li>
              <li><strong>Device Information</strong>: We may collect information about your device, including the type of device, operating system, and browser you are using.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide, maintain, and improve our platform</li>
              <li>Personalize your experience</li>
              <li>Communicate with you, including sending you updates and information about our services</li>
              <li>Analyze the usage of our platform</li>
              <li>Protect our platform and our users</li>
            </ul>

            <h2>4. Sharing Information</h2>
            <p>
              We do not sell your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul>
              <li><strong>With Service Providers</strong>: We work with third-party service providers who help us operate our platform.</li>
              <li><strong>To Comply with the Law</strong>: We may disclose your information if we are legally required to do so.</li>
              <li><strong>With Your Consent</strong>: We may share your information with your consent or at your direction.</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul>
              <li>Right to access your personal information</li>
              <li>Right to rectify inaccurate information</li>
              <li>Right to delete your information</li>
              <li>Right to restrict the processing of your information</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>

            <h2>7. Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, understand how our platform is used, and personalize content and ads.
            </p>

            <h2>8. Information Regarding Children</h2>
            <p>
              Our platform is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13.
            </p>

            <h2>9. Changes to Our Privacy Policy</h2>
            <p>
              We may modify this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at: privacy@servermaker.com
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
} 