import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"

export const metadata = {
  title: "Pricing | Server Maker",
  description: "Choose the plan that fits your needs",
}

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'MILKER', letterSpacing: '0.02em' }}>Simple and transparent pricing</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Choose the plan that fits your needs. All plans include full access to our platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {/* Forfait Gratuit */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Free</CardTitle>
              <CardDescription>Perfect for starting</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">0€</span>
                <span className="text-muted-foreground">/mois</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>1 server</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>5 users</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Basic features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="https://discord.gg/servermaker" passHref className="w-full" target="_blank">
                <Button size="lg" className="w-full">
                  Start for free
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Forfait Pro */}
          <Card className="flex flex-col border-primary">
            <CardHeader className=" rounded-t-lg">
              <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full w-fit mb-4">
                The most popular
              </div>
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription>Ideal for teams</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">19€</span>
                <span className="text-muted-foreground">/mois</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>10 servers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>100 users</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>All features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="https://discord.gg/servermaker" passHref className="w-full" target="_blank">
                <Button size="lg" variant="default" className="w-full">
                  Subscribe
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Forfait Entreprise */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <CardDescription>For large organizations</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">49€</span>
                <span className="text-muted-foreground">/mois</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Unlimited servers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Unlimited users</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Premium features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>24/7 support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Customizable API</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Dedicated deployment</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="https://discord.gg/servermaker" passHref className="w-full" target="_blank">
                <Button size="lg" variant="default" className="w-full">
                  Subscribe
                </Button>
              </Link>
              {/* <Link href="https://discord.gg/servermaker" passHref className="w-full" target="_blank">
                <Button size="lg" variant="outline" className="w-full">
                  Contact sales
                </Button>
              </Link> */}
            </CardFooter>
          </Card>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Do you have questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact our sales team for more information on our offers and how we can help you with your project.
          </p>
          <Link href="https://discord.gg/servermaker" passHref className="w-full" target="_blank">
            <Button variant="outline" size="lg">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
      <SiteFooter />
    </>
  )
} 