import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/authOptions"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log("Session in /api/user:", session) // Pour le débogage

    if (session && session.user) {
      return NextResponse.json({
        ...session.user,
        role: session.user.role || 'USER'
      })
    } else {
      console.log("No session found in /api/user") // Pour le débogage
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
  } catch (error) {
    console.error("Error in GET /api/user:", error) // Pour le débogage
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
