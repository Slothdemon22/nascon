import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "This platform completely changed my career trajectory. After completing the Data Science course, I landed a job at a tech startup with a 40% salary increase. The instructors are world-class and the community support is invaluable.",
    name: "Sarah Johnson",
    role: "Data Scientist",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    content: "As someone who tried multiple online learning platforms, this is by far the best. The curriculum is well-structured, the projects are challenging but doable, and the feedback from instructors is prompt and helpful. Worth every penny.",
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    content: "I never thought I could transition from marketing to UX design at my age, but this platform made it possible. The step-by-step approach and real-world projects gave me the confidence to make the leap. Now I'm doing work I truly love.",
    name: "Emily Rodriguez",
    role: "UX Designer",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-amber-400 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">What Our Students Say</p>
          <p className="mt-4 max-w-2xl text-xl text-blue-200 mx-auto">
            Hear from students who have transformed their careers through our platform.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xl text-gray-800 mb-8">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center">
                      <img 
                        className="h-14 w-14 rounded-full object-cover" 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                      />
                      <div className="ml-4">
                        <div className="font-medium text-lg text-gray-900">{testimonial.name}</div>
                        <div className="text-blue-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 flex items-center">
            <button 
              onClick={prevTestimonial}
              className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg focus:outline-none transform -translate-x-1/2"
            >
              <ChevronLeft className="h-6 w-6 text-blue-900" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
              onClick={nextTestimonial}
              className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg focus:outline-none transform translate-x-1/2"
            >
              <ChevronRight className="h-6 w-6 text-blue-900" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-amber-400' : 'bg-blue-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;