"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  ClapperboardIcon as ChalkboardTeacher,
  User,
  Mail,
  Lock,
  UserCheck,
  CheckCircle2,
} from "lucide-react"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log("Form submitted:", formData)

    try {
      // Making the API call to the backend (replace with your actual API URL)
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Something went wrong, please try again.")
      }

      // Handle successful response
      console.log("Form submitted:", formData)
      alert("Account created successfully!")

    } catch (error) {
      // Handle error response
      console.error("Error:", error)
      alert("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center">
          <User className="h-4 w-4 text-indigo-500 mr-2" />
          <Label htmlFor="name" className="font-medium">
            Full Name
          </Label>
        </div>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <Mail className="h-4 w-4 text-indigo-500 mr-2" />
          <Label htmlFor="email" className="font-medium">
            Email
          </Label>
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <Lock className="h-4 w-4 text-indigo-500 mr-2" />
          <Label htmlFor="password" className="font-medium">
            Password
          </Label>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a secure password"
          value={formData.password}
          onChange={handleChange}
          required
          className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
            <span>8+ characters</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
            <span>One uppercase</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
            <span>One number</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <UserCheck className="h-4 w-4 text-indigo-500 mr-2" />
          <Label htmlFor="role" className="font-medium">
            I am a
          </Label>
        </div>
        <Select onValueChange={handleRoleChange} value={formData.role}>
          <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-indigo-500" />
                <span>Student</span>
              </div>
            </SelectItem>
            <SelectItem value="tutor">
              <div className="flex items-center">
                <ChalkboardTeacher className="h-4 w-4 mr-2 text-indigo-500" />
                <span>tutor</span>
              </div>
            </SelectItem>
            <SelectItem value="parent">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-indigo-500" />
                <span>Parent</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center mt-4">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
          I agree to the{" "}
          <a href="/terms" className="text-indigo-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-base font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center h-12 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-12 bg-[#1877F2] text-white rounded-md hover:bg-[#166FE5] transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
          </svg>
          Facebook
        </button>
      </div>
    </form>
  )
}
