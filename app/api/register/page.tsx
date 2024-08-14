import { NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }
    
    await createUser(email, password)
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}