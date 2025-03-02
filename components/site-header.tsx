"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Disc, Menu, X } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserAccountNav } from "@/components/user-account-nav"

const navigationLinks = [
  {
    title: "Tutorials",
    href: "/tutorials",
  },
  {
    title: "Guides",
    href: "/guides",
  },
  {
    title: "Templates",
    href: "/templates",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/LogoSansFondIcon.png" alt="Server Maker Logo" className="h-5 w-5 text-primary" />
                  <span>Server Maker</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 px-1 py-8">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex py-1 px-6 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 font-bold">
            <img src="/LogoSansFondIcon.png" alt="Server Maker Logo" className="h-5 w-5 text-primary" />
            <span style={{ fontFamily: 'MILKER', letterSpacing: '0.05em', }} className="hidden md:inline-block">Server Maker</span>
          </Link>
        </div>

        <nav className="hidden lg:flex lg:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <UserAccountNav />
        </div>
      </div>
    </header>
  )
}