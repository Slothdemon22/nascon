import React from 'react';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-10 lg:p-16">
              <h2 className="text-3xl font-bold text-gray-900">Join our newsletter</h2>
              <p className="mt-4 text-lg text-gray-600">
                Get weekly updates on new courses, special offers, and expert learning tips delivered to your inbox.
              </p>
              <form className="mt-8">
                <div className="flex items-center">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-r-lg font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
            <div className="md:w-1/2 relative bg-blue-700">
              <img
                src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Student studying"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-10 lg:p-16">
                <div className="max-w-xs mx-auto md:mx-0">
                  <div className="text-amber-400 text-xl font-bold mb-3">Stay Connected</div>
                  <h3 className="text-white text-2xl font-bold mb-4">Never Miss an Opportunity</h3>
                  <ul className="text-blue-100 space-y-2">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Early access to new courses
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Exclusive discounts
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Free learning resources
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;