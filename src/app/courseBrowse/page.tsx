// app/student/browsecourses/page.tsx
"use client"
import CourseList from '@/components/CourseList';

export default function BrowseCoursesPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Courses</h1>
      <CourseList />
    </div>
  );
}
