'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LockIcon, MailIcon } from 'lucide-react'

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
}).required()

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      console.log("SignIn result:", result) 
      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Fetch user data after successful login
        const userResponse = await fetch('/api/user')
        if (userResponse.ok) {
          const userData = await userResponse.json()
          console.log("User data:", userData) // Pour le débogage
          // Rediriger en fonction du rôle de l'utilisateur
          if (userData.role === 'ADMIN') {
            router.push("/admin")
          } else {
            router.push("/")
          }
        } else {
          console.error("Failed to fetch user data")
          setError('Failed to fetch user data')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred')
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/admin' })
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-primary text-white p-6 text-center">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-sm mt-2">Please sign in to your account</p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative space-y-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="text-gray-400" size={20} />
            </div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="pl-10 w-full"
              style={{ paddingLeft: '2.5rem' }}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon className="text-gray-400" size={20} />
            </div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="pl-10 w-full"
              style={{ paddingLeft: '2.5rem' }}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button 
            type="submit" 
            className="w-full bg-secondary hover:bg-secondary-dark text-white transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <hr className="w-full" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="w-full" />
        </div>
        <Button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
            <path fill="none" d="M1 1h22v22H1z" />
          </svg>
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
        </p>
      </CardFooter>
    </Card>
  )
}