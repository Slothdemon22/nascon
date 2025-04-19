import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, GraduationCap, ImageIcon } from "lucide-react"
import Image from "next/image"
import axios from "axios"

interface CourseStats {
  enrolledStudents: number
}

interface Course {
  courseId: string
  title: string
  description: string
  thumbnailUrl: string | null
  createdAt: string
  updatedAt: string
  stats: CourseStats
}

export default async function TutorCoursesPage() {
  try {
    const response = await axios.get("/api/dashboard")
    const courses: Course[] = response.data.data || []

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">You haven't created any courses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: Course) => (
              <Card key={course.courseId} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{course.stats.enrolledStudents} students enrolled</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{course.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>Created: {new Date(course.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching tutor courses:", error)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Unable to fetch courses at the moment. Please try again later.</p>
        </div>
      </div>
    )
  }
}
