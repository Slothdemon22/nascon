import React from 'react';
import { GraduationCap, Users, BookOpen, Award, Clock, Globe } from 'lucide-react';

const features = [
  {
    icon: <GraduationCap className="h-10 w-10 text-amber-500" />,
    title: "Expert Instructors",
    description: "Learn from industry experts with years of real-world experience and proven teaching methods."
  },
  {
    icon: <Users className="h-10 w-10 text-amber-500" />,
    title: "Community Support",
    description: "Join a vibrant community of learners for discussions, project collaboration, and networking."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-amber-500" />,
    title: "Comprehensive Curriculum",
    description: "Access structured learning paths designed to build your skills from beginner to advanced."
  },
  {
    icon: <Award className="h-10 w-10 text-amber-500" />,
    title: "Verified Certificates",
    description: "Earn industry-recognized certificates to showcase your new skills to employers."
  },
  {
    icon: <Clock className="h-10 w-10 text-amber-500" />,
    title: "Learn at Your Pace",
    description: "Access course content 24/7 and learn on your own schedule, from anywhere in the world."
  },
  {
    icon: <Globe className="h-10 w-10 text-amber-500" />,
    title: "Global Perspective",
    description: "Gain insights from diverse instructors and students from over 150 countries worldwide."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-base text-amber-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose Our Platform</p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            We've designed our platform with your learning success in mind. Here's what sets us apart.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-blue-50 rounded-full mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;