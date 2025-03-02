"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Disc as Discord } from "lucide-react"

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  const loginWithDiscord = async () => {
    setIsLoading(true)
    try {
      await signIn("discord", { callbackUrl: "/" })
    } catch (error) {
      console.error("Error signing in with Discord", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <Button 
        variant="default" 
        onClick={loginWithDiscord}
        disabled={isLoading}
        className="bg-[#5865F2] hover:bg-[#4752c4] text-white"
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <img src="/discord-icon.svg" alt="Server Maker Logo" className="mr-2 h-4 w-4" />
        )}
        Se connecter avec Discord
      </Button>
    </div>
  )
}