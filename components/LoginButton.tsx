import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LoginButton() {
  const { data: session, status } = useSession()
  console.log('Session:', session) // Log de débogage
  console.log('Status:', status)

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span>Signed in as {session.user.email}</span>
        {session.user.role === 'ADMIN' && (
          <Link href="/admin" className="text-blue-600 hover:underline">
            Admin
          </Link>
        )}
        <Button onClick={() => signOut()} variant="destructive">
          Sign out
        </Button>
      </div>
    )
  }
  return (
    <Button onClick={() => signIn()}>
      Sign in
    </Button>
  )
}