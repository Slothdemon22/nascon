import React from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Web Development',
    count: '126 courses',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'from-blue-500 to-blue-700'
  },
  {
    title: 'Data Science',
    count: '98 courses',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'from-purple-500 to-purple-700'
  },
  {
    title: 'Business',
    count: '87 courses',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'from-amber-500 to-amber-700'
  },
  {
    title: 'Design',
    count: '65 courses',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'from-pink-500 to-pink-700'
  },
  {
    title: 'Marketing',
    count: '54 courses',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'from-green-500 to-green-700'
  },
  {
    title: 'Personal Development',
    count: '46 courses',
    image: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'from-teal-500 to-teal-700'
  },
];

const CourseCategories: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-amber-600 font-semibold tracking-wide uppercase">Categories</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Explore Our Course Categories</p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Browse through our wide range of courses and find the perfect match for your learning goals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-xl shadow-lg group transition-transform duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64">
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90 group-hover:opacity-95 transition-opacity`}></div>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">{category.count}</span>
                    <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors">
            View All Categories <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;