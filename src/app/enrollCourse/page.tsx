'use client';

import { useState, useEffect } from 'react';

interface Course {
  _id: string;
  title: string;
}

export default function EnrollButton() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/student/browsecourses');
        const data = await res.json();
        if (res.ok && data.courses) {
          setCourses(data.courses);
        } else {
          setMessage('❌ Failed to fetch courses');
        }
      } catch (err) {
        setMessage('❌ Something went wrong while fetching courses');
      }
    };

    fetchCourses();
  }, []);

  // Handle course enrollment
  const handleEnroll = async () => {
    if (!selectedCourse) {
      setMessage('❌ Please select a course');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/student/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: selectedCourse }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage('❌ Enrollment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enroll in a Course</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">Select a Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a course...</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleEnroll}
        disabled={loading}
        className={`w-full px-4 py-2 text-white font-medium rounded-lg focus:outline-none ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
        }`}
      >
        {loading ? 'Enrolling...' : 'Enroll Now'}
      </button>

      {message && (
        <p className={`mt-4 text-sm text-center ${message.startsWith('❌') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
