import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function UserDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Welcome, {session.user.name || session.user.email}</h1>
      <p>This is your user dashboard.</p>
    </div>
  )
}