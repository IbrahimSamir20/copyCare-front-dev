// src/components/TestimonialsSection.tsx

import React from 'react';
import { Carousel } from 'antd';

const testimonials = [
  { name: 'John Doe', text: 'CopyCare has transformed the way we manage our business!' },
  { name: 'Jane Smith', text: 'An essential tool for our daily operations.' },
  { name: 'Michael Brown', text: 'Excellent support and great features!' },
];

const TestimonialsSection: React.FC = () => {
  return (
    <div className="testimonials-section py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-12 text-4xl font-bold">What Our Users Say</h2>
        <Carousel autoplay>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <p className="text-xl italic">"{testimonial.text}"</p>
              <p className="mt-4 text-lg font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialsSection;
