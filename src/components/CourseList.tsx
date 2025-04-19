'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Tutor {
  name: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tutor: Tutor;
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/student/browsecourses');
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch courses');
        setCourses(data.courses);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course._id}
          className="border p-4 rounded shadow hover:shadow-md transition cursor-pointer"
          onClick={() => router.push(`/student/browsecourses/${course._id}`)}
        >
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h2 className="text-lg font-semibold">{course.title}</h2>
          <p className="text-sm text-gray-600 mb-1">{course.description}</p>
          <div className="text-sm text-gray-500">
            <p><strong>Tutor:</strong> {course.tutor?.name}</p>
            <p><strong>Email:</strong> {course.tutor?.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
