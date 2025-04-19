import React from 'react';

const stats = [
  { id: 1, label: 'Active Students', value: '15K+' },
  { id: 2, label: 'Expert Instructors', value: '200+' },
  { id: 3, label: 'Online Courses', value: '650+' },
  { id: 4, label: 'Success Rate', value: '94%' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="group">
              <div className="bg-blue-50 rounded-lg p-8 transform transition-transform group-hover:scale-105 duration-300">
                <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;