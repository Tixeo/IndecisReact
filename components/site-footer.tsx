import Link from "next/link"
import { Disc } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <img src="/LogoSansFondIcon.png" alt="Server Maker Logo" className="h-5 w-5 text-primary" />
              <span>Server Maker</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The ultimate platform for learning Discord server management, moderation, and customization.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tutorials" className="text-muted-foreground hover:text-foreground">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-foreground">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-muted-foreground hover:text-foreground">
                  Templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link target="_blank" href="https://discord.gg/servermaker" className="text-muted-foreground hover:text-foreground">
                  Discord
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://github.com/Tixeo" className="text-muted-foreground hover:text-foreground">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Server Maker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}