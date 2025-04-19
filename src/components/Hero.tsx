import React from 'react';
import { PlayCircle, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90"></div>
        <img 
          src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Students learning" 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Unlock Your Potential With Expert-Led Courses
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto md:mx-0">
              Learn at your own pace with unlimited access to thousands of courses from industry experts.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg text-lg transition-all transform hover:scale-105 flex items-center justify-center">
                Start Learning
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg text-lg transition-all flex items-center justify-center">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
            <p className="mt-4 text-blue-200 text-sm">
              Join over 15,000+ students already learning
            </p>
          </div>
          <div className="hidden md:block">
            <div className="relative bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Popular Right Now</h3>
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-2">
                    <div className="text-blue-700 font-bold">0{item}</div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-gray-800 font-medium">
                      {item === 1 ? 'Data Science Fundamentals' : 
                       item === 2 ? 'Modern Web Development' : 
                       'Business Leadership Skills'}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="text-sm text-gray-500">4.9</div>
                      <div className="ml-1 flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <div className="ml-2 text-sm text-gray-500">
                        {item === 1 ? '3.2k students' : 
                         item === 2 ? '2.8k students' : 
                         '1.9k students'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="mt-4 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors">
                Browse All Courses
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,250.7C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;