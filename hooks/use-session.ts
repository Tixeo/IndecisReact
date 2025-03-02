import { useSession as useNextAuthSession } from "next-auth/react"

export function useSession() {
  const session = useNextAuthSession()
  return session
} 