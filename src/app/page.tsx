"use client";
import React from 'react';
import Navbar from  "@/components/Navbar"
import Hero from  "@/components/Hero"
import Features from "@/components/features"
import CourseCategories from  "@/components/courcecategories";
import Testimonials from "@/components/Testimontials"
import Stats from "@/components/Stats";
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/footer"

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <CourseCategories />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;