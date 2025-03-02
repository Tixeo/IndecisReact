"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Disc } from "lucide-react"

export function UserAccountNav() {
  const { data: session } = useSession()

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
      <Link href="https://discord.gg/servermaker" target="_blank">
      <img src="/discord-icon.svg" alt="Discord icon" className="h-6 w-6 text-primary m-4" />
      </Link>
      <Button variant="default" className="bg-[#5865F2] hover:bg-[#4752c4] text-white" asChild>
        <Link href="/login">
          <img src="/discord-icon.svg" alt="Server Maker Logo" className="mr-2 h-4 w-4" />
          Login with Discord
        </Link>
      </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
    <div className="w-20"></div>
    <Link href="https://discord.gg/servermaker" target="_blank">
      <img src="/discord-icon.svg" alt="Discord icon" className="h-6 w-6 text-primary m-4" />
    </Link>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
            <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {/*<DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>*/}
        {(session.user.id === "523928544859127838" || session.user.id === "237342193340252161") && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Admin Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: "/",
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}