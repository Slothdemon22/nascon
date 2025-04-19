"use client"

import { useState, useEffect } from "react"
import { ChevronDown, AlertCircle, Users } from "lucide-react"

interface Student {
  studentId: string
  name: string
  email: string
  enrolledAt: string
  progress: number
}

interface CourseWithEnrollments {
  courseId: string
  courseTitle: string
  courseDescription: string
  totalStudents: number
  enrolledStudents: Student[]
}

interface ApiResponse {
  message: string
  data: CourseWithEnrollments[]
}

export default function TutorEnrollmentsPage() {
  const [courses, setCourses] = useState<CourseWithEnrollments[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch("/api/enrollments")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch enrollments")
        }

        const data: ApiResponse = await response.json()
        setCourses(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const toggleAccordion = (courseId: string) => {
    setOpenAccordion(openAccordion === courseId ? null : courseId)
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-semibold">Error</h3>
        </div>
        <p className="mt-1">{error}</p>
      </div>
    )
  }

  if (!courses.length) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="border rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold">No Courses Found</h2>
          <p className="text-gray-500 mt-1">
            You haven't created any courses yet or no students have enrolled in your courses.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Courses & Enrollments</h1>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.courseId} className="border rounded-lg shadow-sm">
            <div className="p-4 sm:p-6">
              <button
                onClick={() => toggleAccordion(course.courseId)}
                className="flex justify-between items-center w-full text-left"
              >
                <div>
                  <h3 className="text-lg font-semibold">{course.courseTitle}</h3>
                  <p className="text-gray-500 mt-1 max-w-2xl">{course.courseDescription}</p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openAccordion === course.courseId ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div className="flex items-center mt-2">
                <Users className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {course.totalStudents} {course.totalStudents === 1 ? "student" : "students"} enrolled
                </span>
              </div>
            </div>

            {openAccordion === course.courseId && (
              <div className="px-4 sm:px-6 pb-6">
                {course.enrolledStudents.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-2 text-left font-medium text-gray-500">Student Name</th>
                          <th className="py-3 px-2 text-left font-medium text-gray-500">Email</th>
                          <th className="py-3 px-2 text-left font-medium text-gray-500">Enrolled On</th>
                          <th className="py-3 px-2 text-left font-medium text-gray-500">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.enrolledStudents.map((student) => (
                          <tr key={student.studentId} className="border-b">
                            <td className="py-3 px-2 font-medium">{student.name}</td>
                            <td className="py-3 px-2">{student.email}</td>
                            <td className="py-3 px-2">{formatDate(student.enrolledAt)}</td>
                            <td className="py-3 px-2">
                              <ProgressBadge progress={student.progress} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No students enrolled yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressBadge({ progress }: { progress: number }) {
  let bgColor = "bg-gray-100 text-gray-800"
  let label = `${progress}%`

  if (progress >= 100) {
    bgColor = "bg-green-100 text-green-800"
    label = "Completed"
  } else if (progress >= 50) {
    bgColor = "bg-blue-100 text-blue-800"
  } else if (progress < 10) {
    bgColor = "bg-red-100 text-red-800"
    label = "Just Started"
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
      {label}
    </span>
  )
}

function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="h-8 w-64 mb-6 bg-gray-200 rounded animate-pulse"></div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg shadow-sm p-6">
            <div className="h-6 w-full max-w-sm bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full max-w-md mt-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 mt-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="mt-4 space-y-2">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
