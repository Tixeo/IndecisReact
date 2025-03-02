import { Metadata } from "next"
import Link from "next/link"
import { UserAuthForm } from "@/components/user-auth-form"
import { Disc } from "lucide-react"

export const metadata: Metadata = {
  title: "Connexion - Server Maker",
  description: "Connect with your Discord account to access your server",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto max-w-7xl">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="mx-auto flex items-center gap-2 font-bold">
            <img src="/LogoSansFondIcon.png" alt="Server Maker Logo" className="h-6 w-6 text-[#5865F2]" />
            <span className="text-2xl">Server Maker</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Connect with your Discord account to access your server
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By logging in, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and our{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}