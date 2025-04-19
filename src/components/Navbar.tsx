import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md text-gray-800 py-3'
          : 'bg-transparent text-white py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className={`h-8 w-8 ${isScrolled ? 'text-blue-700' : 'text-amber-400'}`} />
            <span className="ml-2 text-xl font-bold">EduPlatform</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="font-medium hover:text-amber-400 transition-colors">Home</a>
            <a href="#" className="font-medium hover:text-amber-400 transition-colors">Courses</a>
            <a href="#" className="font-medium hover:text-amber-400 transition-colors">About</a>
            <a href="#" className="font-medium hover:text-amber-400 transition-colors">Testimonials</a>
            <a href="#" className="font-medium hover:text-amber-400 transition-colors">Contact</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isScrolled 
                ? 'text-blue-700 hover:bg-blue-50' 
                : 'text-white hover:bg-white/10'
            }`}>
              Log in
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md font-medium transition-colors">
              Sign up
            </button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-amber-500 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
          <a href="#" className="block px-3 py-2 text-gray-800 font-medium hover:bg-blue-50 rounded-md">Home</a>
          <a href="#" className="block px-3 py-2 text-gray-800 font-medium hover:bg-blue-50 rounded-md">Courses</a>
          <a href="#" className="block px-3 py-2 text-gray-800 font-medium hover:bg-blue-50 rounded-md">About</a>
          <a href="#" className="block px-3 py-2 text-gray-800 font-medium hover:bg-blue-50 rounded-md">Testimonials</a>
          <a href="#" className="block px-3 py-2 text-gray-800 font-medium hover:bg-blue-50 rounded-md">Contact</a>
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
            <button className="w-full text-left px-3 py-2 text-gray-800 font-medium hover:bg-blue-50 rounded-md">
              Log in
            </button>
            <button className="w-full text-left px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;